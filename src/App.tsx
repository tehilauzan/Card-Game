import React, { useState } from "react";
import { Game } from "./components/Game";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import "./App.css";
import Box from "@mui/material/Box";

function App() {
  const [showGame, setShowGame] = useState(false);
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");

  const handleClickNewGame = () => {
    player1 === "" && setPlayer1("player1");
    player2 === "" && setPlayer2("player2");
    setShowGame(true);
    return;
  };

  return (
    <div className="App">
      <div>
        {!showGame ? (
          <div>
            <Box component="form" autoComplete="off">
              <Typography>WHELCOME TO THE CARD GAME!!</Typography>
              <TextField
                sx={{ margin: "10px", marginTop: "100px" }}
                id="outlined-basic"
                label="Player 1 Name"
                variant="outlined"
                value={player1}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPlayer1(e.target.value)
                }
              />
              <TextField
                sx={{ margin: "10px", marginTop: "100px" }}
                id="outlined-basic"
                label="Player 2 Name"
                variant="outlined"
                value={player2}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPlayer2(e.target.value)
                }
              />
            </Box>
            <Button onClick={() => handleClickNewGame()}>
              START A NEW GAME
            </Button>
          </div>
        ) : (
          <Game names={{ player1, player2 }} />
        )}
      </div>
    </div>
  );
}

export default App;
