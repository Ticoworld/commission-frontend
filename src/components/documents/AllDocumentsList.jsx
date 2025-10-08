import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';

const AllDocumentsList = () => {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDocs = async () => {
    try {
      setLoading(true);
      const res = await api.get('/uploads/all');
      setDocs(res.data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch documents');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  return (
    <div className="mt-10">
      <h2 className="text-lg font-medium mb-2">All Uploaded Documents</h2>
      {loading ? (
        <p>Loading...</p>
      ) : docs.length === 0 ? (
        <p>No documents uploaded yet.</p>
      ) : (
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Filename</th>
              <th className="p-2 text-left">LGA</th>
              <th className="p-2 text-left">Uploaded At</th>
              <th className="p-2 text-left">View</th>
            </tr>
          </thead>
          <tbody>
            {docs.map(doc => (
              <tr key={doc.id} className="border-t">
                <td className="p-2">{doc.filename}</td>
                <td className="p-2">{doc.lga?.name || 'N/A'}</td>
                <td className="p-2">{new Date(doc.createdAt).toLocaleString()}</td>
                <td className="p-2">
                  <a
                    href={`${import.meta.env.VITE_API_BASE_URL}/uploads/${doc.filename}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllDocumentsList;
