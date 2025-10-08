import { NEWS_STATUS, AUDIT_STATUS } from '../lib/constants';
import { daysUntil, formatDate } from '../lib/utils';

/**
 * Stateful mock datastore to simulate backend behaviour.
 * Replace with actual API calls once the server endpoints are available.
 */

const clone = (value) => {
	if (typeof structuredClone === 'function') {
		return structuredClone(value);
	}
	return JSON.parse(JSON.stringify(value));
};

const generateId = () => {
	if (typeof globalThis !== 'undefined' && globalThis.crypto?.randomUUID) {
		return globalThis.crypto.randomUUID();
	}
	return `id_${Math.random().toString(36).slice(2, 10)}`;
};

const simulateLatency = (result, timeout = 280) => new Promise((resolve) => {
	setTimeout(() => resolve(clone(result)), timeout);
});

const nowIso = () => new Date().toISOString();

// ---------------------------------------------------------------------------
// In-memory stores
// ---------------------------------------------------------------------------

let employeesStore = [
	{
		id: 'emp-1',
		name: 'John Doe',
		email: 'john.doe@eslgsc.gov.ng',
		position: 'Director',
		department: 'Administration',
		employmentDate: '2005-01-15',
		retirementDate: '2025-12-31',
		phone: '+234 803 123 4567',
		status: 'active'
	},
	{
		id: 'emp-2',
		name: 'Jane Smith',
		email: 'jane.smith@eslgsc.gov.ng',
		position: 'Chief Officer',
		department: 'Finance',
		employmentDate: '2008-03-20',
		retirementDate: '2026-03-20',
		phone: '+234 805 987 6543',
		status: 'active'
	},
	{
		id: 'emp-3',
		name: 'Michael Johnson',
		email: 'michael.j@eslgsc.gov.ng',
		position: 'Senior Officer',
		department: 'Human Resources',
		employmentDate: '2010-07-10',
		retirementDate: '2025-11-15',
		phone: '+234 807 456 7890',
		status: 'active'
	}
];

let newsStore = [
	{
		id: 'news-1',
		title: 'ESLGSC Unveils Strategic Transformation Agenda',
		summary: 'Three-year roadmap focusing on digitisation, leadership pipelines, and community accountability.',
		content: '<p>The Ebonyi State Local Government Service Commission (ESLGSC) has launched...</p>',
		category: 'Policy & Governance',
		imageUrl: '/vertexbuilding.png',
		status: NEWS_STATUS.PUBLISHED,
		authorId: 'admin-1',
		authorName: 'Admin User',
		createdAt: '2025-09-12T09:00:00Z',
		updatedAt: '2025-09-12T09:00:00Z',
		publishedAt: '2025-09-13T08:00:00Z',
		tags: ['policy', 'reform']
	}
];

let auditQueueStore = [];
let employeeEditStore = [];
let activityLogStore = [];

// ---------------------------------------------------------------------------
// Activity logging helpers
// ---------------------------------------------------------------------------

const logActivity = ({
	actorId,
	actorName,
	action,
	entityType,
	entityId,
	entityName,
	details
}) => {
	activityLogStore.unshift({
		id: generateId(),
		actorId,
		actorName,
		action,
		entityType,
		entityId,
		entityName,
		details,
		timestamp: nowIso()
	});
};

// ---------------------------------------------------------------------------
// Employee services
// ---------------------------------------------------------------------------

export const fetchEmployees = async () => simulateLatency(employeesStore);

export const createEmployee = async (data, actor) => {
	const employee = {
		id: generateId(),
		status: 'active',
		...data
	};
	employeesStore = [employee, ...employeesStore];

	if (actor) {
		logActivity({
			actorId: actor.id,
			actorName: actor.name,
			action: 'created employee record',
			entityType: 'employee',
			entityId: employee.id,
			entityName: employee.name
		});
	}

	return simulateLatency(employee);
};

export const updateEmployee = async (id, data, actor) => {
	employeesStore = employeesStore.map((emp) =>
		emp.id === id ? { ...emp, ...data, updatedAt: nowIso() } : emp
	);
	const updated = employeesStore.find((emp) => emp.id === id);

	if (actor) {
		logActivity({
			actorId: actor.id,
			actorName: actor.name,
			action: 'updated employee record',
			entityType: 'employee',
			entityId: id,
			entityName: updated?.name,
			details: data
		});
	}

	return simulateLatency(updated);
};

export const deleteEmployee = async (id, actor) => {
	const removed = employeesStore.find((emp) => emp.id === id);
	employeesStore = employeesStore.filter((emp) => emp.id !== id);

	if (actor && removed) {
		logActivity({
			actorId: actor.id,
			actorName: actor.name,
			action: 'deleted employee record',
			entityType: 'employee',
			entityId: id,
			entityName: removed.name
		});
	}

	return simulateLatency({ success: true, id });
};

// ---------------------------------------------------------------------------
// Employee audit suggestions
// ---------------------------------------------------------------------------

export const suggestEmployeeEdit = async ({ employeeId, changes, reason }, actor) => {
	const employee = employeesStore.find((emp) => emp.id === employeeId);
	if (!employee) {
		throw new Error('Employee not found');
	}

	const suggestion = {
		id: generateId(),
		employeeId,
		employeeName: employee.name,
		submittedById: actor?.id,
		submittedByName: actor?.name,
		submittedAt: nowIso(),
		status: AUDIT_STATUS.PENDING,
		changes,
		reason
	};

	employeeEditStore = [suggestion, ...employeeEditStore];

	auditQueueStore = [
		{
			id: suggestion.id,
			entityType: 'employeeEdit',
			entityId: employeeId,
			entityName: employee.name,
			status: AUDIT_STATUS.PENDING,
			submittedAt: suggestion.submittedAt,
			submittedByName: actor?.name,
			submittedById: actor?.id,
			payload: {
				current: employee,
				proposed: { ...employee, ...changes },
				reason
			}
		},
		...auditQueueStore
	];

	logActivity({
		actorId: actor?.id,
		actorName: actor?.name,
		action: 'submitted employee correction',
		entityType: 'employee',
		entityId: employeeId,
		entityName: employee.name,
		details: { changes, reason }
	});

	return simulateLatency(suggestion);
};

export const fetchEmployeeEdits = async ({ status, submittedById } = {}) => {
	let data = employeeEditStore;
	if (status) {
		data = data.filter((item) => item.status === status);
	}
	if (submittedById) {
		data = data.filter((item) => item.submittedById === submittedById);
	}
	return simulateLatency(data);
};

const applyEmployeeEdit = (suggestionId) => {
	const suggestion = employeeEditStore.find((item) => item.id === suggestionId);
	if (!suggestion) {
		throw new Error('Suggestion not found');
	}

	employeesStore = employeesStore.map((emp) =>
		emp.id === suggestion.employeeId ? { ...emp, ...suggestion.changes, updatedAt: nowIso() } : emp
	);
	return suggestion;
};

export const approveEmployeeEdit = async (suggestionId, { actor, notes }) => {
	const suggestion = applyEmployeeEdit(suggestionId);

	employeeEditStore = employeeEditStore.map((item) =>
		item.id === suggestionId
			? { ...item, status: AUDIT_STATUS.APPROVED, resolvedAt: nowIso(), reviewerId: actor?.id, reviewerName: actor?.name, notes }
			: item
	);

	auditQueueStore = auditQueueStore.filter((item) => item.id !== suggestionId);

	logActivity({
		actorId: actor?.id,
		actorName: actor?.name,
		action: 'approved employee correction',
		entityType: 'employee',
		entityId: suggestion.employeeId,
		entityName: suggestion.employeeName,
		details: { notes }
	});

	return simulateLatency({ success: true });
};

export const rejectEmployeeEdit = async (suggestionId, { actor, notes }) => {
	const suggestion = employeeEditStore.find((item) => item.id === suggestionId);
	if (!suggestion) {
		throw new Error('Suggestion not found');
	}

	employeeEditStore = employeeEditStore.map((item) =>
		item.id === suggestionId
			? { ...item, status: AUDIT_STATUS.REJECTED, resolvedAt: nowIso(), reviewerId: actor?.id, reviewerName: actor?.name, notes }
			: item
	);

	auditQueueStore = auditQueueStore.filter((item) => item.id !== suggestionId);

	logActivity({
		actorId: actor?.id,
		actorName: actor?.name,
		action: 'rejected employee correction',
		entityType: 'employee',
		entityId: suggestion.employeeId,
		entityName: suggestion.employeeName,
		details: { notes }
	});

	return simulateLatency({ success: true });
};

// ---------------------------------------------------------------------------
// News services
// ---------------------------------------------------------------------------

export const fetchNews = async (filters = {}) => {
	const { status, authorId } = filters;
	let data = newsStore;
	if (status) {
		data = data.filter((item) => item.status === status);
	}
	if (authorId) {
		data = data.filter((item) => item.authorId === authorId);
	}
	return simulateLatency(data);
};

export const fetchNewsById = async (newsId) => {
	const article = newsStore.find((item) => item.id === newsId);
	return simulateLatency(article || null);
};

export const saveNewsDraft = async (payload, actor) => {
	const now = nowIso();
	if (payload.id) {
		newsStore = newsStore.map((item) =>
			item.id === payload.id
				? { ...item, ...payload, status: NEWS_STATUS.DRAFT, updatedAt: now }
				: item
		);
		const updated = newsStore.find((item) => item.id === payload.id);

		logActivity({
			actorId: actor?.id,
			actorName: actor?.name,
			action: 'updated news draft',
			entityType: 'news',
			entityId: updated?.id,
			entityName: updated?.title
		});

		return simulateLatency(updated);
	}

	const draft = {
		id: generateId(),
		status: NEWS_STATUS.DRAFT,
		createdAt: now,
		updatedAt: now,
		authorId: actor?.id,
		authorName: actor?.name,
		...payload
	};

	newsStore = [draft, ...newsStore];

	logActivity({
		actorId: actor?.id,
		actorName: actor?.name,
		action: 'created news draft',
		entityType: 'news',
		entityId: draft.id,
		entityName: draft.title
	});

	return simulateLatency(draft);
};

export const submitNewsForApproval = async (newsId, { actor, notes }) => {
	const article = newsStore.find((item) => item.id === newsId);
	if (!article) {
		throw new Error('Article not found');
	}

	newsStore = newsStore.map((item) =>
		item.id === newsId ? { ...item, status: NEWS_STATUS.PENDING, submittedAt: nowIso() } : item
	);

	auditQueueStore = [
		{
			id: newsId,
			entityType: 'news',
			entityId: newsId,
			entityName: article.title,
			status: AUDIT_STATUS.PENDING,
			submittedAt: nowIso(),
			submittedByName: actor?.name,
			submittedById: actor?.id,
			payload: {
				article: { ...article, status: NEWS_STATUS.PENDING },
				notes
			}
		},
		...auditQueueStore.filter((item) => item.id !== newsId)
	];

	logActivity({
		actorId: actor?.id,
		actorName: actor?.name,
		action: 'submitted news for approval',
		entityType: 'news',
		entityId: newsId,
		entityName: article.title,
		details: { notes }
	});

	return simulateLatency({ success: true });
};

export const approveNews = async (newsId, { actor, notes }) => {
	newsStore = newsStore.map((item) =>
		item.id === newsId
			? {
					...item,
					status: NEWS_STATUS.PUBLISHED,
					publishedAt: nowIso(),
					publishedById: actor?.id,
					publishedByName: actor?.name,
					approvalNotes: notes
				}
			: item
	);

	auditQueueStore = auditQueueStore.filter((item) => item.id !== newsId);

	const article = newsStore.find((item) => item.id === newsId);

	logActivity({
		actorId: actor?.id,
		actorName: actor?.name,
		action: 'approved news article',
		entityType: 'news',
		entityId: newsId,
		entityName: article?.title,
		details: { notes }
	});

	return simulateLatency({ success: true });
};

export const rejectNews = async (newsId, { actor, notes }) => {
	newsStore = newsStore.map((item) =>
		item.id === newsId
			? {
					...item,
					status: NEWS_STATUS.DRAFT,
					rejectionNotes: notes,
					updatedAt: nowIso()
				}
			: item
	);

	auditQueueStore = auditQueueStore.filter((item) => item.id !== newsId);

	const article = newsStore.find((item) => item.id === newsId);

	logActivity({
		actorId: actor?.id,
		actorName: actor?.name,
		action: 'rejected news article',
		entityType: 'news',
		entityId: newsId,
		entityName: article?.title,
		details: { notes }
	});

	return simulateLatency({ success: true });
};

// ---------------------------------------------------------------------------
// Audit queue
// ---------------------------------------------------------------------------

export const fetchAuditQueue = async () => simulateLatency(auditQueueStore.filter((item) => item.status === AUDIT_STATUS.PENDING));

export const approveAudit = async ({ id, actor, notes }) => {
	const item = auditQueueStore.find((entry) => entry.id === id);
	if (!item) {
		throw new Error('Audit item not found');
	}

	if (item.entityType === 'news') {
		await approveNews(item.entityId, { actor, notes });
	} else if (item.entityType === 'employeeEdit') {
		await approveEmployeeEdit(item.id, { actor, notes });
	}

	return simulateLatency({ success: true });
};

export const rejectAudit = async ({ id, actor, notes }) => {
	const item = auditQueueStore.find((entry) => entry.id === id);
	if (!item) {
		throw new Error('Audit item not found');
	}

	if (item.entityType === 'news') {
		await rejectNews(item.entityId, { actor, notes });
	} else if (item.entityType === 'employeeEdit') {
		await rejectEmployeeEdit(item.id, { actor, notes });
	}

	return simulateLatency({ success: true });
};

// ---------------------------------------------------------------------------
// Retirement alerts
// ---------------------------------------------------------------------------

export const fetchRetirementAlerts = async ({ priority, department } = {}) => {
	const alerts = employeesStore
		.map((emp) => {
			const days = daysUntil(emp.retirementDate);
			let priorityLevel = 'normal';
			if (days <= 30) priorityLevel = 'critical';
			else if (days <= 90) priorityLevel = 'warning';
			else if (days <= 180) priorityLevel = 'normal';
			else priorityLevel = 'low';

			return {
				id: emp.id,
				employeeId: emp.id,
				employeeName: emp.name,
				department: emp.department,
				retirementDate: emp.retirementDate,
				formattedRetirementDate: formatDate(emp.retirementDate),
				daysRemaining: days,
				priority: priorityLevel
			};
		})
		.filter((alert) => alert.daysRemaining >= 0 && alert.daysRemaining <= 365)
		.sort((a, b) => a.daysRemaining - b.daysRemaining);

	let filtered = alerts;
	if (priority) {
		filtered = filtered.filter((alert) => alert.priority === priority);
	}
	if (department) {
		filtered = filtered.filter((alert) => alert.department === department);
	}

	return simulateLatency(filtered);
};

export const fetchCriticalAlertCount = async () => {
	const alerts = await fetchRetirementAlerts();
	return alerts.filter((alert) => alert.priority === 'critical').length;
};

export const exportRetirementAlertsReport = async ({ format = 'pdf', filters } = {}) => {
	// In production, trigger backend export endpoint.
	return simulateLatency({
		success: true,
		format,
		filters
	});
};

// ---------------------------------------------------------------------------
// Activity log
// ---------------------------------------------------------------------------

export const fetchActivityLog = async ({ actorId, entityType } = {}) => {
	let data = activityLogStore;
	if (actorId) {
		data = data.filter((item) => item.actorId === actorId);
	}
	if (entityType) {
		data = data.filter((item) => item.entityType === entityType);
	}
	return simulateLatency(data);
};

export const searchActivityLog = async ({ query } = {}) => {
	if (!query) return simulateLatency(activityLogStore);
	const terms = query.toLowerCase();
	return simulateLatency(
		activityLogStore.filter((item) =>
			[item.action, item.entityName, item.actorName]
				.filter(Boolean)
				.some((text) => text.toLowerCase().includes(terms))
		)
	);
};

// ---------------------------------------------------------------------------
// Notifications / dashboard helpers
// ---------------------------------------------------------------------------

export const fetchDashboardNotifications = async () => {
	const criticalAlerts = await fetchCriticalAlertCount();
	const pendingAudits = auditQueueStore.filter((item) => item.status === AUDIT_STATUS.PENDING).length;

	return simulateLatency({
		criticalAlerts,
		pendingAudits
	});
};
