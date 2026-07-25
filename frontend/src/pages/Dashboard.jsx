import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [jobDescription, setJobDescription] = useState("");
  const navigate = useNavigate();

  const generateTest = () => {
    if (jobDescription.trim().length < 30) {
      alert("Please paste a proper job description.");
      return;
    }

    localStorage.setItem("jobDescription", jobDescription);
    navigate("/test");
  };

  return (
    <div className="page">
      <header className="navbar">
        <h2>Aplitude</h2>
        <span>Recruiter Dashboard</span>
      </header>

      <main className="container">
        <section className="hero">
          <p className="badge">AI-POWERED SCREENING</p>
          <h1>Generate a cybersecurity aptitude test</h1>
          <p>
            Paste a job description and create a role-specific technical
            assessment containing MCQs, short answers and a scenario question.
          </p>
        </section>

        <section className="card">
          <label>Job Description</label>

          <textarea
            value={jobDescription}
            onChange={(event) => setJobDescription(event.target.value)}
            placeholder="Example: We are hiring a SOC Analyst with knowledge of networking, SIEM, Linux, incident response and threat analysis..."
            rows="14"
          />

          <div className="button-row">
            <button
              className="secondary-button"
              onClick={() => setJobDescription("")}
            >
              Clear
            </button>

            <button onClick={generateTest}>Generate Test</button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;