import { useState, useEffect } from 'react';

export function useGitHubData(filename) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const owner = import.meta.env.VITE_GH_OWNER;
    const repo = import.meta.env.VITE_GH_REPO;
    const branch = import.meta.env.VITE_GH_BRANCH || 'main';

    if (!owner || !repo) {
      setError(new Error('GitHub owner or repo not configured in .env'));
      setLoading(false);
      return;
    }

    setLoading(true);
    const timestamp = new Date().getTime();
    fetch(`https://raw.githubusercontent.com/${owner}/${repo}/${branch}/data/${filename}?t=${timestamp}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch ${filename}: ${res.statusText}`);
        }
        return res.json();
      })
      .then((jsonData) => {
        setData(jsonData);
        setLoading(false);
      })
      .catch((err) => {
        console.error('useGitHubData Error:', err);
        setError(err);
        setLoading(false);
      });
  }, [filename]);

  return { data, loading, error };
}
