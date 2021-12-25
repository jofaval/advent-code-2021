/**
 * Cleans the input, and prepares it
 * 
 * @param {String} input The raw input
 * 
 * @returns {String}
 */
const clean = input => {
    input = input.trim()

    // debug('the cleaned input', input);
    return input;
};

const JUMPLINE = "\r\n";

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
    // input = input.split('\n\n');

    // Parse to int each number
    // input = input.map(line => line.split('').map(number => parseInt(number)));

    return input
}

/**
 * Display in console, only if debugging mode is active
 * 
 * @param  {...any} value The values to display
 * 
 * @returns {void}
 */
const debug = (...value) => {
    if (!DEBUG) return;

    console.log(...value);
}

/**
 * Displays an array
 * 
 * @param {Number[]} array The array to reformat for displaying
 * @param {String} separator The separator between array lines
 * @param {String} title The title of the displayal
 * 
 * @returns {void}
 */
const display = (array, separator = ',', title = '') => {
    if (title) console.log(title);

    const reformatted = array.map(line => line.join(separator)).join('\n');
    console.log(reformatted);
    console.log();
}

const DOT_ON_PAPER = '#';
const EMPTY_ON_PAPER = '.';

/**
 * Parses the coordinates to it's true values
 * 
 * @param {String} coordinates The raw coordinates
 * 
 * @returns {String[]}
 */
const parseCoordinates = coordinates => {
    return coordinates
        .split('\n')
        .map(line => {
            debug({ raw: line });

            line = line
                .trim()
                .split(',')
                .map(number => parseInt(number))

            debug({ coordinate: line });

            return line;
        });
}

/**
 * Parses the instructions and it's values
 * 
 * @param {String} instructions The raw instructions
 * 
 * @returns {String[]}
 */
const parseInstructions = instructions => {
    return instructions
        .split('\n')
        .map(instruction => {
            debug({ instruction: instruction.trim() });
            // Remove the "fold along"
            let temp = instruction.trim().split(' ');
            temp = temp[temp.length - 1];
            // Split by assignation
            temp = temp.trim().split('=');
            // Parse to int the numeric value
            temp = [ temp[0], parseInt(temp[1]) ];

            return temp;
        });
};

const HORIZONTAL_FOLD = 'x';
const VERTICAL_FOLD = 'y';

/**
 * Folds the "paper" horizontally
 * 
 * @param {String[]} cloudOfPoints The cloud of points
 * @param {Number} by The value from which to fold
 * 
 * @returns {String[]}
 */
const horizontalFold = (cloudOfPoints, by) => {
    debug('Number of rows before horizontal folding', cloudOfPoints.length);

    // Reimplement the horizontal folding
    let toBeFolded = cloudOfPoints
        .map(row => row.splice(by, by + 1));
    // Reverse the values, not the most efficient way, but it does totally work, maybe :)
    toBeFolded = toBeFolded.map(row => row.reverse());

    // Iterate the rows
    const toBeFoldedLen = toBeFolded.length;
    for (let toBeFoldedIndex = 0; toBeFoldedIndex < toBeFoldedLen; toBeFoldedIndex++) {
        const row = toBeFolded[toBeFoldedIndex];

        // Iterate the cols
        const cols = row.length;
        for (let colIndex = 0; colIndex < cols; colIndex++) {
            const value = row[colIndex];

            // If the folded value is a dot, replace it
            if (value == DOT_ON_PAPER) {
                cloudOfPoints[toBeFoldedIndex][colIndex] = DOT_ON_PAPER;
            }
        }
    }

    debug('After horizontal folding', cloudOfPoints.length);

    return cloudOfPoints;
}

/**
 * Folds the "paper" vertically
 * 
 * @param {String[]} cloudOfPoints The cloud of points
 * @param {Number} by The value from which to fold
 * 
 * @returns {String[]}
 */
const verticalFold = (cloudOfPoints, by) => {
    debug('Number of rows before vertical folding', cloudOfPoints.length);

    let toBeFolded = cloudOfPoints.splice(by, by + 1);
    // Reverse the values, not the most efficient way, but it does totally work, maybe :)
    toBeFolded = toBeFolded.reverse();

    // Iterate the rows
    const toBeFoldedLen = toBeFolded.length;
    for (let toBeFoldedIndex = 0; toBeFoldedIndex < toBeFoldedLen; toBeFoldedIndex++) {
        const row = toBeFolded[toBeFoldedIndex];

        // Iterate the cols
        const cols = row.length;
        for (let colIndex = 0; colIndex < cols; colIndex++) {
            const value = row[colIndex];

            // If the folded value is a dot, replace it
            if (value == DOT_ON_PAPER) {
                cloudOfPoints[toBeFoldedIndex][colIndex] = DOT_ON_PAPER;
            }
        }
    }

    // Iterate the rows
    /* for (let foldingIndex = 0; foldingIndex < by; foldingIndex++) {
        const row = cloudOfPoints[foldingIndex + by];

        // Iterate the cols
        const cols = row.length;
        for (let colIndex = 0; colIndex < cols; colIndex++) {
            const value = row[colIndex];

            // If the folded value is a dot, replace it
            if (value == DOT_ON_PAPER) {
                cloudOfPoints[foldingIndex][colIndex] = DOT_ON_PAPER;
            }
        }
    }

    // The removal
    cloudOfPoints = cloudOfPoints.splice(by + 1, by); */

    debug('After vertical folding', cloudOfPoints.length);

    return cloudOfPoints;
}

/**
 * Folds a paper by the given direction
 * 
 * @param {String[]} cloudOfPoints The cloud of points
 * @param {String} direction The direction char
 * @param {Number[]} by The value from which to fold
 * 
 * @returns {String[]}
 */
const fold = (cloudOfPoints, direction, by) => {
    debug('It will try to fold the paper', { direction, by, rows: cloudOfPoints.length, cols: cloudOfPoints[0].length });

    // if (direction == HORIZONTAL_FOLD) return horizontalFold(cloudOfPoints, by);
    if (direction == VERTICAL_FOLD) return verticalFold(cloudOfPoints, by);

    return cloudOfPoints;
};

/**
 * Find the total flahses after a 100 days
 * 
 * @param {String} input The raw input
 * 
 * @returns {Number}
 */
const main = (input) => {
    input = clean(input);
    let [ coordinates, instructions ] = input.split(JUMPLINE + JUMPLINE);
    // Map all the coordinates
    coordinates = parseCoordinates(coordinates);
    const coordinatesLen = coordinates.length;

    let width = Number.MIN_SAFE_INTEGER;
    let height = Number.MIN_SAFE_INTEGER;

    // Map all the coordinates to find the highest of each to create and fill the array
    for (let coordinateIndex = 0; coordinateIndex < coordinatesLen; coordinateIndex++) {
        const [ cols, rows ] = coordinates[coordinateIndex];

        if (rows > width) width = rows;
        if (cols > height) height = cols;
    }

    // Fill the cloud of points with empty spots
    let cloudOfPoints = Array.from({ length: width + 1 }, () => (
        Array.from({ length: height + 1 }, ()=> EMPTY_ON_PAPER)
    ));

    if (DEBUG) display(cloudOfPoints, '', 'The empty cloud of points');

    // Map the coordinates to place the dots on the paper
    for (let coordinateIndex = 0; coordinateIndex < coordinatesLen; coordinateIndex++) {
        const [ y, x ] = coordinates[coordinateIndex];

        debug('Trying to fill the coodinate', { x, y });

        // A dot on the paper
        cloudOfPoints[x][y] = DOT_ON_PAPER;
    }

    if (DEBUG) display(cloudOfPoints, '', 'The filled cloud of points:');

    // Map all the instructions
    instructions = parseInstructions(instructions);
    debug('instructions', instructions);

    // Execute all the folding instructions
    const instructionsLen = instructions.length;
    for (let instructionIndex = 0; instructionIndex < instructionsLen; instructionIndex++) {
        const [ direction, by ] = instructions[instructionIndex];

        // Fold the paper
        cloudOfPoints = fold(cloudOfPoints, direction, by);
    }

    // The cloud of points after all the folding
    if (DEBUG) display(cloudOfPoints, '', 'The cloud of points after all the folding:');

    // The total amount of visible points
    let totalPoints = 0;

    // Iterate each row
    const cloudOfPointsLen = cloudOfPoints.length
    for (let rowIndex = 0; rowIndex < cloudOfPointsLen; rowIndex++) {
        const row = cloudOfPoints[rowIndex];
        
        // Iterate each col
        const cols = row.length;
        for (let colIndex = 0; colIndex < cols; colIndex++) {
            const col = row[colIndex];

            // Increment the total value
            if (col == DOT_ON_PAPER) totalPoints++;
        }
    }

    console.log('The total number of visible points is:', totalPoints);

    return totalPoints;
};

const fs = require('fs')

const testFile = 'test-input.txt';
const inputFile = 'input.txt';
const file = inputFile;
const separator = '\\';
// TODO: create utility modules
const dir = [ process.cwd(), '13-12-2021', file ].join(separator);
const encoding = 'UTF-8';
const input = fs.readFileSync(dir, encoding);

const DEBUG = false;
main(input);