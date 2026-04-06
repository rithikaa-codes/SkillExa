import React, { useState, useEffect } from "react";
import careerBooks from "./careerBooks";
import { API_BASE } from "../api";

const Resources = () => {
  const [activeTab, setActiveTab] = useState("Youtube");
  const [notes, setNotes] = useState("");
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState("Full Stack Developer");
  const [savedNotes, setSavedNotes] = useState([]);
  const editorRef = React.useRef(null);

  useEffect(() => {
    const savedNotes = localStorage.getItem("skill_exa_notes") || "";
    setNotes(savedNotes);
    if (editorRef.current && editorRef.current.innerHTML !== savedNotes) {
      editorRef.current.innerHTML = savedNotes;
    }
  }, []);

  const updateLocalNotes = (v) => {
    setNotes(v);
    localStorage.setItem("skill_exa_notes", v);
  };

  const applyHighlight = (color) => {
    const selection = window.getSelection();

    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);

    if (range.collapsed) return;

    const span = document.createElement("span");

    span.style.backgroundColor = color;
    span.style.padding = "2px 4px";
    span.style.borderRadius = "4px";
    span.style.display = "inline";

    const fragment = range.extractContents();

    span.appendChild(fragment);
    range.insertNode(span);

    selection.removeAllRanges();

    if (editorRef.current) {
        updateLocalNotes(editorRef.current.innerHTML);
    }
  };

  const removeHighlight = () => {
    document.execCommand("removeFormat");
    if (editorRef.current) {
        updateLocalNotes(editorRef.current.innerHTML);
    }
  };

  const saveNotes = async () => {
    const content = document.getElementById("notes-editor").innerHTML;
  
    try {
      await fetch(`${API_BASE}/save-notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ content })
      });
  
      console.log("Notes saved");
      alert("Notes saved successfully!");
    } catch (error) {
      console.error("Save failed", error);
    }
  };

  const fetchNotes = async () => {
    try {
      const res = await fetch(`${API_BASE}/get-notes`);
      const data = await res.json();
      setSavedNotes(data);
    } catch (err) {
      console.error("Error fetching notes", err);
    }
  };

  const samplePDFs = [
    { title: "Distributed System Specification v.1.0", url: "#", size: "4.2 MB" },
    { title: "Global Intelligence Report: AI Frontiers", url: "#", size: "8.9 MB" }
  ];

  return (
    <div className="reveal-entry" style={{ padding: '0 40px', width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
      <header className="hero-box" style={{ padding: '100px 0 60px' }}>
         <span className="roadmap-label">KNOWLEDGE ARCHIVE</span>
         <h2 className="hero-title" style={{ fontSize: '4.5rem' }}>Ecosystem Resources</h2>
         <p className="hero-lead">The definitive collection of world-class intelligence, technical specifications, and proprietary notes.</p>
      </header>

      <div style={{ display: 'flex', gap: '40px', marginBottom: '80px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '20px' }}>
         <span onClick={() => setActiveTab("Youtube")} style={{ 
            color: activeTab === "Youtube" ? '#fff' : '#444', 
            fontSize: '0.9rem', cursor: 'pointer', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' 
         }}>EXPERT INTELLIGENCE</span>
         <span onClick={() => setActiveTab("PDF")} style={{ 
            color: activeTab === "PDF" ? '#fff' : '#444', 
            fontSize: '0.9rem', cursor: 'pointer', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' 
         }}>SPECIFICATIONS</span>
         <span onClick={() => setActiveTab("Notes")} style={{ 
            color: activeTab === "Notes" ? '#fff' : '#444', 
            fontSize: '0.9rem', cursor: 'pointer', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' 
         }}>LABORATORY NOTES</span>
      </div>

      <main className="display-area">
         {activeTab === "Youtube" && (
            <div>
               <div style={{ marginBottom: '24px' }}>
                  <select 
                     value={selectedCareer} 
                     onChange={(e) => setSelectedCareer(e.target.value)}
                     style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 20px', borderRadius: '8px', fontSize: '1rem', outline: 'none', cursor: 'pointer' }}
                  >
                     {Object.keys(careerBooks).map((career) => (
                        <option key={career} value={career} style={{ background: '#111', color: '#fff' }}>{career}</option>
                     ))}
                  </select>
               </div>
               
               {!careerBooks[selectedCareer] ? (
                  <p>No resources available</p>
               ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                     {careerBooks[selectedCareer]?.map((book, index) => (
                        <div key={index} className="resource-card glass-premium" style={{ padding: '32px' }}>
                           <h3 className="g-title">{book.title}</h3>
                           <button
                              className="cta-glow"
                              style={{ marginTop: '24px', padding: '12px 24px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
                              onClick={() => window.open(book.link, "_blank")}
                           >
                              📘 Open Book
                           </button>
                        </div>
                     ))}
                  </div>
               )}
            </div>
         )}

         {activeTab === "PDF" && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
               {samplePDFs.map((pdf, idx) => (
                  <div key={idx} className="glass-premium" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '32px 48px' }}>
                     <div>
                        <h4 className="g-title">{pdf.title}</h4>
                        <p className="g-desc" style={{ marginTop: '8px' }}>Architectural PDF document • {pdf.size}</p>
                     </div>
                     <button className="cta-glow" style={{ padding: '12px 32px', borderRadius: '40px' }} onClick={() => window.open(pdf.url)}>DOWNLOAD →</button>
                  </div>
               ))}
            </div>
         )}

         {activeTab === "Notes" && (
            <div className="glass-premium" style={{ padding: '60px 48px' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <span className="roadmap-label" style={{ margin: 0 }}>EDITING LABORATORY SESSION</span>
                  <div style={{ display: 'flex', gap: '12px' }}>
                     <button className="cta-glow" title="Save to Database" onClick={saveNotes} style={{ width: 'auto', height: '44px', padding: '0 16px', display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center', borderRadius: '12px', fontSize: '1rem', background: '#3bb371', color: '#fff', border: 'none', fontWeight: 'bold' }}>💾 Save Notes</button>
                     <button className="cta-glow" title="View Saved Notes" onClick={fetchNotes} style={{ width: 'auto', height: '44px', padding: '0 16px', display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center', borderRadius: '12px', fontSize: '1rem', background: '#444', color: '#fff', border: 'none', fontWeight: 'bold' }}>📂 Saved Notes</button>
                     <button className="cta-glow" title="Notes" onClick={() => alert("Deep Intelligence Capture Mode: Active")} style={{ width: '44px', height: '44px', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px', fontSize: '1.2rem' }}>📝</button>
                     <button className="cta-glow" title="Highlight Yellow" onMouseDown={(e) => e.preventDefault()} onClick={() => applyHighlight("#FFD54F")} style={{ width: '44px', height: '44px', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px', fontSize: '1.2rem', background: '#FFD54F', boxShadow: '0 0 10px rgba(255, 213, 79, 0.4)', border: 'none' }}>🖍️</button>
                     <button className="cta-glow" title="Highlight Green" onMouseDown={(e) => e.preventDefault()} onClick={() => applyHighlight("#81C784")} style={{ width: '44px', height: '44px', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px', fontSize: '1.2rem', background: '#81C784', boxShadow: '0 0 10px rgba(129, 199, 132, 0.4)', border: 'none' }}>🖍️</button>
                     <button className="cta-glow" title="Highlight Blue" onMouseDown={(e) => e.preventDefault()} onClick={() => applyHighlight("#64B5F6")} style={{ width: '44px', height: '44px', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px', fontSize: '1.2rem', background: '#64B5F6', boxShadow: '0 0 10px rgba(100, 181, 246, 0.4)', border: 'none' }}>🖍️</button>
                     <button className="cta-glow" title="Highlight Pink" onMouseDown={(e) => e.preventDefault()} onClick={() => applyHighlight("#F06292")} style={{ width: '44px', height: '44px', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px', fontSize: '1.2rem', background: '#F06292', boxShadow: '0 0 10px rgba(240, 98, 146, 0.4)', border: 'none' }}>🖍️</button>
                     <button className="cta-glow" title="Remove Highlight" onMouseDown={(e) => e.preventDefault()} onClick={removeHighlight} style={{ width: '44px', height: '44px', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px', fontSize: '1.2rem', background: '#fff', color: '#000', border: 'none' }}>🧹</button>
                     <button 
                        className="cta-glow" 
                        title="Delete" 
                        onClick={() => { if(window.confirm("Format data-stream? All notes will be purged.")) { updateLocalNotes(""); if(editorRef.current) editorRef.current.innerHTML = ""; } }}
                        style={{ 
                           width: '44px', height: '44px', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px', fontSize: '1.2rem',
                           background: '#ff4444', color: '#fff' 
                        }}
                     >🗑️</button>
                  </div>
               </div>
               
               <div 
                  id="notes-editor"
                  ref={editorRef}
                  contentEditable="true"
                  suppressContentEditableWarning={true}
                  onInput={(e) => updateLocalNotes(e.currentTarget.innerHTML)}
                  data-placeholder="Initiate knowledge capture here... your professional notes are persisted to the SkillExa Legacy Storage automatically."
                  style={{ 
                    width: '100%', height: '500px', 
                    background: 'rgba(255,255,255,0.02)', 
                    border: '1px solid rgba(255,255,255,0.05)',
                    borderRadius: '12px',
                    color: '#ccc', 
                    fontSize: '1.2rem', padding: '24px', outline: 'none', lineHeight: '1.8', fontStyle: 'italic',
                    fontFamily: 'SF Mono, Inter, monospace',
                    transition: '0.3s ease',
                    overflowY: 'auto'
                  }}>
               </div>
               <div style={{ textAlign: 'right', marginTop: '40px', opacity: 0.2, fontSize: '0.7rem' }}>
                  STORAGE STATUS: LOCAL-ACTIVE • END-TO-END VALIDATED
               </div>

               {savedNotes.length > 0 && (
                 <div className="notes-list" style={{ marginTop: '40px' }}>
                   <span className="roadmap-label">SAVED ARCHIVE</span>
                   {savedNotes.map((note, index) => (
                     <div key={index} className="note-card glass-premium" style={{ padding: '24px', marginTop: '16px' }}>
                       <div dangerouslySetInnerHTML={{ __html: note.content }} />
                     </div>
                   ))}
                 </div>
               )}
            </div>
         )}
      </main>
    </div>
  );
};

export default Resources;
