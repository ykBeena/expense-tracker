import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Auth from './pages/Auth/Auth';
import ExpenseTracker from './pages/ExpenseTracker/ExpenseTracker';
import { ThemeContextProvider } from './context/ThemeContext';

const router = createBrowserRouter([
  {
    path : "/",
    element : <Auth />
  }, 
  {
    path : "/expense-tracker",
    element : <ExpenseTracker />
  }
])



ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeContextProvider>
    <RouterProvider router={router} />
  </ThemeContextProvider>
)
