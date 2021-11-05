import { Check, Close } from '@material-ui/icons';

interface IUserAnswer {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const UserAnswer: React.FC<IUserAnswer> = ({ answer, question, correctAnswer, correct }) => {
  return (
    <div className="answer-feedback" key={answer}>
      <p className="question">{question}</p>
      <strong className={`${correct ? 'correct' : 'incorrect'}`}>
        {correct ? 'correct' : 'incorrect'}
      </strong>
      <div className="answers">
        <span className={`${correct ? 'user-answer correct' : 'user-answer incorrect'}`}>
          {correct ? <Check /> : <Close />}
          {answer}
        </span>
        {correctAnswer !== answer && (
          <span className="correct-answer">
            {' '}
            <Check /> {correctAnswer}
          </span>
        )}
      </div>
    </div>
  );
};

export default UserAnswer;
