import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx';
import Login from './pages/Login.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Signup from './pages/Signup.tsx';
import AddEntry from './pages/AddEntry.tsx';
import EditJournalPage from './pages/EditJournalPage.tsx';
import Categories from './pages/Categories.tsx';
import { CategoryProvider } from './context/CategoryContext.tsx';
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/add-entry",
    element: <AddEntry />
  },
  {
    path: '/edit-entry/:id',
    element: <EditJournalPage />
  },
  {
    path: '/categories',
    element: <Categories />
  }
])


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CategoryProvider>
    <RouterProvider router={router}/>
    </CategoryProvider>
  </React.StrictMode>,
)
