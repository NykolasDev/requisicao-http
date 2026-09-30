import React from 'react';

export default function DepartmentList({ departments, loading }) {
  if (loading) {
    return (
      <div className="card-box text-center">
        <p className="loading-text">Carregando lista de departamentos...</p>
      </div>
    );
  }

  if (departments.length === 0) {
    return (
      <div className="card-box text-center">
        <p className="empty-text">Nenhum departamento cadastrado até o momento.</p>
      </div>
    );
  }

  return (
    <div className="card-box">
      <div className="card-title-group">
        <h2>Departamentos Ativos</h2>
        <span className="badge-count">{departments.length} cadastrados</span>
      </div>

      <table className="custom-table">
        <thead>
          <tr>
            <th style={{ width: '80px' }}>ID</th>
            <th>Nome do Departamento</th>
            <th style={{ width: '120px', textAlign: 'center' }}>Sigla</th>
          </tr>
        </thead>
        <tbody>
          {/* O map agora envolve as linhas (tr) dentro do corpo da tabela */}
          {departments.map((dept) => (
            <tr key={dept.id}>
              <td className="id-cell">#{dept.id}</td>
              <td><strong>{dept.name}</strong></td>
              <td style={{ textAlign: 'center' }}>
                <span className="badge-sigla">{dept.acronym}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}