import React, { useState, useEffect } from "react";
import AICoach from "../components/AICoach";
import { API_BASE } from "../api";



const CodeIcon = () => (<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>);
const BrainIcon = () => (<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-1.04-4.88 2.5 2.5 0 0 1 .5-4.92 2.5 2.5 0 0 1 2.5-4.5 2.5 2.5 0 0 1 .5-.64z"></path><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 1.04-4.88 2.5 2.5 0 0 0-.5-4.92 2.5 2.5 0 0 0-2.5-4.5 2.5 2.5 0 0 0-.5-.64z"></path></svg>);
const ChartIcon = () => (<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>);
const DesignIcon = () => (<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>);

const topicResources = {
  "AI Engineer": {
    "Mathematics for AI": {
      pdf: "https://mml-book.github.io/book/mml-book.pdf",
      youtube: "https://www.youtube.com/watch?v=fNk_zzaMoSs"
    },
    "Python for Machine Learning": {
      pdf: "https://www.deeplearningbook.org/",
      youtube: "https://www.youtube.com/watch?v=7Eh8pZ9Q8A"
    },
    "Neural Networks & Deep Learning": {
      youtube: "https://www.youtube.com/watch?v=aircAruvnKk"
    },
    "Computer Vision": {
      youtube: "https://www.youtube.com/watch?v=G2R2T694NRA"
    }
  },
  "Full Stack Developer": {
    "Advanced React & State": {
      pdf: "https://react.dev/",
      youtube: "https://www.youtube.com/watch?v=4UZrsTqkcW4"
    },
    "Node.js System Design": {
      youtube: "https://www.youtube.com/watch?v=i53Gi_K397I"
    }
  },
  "UX Designer": {
    "User Research Theory": {
       pdf: "/pdfs/user-research-theory.pdf"
    },
    "Information Architecture": {
       youtube: "https://www.youtube.com/watch?v=i8-yIn3E3W0"
    }
  },
  "Defence Officer": {
    "Leadership Skills": {
      youtube: "https://www.youtube.com/watch?v=FwqNEyiaYbw",
      pdf: "/pdfs/leadership-skills.pdf"
    },
    "General Knowledge": {
      youtube: "https://www.youtube.com/watch?v=1bMACbNAI",
      pdf: "/pdfs/general-knowledge.pdf"
    }
  },
  "Data Scientist": {}
};

const CAREER_SUGGESTIONS = [
  { title: "Full Stack Developer", Icon: CodeIcon, desc: "Architecting global digital infrastructures." },
  { title: "AI Engineer", Icon: BrainIcon, desc: "Autonomous intelligence modeling for the frontier." },
  { title: "Data Scientist", Icon: ChartIcon, desc: "Synthesizing insights from global data flows." },
  { title: "UX Designer", Icon: DesignIcon, desc: "Modern narratives for intuitive digital products." },
];

const CareerExplorer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [careerData, setCareerData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("Youtube");
  const [allCareers, setAllCareers] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const resp = await fetch(`${API_BASE}/careers`);
        const data = await resp.json();
        if (resp.ok) setAllCareers(data);
      } catch (err) { console.error("Identity collection failure:", err); }
    };
    fetchAll();
  }, []);

  const handleTopicClick = (career, topic, type) => {
    console.log("CLICK WORKING:", career, topic, type);

    const resource = topicResources[career]?.[topic];

    if (!resource) return;

    if (type === "youtube") {
      window.open(resource.youtube, "_blank");
    }

    if (type === "pdf") {
      window.open(resource.pdf, "_blank");
    }
  };

  const fetchPathwayData = async (title) => {
    setLoading(true); setError(""); setCareerData(null); setSelectedTopic(null);
    window.scrollTo({ top: 460, behavior: "smooth" });
    try {
      const resp = await fetch(`${API_BASE}/career/${encodeURIComponent(title)}`);

      const data = await resp.json();
      
      if (resp.ok) {
        setCareerData(data);
      } else {
        setError(data.error || "SkillExa Database: Entry not found.");
      }
    } catch (err) { 
      setError("SkillExa Protocol Offline - Check backend connection."); 
    }
    finally { setLoading(false); }

  };

  return (
    <div className="reveal-entry">
       <header className="hero-box" style={{ padding: '160px 0 60px' }}>
          <span className="roadmap-label">KNOWLEDGE ARCHITECTURE Selection</span>
          <h1 className="hero-title">Career Explorer</h1>
          <div className="search-palette" style={{ marginTop: '40px' }}>
             <input
                type="text" className="palette-input"
                placeholder="Search paths (e.g., Full Stack Developer)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && fetchPathwayData(searchTerm)}
             />
             <button className="cta-glow" style={{ padding: '0 40px', borderRadius: '14px' }} onClick={() => fetchPathwayData(searchTerm)}>EXPLORE</button>
          </div>
          <div style={{ marginTop: '24px', display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
             {allCareers.map((c) => (
               <span key={c._id} 
                     onClick={() => { setSearchTerm(c.title); fetchPathwayData(c.title); }}
                     className="roadmap-label" 
                     style={{ cursor: 'pointer', background: 'rgba(255,255,255,0.03)', padding: '6px 16px', borderRadius: '100px', margin: 0, border: '1px solid rgba(255,255,255,0.05)' }}>
                 {c.title}
               </span>
             ))}
          </div>
       </header>

       <section className="card-section">
          {CAREER_SUGGESTIONS.map((cur) => (
            <div key={cur.title} className="glass-premium" onClick={() => fetchPathwayData(cur.title)}>
              <div className="g-icon"><cur.Icon /></div>
              <h3 className="g-title">{cur.title}</h3>
              <p className="g-desc">{cur.desc}</p>
            </div>
          ))}
       </section>

       <div style={{ padding: '0 64px', margin: '0 auto', maxWidth: '1200px' }}>
          {loading && <div className="loader-box" style={{ padding: '100px 0' }}><div className="lux-spinner" style={{ margin: '0 auto' }}></div></div>}
          {error && <div className="error-box" style={{ textAlign: 'center' }}>{error}</div>}

          {careerData && !loading && (
            <section className="roadmap-container reveal-entry" style={{ width: '100%' }}>
              <header className="roadmap-header"><h2 className="roadmap-title">{careerData.title}</h2></header>
              <div className="timeline-flow" style={{ marginBottom: '80px' }}>
                {careerData.skills?.map((skill, index) => (
                  <div key={index} className="timeline-step">
                    <div className="step-indicator"></div>
                    <div className="step-card-premium" 
                         onClick={() => setSelectedTopic(selectedTopic?.skill === skill ? null : { career: careerData.title, skill })}
                         style={{ cursor: 'pointer', position: 'relative' }}>
                      <h4 className="g-title" style={{ margin: 0 }}>{skill}</h4>
                      <p className="g-desc" style={{ marginTop: '8px' }}>Optimized module for Phase {index + 1}.</p>
                      
                      {selectedTopic?.skill === skill && (
                        <div style={{ marginTop: '16px', display: 'flex', gap: '8px', padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                           <button type="button" onClick={(e) => { e.stopPropagation(); handleTopicClick(careerData.title, skill, 'youtube'); }} style={{ position: 'relative', zIndex: 10, pointerEvents: 'auto', background: 'none', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem', cursor: 'pointer', flex: 1, whiteSpace: 'nowrap' }}>▶ Watch on YouTube</button>
                           <button type="button" onClick={(e) => { e.stopPropagation(); handleTopicClick(careerData.title, skill, 'pdf'); }} style={{ position: 'relative', zIndex: 10, pointerEvents: 'auto', background: 'none', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem', cursor: 'pointer', flex: 1, whiteSpace: 'nowrap' }}>📄 Open Notes (PDF)</button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="resources-hub" style={{ marginBottom: '100px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                   <h3 className="g-title" style={{ margin: 0 }}>Pathway Resources</h3>
                   <div style={{ display: 'flex', gap: '20px', fontSize: '0.8rem', fontWeight: 700 }}>
                      <span onClick={() => setActiveTab("Youtube")} style={{ color: activeTab === "Youtube" ? '#fff' : '#555', cursor: 'pointer', borderBottom: activeTab === "Youtube" ? '2px solid #fff' : 'none' }}>YouTube Intelligence</span>
                      <span onClick={() => setActiveTab("Books")} style={{ color: activeTab === "Books" ? '#fff' : '#555', cursor: 'pointer', borderBottom: activeTab === "Books" ? '2px solid #fff' : 'none' }}>Technical Logic</span>
                   </div>
                </div>
                <div className="scroller">
                   {careerData.resources?.map((res, i) => (
                      <React.Fragment key={i}>
                         {(activeTab === "Youtube" ? res.youtube : res.pdfs)?.map((url, idx) => (
                            <div key={`${i}-${idx}`} className="resource-card-snappy reveal-entry" style={{ minWidth: '340px' }}>
                               <span className="r-tag">{res.subject}</span>
                               <h4 className="r-heading">{activeTab === "Youtube" ? "Expert Analysis" : "Specification"}</h4>
                               <a href={url} target="_blank" rel="noopener noreferrer" className="r-button">ACCESS →</a>
                            </div>
                         ))}
                      </React.Fragment>
                   ))}
                </div>
              </div>
            </section>
          )}
        <section style={{ padding: '0 64px 100px', maxWidth: '1200px', margin: '0 auto' }}>
           <AICoach />
        </section>
      </div>
    </div>
  );
};

export default CareerExplorer;
