import { useContext, useEffect, useState } from 'react';
import { Button, ButtonGroup } from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { QuizContext } from '../context/quiz';
import { Loading } from '../components';

const StartGame = () => {
  const [storageAnswers, setStorageAnswers] = useState('');
  const { setQuestions, quantity, questions, setUserAnswers } = useContext(QuizContext);

  const fetchQuestions = async () => {
    const { data } = await axios.get(`https://opentdb.com/api.php?amount=${quantity}`);
    setQuestions(data.results);
  };
  useEffect(() => {
    fetchQuestions();
    const getStorage = localStorage.getItem('score');
    getStorage ? setStorageAnswers(getStorage) : null;
    localStorage.clear();
    setUserAnswers([]);
  }, []);

  const handleCancel = () => {
    localStorage.setItem('score', storageAnswers);
  };

  if (!questions) return <Loading />;

  return (
    <ButtonGroup className="game-buttons" variant="contained">
      <Button className="btn">
        <Link to="question/0">Start</Link>
      </Button>
      <Button className="cancel btn" onClick={handleCancel}>
        <Link to="/">Cancel</Link>
      </Button>
    </ButtonGroup>
  );
};

export default StartGame;
