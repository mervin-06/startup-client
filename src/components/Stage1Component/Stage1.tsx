import { useState } from "react";
import "./Stage1.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Stage1() {
  const navigate = useNavigate();
  const [idea, setIdea] = useState("");
  const [leader, setLeader] = useState("");
  const [Email, setEmail] = useState("");
  const [ph, setPh] = useState("");
  const [department, setDepartment] = useState("");
  const [members, setMembers] = useState<string[]>(["", "", ""]);

  const handleNext = () => {
    const trimmedIdea = idea.trim();
    const trimmedLeader = leader.trim();
    const trimmedEmail = Email.trim();
    const trimmedPhone = ph.trim();
    const trimmedDepartment = department.trim();
    const trimmedMembers = members.map((member) => member.trim());

    if (!trimmedIdea || !trimmedLeader || !trimmedEmail || !trimmedPhone || !trimmedDepartment || trimmedMembers.some((member) => !member)) {
      toast.error("All fields are required");
      return;
    }

    const Stage1data = {
      idea: trimmedIdea,
      leader: trimmedLeader,
      email: trimmedEmail,
      phone: trimmedPhone,
      department: trimmedDepartment,
      teams: trimmedMembers,
    };

    localStorage.setItem("stage1", JSON.stringify(Stage1data));
    navigate("/stage2");
  };

  const handleInputValue = (val: string, index: number) => {
    const newInput = [...members];
    newInput[index] = val;
    setMembers(newInput);
  };

  return (
    <div className="stage1-form">
      <div className="page-title">
        <h1>Startup Registration Portal</h1>
        <p>Stage 1 of 2 • Team Information</p>
      </div>
      <div className="form-group">
        <label htmlFor="ideaName">Venture/idea name</label>
        <input onChange={(e) => setIdea(e.target.value)} type="text" id="ideaName" name="ideaName" value={idea} placeholder="Enter your idea name" />
      </div>

      <div className="form-group">
        <label htmlFor="leaderName">Team leader's name</label>
        <input onChange={(e) => setLeader(e.target.value)} type="text" id="leaderName" name="leaderName" value={leader} placeholder="Enter the leader name" />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email (team leader's mail)</label>
        <input type="email" id="email" name="email" value={Email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter team leader email" />
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone number</label>
        <input type="number" onChange={(e) => setPh(e.target.value)} value={ph} id="phone" name="phone" placeholder="Enter phone number" />
      </div>

      <div className="form-group">
        <label htmlFor="department">Department</label>
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option value="">Select Department</option>
          <option value="CSE">CSE</option>
          <option value="IT">IT</option>
          <option value="EEE">EEE</option>
          <option value="MECH">MECH</option>
          <option value="CIVIL">CIVIL</option>
          <option value="AIDS">AIDS</option>
          <option value="AIML">AIML</option>
          <option value="E&I">E&I</option>
          <option value="OTHER">Other</option>
        </select>

        {department === "OTHER" && (
          <input
            type="text"
            placeholder="Enter your department"
            onChange={(e) => setDepartment(e.target.value)}
          />
        )}
        <div className="team-members">
          <label>Other team members' names</label>
          {members.map((member, index) => (
            <input
              key={index}
              type="text"
              onChange={(e) => handleInputValue(e.target.value, index)}
              value={member}
              placeholder={`Member ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="form-group submit-row">
        <button onClick={handleNext} type="submit">Next</button>
      </div>
    </div>
  );
}
