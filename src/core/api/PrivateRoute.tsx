import * as React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { selectAuth } from '../../store/AuthSlice';


// Interface para as propriedades do PrivateRoute
interface PrivateRouteProps  {
  element: React.ReactNode;  // Componente que será renderizado se autenticado
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
    const location = useLocation();
    const auth = useSelector(selectAuth);
  
    // Pega o token diretamente do cookie
    const token = Cookies.get('token');
  
    const isLoggedIn = auth.isAuthenticated && !!token;
  
    return isLoggedIn ? (
      <>{element}</> // Renderiza o componente protegido
    ) : (
      <Navigate to="/" state={{ from: location }} replace /> // Redireciona para o login
    );
  };
  

export default PrivateRoute;