import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { QuizContext } from '../context/quiz';
import { Button } from '@material-ui/core';
import shuffleAnswers from '../helpers/shuffleAnswers';

interface IAnswers {
  correct: boolean;
  answer: string;
}

const Question = () => {
  const [answers, setAnswers] = useState<IAnswers[]>([]);
  const [showCorrect, setShowCorrect] = useState(false);

  const { id } = useParams();

  const { questions, userAnswers, setUserAnswers } = useContext(QuizContext);

  const question = questions[Number(id)];

  useEffect(() => {
    setAnswers(shuffleAnswers(question.incorrect_answers, question.correct_answer));

    const storageAnswersJson = localStorage.getItem('score');
    if (storageAnswersJson) {
      const storageAnswers = JSON.parse(storageAnswersJson);

      if (storageAnswers[Number(id)] && storageAnswers[Number(id)].question === question.question) {
        setShowCorrect(true);
      } else {
        setShowCorrect(false);
      }
    }
    // setShowCorrect(false);
  }, [question]);

  const handleAnswer = (question: string, answer: string, correct: boolean) => {
    setShowCorrect(true);
    const correctAnswer = answers.find((answer) => answer.correct);
    if (correctAnswer) {
      setUserAnswers([
        ...userAnswers,
        { question, answer, correct, correctAnswer: correctAnswer.answer },
      ]);

      localStorage.setItem(
        'score',
        JSON.stringify([
          ...userAnswers,
          { question, answer, correct, correctAnswer: correctAnswer.answer },
        ])
      );
    }
  };

  if (!answers || !answers.length) return <h1>loading</h1>;

  return (
    <div className="question-page">
      <div className="question-container">
        <strong className="question-number">{Number(id) + 1}.</strong>
        <h2>{question.category}</h2>
        <p>{question.question}</p>

        <div className="answers">
          {answers.map(({ answer, correct }) => (
            <Button
              className={showCorrect ? (correct ? 'correct' : 'incorrect') : ''}
              disabled={showCorrect}
              variant="contained"
              key={answer}
              onClick={() => handleAnswer(question.question, answer, correct)}
            >
              {answer}
            </Button>
          ))}
        </div>
        <Button className="next-btn" variant="contained" color="secondary" disabled={!showCorrect}>
          <Link
            to={
              Number(id) + 2 > questions.length ? '/game/feedback' : `/game/question/${Number(id) + 1}`
            }
          >
            Next
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Question;
