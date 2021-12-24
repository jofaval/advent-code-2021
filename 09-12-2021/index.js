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
    // split each line
    input = input.split('\n');

    // Map the lines, and parses each col to int
    input = input.map(line => {
        return line.trim().split('').map(
            col => parseInt(col)
        )
    });

    return input
}

/**
 * Determins wether is a low point or not
 * 
 * @param {Number} x The horizontal axis
 * @param {Number} y The vertical axis
 * @param {Number[]} array The heightmap values
 * 
 * @returns {Boolean}
 */
const isLowPoint = (x, y, array) => {
    let lowPoint = true;
    const value = array[x][y];
    const rows = array.length;
    const cols = array[0].length;
    const checked = [];

    // Calculate the horizontal low points possibility
    if (y >= 1) {
        const adjacentValue = array[x][y - 1];
        if (DEBUG && LOCATIONS) console.log('Checking left position', { values: [ x, 0 ], adjacentValue });
        lowPoint = lowPoint && value < adjacentValue;
        checked.push(adjacentValue);
    }
    if (y < cols - 1) {
        const adjacentValue = array[x][y + 1];
        if (DEBUG && LOCATIONS) console.log('Checking right position', { values: [ x, y + 1 ], adjacentValue });
        lowPoint = lowPoint && value < adjacentValue;
        checked.push(adjacentValue);
    }

    // Calculate the vertical low points possibility
    if (x >= 1) {
        const adjacentValue = array[x - 1][y];
        if (DEBUG && LOCATIONS) console.log('Checking above position', { values: [ 0, y ], adjacentValue });
        lowPoint = lowPoint && value < adjacentValue;
        checked.push(adjacentValue);
    }
    if (x < rows - 1) {
        const adjacentValue = array[x + 1][y];
        if (DEBUG && LOCATIONS) console.log('Checking under position', { values: [ x + 1, y ], adjacentValue });
        lowPoint = lowPoint && value < adjacentValue;
        checked.push(adjacentValue);
    }
    
    if (DEBUG) console.log('low point possibility of', value, { x, y, lowPoint, checked });

    return lowPoint;
}

/**
 * Gets the risk level of a height
 * 
 * @param {Number} height The height value
 * 
 * @returns {Number}
 */
const getRiskLevel = height => height + 1;

const main = (input) => {
    const heightMap = prepare( clean(input) );

    if (DEBUG) {
        console.log('The heightMap:');
        console.log(heightMap.map(line => line.join(', ')).join('\n'));
    }

    let totalRiskLevels = 0;
    let counter = 0;
    let lowPoints = [];

    // The horizontal axis
    const rows = heightMap.length;
    for (let x = 0; x < rows; x++) {
        const row = heightMap[x];

        // The vertical axis
        const cols = row.length;
        for (let y = 0; y < cols; y++) {
            const height = row[y];

            // Determines if is a low point
            const lowPoint = isLowPoint(x, y, heightMap);

            // If it is, append the real riskLevel
            if (lowPoint) {
                totalRiskLevels += getRiskLevel(height);
                lowPoints.push(heightMap[x][y]);
            }

            // For debuggin purpose
            if (DEBUG) {
                counter++;
                
                if (counter >= MAX_ITERATIONS) return;
            }
        }
    }

    if (DEBUG) console.log('All the low points', lowPoints);
    console.log(`The total sum of risk levels was: ${totalRiskLevels}`);

    return totalRiskLevels;
};

const input = `
2199943210
3987894921
9856789892
8767896789
9899965678
`;

const DEBUG = false;
const LOCATIONS = false;
const MAX_ITERATIONS = Number.MAX_SAFE_INTEGER;
main(input);