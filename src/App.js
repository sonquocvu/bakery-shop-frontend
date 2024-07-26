import React from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import PathConstants from './routes/PathConstants';
import MainLayout from './components/MainLayout';
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {

  const router = createBrowserRouter([
    {
      path: PathConstants.HOME,
      element: <MainLayout />,
      children: [
        {path: PathConstants.HOME, element: <HomePage />},
        {path: PathConstants.REGISTER, element: <Register /> },
        {path: PathConstants.LOGIN, element: <Login /> },
      ]
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
