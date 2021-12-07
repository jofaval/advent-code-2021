/**
 * Calculates the power consumption of the summary given an array of binaries
 * 
 * @param {Array} report The array of binaries
 * 
 * @returns {Number} The power consumption
 */
const calculatePowerConsumption = report => {
    let columns = [];

    // Calculare the result
    const reportLen = report.length;
    for (let reportIndex = 0; reportIndex < reportLen; reportIndex++) {
        const rawBinary = report[reportIndex];
        
        const rawBinaryLen = rawBinary.length;
        for (let rawBinaryIndex = 0; rawBinaryIndex < rawBinaryLen; rawBinaryIndex++) {
            const binary = rawBinary[rawBinaryIndex];

            // If the column information doesn't exist, it's created
            // TODO: not the most efficient way, for sure
            if (!columns[rawBinaryIndex]) columns[rawBinaryIndex] = { '0': 0, '1': 1 };
    
            // Increment the value of the column information
            columns[rawBinaryIndex][binary]++;
        }
    }

    // Strings to generate the raw binary string
    let rawGamma = '';
    let rawEpsilon = '';
    
    const columnsLen = columns.length;
    for (let columnIndex = 0; columnIndex < columnsLen; columnIndex++) {
        const column = columns[columnIndex];
        
        // Get the max key and append it
        const max = column['0'] > column['1'] ? '0' : '1';
        rawGamma += max;

        // Get the min key and append it
        const min = column['0'] < column['1'] ? '0' : '1';
        rawEpsilon += min;
    }

    // The gamma rate, is the result of the raw binary string parsed to int
    const gammaRate = parseInt(rawGamma, 2);
    // The epsilon rate, is the result of the raw binary string parsed to int
    const epsilonRate = parseInt(rawEpsilon, 2);

    // The power consumption
    const powerConsumption = gammaRate * epsilonRate

    console.log('The gamma rate is', gammaRate, 'while the epsilon rate is', epsilonRate);
    console.log('The power consumption of the submarine is', powerConsumption);

    return powerConsumption;
}

let DEBUG;
DEBUG = true;
// DEBUG = false;

/**
 * Implements the logic of finding the most/least common values
 * 
 * @param {Array} columns The array of columns to work with
 * @param {Number} index The current index
 * @param {String} rawBinary The raw binary string
 * @param {Boolean} most Is it trying to find the most common one?
 * @param {String} id The id of the operation
 * 
 * @returns {Array}
 */
const logic = (columns, index, rawBinary, most, id) => {
    const bit = rawBinary[index];

    // Increment the value of the column information
    if (!columns[index]) {
        if (DEBUG) console.log('push new data to ' + id + ' common columns');
        columns.push({ '0': 0, '1': 0 });

        if (DEBUG) console.log('increments the bit in ' + id + ' common columns');
        columns[index][bit]++;
    } else if (index == 0) {
        if (DEBUG) console.log('increments the bit in ' + id + ' common columns');
        columns[index][bit]++;
    }

    // If the column information doesn't exist, it's created
    if (index > 0) {
        const prevCommon = columns[index - 1];

        const prevCommonCondition = most
            ? prevCommon['0'] > prevCommon['1']
            : prevCommon['0'] < prevCommon['1'];

        const prevCommonBit = prevCommonCondition ? '0' : '1';
        const prevBit = rawBinary[index - 1];

        if (prevBit == prevCommonBit) {
            if (DEBUG) console.log('increments the bit in ' + id + ' common columns');
            columns[index][bit]++;
        }
    }

    return columns;
}

/**
 * Calculates the power consumption of the summary given an array of binaries
 * 
 * @param {Array} report The array of binaries
 * 
 * @returns {Number} The power consumption
 */
const calculateLifeSupport = report => {
    let mostCommonColumns = [];
    let leastCommonColumns = [];

    // Calculare the result
    const reportLen = report.length;
    // const reportLen = 1;
    /* for (let reportIndex = 0; reportIndex < reportLen; reportIndex++) {
        const rawBinary = report[reportIndex];

        if (DEBUG) console.log('New raw binary', rawBinary);

        const rawBinaryLen = rawBinary.length;
        // const rawBinaryLen = 4;
        for (let rawBinaryIndex = 0; rawBinaryIndex < rawBinaryLen; rawBinaryIndex++) {
            if (DEBUG) console.log({ rawBinaryIndex, mostCommonColumns, leastCommonColumns, targets: {
                // most: mostCommonColumns[rawBinaryIndex - 1],
                // least: leastCommonColumns[rawBinaryIndex - 1]
            }, current: {
                // most: mostCommonColumns[rawBinaryIndex],
                // least: leastCommonColumns[rawBinaryIndex]
            } });

            // mostCommonColumns = logic(mostCommonColumns, rawBinaryIndex, rawBinary, 'most');
            // leastCommonColumns = logic(leastCommonColumns, rawBinaryIndex, rawBinary, 'least');
        }
    } */

    const cols = report[0].length;
    
    // Strings to generate the raw binary string
    let rawOxygenGeneratorRating = '';
    let rawC02ScrubberRating = '';

    // Most common columns
    let tempMostCommonBinaries = report;
    for (let colIndex = 0; colIndex < cols; colIndex++) {
        let tempMostCommonBinariesLen = tempMostCommonBinaries.length;

        for (let reportIndex = 0; reportIndex < tempMostCommonBinariesLen; reportIndex++) {
            const rawBinary = tempMostCommonBinaries[reportIndex];
            const bit = rawBinary[colIndex];

            if (!mostCommonColumns[colIndex]) mostCommonColumns[colIndex] = { '0': 0, '1': 0 };

            mostCommonColumns[colIndex][bit]++;
        }

        let mostCommon;
        let mostCommonBit;

        if (tempMostCommonBinaries.length > 1) {
            mostCommon = mostCommonColumns[colIndex];
            if (!mostCommon) mostCommon = { '0': 0, '1': 0 };
            mostCommonBit = mostCommon['0'] > mostCommon['1'] ? '0' : '1';
            if (mostCommon['0'] == mostCommon['1']) mostCommonBit = 1;
        } else {
            mostCommonBit = tempMostCommonBinaries[0][colIndex]
        }
            
        tempMostCommonBinaries = tempMostCommonBinaries.filter(row => {
            if (!row[colIndex]) return true;
            
            return row[colIndex] == mostCommonBit;
        });

        rawOxygenGeneratorRating += mostCommonBit;
    }

    // Least common columns
    let tempLeastCommonBinaries = report;
    for (let colIndex = 0; colIndex < cols; colIndex++) {
        let tempLeastCommonBinariesLen = tempLeastCommonBinaries.length;

        for (let reportIndex = 0; reportIndex < tempLeastCommonBinariesLen; reportIndex++) {
            const rawBinary = tempLeastCommonBinaries[reportIndex];
            const bit = rawBinary[colIndex];

            if (!leastCommonColumns[colIndex]) leastCommonColumns[colIndex] = { '0': 0, '1': 0 };

            leastCommonColumns[colIndex][bit]++;
        }

        let leastCommon;
        let leastCommonBit;

        if (tempLeastCommonBinaries.length > 1) {
            leastCommon = leastCommonColumns[colIndex];
            if (!leastCommon) leastCommon = { '0': 0, '1': 0 };
            leastCommonBit = leastCommon['0'] < leastCommon['1'] ? '0' : '1';
            if (leastCommon['0'] == leastCommon['1']) leastCommonBit = 0;
        } else {
            leastCommonBit = tempLeastCommonBinaries[0][colIndex]
        }
            
        tempLeastCommonBinaries = tempLeastCommonBinaries.filter(row => {
            if (!row[colIndex]) return true;
            
            return row[colIndex] == leastCommonBit;
        });

        rawC02ScrubberRating += leastCommonBit;
    }

    console.log(mostCommonColumns.length, leastCommonColumns.length);

    // Generate the raw binary strings
    /* const columnsLen = mostCommonColumns.length;
    for (let columnIndex = 0; columnIndex < columnsLen; columnIndex++) {
        const mostCommon = mostCommonColumns[columnIndex];
        // Get the max key and append it
        const max = mostCommon['0'] > mostCommon['1'] ? '0' : '1';
        rawOxygenGeneratorRating += max;

        const leastCommon = leastCommonColumns[columnIndex];
        // Get the min key and append it
        const min = leastCommon['0'] < leastCommon['1'] ? '0' : '1';
        rawC02ScrubberRating += min;
    } */

    // Parse raw binary strings to decimal
    const oxygenGeneratorRating = parseInt(rawOxygenGeneratorRating, 2);
    const c02ScrubberRating = parseInt(rawC02ScrubberRating, 2);

    console.log('The submanire life support values are', {
        rawOxygenGeneratorRating, rawC02ScrubberRating, oxygenGeneratorRating, c02ScrubberRating
    });

    // Calculate the life support
    const lifeSupport = oxygenGeneratorRating * c02ScrubberRating;

    console.log('The life support of the submarine is', lifeSupport);

    return lifeSupport;
}

const report = [
    '00100',
    '11110',
    '10110',
    '10111',
    '10101',
    '01111',
    '00111',
    '11100',
    '10000',
    '11001',
    '00010',
    '01010',
]

// calculatePowerConsumption(report)
calculateLifeSupport(report)