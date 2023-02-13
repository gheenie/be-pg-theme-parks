const { parks, rides, stalls } = require('./data/index.js');

const db = require('./connection');
const format = require('pg-format');

function seed() {
  return db
    .query('DROP TABLE IF EXISTS rides;')
    .then(() => {
      return db.query('DROP TABLE IF EXISTS stalls;');
    })
    .then(() => {
      return db.query('DROP TABLE IF EXISTS foods;');
    })
    .then(() => {
      return db.query('DROP TABLE IF EXISTS stalls_foods;');
    })
    .then(() => {
      return db.query('DROP TABLE IF EXISTS parks;');
    })
    .then(() => {
      return createParks();
    })
    .then(() => {
      return createRides();
    })
    .then(() => {
      return insertParks();
    }).then(insertedParks => {
      const lookedUpRides = prepareRidesData(rides, insertedParks);

      return insertRides(lookedUpRides);
    });
}

function createParks() {
  /* Create your parks table in the query below */
  return db.query(
    `CREATE TABLE parks (
      park_id SERIAL PRIMARY KEY,
      park_name VARCHAR(50) NOT NULL,
      year_opened INT NOT NULL,
      annual_attendance INT NOT NULL
    );`
  );
}

function createRides() {
  return db.query(
    `CREATE TABLE rides (
      ride_id SERIAL PRIMARY KEY,
      ride_name VARCHAR(50) NOT NULL,
      year_opened INT NOT NULL,
      votes INT NOT NULL,
      park_id INT REFERENCES parks(park_id) ON DELETE SET NULL
    );`
  );
}

function arrangeParksData(parksData) {
  return parksData.map(park => [park.park_name, park.year_opened, park.annual_attendance]);
}

function insertParks() {
  const insertParksStr = format(
    `INSERT INTO parks (park_name, year_opened, annual_attendance)
    VALUES %L
    RETURNING *;`,
    arrangeParksData(parks)
  );

  return db.query(insertParksStr)
  .then(insertParksResult => insertParksResult.rows);
}

function prepareRidesData(rides, parks) {
  if (rides.length === 0) return [];

  rides = JSON.parse( JSON.stringify(rides) );
  parks = JSON.parse( JSON.stringify(parks) );

  const parksLookup = {};
  parks.forEach(park => parksLookup[park.park_name] = park.park_id);

  return rides.map(ride => {
    ride.park_id = parksLookup[ride.park_name];
    
    delete ride.park_name;
    
    return ride;
  });
}

function arrangeRidesData(ridesData) {
  return ridesData.map(ride => [ride.ride_name, ride.year_opened, ride.votes, ride.park_id]);
}

function insertRides(lookedUpRides) {
  const insertRidesStr = format(
    `INSERT INTO parks (ride_name, year_opened, votes, park_id)
    VALUES %L
    RETURNING *;`,
    arrangeRidesData(lookedUpRides)
  );

  return db.query(insertRidesStr)
  .then(insertRidesResult => insertRidesResult.rows);
}

module.exports = { seed, prepareRidesData, arrangeRidesData };
