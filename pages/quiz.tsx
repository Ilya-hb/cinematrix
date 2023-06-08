import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import { AiOutlineLoading } from "react-icons/ai";
import he from "he";

interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface UserAnswer {
  question: string;
  userAnswer: string;
  correctAnswer: string;
}

function Quiz() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get<{ results: Question[] }>(
        "https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple"
      );
      const { data } = response;
      setQuestions(data.results);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch questions:", error);
      setIsLoading(false);
    }
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (selectedOption === questions[currentQuestionIndex].correct_answer) {
      setScore((prevScore) => prevScore + 1);
    }
    setUserAnswers((prevUserAnswers) => [
      ...prevUserAnswers,
      {
        question: questions[currentQuestionIndex].question,
        userAnswer: selectedOption || "",
        correctAnswer: questions[currentQuestionIndex].correct_answer,
      },
    ]);
    setSelectedOption(null);
    if (currentQuestionIndex === questions.length - 1) {
      setShowResult(true);
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedOption(null);
    setUserAnswers([]);
    setShowResult(false);
    setShowCorrectAnswers(false);
    fetchQuestions();
  };

  const handleShowCorrectAnswers = () => {
    setShowCorrectAnswers(true);
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-24 flex justify-center items-center">
          <h1 className="text-3xl">Loading... </h1>
          <AiOutlineLoading className="text-4xl animate-spin inline-block" />
        </div>
      </>
    );
  }

  if (showResult) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-24 text-center space-y-4">
          <h2 className="text-3xl">Quiz Result</h2>
          <p className="text-2xl">Your Score: {score}</p>
          <button
            className={`mt-4 text-xl bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full px-6 py-3 mx-auto transition-colors duration-300 ease-in-out block`}
            onClick={restartQuiz}
          >
            Restart Quiz
          </button>
          {showCorrectAnswers && (
            <div className="mt-8 text-left">
              <h3 className="text-xl font-semibold mb-4">Correct Answers:</h3>
              {userAnswers.map((userAnswer, index) => (
                <div key={index} className="my-4">
                  <h4 className="text-xl">{he.decode(userAnswer.question)}</h4>
                  <ul className="list-disc list-inside">
                    {questions[index].incorrect_answers.map((option, optionIndex) => (
                      <li key={optionIndex} className="text-red-500">
                        {option}
                      </li>
                    ))}
                    <li className="text-green-500 font-bold">
                      {questions[index].correct_answer}
                    </li>
                  </ul>
                  <p>
                    Your answer: <strong>{userAnswer.userAnswer}</strong>
                  </p>
                </div>
              ))}
            </div>
          )}
          {!showCorrectAnswers && (
            <button
              className={`mt-4 text-xl bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full px-6 py-3 mx-auto transition-colors duration-300 ease-in-out block`}
              onClick={handleShowCorrectAnswers}
            >
              Show Correct Answers
            </button>
          )}
        </div>
      </>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const decodedQuestion = he.decode(currentQuestion.question);
  const options = [
    ...currentQuestion.incorrect_answers,
    currentQuestion.correct_answer,
  ].sort();

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <h2 className="text-3xl font-bold mb-4">Quiz Page</h2>
        <p className="text-2xl">Question {currentQuestionIndex + 1}</p>
        <h3 className="text-xl font-semibold my-4">{decodedQuestion}</h3>
        <ul className="list-disc list-inside">
          {options.map((option, index) => (
            <li
              key={index}
              className={`cursor-pointer p-2 rounded text-xl ${
                selectedOption === option ? "bg-red-500 text-white" : ""
              }`}
              onClick={() => handleOptionSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
        <button
          className={`mx-auto sm:mx-0 text-xl w-40 mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full px-6 py-3 transition-colors duration-300 ease-in-out block`}
          onClick={handleNextQuestion}
          disabled={!selectedOption}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default Quiz;
