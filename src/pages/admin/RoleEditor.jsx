import React, { useEffect, useMemo, useState } from 'react';
import api from '../../services/api';
import useAuth from '../../context/useAuth';
import Button from '../../components/ui/Button';
import { toast } from 'react-toastify';

const RoleEditor = () => {
  const { user } = useAuth();
  const [roles, setRoles] = useState([]);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [permissionsInput, setPermissionsInput] = useState('');
  const [editing, setEditing] = useState(null);
  const [listLoading, setListLoading] = useState(false);

  const presets = useMemo(() => ([
    { label: 'Media Editor', perms: ['news:create', 'news:edit'] },
    { label: 'Audit Reviewer', perms: ['audit:read', 'audit:review'] },
    { label: 'HR Admin', perms: ['employees:read', 'employees:write'] },
  ]), []);

  const fetchRoles = async () => {
    setListLoading(true);
    try {
      const res = await api.get('/roles', { params: { includeUsage: 1 } });
      // backend may return { success:true, data: [...] } or raw array
      const payload = res.data;
      if (Array.isArray(payload)) setRoles(payload);
      else if (payload && Array.isArray(payload.data)) setRoles(payload.data);
      else setRoles([]);
    } catch (err) {
      console.error('Failed to load roles', err);
    } finally {
      setListLoading(false);
    }
  };

  useEffect(() => { fetchRoles(); }, []);

  const createRole = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const permissions = permissionsInput
        .split(',')
        .map((p) => p.trim())
        .filter(Boolean);
      await api.post('/roles', { name, permissions });
      setName('');
      setPermissionsInput('');
      fetchRoles();
      toast.success('Role created');
    } catch (err) {
      console.error('create role error', err);
      toast.error('Failed to create role');
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (role) => {
    setEditing(role);
    setName(role.name || '');
    setPermissionsInput(Array.isArray(role.permissions) ? role.permissions.join(', ') : '');
  };

  const saveEdit = async () => {
    if (!editing) return;
    setLoading(true);
    try {
      const permissions = permissionsInput
        .split(',')
        .map((p) => p.trim())
        .filter(Boolean);
      await api.patch(`/roles/${editing.id}`, { name, permissions });
      toast.success('Role updated');
      setEditing(null);
      setName('');
      setPermissionsInput('');
      fetchRoles();
    } catch (err) {
      console.error('update role error', err);
      toast.error('Failed to update role');
    } finally {
      setLoading(false);
    }
  };

  const deleteRole = async (role) => {
    if (!window.confirm(`Delete role "${role.name}"?`)) return;
    setLoading(true);
    try {
      await api.delete(`/roles/${role.id}`);
      toast.success('Role deleted');
      if (editing?.id === role.id) {
        setEditing(null);
        setName('');
        setPermissionsInput('');
      }
      fetchRoles();
    } catch (err) {
      console.error('delete role error', err);
      toast.error('Failed to delete role');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div className="p-6">Unauthorized</div>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Role Editor</h2>
      <form onSubmit={editing ? (e) => { e.preventDefault(); saveEdit(); } : createRole} className="mb-6 space-y-3 max-w-2xl">
        <div className="flex gap-2">
          <input className="input flex-1" value={name} onChange={(e) => setName(e.target.value)} placeholder="Role name (e.g., EDITOR)" />
          {editing ? (
            <>
              <Button variant="primary" disabled={loading}>{loading ? 'Saving…' : 'Save'}</Button>
              <Button type="button" variant="outline" onClick={() => { setEditing(null); setName(''); setPermissionsInput(''); }}>Cancel</Button>
            </>
          ) : (
            <Button variant="primary" disabled={loading}>{loading ? 'Creating…' : 'Create'}</Button>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Permissions (comma-separated)</label>
          <input className="input w-full" value={permissionsInput} onChange={(e) => setPermissionsInput(e.target.value)} placeholder="news:create, news:edit, audit:review" />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gov-gray-600">Preset:</label>
          <select className="input" onChange={(e) => {
            const preset = presets.find(p => p.label === e.target.value);
            if (preset) setPermissionsInput(preset.perms.join(', '));
          }} defaultValue="">
            <option value="">None</option>
            {presets.map(p => (
              <option key={p.label} value={p.label}>{p.label}</option>
            ))}
          </select>
        </div>
      </form>

      <div>
        <h3 className="font-medium mb-2">Existing Roles</h3>
        {listLoading ? (
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-10 bg-gov-gray-100 animate-pulse rounded" />
            ))}
          </div>
        ) : Array.isArray(roles) && roles.length > 0 ? (
          <ul className="divide-y">
            {roles.map((r) => (
              <li key={r.id} className="py-3 flex items-start justify-between gap-4">
                <div>
                  <div className="font-medium">{r.name} {typeof r.usageCount === 'number' && (
                    <span className="ml-2 text-xs text-gov-gray-500">({r.usageCount} users)</span>
                  )}</div>
                  {Array.isArray(r.permissions) && r.permissions.length > 0 ? (
                    <div className="mt-1 flex flex-wrap gap-2">
                      {r.permissions.map((p) => (
                        <span key={p} className="px-2 py-0.5 text-xs bg-gov-gray-100 rounded">{p}</span>
                      ))}
                    </div>
                  ) : (
                    <div className="text-xs text-gov-gray-500">No permissions listed</div>
                  )}
                </div>
                <div className="shrink-0 flex items-center gap-2">
                  <Button variant="secondary" onClick={() => startEdit(r)}>Edit</Button>
                  <Button variant="outline" onClick={() => deleteRole(r)}>Delete</Button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-sm text-gov-gray-500">No roles found</div>
        )}
      </div>
    </div>
  );
};

export default RoleEditor;
