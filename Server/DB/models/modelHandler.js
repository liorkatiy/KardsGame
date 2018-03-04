const {
  log
} = require("../../logger");

module.exports = function modelHandler(model, name) {
  return {
    aggregate: async function (aggregation) {
      try {
        let result = await model.aggregate(aggregation);
        return result;
      } catch (e) {
        log(e.message, name + ' update');
        return false;
      }
    },

    update: async function (query, update, options) {
      try {
        let result = await model.update(query, update, options);
        return result.nModified > 0;
      } catch (e) {
        log(e.message, name + ' update');
        return false;
      }
    },

    findOneAndUpdate: async function (query, update, options) {
      try {
        let result = await model.findOneAndUpdate(query, update, options);
        return result;
      } catch (e) {
        log(e.message, name + ' findOneAndUpdate');
        return false;
      }
    },

    findOne: async function findOne(query, options) {
      try {
        let result = await model.findOne(query, options);
        return result;
      } catch (e) {
        log(e.message, name + ' findOne');
        return false;
      }
    },

    find: async function (query = {}, options = {}) {
      try {
        let result = await model.find(query, options);
        return result;
      } catch (e) {
        log(e.message, name + ' find');
        return false;
      }
    },

    count: async function (query = {}) {
      try {
        let result = await model.count(query);
        return result;
      } catch (e) {
        log(e.message, name + ' count');
        return false;
      }
    },

    create: async function (obj) {
      try {
        let result = await new model(obj).save();
        return result;
      } catch (e) {
        log(e.message, name + ' create');
        return false;
      }
    },

    populate: async function (_model, options) {
      try {
        let result = await model.populate(_model, options);
        return result;
      } catch (e) {
        log(e.message, name + ' create');
        return false;
      }
    },

    remove: async function (query) {
      try {
        let result = await model.remove(query);
        return result.n > 0;
      } catch (e) {
        log(e.message, name + ' remove');
        return false;
      }
    }
  };
};