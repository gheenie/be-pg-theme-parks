const db = require('../db/connection');
const format = require('pg-format');

exports.selectParks = () => {
    return db.query('SELECT * FROM parks;')
    .then(selectParksResult => selectParksResult.rows);
};

function arrangeParkUpdates(parkUpdates) {
    parkUpdates = JSON.parse( JSON.stringify(parkUpdates) );

    const rearrangedParkUpdates = {
        column_names: [],
        column_values: []
    };

    for ( const [key, value] of Object.entries(parkUpdates) ) {
        column_names.push(key);
        column_values.push(value);
    }

    return ridesData.map(ride => [ride.ride_name, ride.year_opened, ride.votes, ride.park_id]);
  }

exports.updateParkById = (parkId, parkUpdates) => {
    const updateParksStr = format(
        `UPDATE parks
        SET park_name = updating.park_name, annual_attendance = updating.annual_attendance
        FROM (VALUES
            (%L, %s)
        ) AS updating(%I, park_id)
        WHERE updating.park_id = parks.park_id
        RETURNING *;`,
        Object.values(parkUpdates), parkId, Object.keys(parkUpdates)
    );

    console.log(updateParksStr);
    console.log(Object.values(parkUpdates));

    return db.query(updateParksStr)
    .then(updateParksResult => updateParksResult.rows);
};

exports.removeParkById = () => {};
