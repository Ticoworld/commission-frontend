/**
 * TypeScript-style type definitions for JavaScript
 * (JSDoc comments for better IDE support)
 */

/**
 * @typedef {'SUPER' | 'ADMIN' | 'MEDIA' | 'AUDIT' | 'LGA'} UserRole
 */

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {UserRole} role
 * @property {string} [avatar]
 */

/**
 * @typedef {Object} Employee
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} position
 * @property {string} department
 * @property {string} employmentDate
 * @property {string} retirementDate
 * @property {string} [phone]
 * @property {string} status
 */

/**
 * @typedef {'draft' | 'pending' | 'published' | 'archived'} NewsStatus
 */

/**
 * @typedef {Object} NewsPost
 * @property {string} id
 * @property {string} title
 * @property {string} slug
 * @property {string} excerpt
 * @property {string} content
 * @property {string} [imageUrl]
 * @property {NewsStatus} status
 * @property {string} authorId
 * @property {string} [authorName]
 * @property {string} createdAt
 * @property {string} updatedAt
 * @property {string} [publishedAt]
 * @property {string[]} [tags]
 * @property {string} [category]
 */

/**
 * @typedef {'pending' | 'approved' | 'rejected'} AuditStatus
 */

/**
 * @typedef {Object} AuditRecord
 * @property {string} id
 * @property {string} entityType
 * @property {string} entityId
 * @property {string} action
 * @property {Object} changes
 * @property {AuditStatus} status
 * @property {string} submittedBy
 * @property {string} [reviewedBy]
 * @property {string} submittedAt
 * @property {string} [reviewedAt]
 * @property {string} [notes]
 */

/**
 * @typedef {Object} RetirementAlert
 * @property {string} id
 * @property {string} employeeId
 * @property {string} employeeName
 * @property {string} department
 * @property {string} retirementDate
 * @property {number} daysRemaining
 * @property {'critical' | 'warning' | 'normal'} priority
 */

/**
 * @typedef {Object} LGA
 * @property {string} id
 * @property {string} name
 * @property {string} code
 * @property {string} [description]
 * @property {string} [chairman]
 * @property {string} [contactEmail]
 * @property {string} [contactPhone]
 */

/**
 * @typedef {Object} DevelopmentCenter
 * @property {string} id
 * @property {string} name
 * @property {string} location
 * @property {string} [description]
 * @property {string} [coordinator]
 * @property {string[]} [services]
 */

/**
 * @typedef {Object} Document
 * @property {string} id
 * @property {string} name
 * @property {string} type
 * @property {number} size
 * @property {string} url
 * @property {string} uploadedBy
 * @property {string} uploadedAt
 * @property {string} [category]
 */

export {};
