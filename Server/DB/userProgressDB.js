const { userModel } = require("./models/userModel");
const deckDB = require("./deckDB");

const {
  onDeckRemoved,
  onKardAdded,
  onKardRemoved
} = require("./events");

async function addDeck(_id, deckName) {
  let kards = await deckDB.getKards(deckName);
  if (kards) {
    let result = await userModel.update({
      _id,
      progress: {
        $not: {
          $elemMatch: {
            name: deckName
          }
        }
      }
    }, {
        $push: {
          progress: {
            kards,
            name: deckName
          }
        }
      });
    return result;
  }
}

async function removeDeck(_id, deckName) {
  let result = await userModel.update({
    _id,
    progress: {
      $elemMatch: {
        name: deckName
      }
    }
  }, {
      $pull: {
        progress: {
          name: deckName
        }
      }
    });
  return result;
}

onKardAdded(async function (kard, deckName) {
  let user = await userModel.update({
    progress: {
      $elemMatch: {
        name: deckName
      }
    }
  }, {
      $push: {
        "progress.$.kards": {
          _id: kard.id
        }
      }
    }, {
      multi: true
    });
  return user;
});

onKardRemoved(async function (ID, deckName) {
  let user = await userModel.update({
    progress: {
      $elemMatch: {
        name: deckName
      }
    }
  }, {
      $pull: {
        "progress.$.kards": {
          _id: ID
        }
      }
    }, {
      multi: true
    });
  return user;
});

onDeckRemoved(async function (deckName) {
  let upt = await userModel.update({
    progress: {
      $elemMatch: {
        name: deckName
      }
    }
  }, {
      $pull: {
        progress: {
          name: deckName
        }
      }
    }, {
      multi: true
    });
  return upt;
});

module.exports = {
  addDeck,
  removeDeck
};