import React, { useCallback, useEffect, useState } from "react";
import { AppService } from "../services/app.service";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  ImageList,
} from "@mui/material";
import deckCards from "../deckCards.jpg";
import Grid from "@mui/material/Grid";
import useWindowSize from "react-use/lib/useWindowSize";
import { makeStyles } from "@mui/styles";
import { setValueOfCard } from "../utils/Functions";
import Confetti from "react-confetti/";

const useStyles = makeStyles({
  root: {
    marginTop: "300px",
  },
  imgDeck: {
    marginTop: "30px",
    borderRadius: 5,
    height: 150,
    width: 100,
    backgroundImage: `url(${deckCards})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
});

export interface responseCards {
  images: { png: string };
  value: string;
  suit: string;
  code: string;
}

export interface GameProps {
  names: {
    player1: string;
    player2: string;
  };
}
const appService = new AppService();

export function Game({ names }: GameProps) {
  const classes = useStyles();
  const { width, height } = useWindowSize();
  const [open, setOpen] = useState(false);
  const [winner, setWinner] = useState("");
  const [deckId, setDeckId] = useState("");
  const [responseCards, setResponseCards] = useState<responseCards[]>([]);

  const shuffleCardsApi = useCallback(async () => {
    const response = await appService.shuffleCards();
    if (response.success === true) {
      setDeckId(response.deck_id);
    }
  }, []);

  useEffect(() => {
    void shuffleCardsApi();
  }, [shuffleCardsApi]);

  const handleStartGame = () => {
    setWinner("");
    setOpen(false);
    window.location.reload();
  };

  const addingToPilesApi = async (pileName: string, cardCodes: string) => {
    await appService.addingToPiles(deckId, pileName, cardCodes);
  };

  const reshuffleCardsApi = async () => {
    await appService.reshuffleCards(deckId);
  };

  const compreCardsAndAddToPile = (responseCards: responseCards[]) => {
    const value1 = setValueOfCard(responseCards[0].value);
    const value2 = setValueOfCard(responseCards[1].value);
    value1 === value2
      ? reshuffleCardsApi()
      : value1 > value2
      ? addingToPilesApi(names.player1, responseCards[0].code)
      : addingToPilesApi(names.player2, responseCards[1].code);
  };

  const listingCardsInPilesApi = async () => {
    const response = await appService.listingCardsInPiles(
      names.player1,
      deckId
    );
    setWinner(
      response.piles[names.player1].remaining >
        response.piles[names.player2].remaining
        ? names.player1
        : names.player2
    );
    setOpen(true);
  };

  const drawCardApi = async () => {
    const { success, remaining, cards } = await appService.drawCard(deckId);
    if (success === false && remaining === 0) {
      listingCardsInPilesApi();
    }
    if (success === true) {
      setResponseCards(cards);
      compreCardsAndAddToPile(cards);
    }
  };

  return (
    <div className="game">
      <Grid container direction="row" justifyContent="center">
        <Grid item xs={12}>
          <Button
            className={classes.imgDeck}
            onClick={() => {
              drawCardApi();
            }}
          />
        </Grid>
        <ImageList cols={2}>
          {responseCards.map((card, i) => {
            return (
              <div key={i}>
                <h1>{i === 1 ? names.player1 : names.player2}</h1>
                <img src={card.images.png} alt={card.code} />
              </div>
            );
          })}
        </ImageList>
      </Grid>
      {open && (
        <Grid>
          <Confetti width={width} height={height} />
          <Dialog
            open={open}
            onClose={() => {
              setOpen(false);
            }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                The winner is {winner}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleStartGame}>New Game</Button>
            </DialogActions>
          </Dialog>
        </Grid>
      )}
    </div>
  );
}
