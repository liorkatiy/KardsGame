import dbFetch from "./dbFetch";
const { url, method, getData, fetcher } = dbFetch;

const deckUrl = url + "/deck";

/**
 * 
 * @param {string} name 
 * @returns {[{name:String,_id:String,kards:[],isDefault:boolean}]}
 */
async function getDeck(name, onlyName = "") {
  let r = await fetcher(deckUrl, method.GET, name ? {
    name,
    onlyName
  } : { onlyName });
  return getData(r);
}

/**
 * 
 * @param {string} name 
 * @param {string} newName 
 * @returns {boolean}
 */
async function renameDeck(name, newName, isDefault) {
  let r = await fetcher(deckUrl, method.PUT, {
    name,
    newName,
    isDefault
  });
  return getData(r);
}

/**
 * 
 * @param {string} name 
 * @returns {{name:string,isDefault:boolean,kards:[],_id:string}}
 */
async function addDeck(name, isDefault) {
  let r = await fetcher(deckUrl, method.POST, {
    name,
    isDefault
  });
  return getData(r);
}

/**
 * 
 * @param {string} name 
 * @returns {boolean}
 */
async function removeDeck(name) {
  let r = await fetcher(deckUrl, method.DELETE, {
    name
  });
  return getData(r);
}


export default {
  getDeck,
  renameDeck,
  addDeck,
  removeDeck
};
