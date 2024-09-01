import React, { useState, useEffect } from "react";
import { createQuiz, shareQuiz } from "../services/quiz";
import "./quizForm.css";

const QuizForm = () => {
  const [quizType, setQuizType] = useState("Q&A"); // State to manage quiz type (Q&A or Poll)
  const [questions, setQuestions] = useState([
    { text: "", options: ["", "", "", ""], correctAnswer: "", timer: "", type: "text" },
  ]);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [quizCreated, setQuizCreated] = useState(false);
  const [isCreateButtonEnabled, setIsCreateButtonEnabled] = useState(false);

  useEffect(() => {
    const allQuestionsFilled = questions.every(
      (question) =>
        question.text &&
        question.options.every((option) => option !== "") &&
        (quizType === "Poll" || question.correctAnswer) && // Ensure correct answer only for Q&A
        question.type &&
        question.timer
    );
    setIsCreateButtonEnabled(allQuestionsFilled && questions.length === 5);
  }, [questions, quizType]);

  const handleAddQuestion = () => {
    if (questions.length < 5) {
      setQuestions([
        ...questions,
        { text: "", options: ["", "", "", ""], correctAnswer: "", timer: "", type: "text" },
      ]);
    }
  };

  const handleInputChange = (e, questionIndex, optionIndex = null) => {
    const newQuestions = [...questions];
    if (optionIndex !== null) {
      newQuestions[questionIndex].options[optionIndex] = e.target.value;
    } else {
      newQuestions[questionIndex][e.target.name] = e.target.value;
    }
    setQuestions(newQuestions);
  };

  const handleTypeChange = (e, questionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].type = e.target.value;
    setQuestions(newQuestions);
  };

  const handleCorrectAnswerChange = (e, questionIndex, optionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].correctAnswer = newQuestions[questionIndex].options[optionIndex];
    setQuestions(newQuestions);
  };

  const handleTimerChange = (e, questionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].timer = e.target.value;
    setQuestions(newQuestions);
  };

  const handleCreateQuiz = async () => {
    try {
      const quizData = {
        title: "Your Quiz Title", // Replace with your actual title input or state
        type: quizType,
        questions: questions.map((question) => ({
          questionText: question.text,
          options: question.options,
          correctAnswer: quizType === "Q&A" ? question.correctAnswer : undefined, // Only include for Q&A
          timer: question.timer,
          type: question.type,
        })),
      };

      const response = await createQuiz(quizData);

      if (response) {
        setQuizCreated(true);
      }
    } catch (error) {
      console.error("Error creating quiz:", error.message);
      alert("Failed to create quiz. Please try again.");
    }
  };

  const handleShareQuiz = async () => {
    try {
      const response = await shareQuiz(/* Provide quizId if necessary */);
      if (response.link) {
        navigator.clipboard.writeText(response.link);
        alert("Quiz link copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing quiz:", error.message);
      alert("Failed to share quiz. Please try again.");
    }
  };

  const handleCancel = () => {
    window.location.href = "/";
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        {quizCreated ? (
          <div>
            <h2>Congratulations! Your quiz has been created.</h2>
            <button onClick={handleShareQuiz}>Share Quiz</button>
          </div>
        ) : (
          <>
            <div className="quiz-type-selector">
              <label>
                <input
                  type="radio"
                  name="quizType"
                  value="Q&A"
                  checked={quizType === "Q&A"}
                  onChange={(e) => setQuizType(e.target.value)}
                />
                Q&A
              </label>
              <label>
                <input
                  type="radio"
                  name="quizType"
                  value="Poll"
                  checked={quizType === "Poll"}
                  onChange={(e) => setQuizType(e.target.value)}
                />
                Poll
              </label>
            </div>

            <div className="question-navigation">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`question-number ${activeQuestion === index ? "active" : ""}`}
                  onClick={() => setActiveQuestion(index)}
                >
                  {index + 1}
                </div>
              ))}
              {questions.length < 5 && (
                <div className="add-question-btn" onClick={handleAddQuestion}>
                  +
                </div>
              )}
            </div>

            <input
              type="text"
              name="text"
              placeholder="Enter your question here..."
              value={questions[activeQuestion].text}
              onChange={(e) => handleInputChange(e, activeQuestion)}
            />

            <div className="option-type">
              <label>
                <input
                  type="radio"
                  name={`type-${activeQuestion}`}
                  value="text"
                  checked={questions[activeQuestion].type === "text"}
                  onChange={(e) => handleTypeChange(e, activeQuestion)}
                />
                Text
              </label>
              <label>
                <input
                  type="radio"
                  name={`type-${activeQuestion}`}
                  value="imageURL"
                  checked={questions[activeQuestion].type === "imageURL"}
                  onChange={(e) => handleTypeChange(e, activeQuestion)}
                />
                Image URL
              </label>
              <label>
                <input
                  type="radio"
                  name={`type-${activeQuestion}`}
                  value="textImage"
                  checked={questions[activeQuestion].type === "textImage"}
                  onChange={(e) => handleTypeChange(e, activeQuestion)}
                />
                Text & Image URL
              </label>
            </div>

            <div className="options-section">
              <div className="options-left">
                {questions[activeQuestion].options.map((option, index) => (
                  <div key={index}>
                    {quizType === "Q&A" && (
                      <input
                        type="radio"
                        name={`correctAnswer-${activeQuestion}`}
                        value={option}
                        checked={questions[activeQuestion].correctAnswer === option}
                        onChange={(e) => handleCorrectAnswerChange(e, activeQuestion, index)}
                      />
                    )}
                    <input
                      type="text"
                      placeholder={`Option ${index + 1}`}
                      value={option}
                      onChange={(e) => handleInputChange(e, activeQuestion, index)}
                    />
                  </div>
                ))}
              </div>

              <div className="timer-group">
                <label>
                  <input
                    type="radio"
                    name={`timer-${activeQuestion}`}
                    value="off"
                    checked={questions[activeQuestion].timer === "off"}
                    onChange={(e) => handleTimerChange(e, activeQuestion)}
                  />
                  Off
                </label>
                <label>
                  <input
                    type="radio"
                    name={`timer-${activeQuestion}`}
                    value="5"
                    checked={questions[activeQuestion].timer === "5"}
                    onChange={(e) => handleTimerChange(e, activeQuestion)}
                  />
                  5 seconds
                </label>
                <label>
                  <input
                    type="radio"
                    name={`timer-${activeQuestion}`}
                    value="10"
                    checked={questions[activeQuestion].timer === "10"}
                    onChange={(e) => handleTimerChange(e, activeQuestion)}
                  />
                  10 seconds
                </label>
                <label>
                  <input
                    type="radio"
                    name={`timer-${activeQuestion}`}
                    value="15"
                    checked={questions[activeQuestion].timer === "15"}
                    onChange={(e) => handleTimerChange(e, activeQuestion)}
                  />
                  15 seconds
                </label>
              </div>
            </div>

            <div className="button-group">
              <button onClick={handleCreateQuiz} disabled={!isCreateButtonEnabled}>
                Create Quiz
              </button>
              <button className="cancel" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default QuizForm;
