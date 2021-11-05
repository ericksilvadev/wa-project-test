import { Routes, Route } from 'react-router-dom';

import { Landing, Question, StartGame } from './pages';
import './styles/main.scss';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="game" element={<StartGame />} />
      <Route path="game/question/:id" element={<Question />} />
    </Routes>
  );
}

export default App;
