import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const questions = [
  {
    id: 1,
    type: "mcq",
    domain: "Networking",
    question: "Which protocol securely encrypts web traffic?",
    options: ["HTTP", "FTP", "HTTPS", "Telnet"],
    correctAnswer: "HTTPS",
  },
  {
    id: 2,
    type: "mcq",
    domain: "Network Security",
    question: "Which port is commonly used by SSH?",
    options: ["21", "22", "53", "443"],
    correctAnswer: "22",
  },
  {
    id: 3,
    type: "mcq",
    domain: "Web Security",
    question: "Which attack injects malicious scripts into a web page?",
    options: ["Phishing", "XSS", "DDoS", "Brute force"],
    correctAnswer: "XSS",
  },
  {
    id: 4,
    type: "short",
    domain: "Security Fundamentals",
    question: "Explain the CIA triad in cybersecurity.",
    keywords: ["confidentiality", "integrity", "availability"],
  },
  {
    id: 5,
    type: "short",
    domain: "Networking",
    question: "Explain the difference between TCP and UDP.",
    keywords: ["reliable", "connection", "fast", "connectionless"],
  },
  {
    id: 6,
    type: "scenario",
    domain: "Incident Response",
    question:
      "A company detects repeated failed login attempts from unknown IP addresses. Explain the actions you would take.",
    keywords: ["logs", "block", "investigate", "alert", "monitor"],
  },
];

function Test() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [secondsLeft, setSecondsLeft] = useState(30 * 60);

  useEffect(() => {
    if (secondsLeft <= 0) {
      submitTest();
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((previous) => previous - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft]);

  const updateAnswer = (id, value) => {
    setAnswers((previous) => ({
      ...previous,
      [id]: value,
    }));
  };

  const submitTest = () => {
    let earnedPoints = 0;
    const breakdown = [];

    questions.forEach((question) => {
      const answer = answers[question.id] || "";
      let score = 0;

      if (question.type === "mcq") {
        score = answer === question.correctAnswer ? 10 : 0;
      } else {
        const lowerAnswer = answer.toLowerCase();
        const matchedKeywords = question.keywords.filter((keyword) =>
          lowerAnswer.includes(keyword)
        ).length;

        score = Math.round(
          (matchedKeywords / question.keywords.length) * 10
        );
      }

      earnedPoints += score;

      breakdown.push({
        question: question.question,
        domain: question.domain,
        answer,
        score,
      });
    });

    const percentage = Math.round(
      (earnedPoints / (questions.length * 10)) * 100
    );

    localStorage.setItem(
      "testResult",
      JSON.stringify({
        score: percentage,
        status: percentage >= 60 ? "PASS" : "FAIL",
        breakdown,
      })
    );

    navigate("/report");
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <div className="page">
      <header className="navbar">
        <h2>Aplitude Test</h2>
        <div className="timer">
          Time left: {minutes}:{seconds.toString().padStart(2, "0")}
        </div>
      </header>

      <main className="container test-container">
        {questions.map((question, index) => (
          <section className="card question-card" key={question.id}>
            <div className="question-header">
              <span>Question {index + 1}</span>
              <span className="domain">{question.domain}</span>
            </div>

            <h3>{question.question}</h3>

            {question.type === "mcq" ? (
              <div className="options">
                {question.options.map((option) => (
                  <label className="option" key={option}>
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={option}
                      checked={answers[question.id] === option}
                      onChange={(event) =>
                        updateAnswer(question.id, event.target.value)
                      }
                    />
                    {option}
                  </label>
                ))}
              </div>
            ) : (
              <textarea
                rows="6"
                placeholder="Type your answer here..."
                value={answers[question.id] || ""}
                onChange={(event) =>
                  updateAnswer(question.id, event.target.value)
                }
              />
            )}
          </section>
        ))}

        <button className="submit-button" onClick={submitTest}>
          Submit Test
        </button>
      </main>
    </div>
  );
}

export default Test;