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

calculatePowerConsumption(report)