import { useEffect, useState } from "react";
import "./Stage2.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const apiBaseUrl = ("https://startup-backend-6pdo.onrender.com/").replace(/\/$/, "");

const Stage2 = () => {
  const [track, setTrack] = useState("");
  const [sector, setSector] = useState("");
  const [otherSector, setOtherSector] = useState("");
  const [description, setDescription] = useState("");
  const [inputOne, setInputOne] = useState("");
  const [inputTwo, setInputTwo] = useState("");
  const [inputThree, setInputThree] = useState("");
  const [loading, setLoading] = useState(false)
  const [dis, setDis] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const savedStage1 = localStorage.getItem("stage1");
    if (!savedStage1) {
      // toast.error("Please complete Stage 1 before submitting.");
      navigate("/");
    }
  }, [navigate]);

  const handleSumbit = async () => {
    const descriptionWordCount = description.trim().split(/\s+/).filter(Boolean).length;

    if (!track) {
      toast.error("Please select a track.");
      return;
    }

    if (!sector) {
      toast.error("Please select a sector.");
      return;
    }

    if (sector === "Other" && !otherSector.trim()) {
      toast.error("Please enter your sector.");
      return;
    }

    if (descriptionWordCount === 0) {
      toast.error("Please enter a startup description.");
      return;
    }

    if (descriptionWordCount > 150) {
      toast.error("Keep the startup description to 150 words or fewer.");
      return;
    }

    if (!inputOne.trim() || !inputTwo.trim() || !inputThree.trim()) {
      toast.error("Please fill all three additional input boxes.");
      return;
    }

    let stage1: Record<string, unknown>;
    try {
      stage1 = JSON.parse(localStorage.getItem("stage1") || "{}");
    } catch {
      toast.error("Your form session is invalid. Please fill Stage 1 again.");
      navigate("/");
      return;
    }

    if (!stage1.idea || !stage1.leader || !stage1.email || !stage1.phone || !stage1.department || !Array.isArray(stage1.teams) || stage1.teams.length === 0) {
      toast.error("Please complete Stage 1 before submitting.");
      navigate("/");
      return;
    }

    const stage2 = {
      track,
      sector: sector === "Other" ? otherSector : sector,
      description: description.trim(),
      inputOne: inputOne.trim(),
      inputTwo: inputTwo.trim(),
      inputThree: inputThree.trim(),
    };

    const application = {
      ...stage1,
      ...stage2,
    };

    setLoading(true);
    setDis(true);

    try {
      const res = await fetch(
        `${apiBaseUrl}/application`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(application),
        }
      );

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        toast.error(data.message || "Server error!");
        return;
      }

      toast.success("Application submitted successfully!");
      navigate("/submit");

      localStorage.removeItem("stage1");

      navigate("/submit");

    } catch (error) {
      console.error("SUBMIT ERROR:", error);

      toast.error(
        "Unable to connect to server. Please try again."
      );

    } finally {
      setLoading(false);
      setDis(false);
    }
  };

  return (
    <div className="stage2-container">

      <h2 className="stage-title">Startup Details</h2>

      <div className="stage2-group">
        <label className="stage2-label">Track (Board)</label>

        <select
          className="stage2-select"
          value={track}
          onChange={(e) => setTrack(e.target.value)}
        >
          <option value="">Select Track</option>
          <option value="Technology & Innovation">Technology & Innovation</option>
          <option value="Sustainability & CleanTech">Sustainability & CleanTech</option>
          <option value="Social Impact">Social Impact</option>
          <option value="FinTech">FinTech</option>
          <option value="HealthTech">HealthTech</option>
          <option value="EdTech">EdTech</option>
          <option value="Consumer & D2C">Consumer & D2C</option>
          <option value="AgriTech">AgriTech</option>
          <option value="Open Innovation">Open Innovation</option>
        </select>
      </div>

      <div className="stage2-group">
        <label className="stage2-label">Sector</label>

        <select
          className="stage2-select"
          value={sector}
          onChange={(e) => setSector(e.target.value)}
        >
          <option value="">Select Sector</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Education">Education</option>
          <option value="Agriculture">Agriculture</option>
          <option value="E-commerce / Retail">E-commerce / Retail</option>
          <option value="Finance & Banking">Finance & Banking</option>
          <option value="Climate & Environment">Climate & Environment</option>
          <option value="Artificial Intelligence / Deep Tech">Artificial Intelligence / Deep Tech</option>
          <option value="Manufacturing">Manufacturing</option>
          <option value="Transportation & Logistics">Transportation & Logistics</option>
          <option value="Media & Entertainment">Media & Entertainment</option>
          <option value="Food & Beverage">Food & Beverage</option>
          <option value="Travel & Hospitality">Travel & Hospitality</option>
          <option value="Other">Other</option>
        </select>

        {sector === "Other" && (
          <input
            className="stage2-input"
            type="text"
            placeholder="Enter your sector"
            value={otherSector}
            onChange={(e) => setOtherSector(e.target.value)}
          />
        )}
      </div>

      <div className="stage2-group">
        <label className="stage2-label" htmlFor="description">Startup description (up to 150 words)</label>
        <textarea
          id="description"
          className="stage2-input stage2-textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your startup idea, the problem it solves, and its impact."
          rows={7}
        />
        <span className="word-count">{description.trim().split(/\s+/).filter(Boolean).length} / 150 words</span>
      </div>

      <div className="stage2-group">
        <label className="stage2-label" htmlFor="inputOne">Additional detail 1</label>
        <input
          id="inputOne"
          className="stage2-input"
          type="text"
          value={inputOne}
          onChange={(e) => setInputOne(e.target.value)}
          placeholder="Enter your first extra detail"
        />
      </div>

      <div className="stage2-group">
        <label className="stage2-label" htmlFor="inputTwo">Additional detail 2</label>
        <input
          id="inputTwo"
          className="stage2-input"
          type="text"
          value={inputTwo}
          onChange={(e) => setInputTwo(e.target.value)}
          placeholder="Enter your second extra detail"
        />
      </div>

      <div className="stage2-group">
        <label className="stage2-label" htmlFor="inputThree">Additional detail 3</label>
        <input
          id="inputThree"
          className="stage2-input"
          type="text"
          value={inputThree}
          onChange={(e) => setInputThree(e.target.value)}
          placeholder="Enter your third extra detail"
        />
      </div>

      <div className="stage2-buttons">
        <button className="back-btn" onClick={() => navigate("/")}>Back</button>
        <button disabled={dis} className="next-btn" onClick={handleSumbit}>{loading ? "Waiting for progress" : "Submit"}</button>
      </div>

    </div>
  );
};

export default Stage2;
