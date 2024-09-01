import { useState } from "react";
import QuizForm from "./quizForm";
import "./CreateQuiz.css";

function CreateQuiz({ isModalOpen, onClose }) {
  const [quizData, setQuizData] = useState({ title: "", type: "" });
  const [showQuizForm, setShowQuizForm] = useState(false);

  const handleQuizDataChange = (key, value) => {
    setQuizData((prev) => ({ ...prev, [key]: value }));
  };

  const handleContinue = () => {
    setShowQuizForm(true);
  };

  if (!isModalOpen) return null;
  if (showQuizForm) return <QuizForm quizData={quizData} onClose={onClose} />;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Create Quiz</h2>
        <input
          type="text"
          placeholder="Quiz Title"
          value={quizData.title}
          onChange={(e) => handleQuizDataChange("title", e.target.value)}
        />
        <div className="quiz-type-selection">
          <label>
            <input
              type="radio"
              name="quizType"
              value="Q&A"
              checked={quizData.type === "Q&A"}
              onChange={(e) => handleQuizDataChange("type", e.target.value)}
            />
            Q&A
          </label>
          <label>
            <input
              type="radio"
              name="quizType"
              value="Poll"
              checked={quizData.type === "Poll"}
              onChange={(e) => handleQuizDataChange("type", e.target.value)}
            />
            Poll Type
          </label>
        </div>
        <div className="button-group">
          <button onClick={handleContinue} disabled={!quizData.title || !quizData.type}>
            Continue
          </button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default CreateQuiz;
