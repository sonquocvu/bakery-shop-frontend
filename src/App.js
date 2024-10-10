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
import Contact from './pages/Contact';
import RegisterAdmin from './pages/RegisterAdmin';
import AddProduct from './pages/AddProduct';
import DeleteProduct from './pages/DeleteProduct';
import UpdateProduct from './pages/UpdateProduct';
import AddCategory from './pages/AddCategory';
import MyCart from './pages/MyCart';
import Profile from './pages/Profile';

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
        {path: PathConstants.CONTACT, element: <Contact />},
        {path: PathConstants.ADD_PRODUCT, element: <AddProduct />},
        {path: PathConstants.DELETE_PRODUCT, element: <DeleteProduct />},
        {path: PathConstants.UPDATE_PRODUCT, element: <UpdateProduct />},
        {path: PathConstants.ADD_CATEGORY, element: <AddCategory />},
        {path: PathConstants.PROFILE, element: <Profile />},
        {path: PathConstants.CART, element: <MyCart />},
        {path: PathConstants.REGISTER_ADMIN, element: <RegisterAdmin />},
      ]
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
