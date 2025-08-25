import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import type { AppDispatch } from '../../store/store';
import { setLogin, type UserAuth } from '../../store/AuthSlice';
import { UserService } from '../service/user.service';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { getErrorReasonByApiError } from '../../core/api/ApiError';
import { useToast } from '../../core/context/alertContext';


const Login: React.FC = () => {

    const [error, setError] = useState<string | null>(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const {showToast} = useToast();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {

        try {
            const response = await UserService.login({ userName: username, password: password });

            const { token, id, name } = response;

            Cookies.set('token', token, { expires: 1, sameSite: 'strict' });

            dispatch(setLogin({ user: { id, name } }));

            navigate('/painel');
        } catch (error) {
            if (error instanceof AxiosError) {
                const message = getErrorReasonByApiError(error);
                setError(message)
                showToast({type:"error", message: message})
            }
            throw error;
        }

    };

    return (
        <div className="max-w-sm mx-auto p-4">
            <h2 className="text-xl font-bold mb-4">Login</h2>

            {error && <p className="text-red-500 mb-2">{error}</p>}

            <input
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Usuário"
                className="w-full mb-2 p-2 border rounded"
            />
            <input
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
                placeholder="Senha"
                className="w-full mb-4 p-2 border rounded"
            />

            <button
                onClick={handleLogin}
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
                Entrar
            </button>
            <p className="text-sm text-center">
                Não tem conta?{' '}
                <span
                className="text-blue-500 cursor-pointer underline"
                onClick={() => navigate('/register')}
                >
                Cadastre-se
                </span>
            </p>
        </div>
    );
}

export default Login;
