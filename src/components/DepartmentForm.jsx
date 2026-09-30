import React, { useState } from 'react';

export default function DepartmentForm({ onCadastrar }) {
  const [name, setName] = useState('');
  const [acronym, setAcronym] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    const nomeLimpo = name.trim();
    const siglaLimpa = acronym.trim().toUpperCase();

    if (nomeLimpo.length < 3) {
      setError('O nome do departamento deve ter no mínimo 3 letras.');
      return;
    }
    if (siglaLimpa.length < 2 || siglaLimpa.length > 5) {
      setError('A sigla deve conter entre 2 e 5 letras (Ex: RH, TI, MKT).');
      return;
    }

    setSubmitting(true);

    const newDepartment = {
      name: nomeLimpo,
      acronym: siglaLimpa
    };

    try {
      const res = await fetch('http://localhost:3000/departments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newDepartment)
      });

      if (!res.ok) {
        throw new Error('Falha ao salvar no servidor.');
      }

      const savedDepartment = await res.json();

      onCadastrar(savedDepartment);
      setName('');
      setAcronym('');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="card-box">
      <h2>Cadastrar Novo Departamento</h2>

      {error && <div className="alert-error">{error}</div>}

      <form onSubmit={handleSubmit} className="form-grid">
        <div className="form-group">
          <label htmlFor="name">Nome do Departamento *</label>
          <input 
            id="name"
            type="text"
            placeholder="Ex: Recursos Humanos"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={submitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="acronym">Sigla *</label>
          <input 
            id="acronym"
            type="text"
            placeholder="Ex: RH"
            value={acronym}
            onChange={(e) => setAcronym(e.target.value)}
            disabled={submitting}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-submit" disabled={submitting}>
            {submitting ? 'Enviando...' : '+ Cadastrar Departamento'}
          </button>
        </div>
      </form>
    </div>
  );
}