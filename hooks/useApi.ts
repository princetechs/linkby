import { useState, useCallback, useEffect } from 'react';

interface UseApiOptions {
  method: 'GET' | 'POST';
  path: string;
  params?: any;
}

interface ApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  execute: () => void;
}

export default function useApi<T>(options: UseApiOptions): ApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(() => {
    setLoading(true);
    setError(null);
    fetch(`http://localhost:3000/api/${options.path}`, {
      method: options.method,
      headers: { 'Content-Type': 'application/json' },
      body: options.method === 'POST' ? JSON.stringify(options.params) : null,
    }).then(response => response.json().then(data => ({ ok: response.ok, data })))
      .then(({ ok, data }) => {
        if (!ok) {
          throw new Error(data.message || 'Something went wrong');
        }
        setData(data);
      }).catch(e => {
        setError(e.message);
      }).finally(() => {
        setLoading(false);
      });
  }, [options]);

  return { data, loading, error, execute };
}
