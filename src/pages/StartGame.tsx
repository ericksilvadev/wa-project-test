import { Button, ButtonGroup } from '@material-ui/core';
import { Link } from 'react-router-dom';

const StartGame = () => {
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
