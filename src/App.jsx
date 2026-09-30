import React from 'react';
import useFetch from './hooks/useFetch';
import DepartmentForm from './components/DepartmentForm';
import DepartmentList from './components/DepartmentList';
import './App.css';

export default function App() {
  // Carrega a lista inicial (GET) via Custom Hook
  const { data: departments, setData: setDepartments, loading, error } = useFetch(
    'http://localhost:3000/departments'
  );

  // Adiciona o novo departamento de forma imutável sem recarregar a página
  function handleNovoDepartamento(novoDept) {
    setDepartments((prev) => [...prev, novoDept]);
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Gestão de Departamentos (RH)</h1>
        <p>Integração com JSON Server, useEffect e Fetch API</p>
      </header>

      <main className="main-content">
        {/* Passa a função de callback para o formulário atualizar a lista ao salvar */}
        <DepartmentForm onCadastrar={handleNovoDepartamento} />

        {/* Renderização condicional: Mostra o erro se houver, senão mostra a lista */}
        {error ? (
          <div className="card-box alert-error text-center">
            Erro de conexão com o servidor: {error}
          </div>
        ) : (
          <DepartmentList departments={departments} loading={loading} />
        )}
      </main>
    </div>
  );
}