import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="page-center">
      <div className="card login-card">
        <div className="logo">🛡️</div>
        <h1>Aplitude</h1>
        <p className="subtitle">
          Automated Cybersecurity Technical Aptitude Evaluator
        </p>

        <input type="text" placeholder="Enter your name" />
        <input type="email" placeholder="Enter your email" />

        <button onClick={() => navigate("/dashboard")}>
          Continue as Recruiter
        </button>
      </div>
    </div>
  );
}

export default Login;