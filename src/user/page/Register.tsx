import React, { useState } from 'react';
import { UserService } from '../service/user.service';
import { useToast } from '../../core/context/alertContext';
import { AxiosError } from 'axios';
import { getErrorReasonByApiError } from '../../core/api/ApiError';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await UserService.register({ name, login: username, password });
      showToast({ type: 'success', message: 'Cadastro realizado com sucesso!' });
      navigate('/');
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = getErrorReasonByApiError(error);
        showToast({ type: 'error', message });
      }
    }
  };

  return (
    <div className="max-w-sm mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Cadastro</h2>

      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Nome"
        className="w-full mb-2 p-2 border rounded"
      />
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
        onClick={handleRegister}
        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
      >
        Cadastrar
      </button>
    </div>
  );
};

export default Register;
