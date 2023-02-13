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
    });
}

function createParks() {
  /* Create your parks table in the query below */
  return db.query(`
    CREATE TABLE parks (
      park_id SERIAL PRIMARY KEY,
      park_name VARCHAR(50) NOT NULL,
      year_opened INT NOT NULL,
      annual_attendance INT NOT NULL
    );
  `);
}

function createRides() {
  return db.query(`
    CREATE TABLE rides (
      ride_id SERIAL PRIMARY KEY,
      ride_name VARCHAR(50) NOT NULL,
      year_opened INT NOT NULL,
      votes INT NOT NULL,
      park_id INT REFERENCES parks(park_id) ON DELETE SET NULL
    );
  `);
}

function arrangeParksData(parksData) {
  return parksData.map(park => [park.park_name, park.year_opened, park.annual_attendance]);
}

function insertParks() {
  const insertParksStr = format(`
    INSERT INTO parks (park_name, year_opened, annual_attendance)
    VALUES %L
    RETURNING *;
  `, arrangeParksData(parks));

  return db.query(insertParksStr)
  .then(insertParksResult => {
    //console.log(insertParksResult.rows);
  });
}

module.exports = { seed };
