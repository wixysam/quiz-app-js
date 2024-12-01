import React, { useState } from "react";
import "./App.css";

const QuestionType = {
  MULTIPLE_CHOICE: "multiple_choice",
  TRUE_FALSE: "true_false",
};

const questions = [
  {
    type: QuestionType.MULTIPLE_CHOICE,
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris",
  },
  {
    type: "true_false",
    question: "The Wix Campus has a pool.",
    answer: false,
  },
  {
    type: QuestionType.TRUE_FALSE,
    question: "The sky is blue.",
    answer: true,
  },
  {
    type: QuestionType.MULTIPLE_CHOICE,
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: "Mars",
  },
];

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [showResults, setShowResults] = useState(false);

  const startQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setFeedback("");
    setShowResults(false);
  };

  const checkAnswer = (selectedAnswer) => {
    const question = questions[currentQuestionIndex];
    const isCorrect =
      question.type === QuestionType.MULTIPLE_CHOICE
        ? selectedAnswer === question.answer
        : selectedAnswer === question.answer;

    setFeedback(isCorrect ? "Correct!" : "Wrong!");
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    setTimeout(() => {
      if (currentQuestionIndex + 1 < questions.length) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setFeedback("");
      } else {
        setShowResults(true);
      }
    }, 2000);
  };

  const renderOptions = (options) => {
    return options.map((option, index) => (
      <button
        key={index}
        onClick={() => checkAnswer(option)}
        className="option-button"
      >
        {option}
      </button>
    ));
  };

  const renderTrueFalseOptions = () => (
    <>
      <button onClick={() => checkAnswer(true)} className="option-button">
        True
      </button>
      <button onClick={() => checkAnswer(false)} className="option-button">
        False
      </button>
    </>
  );

  return (
    <div className="app">
      <h1>Quiz App</h1>
      {showResults ? (
        <div>
          <h2>
            You scored {score} out of {questions.length}
          </h2>
          <button onClick={startQuiz} className="start-button">
            Restart Quiz
          </button>
        </div>
      ) : (
        <>
          <div className="quiz-container">
            <h2>{questions[currentQuestionIndex].question}</h2>
            {questions[currentQuestionIndex].type ===
            QuestionType.MULTIPLE_CHOICE
              ? renderOptions(questions[currentQuestionIndex].options)
              : renderTrueFalseOptions()}
          </div>
          <div
            className={`feedback ${
              feedback === "Correct!" ? "correct" : "wrong"
            }`}
          >
            {feedback}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
