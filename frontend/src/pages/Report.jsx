import { useNavigate } from "react-router-dom";

function Report() {
  const navigate = useNavigate();
  const result = JSON.parse(localStorage.getItem("testResult"));

  if (!result) {
    return (
      <div className="page-center">
        <div className="card">
          <h2>No report found</h2>
          <button onClick={() => navigate("/dashboard")}>
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const downloadReport = () => {
    window.print();
  };

  return (
    <div className="page">
      <header className="navbar no-print">
        <h2>Aplitude Report</h2>
        <button onClick={downloadReport}>Download / Print PDF</button>
      </header>

      <main className="container report">
        <section className="card report-summary">
          <p className="badge">EVALUATION COMPLETE</p>
          <h1>Candidate Technical Report</h1>

          <div className="score-circle">{result.score}%</div>

          <h2 className={result.status === "PASS" ? "pass" : "fail"}>
            {result.status}
          </h2>

          <p>
            Pass threshold: 60%. Scores are calculated from MCQ correctness and
            keyword-based rubric matching for descriptive answers.
          </p>
        </section>

        <section className="card">
          <h2>Question-wise Breakdown</h2>

          {result.breakdown.map((item, index) => (
            <div className="result-item" key={index}>
              <div>
                <strong>
                  {index + 1}. {item.question}
                </strong>
                <p>{item.domain}</p>
              </div>

              <span>{item.score}/10</span>
            </div>
          ))}
        </section>

        <div className="button-row no-print">
          <button
            className="secondary-button"
            onClick={() => navigate("/dashboard")}
          >
            Create Another Test
          </button>
        </div>
      </main>
    </div>
  );
}

export default Report;