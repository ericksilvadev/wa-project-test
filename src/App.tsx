import { Routes, Route } from 'react-router-dom';

import { Landing, StartGame } from './pages';
import './styles/main.scss';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="game" element={<StartGame />} />
    </Routes>
  );
}

export default App;
