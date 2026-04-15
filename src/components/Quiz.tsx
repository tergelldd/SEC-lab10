import React, { useState } from 'react'
import './Quiz.css'
import QuizQuestion from '../core/QuizQuestion';
import QuizCore from '../core/QuizCore';
import quizData from '../data/quizData';

interface QuizState {
  questions: QuizQuestion[]
  currentQuestionIndex: number
  selectedAnswer: string | null
  score: number
}

const Quiz: React.FC = () => {
  const initialQuestions: QuizQuestion[] = [
    {
      question: 'What is the capital of France?',
      options: ['London', 'Berlin', 'Paris', 'Madrid'],
      correctAnswer: 'Paris',
    },
  ];
  const [quizCore] = useState(new QuizCore([...initialQuestions, ...quizData]));
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(quizCore.getCurrentQuestion());
  const [score, setScore] = useState(quizCore.getScore());

  const handleOptionSelect = (option: string): void => {
    setSelectedAnswer(option);
  }


  const handleButtonClick = (): void => {
    // Task3: Implement the logic for button click, such as moving to the next question.
    if (!selectedAnswer) return;
    quizCore.answerQuestion(selectedAnswer);

    if (quizCore.hasNextQuestion()) {
      quizCore.nextQuestion();
      setCurrentQuestion(quizCore.getCurrentQuestion());
      setSelectedAnswer(null);
    } else {
      setCurrentQuestion(null);
    }

    setScore(quizCore.getScore());
  }

  if (!currentQuestion) {
    return (
      <div>
        <h2>Quiz Completed</h2>
        <p>Final Score: {score} / {quizCore.getTotalQuestions()}</p>
      </div>
    );
  }
  const hasNext = quizCore.hasNextQuestion();
  const isLastQuestion = !hasNext;

  return (
    <div>
      <h2>Quiz Question:</h2>
      <p>{currentQuestion.question}</p>
    
      <h3>Answer Options:</h3>
      <ul>
        {currentQuestion.options.map((option) => (
          <li
            key={option}
            onClick={() => handleOptionSelect(option)}
            className={selectedAnswer === option ? 'selected' : ''}
          >
            {option}
          </li>
        ))}
      </ul>

      <h3>Selected Answer:</h3>
      <p>{selectedAnswer ?? 'No answer selected'}</p>

      <button onClick={handleButtonClick} disabled={!selectedAnswer}>
        {hasNext ? 'Next Question' : 'Submit Quiz'}
      </button>
    </div>
  );
};

export default Quiz;