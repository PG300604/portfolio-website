import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useGitHubData } from '../hooks/useGitHubData';
import { writeGitHubData } from '../hooks/useGitHubWrite';

export default function ResumeAdmin() {
  const { data: about, loading } = useGitHubData('about.json');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (file.type !== 'application/pdf') {
      setError('Please upload a valid PDF file.');
      return;
    }

    setSaving(true);
    setError(null);
    setSuccess(false);

    const token = import.meta.env.VITE_GH_TOKEN;
    const owner = import.meta.env.VITE_GH_OWNER;
    const repo = import.meta.env.VITE_GH_REPO;
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/assets/resume.pdf`;

    try {
      // 1. Get current SHA if the file exists
      let currentSha = null;
      try {
        const getRes = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
        currentSha = getRes.data.sha;
      } catch (err) {
        // File might not exist yet, which is fine
        if (err.response && err.response.status !== 404) {
          throw err;
        }
      }

      // 2. Read file as base64
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const base64 = reader.result.split(',')[1];
          
          await axios.put(url, {
            message: 'update: resume.pdf',
            content: base64,
            sha: currentSha
          }, { headers: { Authorization: `Bearer ${token}` } });

          // 3. Update about.json with the raw URL just to be sure
          if (about) {
            const resumeUrl = `https://raw.githubusercontent.com/${owner}/${repo}/main/assets/resume.pdf`;
            if (about.resumeUrl !== resumeUrl) {
              await writeGitHubData('about.json', { ...about, resumeUrl });
            }
          }

          setSuccess(true);
          setSaving(false);
        } catch (err) {
          console.error(err);
          setError(err.message);
          setSaving(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error(err);
      setError(err.message);
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-[#f0f6ff] bg-[#060a14] min-h-screen">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#060a14] p-8 text-[#f0f6ff]">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-b-2 border-[#1e2d4a] pb-6">
          <div>
            <div className="font-mono text-[11px] text-[#4fcea6] uppercase tracking-widest mb-2">
              <Link to="/admin/dashboard" className="text-[#8fa3c0] hover:text-[#388bfd]">Dashboard</Link> / RESUME
            </div>
            <h1 className="text-3xl font-sora font-bold">Manage Resume</h1>
          </div>
        </div>

        {error && <div className="bg-[#2a0f0f] border-2 border-[#e55353] p-4 mb-6 text-[#e55353] font-mono text-sm">{error}</div>}
        {success && <div className="bg-[#0d2a22] border-2 border-[#4fcea6] p-4 mb-6 text-[#4fcea6] font-mono text-sm">Resume uploaded successfully!</div>}

        <div className="bg-[#0d1525] border-2 border-[#1A56DB] p-6 border-t-[4px] border-t-[#1A56DB]">
          <h3 className="font-sora font-bold text-xl mb-4">Upload New PDF</h3>
          <p className="text-[#8fa3c0] font-mono text-sm mb-6">
            Upload your latest resume PDF here. This will directly replace `assets/resume.pdf` in your GitHub repository and update the download link across the site.
          </p>

          <div className="border-2 border-dashed border-[#1e2d4a] p-12 text-center relative hover:border-[#388bfd] transition-colors">
            {saving ? (
              <div className="text-[#4fcea6] font-mono text-sm uppercase tracking-widest animate-pulse">Uploading to GitHub...</div>
            ) : (
              <>
                <div className="text-[#1A56DB] font-mono mb-2 uppercase tracking-widest">Select PDF File</div>
                <div className="text-[#8fa3c0] text-sm">Must be a .pdf document</div>
                <input 
                  type="file" 
                  accept=".pdf" 
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  disabled={saving}
                />
              </>
            )}
          </div>

          {about?.resumeUrl && (
            <div className="mt-8 pt-6 border-t border-[#1e2d4a]">
              <h4 className="font-mono text-[11px] text-[#8fa3c0] uppercase tracking-widest mb-2">Current Resume</h4>
              <a href={about.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-[#388bfd] hover:text-[#4fcea6] font-mono text-sm break-all">
                {about.resumeUrl}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
