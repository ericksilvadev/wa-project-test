import { useContext, useEffect, useState } from 'react';
import { Button, ButtonGroup } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { QuizContext } from '../context/quiz';
import { Loading } from '../components';

const StartGame = () => {
  // const [storageAnswers, setStorageAnswers] = useState('');
  const { questions, setUserAnswers } = useContext(QuizContext);

  useEffect(() => {
    // const getStorage = localStorage.getItem('score');
    // getStorage ? setStorageAnswers(getStorage) : null;
    // localStorage.clear();
    setUserAnswers([]);
  }, []);

  // const handleCancel = () => {
  //   localStorage.setItem('score', storageAnswers);
  // };

  if (!questions) return <Loading />;

  return (
    <ButtonGroup className="game-buttons" variant="contained">
      <Button className="btn" onClick={() => localStorage.clear()}>
        <Link to="question/0">Start</Link>
      </Button>
      <Button className="cancel btn">
        <Link to="/">Cancel</Link>
      </Button>
    </ButtonGroup>
  );
};

export default StartGame;
