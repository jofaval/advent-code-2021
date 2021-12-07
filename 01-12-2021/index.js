// The max number of starts to save Christmas
const targetStarts = 50;
// The stars counter
let stars = 0;

/**
 * Analyzes the report and returns the number of depth increases found
 * 
 * @param {Array} report The array containing all the depths records
 * 
 * @returns {number} The number of times it increased
 */
const analyzeReport = report => {
    // Number of increases
    let increases = 0;
    
    // Auxiliar variable to keep track if it did increased or not
    let hasIncreased = false;
    // The previous number to compare, -1 to default
    let previousNumber = -1;

    const reportLen = report.length;
    for (let reportIndex = 0; reportIndex < reportLen; reportIndex++) {
        const depth = report[reportIndex];

        // The message to display
        let messsage = '';

        // Count only if it's not the first previousNumber
        if (previousNumber != -1) {
            // Track record if it has increased or not
            hasIncreased = depth > previousNumber;
            
            // If it has increased, add to the counter
            if (hasIncreased) increases++;

            // The message to display
            messsage = hasIncreased ? 'increased' : 'decreased';
        } else {
            messsage = 'N/A - no previous measurement';
        }

        // Report the message
        console.log(`${depth} (${messsage})`);
        
        // Set the previousNumber to the current depth
        previousNumber = depth;
    }

    console.log('The total number of increases is:', increases);

    return increases;
}

const MAX_LENGTH = 3;

/**
 * Computes the total number (summatory) of the numbers in the array
 * 
 * @param {Number[]} numbers An array of numbers
 * 
 * @returns {Number} The total
 */
const sum = numbers => numbers.reduce((acc, curr) => acc + curr, 0);

/**
 * Analyzes the report and returns the number of depth increases found
 * 
 * @param {Array} report The array containing all the depths records
 * 
 * @returns {number} The number of times it increased
 */
const analyzeReportV2 = report => {
    // Number of increases
    let increases = 0;
    
    // Auxiliar variable to keep track if it did increased or not
    let hasIncreased = false;
    // The previous number to compare, -1 to default
    let previousNumbers = [];

    const reportLen = report.length;
    for (let reportIndex = 0; reportIndex < reportLen; reportIndex++) {
        const depth = report[reportIndex];

        // The message to display
        let messsage = '';
        // The current sum
        let newSum = depth;

        const previousNumber = sum(previousNumbers);
        // console.log('previousNumber', previousNumber);
        // console.log({ previousNumber, len: previousNumbers.length, access: previousNumbers.length == MAX_LENGTH, previousNumbers, });

        // Count only if it's not the first previousNumber
        if (previousNumbers.length == MAX_LENGTH) {
            // Track record if it has increased or not
            // hasIncreased = depth > previousNumber;

            newSum = depth + sum([ previousNumbers[1], previousNumbers[2] ])

            if (newSum == previousNumber) {
                messsage = 'no change'
            } else {
                hasIncreased = newSum > previousNumber
                
                // If it has increased, add to the counter
                if (hasIncreased) increases++;
                
                // The message to display
                messsage = hasIncreased ? 'increased' : 'decreased';
            }
        } else {
            messsage = 'N/A - no previous measurement';
        }

        // Report the message
        console.log(`${newSum} (${messsage})`);
        
        // Set the previousNumber to the current depth
        previousNumbers.push(depth);
        if (previousNumbers.length > MAX_LENGTH) previousNumbers.shift();
    }

    console.log('The total number of increases is:', increases);

    return increases;
}

const report = [
    199,
    200,
    208,
    210,
    200,
    207,
    240,
    269,
    260,
    263,
];

// const totalIncreases = analyzeReport(report);
const totalIncreases = analyzeReportV2(report);