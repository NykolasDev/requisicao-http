import { useState, useEffect } from 'react';

export default function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // AbortController permite cancelar o fetch se o componente for desmontado
    const controller = new AbortController(); 

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(url, { signal: controller.signal });
        
        if (!res.ok) {
          throw new Error('Erro ao carregar dados do servidor');
        }
        
        const result = await res.json();
        setData(result);
      } catch (err) {
        // Ignora o erro se ele foi causado pelo cancelamento da requisição
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Função de limpeza (cleanup) executada quando o componente é desmontado
    return () => controller.abort(); 
  }, [url]);

  return { data, setData, loading, error };
}