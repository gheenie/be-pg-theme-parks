/* make sure you write your tests for your utils functions in here :eyes: */

const { prepareRidesData,arrangeRidesData } = require('../db/seed');

describe('prepareRidesData()', () => {
    const parks = [
        { park_name: 'Thorpe Park', year_opened: 1979, annual_attendance: 1700000, park_id: 1 },
        { park_name: 'Alton Towers', year_opened: 1980, annual_attendance: 2520000, park_id: 2 },
        {
            park_name: 'Chessington World of Adventures',
            year_opened: 1987,
            annual_attendance: 1400000,
            park_id: 3
        },
        {
            park_name: 'Tivoli Gardens',
            year_opened: 1843,
            annual_attendance: 3972000,
            park_id: 4
        },
    ];

    test('empty rides array', () => {
        const rides = [];

        const output = prepareRidesData(rides, parks);

        const expected = [];

        expect(output).toEqual(expected);
    });
    
    test('1 rides item', () => {
        const rides = [
            {
                ride_name: 'Colossus',
                year_opened: 2002,
                park_name: 'Thorpe Park',
                votes: 5,
            }
        ];

        const output = prepareRidesData(rides, parks);

        const expected = [
            {
                ride_name: 'Colossus',
                year_opened: 2002,
                park_id: 1,
                votes: 5,
            }
        ];

        expect(output).toEqual(expected);
    });
    
    test('>1 rides item', () => {
        const rides = [
            {
                ride_name: 'Colossus',
                year_opened: 2002,
                park_name: 'Thorpe Park',
                votes: 5,
            },
            {
                ride_name: 'Nemesis',
                year_opened: 1994,
                park_name: 'Alton Towers',
                votes: 5,
            }
        ];

        const output = prepareRidesData(rides, parks);

        const expected = [
            {
                ride_name: 'Colossus',
                year_opened: 2002,
                park_id: 1,
                votes: 5,
            },
            {
                ride_name: 'Nemesis',
                year_opened: 1994,
                park_id: 2,
                votes: 5,
              }
        ];

        expect(output).toEqual(expected);
    });
    
    test('inputs not mutated', () => {
        const rides = [
            {
                ride_name: 'Colossus',
                year_opened: 2002,
                park_name: 'Thorpe Park',
                votes: 5,
            },
            {
                ride_name: 'Nemesis',
                year_opened: 1994,
                park_name: 'Alton Towers',
                votes: 5,
            }
        ];

        const output = prepareRidesData(rides, parks);

        let expected = [
            {
                ride_name: 'Colossus',
                year_opened: 2002,
                park_name: 'Thorpe Park',
                votes: 5,
            },
            {
                ride_name: 'Nemesis',
                year_opened: 1994,
                park_name: 'Alton Towers',
                votes: 5,
            }
        ];

        expect(output).not.toBe(rides);
        expect(output[0]).not.toBe(rides[0]);
        expect(rides).toEqual(expected);

        expected = [
            { park_name: 'Thorpe Park', year_opened: 1979, annual_attendance: 1700000, park_id: 1 },
            { park_name: 'Alton Towers', year_opened: 1980, annual_attendance: 2520000, park_id: 2 },
            {
                park_name: 'Chessington World of Adventures',
                year_opened: 1987,
                annual_attendance: 1400000,
                park_id: 3
            },
            {
                park_name: 'Tivoli Gardens',
                year_opened: 1843,
                annual_attendance: 3972000,
                park_id: 4
            },
        ];

        expect(parks).toEqual(expected);
    });
});

describe('arrangeRidesData()', () => {
    test('empty rides array', () => {
        const rides = [];

        const output = arrangeRidesData(rides);

        const expected = [];

        expect(output).toEqual(expected);
    });

    test('>1 rides item', () => {
        const rides = [
            {
                ride_name: 'Colossus',
                year_opened: 2002,
                park_id: 1,
                votes: 5,
            },
            {
                ride_name: 'Nemesis',
                year_opened: 1994,
                park_id: 2,
                votes: 5,
              }
        ];

        const output = arrangeRidesData(rides);

        const expected = [['Colossus', 2002, 5, 1], ['Nemesis', 1994, 5, 2]];

        expect(output).toEqual(expected);
    });

    test('input not mutated', () => {
        const rides = [
            {
                ride_name: 'Colossus',
                year_opened: 2002,
                park_id: 1,
                votes: 5,
            },
            {
                ride_name: 'Nemesis',
                year_opened: 1994,
                park_id: 2,
                votes: 5,
              }
        ];

        const output = arrangeRidesData(rides);

        const expected = [
            {
                ride_name: 'Colossus',
                year_opened: 2002,
                park_id: 1,
                votes: 5,
            },
            {
                ride_name: 'Nemesis',
                year_opened: 1994,
                park_id: 2,
                votes: 5,
              }
        ];

        expect(rides).toEqual(expected);
        expect(output).not.toBe(rides);
    });
});

