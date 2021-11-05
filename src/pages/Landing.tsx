import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Button, TextField } from '@material-ui/core';
import axios from 'axios';
import * as yup from 'yup';

import { QuizContext } from '../context/quiz';
import decodeQuestions from '../helpers/decodeQuestions';
import logo from '../images/logo.svg';

const Landing = () => {
  const { quantity, setQuantity, setQuestions } = useContext(QuizContext);
  const navigate = useNavigate();

  const lastScore = localStorage.getItem('score');

  const fetchQuestions = async (qty: number | string) => {
    const { data } = await axios.get(`https://opentdb.com/api.php?amount=${qty}`);
    const questions = decodeQuestions(data.results);
    console.log(questions);

    setQuestions(questions);
  };

  const validationSchema = yup.object({
    quantity: yup
      .number()
      .required('Quantidade é obrigatória')
      .positive('Quantidade tem que ser um número positivo')
      .integer('Quantidade tem que ser um número inteiro')
      .max(50, 'Máximo de 50 perguntas')
      .min(1, 'Deve haver pelo menos uma pergunta'),
  });

  const formik = useFormik({
    initialValues: {
      quantity,
    },
    validationSchema,
    onSubmit: (values) => {
      setQuantity(values.quantity);
      navigate('game');
      fetchQuestions(values.quantity);
    },
  });

  return (
    <div className="landing-page">
      <h1 className="landing-title">
        <img src={logo} alt="" />
        Quiz
      </h1>
      <main>
        <h2>Set the amount of questions</h2>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            className="qty-input"
            type="number"
            name="quantity"
            placeholder="1-50"
            value={formik.values.quantity}
            onChange={formik.handleChange}
            error={formik.touched.quantity && Boolean(formik.errors.quantity)}
            helperText={formik.touched.quantity && formik.errors.quantity}
            autoComplete="no"
          />
          <Button
            className="next-btn"
            variant="contained"
            type="submit"
            disabled={Boolean(formik.errors.quantity) || !formik.values.quantity}
          >
            Next
          </Button>
        </form>
        {lastScore && (
          <Button variant="contained" className="latest-game">
            <Link to="game/feedback">Latest game</Link>
          </Button>
        )}
      </main>
    </div>
  );
};

export default Landing;
