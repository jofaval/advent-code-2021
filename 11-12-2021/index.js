/**
 * Cleans the input, and prepares it
 * 
 * @param {String} input The raw input
 * 
 * @returns {String}
 */
const clean = input => input.trim();

/**
 * Creates the array
 * 
 * @param {String} input The raw input
 * 
 * @returns {Number[]}
 */
const prepare = input => {
    // Clean the raw input
    input = clean(input);

    // split each line
    input = input.split('\n');

    // Parse to int each number
    input = input.map(line => line.split('').map(number => parseInt(number) ));

    return input
}

const MAX_NUMBER_BEFORE_FLASH = 9;
let count = 0;

/**
 * Simulates a day on a single octopus and it's adjacents
 * 
 * @param {Number[]} octopuses The octopuses
 * @param {Number} rowIndex The row index
 * @param {Number} colIndex The col index
 * @param {Set} alreadyFlashed The previously flashed octopuses
 * 
 * @returns {Number[]}
 */
const simulateDay = (octopuses, rowIndex, colIndex, alreadyFlashed) => {

    const axis = [ rowIndex, colIndex ];
    // If it already exists, it has been flashed, don't run it againt
    if (alreadyFlashed && alreadyFlashed.has(axis)) return [ octopuses, alreadyFlashed ];

    // Get the actual value
    let octopus = octopuses[rowIndex][colIndex];

    // Get the lens
    const octopusesLen = octopuses.length;
    const octopusesRowLen = octopuses[rowIndex].length;

    // Increment the value
    octopus++;

    // Save the value
    octopuses[rowIndex][colIndex] = octopus;

    // If a flash didn't occurr, don't touch the others
    if (octopus < MAX_NUMBER_BEFORE_FLASH) return [ octopuses, alreadyFlashed ];

    // if (alreadyFlashed) {
    // It flahses
    if (DEBUG) console.log('flashes', { octopus, rowIndex, colIndex });
    octopus = 0;
    octopuses[rowIndex][colIndex] = octopus;
    alreadyFlashed.add(axis);
    // }

    return [ octopuses, alreadyFlashed ];

    // ---------------------------------
    // Process each octopus individually
    // ---------------------------------

    // Simulate the horizontal octopuses
    if (colIndex >= 1) {
        [ octopuses, alreadyFlashed ] = simulateDay(octopuses, rowIndex, colIndex - 1, alreadyFlashed);
    }
    if (colIndex < octopusesRowLen - 1) {
        [ octopuses, alreadyFlashed ] = simulateDay(octopuses, rowIndex, colIndex + 1, alreadyFlashed);
    }

    // Simulate the vertical octopuses
    if (rowIndex >= 1) {
        [ octopuses, alreadyFlashed ] = simulateDay(octopuses, rowIndex - 1, colIndex, alreadyFlashed);
    }
    if (rowIndex < octopusesLen - 1) {
        [ octopuses, alreadyFlashed ] = simulateDay(octopuses, rowIndex + 1, colIndex, alreadyFlashed);
    }

    // Simulate diagonal octopuses
    // Simulate top-left
    if (rowIndex >= 1 && colIndex >= 1) {
        [ octopuses, alreadyFlashed ] = simulateDay(octopuses, rowIndex - 1, colIndex - 1, alreadyFlashed);
    }
    // Simulate top-right
    if (rowIndex >= 1 && colIndex < octopusesRowLen - 1) {
        [ octopuses, alreadyFlashed ] = simulateDay(octopuses, rowIndex - 1, colIndex + 1, alreadyFlashed);
    }
    // Simulate bottom-left
    if (rowIndex < octopuses - 1 && colIndex >= 1) {
        [ octopuses, alreadyFlashed ] = simulateDay(octopuses, rowIndex + 1, colIndex - 1, alreadyFlashed);
    }
    // Simulate bottom-right
    if (rowIndex < octopuses - 1 && colIndex < octopusesRowLen - 1) {
        [ octopuses, alreadyFlashed ] = simulateDay(octopuses, rowIndex + 1, colIndex + 1, alreadyFlashed);
    }

    return [ octopuses, alreadyFlashed ];
}

/**
 * Displays an array
 * 
 * @param {Number[]} array The array to reformat for displaying
 * @param {String} separator The separator between array lines
 * 
 * @returns {void}
 */
const display = (array, separator = ',') => {
    const reformatted = array.map(line => line.join(separator)).join('\n');
    console.log(reformatted);
    console.log();
}

/**
 * Find the total flahses after a 100 days
 * 
 * @param {String} input The raw input
 * @param {Number} days The total number of days
 * 
 * @returns {Number}
 */
const main = (input, days = 2) => {
    let octopuses = prepare(input);
    if (DEBUG) console.log('octopuses', octopuses);

    let totalFlashes = 0;

    const octopusesLen = octopuses.length;

    if (DEBUG) {
        console.log('Before any step:');
        display(octopuses);
    }

    // Simulate each day
    for (let day = 0; day < days; day++) {
        let alreadyFlashed = new Set();

        // Iterate each row
        for (let rowIndex = 0; rowIndex < octopusesLen; rowIndex++) {
            // Iterate each octopus
            const octopusesRowLen = octopuses[rowIndex].length;
            for (let colIndex = 0; colIndex < octopusesRowLen; colIndex++) {
                [ octopuses, alreadyFlashed ] = simulateDay(octopuses, rowIndex, colIndex, alreadyFlashed);

            }
        }

        totalFlashes += alreadyFlashed.size;

        if (DEBUG) {
            console.log(`After day ${day + 1}, ${totalFlashes} flash(es)`);
            display(octopuses, '');
        }
    }

    // if (DEBUG) display(octopuses);

    console.log('The total number of flahses is:', totalFlashes);

    return totalFlashes;
};

const input = `
5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526
 `;

const DEBUG = true;
main(input);