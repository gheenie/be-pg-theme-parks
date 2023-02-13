const db = require('../db/connection');
const format = require('pg-format');

exports.selectRidesByParkId = (park_id) => {
    const selectRidesByParkIdStr = format(
        `SELECT * 
        FROM rides 
        LEFT OUTER JOIN parks 
        ON rides.park_id = parks.park_id
        WHERE rides.park_id = %L;`,
        [park_id]
    );

    return db.query(selectRidesByParkIdStr)
    .then(selectParksResult => selectParksResult.rows);
};
