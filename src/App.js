import React from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import PathConstants from './routes/PathConstants';
import MainLayout from './components/MainLayout';
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import Login from './pages/Login';
import SinglePage from './pages/SinglePage';
import Shop from './pages/Shop';
import Category from './pages/Category';

function App() {

  const router = createBrowserRouter([
    {
      path: PathConstants.HOME,
      element: <MainLayout />,
      children: [
        {path: PathConstants.HOME, element: <HomePage />},
        {path: PathConstants.REGISTER, element: <Register /> },
        {path: PathConstants.LOGIN, element: <Login /> },
        {path: PathConstants.SINGLEPAGE, element: <SinglePage />},
        {path: PathConstants.SHOP, element: <Shop />},
        {path: PathConstants.CATEGORY, element: <Category />},
      ]
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
