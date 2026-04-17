import React, { useState } from "react";
import { API_BASE } from "../api";

const ResumeAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const uploadResume = async () => {
    if (!file) return;
    setIsLoading(true);
    setResult("");

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await fetch(`${API_BASE}/analyze-resume`, {
        method: "POST",
        body: formData
      });

      const data = await res.json();
      setResult(data.result);

    } catch (error) {
      console.error("Error:", error);
      setResult("An error occurred during analysis.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="resume-analyzer window-container" style={{ padding: '40px', background: 'rgba(0,0,0,0.4)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>AI Resume Analyzer & Career Matcher</h2>
      <p style={{ marginBottom: '20px', color: 'rgba(255,255,255,0.7)' }}>Upload your resume (PDF) to extract key skills, get top 3 career matches, missing skills, and actionable next steps.</p>
      
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '24px' }}>
        <input 
          type="file" 
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])} 
          style={{ padding: '8px' }}
        />
        <button 
          onClick={uploadResume} 
          disabled={!file || isLoading}
          className="glow-button"
          style={{ padding: '10px 24px', cursor: (!file || isLoading) ? 'not-allowed' : 'pointer' }}
        >
          {isLoading ? "Analyzing..." : "Analyze Resume"}
        </button>
      </div>

      {result && (
        <div style={{ marginTop: '30px', padding: '24px', background: 'rgba(0,0,0,0.6)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
          <h3>Analysis Result</h3>
          <div style={{ marginTop: '16px', color: 'rgba(255,255,255,0.9)' }}>
            {result}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeAnalyzer;
