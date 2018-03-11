import dbFetch from "./dbFetch";
const { url, method, getData, fetcher } = dbFetch;
const kardUrl = url + "/kard";

/**
 *  @param {string} deckName 
 * @param {{q:string,a:string}} kard 
 */
async function addKard(deckName, kard) {
  let r = await fetcher(kardUrl, method.POST, {
    deckName,
    kard
  });
  return getData(r);
}

/**
 * 
 * @param {string} deckName 
 * @param {string} id 
 */
async function removeKard(deckName, id) {
  let r = await fetcher(kardUrl, method.DELETE, {
    id,
    deckName
  });
  return getData(r);
}

async function editKard(kard, deckName) {
  let r = await fetcher(kardUrl, method.PUT, {
    kard,
    deckName
  });
  return getData(r);
}

export default {
  addKard,
  removeKard,
  editKard
};