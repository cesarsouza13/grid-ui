import { useState, type JSX } from 'react'

import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PrivateRoute from './core/api/PrivateRoute'
import Login from './user/page/Login';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ToastProvider } from './core/context/AlertContext';
import Register from './user/page/Register';
import Panel from './panel/page/Panel';
import NotFound from './core/api/ApiNotFound.page';

function App() {


  const validRoutes = ["/painel"];

  const getComponentForPath = (path: string) => {

    const routeComponents: { [key: string]: JSX.Element } = {
      "/painel": <Panel />,
    };
    console.log(routeComponents[path])
    return routeComponents[path] || <NotFound />;
  }
  return (
    <>
      <Provider store={store}>
        <ToastProvider>
          <BrowserRouter>
            <div className='flex w-full h-full '>
              <Routes>
                <Route index element={<Login />} /> 
                <Route path="/register" element={<Register />} />
                {validRoutes.map((path) => (
                  <Route key={path} path={path} element={<PrivateRoute element={getComponentForPath(path)} />} />
                ))}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </BrowserRouter>
        </ToastProvider>
      </Provider>
    </>
  )
}

export default App
