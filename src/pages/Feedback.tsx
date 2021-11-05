import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { UserAnswer } from '../components';

interface IUserAnswers {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const Feedback = () => {
  const [answers, setAnswers] = useState<IUserAnswers[]>([]);
  useEffect(() => {
    const getUserAnswers = localStorage.getItem('score');
    if (getUserAnswers) {
      const userAnswers = JSON.parse(getUserAnswers);
      setAnswers(userAnswers);
    }
  }, []);
  const totalScore = answers.filter((answer) => answer.correct).length;
  console.log(totalScore);

  return (
    <div className="feedback-page">
      <h1>Your latest game</h1>
      <h2>
        Score: <strong className="score">{totalScore}</strong>
      </h2>
      <h2>
        Errors: <strong className="errors">{answers.length - totalScore}</strong>
      </h2>
      <div className="answers-list">
        {answers.length ? (
          answers.map(({ correct, answer, correctAnswer, question }) => (
            <UserAnswer
              correct={correct}
              answer={answer}
              correctAnswer={correctAnswer}
              question={question}
            />
          ))
        ) : (
          <p>No feedback avalible</p>
        )}
      </div>
      <Button variant="contained" className="main-page-btn">
        <Link to="/">Back to home</Link>
      </Button>
    </div>
  );
};

export default Feedback;
