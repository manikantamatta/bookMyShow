const bcrypt = require('bcryptjs');
const Movie = require('../models/movie');
const Event = require('../models/event');

const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    throw new Error('Error hashing password');
  }
};

const comparePassword = async (candidatePassword, hashedPassword) => {
  try {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  } catch (error) {
    throw new Error('Error comparing passwords');
  }
};

function getDayGroupInfo(DayGroup) {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const startOfToday = new Date(today.setHours(0, 0, 0, 0));
  const endOfToday = new Date(today.setHours(23, 59, 59, 999));

  const startOfWeekend = new Date();
  startOfWeekend.setDate(today.getDate() + (6 - dayOfWeek));
  startOfWeekend.setHours(0, 0, 0, 0);

  const endOfWeekend = new Date();
  endOfWeekend.setDate(today.getDate() + (7 - dayOfWeek));
  endOfWeekend.setHours(23, 59, 59, 999);

  const startOfNextWeek = new Date();
  startOfNextWeek.setDate(today.getDate() + (8 - dayOfWeek));
  startOfNextWeek.setHours(0, 0, 0, 0);
  const endOfNextWeek = new Date();
  endOfNextWeek.setDate(today.getDate() + (14 - dayOfWeek));
  endOfNextWeek.setHours(23, 59, 59, 999);
  if (DayGroup === 'Today') {
      return { $gte: startOfToday, $lte: endOfToday };
  } else if (DayGroup === 'Weekend') {
      return { $gte: startOfWeekend, $lte: endOfWeekend };
  } else if (DayGroup === 'nxtWeek') {
      return { $gte: startOfNextWeek, $lte: endOfNextWeek };
  }

  return null;
}

/**
 * Get the Mongoose model based on the entity type.
 * @param {string} entity - The type of entity (MOV, EVE, PLY, SPO, ACT).
 * @returns {Model} The Mongoose model for the entity.
 */
function getModelName(entity) {
  let model;

  switch (entity) {
    case 'MOV':
      model = Movie;
      break;
    case 'EVE':
      model = Event;
      break;
    case 'PLY':
      model = Play;
      break;
    case 'SPO':
      model = Sport;
      break;
    case 'ACT':
      model = Activity;
      break;
    default:
      console.error(`Unknown entity type: ${entity}`);
      throw new Error('Invalid entity type');
  }

  return model;
}

function getFieldname(entity){
  if(entity==='MOV'){
    return 'likes';
  }
  else return 'interested'
}

function buildQuery(filters, additionalQuery = {}) {
  const query = { ...additionalQuery };
  if (filters) {
      if (filters.location) {
          query.city = filters.location;
      }
      if (filters.languages) {
          query.language = { $in: splitFilter(filters.languages) };
      }
      if (filters.format) {
          query.format = { $in: splitFilter(filters.format) };
      }
      if (filters.genre) {
          query.genre = { $in: splitFilter(filters.genre) };
      }
  }
  return query;
}

function splitFilter(filterString, delimiter = "|") {
  return filterString.split(delimiter);
}

function getlast7days(){
  const today = new Date();
  const last7days = new Date(today.setDate(today.getDate() - 7));
  return last7days;
}



module.exports = {
  hashPassword,
  comparePassword,
  getDayGroupInfo,
  getModelName,
  getFieldname,
  buildQuery,
  getlast7days
};