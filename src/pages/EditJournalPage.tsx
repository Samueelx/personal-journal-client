import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';
import { JournalEntry } from '../types/JournalEntry';

const EditJournalPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [entry, setEntry] = useState<JournalEntry | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    // Fetch the journal entry data
    axiosInstance.get(`/journals/${id}`)
      .then(response => {
        const entry = response.data;
        setEntry(entry);
        setTitle(entry.title);
        setContent(entry.content);
        setCategory(entry.category);
        setDate(entry.date);
      })
      .catch(error => {
        console.error("There was an error fetching the journal entry!", error);
      });
  }, [id]);

  const handleUpdate = () => {
    axiosInstance.put(`/api/journal/${id}`, { title, content, category, date })
      .then(response => {
        console.log(response);
        navigate('/dashboard');
      })
      .catch(error => {
        console.error("There was an error updating the journal entry!", error);
      });
  };

  if (!entry) return <div>Loading...</div>;

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Journal Entry</h1>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleUpdate}
          className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default EditJournalPage;
