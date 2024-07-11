import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { JournalEntry } from '../types/ErrorResponse';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axiosInstance.get('/journals');
        console.log("Response", response.data);
        setEntries(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch journal entries');
        setLoading(false);
      }
    };
    
    fetchEntries();
  }, []);

  const handleAddEntry = () => {
    navigate('/categories');
  };

  const handleEditEntry = (id: number) => {
    navigate(`/edit-entry/${id}`);
  };

  const handleDeleteEntry = async (id: number) => {
    try {
      await axiosInstance.delete(`/journals/${id}`);
      setEntries(entries.filter(entry => entry.id !== id));
    } catch (error) {
      setError('Failed to delete journal entry');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-8 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        {loading && <p>Loading...</p>}
        {error && <p className="mb-4 text-red-500">{error}</p>}
        {!loading && !error && (
          <>
            <button
              onClick={handleAddEntry}
              className="mb-4 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none"
            >
              Add New Entry
            </button>
            <div className="space-y-4">
              {entries.map(entry => (
                <div key={entry.id} className="p-4 border rounded-md shadow-sm bg-gray-50">
                  <h3 className="text-xl font-bold">{entry.title}</h3>
                  <p className="text-gray-700">{entry.content}</p>
                  <p className="text-gray-500">{entry.category}</p>
                  <p className="text-gray-500">{new Date(entry.date).toLocaleDateString()}</p>
                  <div className="mt-2 space-x-2">
                    <button
                      onClick={() => handleEditEntry(entry.id)}
                      className="py-1 px-3 bg-yellow-500 text-white rounded-md hover:bg-yellow-700 focus:outline-none"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteEntry(entry.id)}
                      className="py-1 px-3 bg-red-500 text-white rounded-md hover:bg-red-700 focus:outline-none"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
