import { useCallback, useState } from 'react';

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async (url, method = 'GET', body = null, headers = {}, credentials = 'include') => {
      setLoading(true);
      try {
        if (body) {
          body = JSON.stringify(body);
          headers['Content-Type'] = 'application/json';
        }
        const response = await fetch(url, { method, body, headers, credentials });
        const { status, ok } = response;
        let data;

        if(ok){
          data = await response.json();
        }
        else {
          data = await response.text()
        };
        
        setLoading(false);
        return { data, status, ok };
      } catch (error) {
        console.error(error)
        setLoading(false);
        setError(error.message);
        return { error };
      }
    },
    [],
  );

  return { loading, request, error };
};
