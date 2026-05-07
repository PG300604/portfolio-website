import axios from 'axios';

export async function writeGitHubData(filename, newData) {
  const token = import.meta.env.VITE_GH_TOKEN;
  const owner = import.meta.env.VITE_GH_OWNER;
  const repo = import.meta.env.VITE_GH_REPO;
  
  if (!token || !owner || !repo) {
    throw new Error('GitHub configuration missing in .env');
  }

  const url = `https://api.github.com/repos/${owner}/${repo}/contents/data/${filename}`;
  
  try {
    let currentSha = undefined;

    try {
      // Step 1: Get current SHA
      const getRes = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` }
      });
      currentSha = getRes.data.sha;
    } catch (err) {
      if (err.response && err.response.status === 404) {
        // File does not exist, that's fine, we create it without sha
      } else {
        throw err;
      }
    }

    // Step 2: PUT updated content
    const payload = {
      message: `update: ${filename}`,
      content: btoa(unescape(encodeURIComponent(JSON.stringify(newData, null, 2))))
    };
    
    if (currentSha) {
      payload.sha = currentSha;
    }

    await axios.put(url, payload, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    return true;
  } catch (error) {
    console.error(`Error writing to ${filename}:`, error);
    throw error;
  }
}
