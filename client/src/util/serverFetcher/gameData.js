import dbFetch from "./dbFetch";
const { url, method, getData, fetcher } = dbFetch;

const gameUrl = url + "/game";

/**
 * 
 * @returns {[]}
 */
async function getGameDeck() {
  let r = await fetcher(gameUrl + "/deck", method.POST, {});
  return getData(r);
}

/**
 * 
 * @param {string} deckName 
 * @returns {{kards:[{score:number,_id:string}],idx:number,}}
 */
async function getGameKards(deckName) {
  let r = await fetcher(gameUrl + "/kards", method.POST, {
    deckName
  });
  return getData(r);
}

/**
 * 
 * @param {string} deckName 
 * @param {string} kardID 
 * @returns {{_id:string,q:string,q1:string,q2:string,q3:string,q4:string}}
 */
async function getGameKard(deckName, kardID) {
  let r = await fetcher(gameUrl + "/kard", method.POST, {
    deckName,
    kardID
  });
  return getData(r);
}

/**
 * 
 * @param {string} deckName 
 * @param {number} idx 
 * @param {string} kardID 
 * @param {string} answer 
 * @returns {boolean}
 */
async function getGameAnswer(deckName, idx, kardID, answer) {
  let r = await fetcher(gameUrl + "/answer", method.POST, {
    idx,
    deckName,
    kardID,
    answer
  });
  return getData(r);
}

export default {
  getGameAnswer,
  getGameDeck,
  getGameKard,
  getGameKards
};