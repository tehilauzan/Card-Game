import { DOMAIN } from "../utils/Consts";
const axios = require("axios");

async function requestFromApi(route: string) {
  try {
    const response = await axios.get(`${DOMAIN}${route}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export class AppService {
  public async shuffleCards() {
    const result = requestFromApi("new/shuffle/?deck_count=1");
    return result;
  }

  public async drawCard(deckId: string) {
    const result = requestFromApi(`${deckId}/draw/?count=2`);
    return result;
  }

  public async reshuffleCards(deckId: string) {
    const result = requestFromApi(`${deckId}/shuffle/?remaining=true`);
    return result;
  }

  public async addingToPiles(
    deckId: string,
    pileName: string,
    cardCodes: string
  ) {
    const result = requestFromApi(
      `${deckId}/pile/${pileName}/add/?cards=${cardCodes}`
    );
    return result;
  }

  public async listingCardsInPiles(pileName: string, deckId: string) {
    const result = requestFromApi(`${deckId}/pile/${pileName}/list/`);
    return result;
  }

  public async returningCards(deckId: string, cardCodes: string) {
    const result = requestFromApi(`${deckId}/return/?cards=${cardCodes}`);
    return result;
  }
}
