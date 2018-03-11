import game from "../../util/serverFetcher/gameData";
import PQ from "../../util/priorityQueue";

function compareKards(k1, k2) {
  if (k1._id === k2._id)
    return 0;
  if (k1.score === k2.score)
    return Math.random() > 0.5 ? 1 : -1;
  return k1.score < k2.score ? 1 : -1;
}
const sharedData = { deck: undefined, kardata: undefined };
const kardsQ = new PQ(compareKards);

export async function getFirstKard(deckName) {
  const deck = await game.getGameKards(deckName);
  if (deck && deck.kards.length) {
    kardsQ.clear();
    kardsQ.enqueueMany(deck.kards);
    sharedData.deck = { name: deckName, index: deck.idx };
    return await getKard();
  }
  else {
    return false;
  }
}

export async function getNextKard(answer) {
  const { deck, kardata } = sharedData;
  const a = await game.getGameAnswer(deck.name, deck.index, kardata._id, answer);
  kardata.score += a ? 1 : 0;
  kardsQ.enqueue(kardata);
  const nextKard = await getKard();
  return { nextKard, a };
}

async function getKard() {
  sharedData.kardata = kardsQ.dequeue();
  const kard = await game.getGameKard(sharedData.deck.name, sharedData.kardata._id);
  return kard;
}