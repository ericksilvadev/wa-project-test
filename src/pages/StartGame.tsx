import { useContext, useEffect, useState } from 'react';
import { Button, ButtonGroup } from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { QuizContext } from '../context/quiz';

const StartGame = () => {
  const { setQuestions, quantity, questions } = useContext(QuizContext);

  const fetchQuestions = async () => {
    const { data } = await axios.get(
      `https://opentdb.com/api.php?amount=${quantity}`
    );
    setQuestions(data.results);
  };
  useEffect(() => {
    fetchQuestions();
  }, []);

  if (!questions.length) return <h1>loading</h1>;

  return (
    <ButtonGroup className="game-buttons" variant="contained">
      <Button className="btn">
        <Link to="question/0">Start</Link>
      </Button>
      <Button className="cancel btn">
        <Link to="/">Cancel</Link>
      </Button>
    </ButtonGroup>
  );
};

export default StartGame;
