import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import App from './App';
import { QuizProvider } from './context/quiz';

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <QuizProvider>
        <App />
      </QuizProvider>
    </React.StrictMode>
  </Router>,
  document.getElementById('root')
);
