import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100 px-6 w-full">
      <h1 className="text-4xl font-bold text-gray-900">404 - Página não encontrada</h1>
      <p className="text-gray-600 mt-2 mb-6">
        Oops! Parece que essa página não existe ou foi movida.
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-blue-600 text-white font-medium text-lg rounded-lg shadow-md hover:bg-blue-700 transition-all"
      >
        Voltar para o Login
      </button>
    </div>
  );
};

export default NotFound;
