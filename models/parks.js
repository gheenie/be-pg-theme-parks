const db = require('../db/connection');

exports.selectParks = () => {
    return db.query('SELECT * FROM parks;')
    .then(selectParksResult => selectParksResult.rows);
};

exports.updateParkById = () => {};

exports.removeParkById = () => {};
