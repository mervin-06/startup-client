import { useNavigate } from "react-router-dom";
import "./Submit.css"

export default function SubmittedSuccess() {
  const navigate = useNavigate()
  return (
    <div className="success-page">
      <div className="success-card">

        <div className="success-icon">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 13l4 4L19 7"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h1>Application Submitted</h1>

        <p className="success-message">
          Thank you for submitting your startup application.
        </p>

        <p className="success-description">
          Your application has been received successfully
        </p>

        <div className="success-divider"></div>

        <p className="success-footer">
          We appreciate your interest ! Thank You
        </p>
        <button className="btn"  onClick={()=>navigate("/")}> Add Another Application </button>
      </div>
    </div>
  );
}