const TARGET_SCORE = 5;

/**
 * Parses the board numbers
 * 
 * @param {String} numbers The parsed board number
 * 
 * @returns {Array}
 */
const parseBoardNumbers = numbers => {
    // Splits by spaces and assures no index is truly empty
    numbers = numbers.split(/\s/).filter(n => n.trim().length)
    numbers = numbers.map(number => parseInt(number));

    return numbers;
}

/**
 * Parses the boards
 * 
 * @param {String} board 
 * 
 * @returns {Array}
 */
const parseBoard = board => board.split('\n').map(parseBoardNumbers);

/**
 * Determines wether a board is a win
 * 
 * @param {Number[][]} board The board to evaluate
 * @param {Array} numbers The random numbers
 * 
 * @returns {Boolean}
 */
const isBoardWinning = (board, numbers) => {
    let score = 0;

    // First loop through the rows
    const rows = board.length;
    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
        const row = board[rowIndex];

        // Reset the score
        score = 0;

        const cols = row.length;
        for (let colIndex = 0; colIndex < cols; colIndex++) {
            const col = row[colIndex];

            // If the col is a said number, then increase the score
            if (numbers.includes(col)) score++;
        }

        // If the score equals to 5, it's a victory
        if (score >= TARGET_SCORE) return true;
    }

    // The cols were incorrectly checked
    // Then loop through the cols
    const cols = board[0].length;
    for (let colIndex = 0; colIndex < cols; colIndex++) {
        // const col = board[][colIndex];

        // Reset the score
        score = 0;

        const rows = board.length;
        for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
            const row = board[rowIndex][colIndex];

            // If the row is a said number, then increase the score
            if (numbers.includes(row)) score++;
        }

        // If the score equals to 5, it's a victory
        if (score >= TARGET_SCORE) return true;
    }

    // Will be false until proven wrong
    return false;
}

/**
 * Calculates the final score of a board given some parameters
 * 
 * @param {Number[][]} board The board to evaluate
 * @param {Number[]} selectedNumbers The already selected numbers
 * @param {Number} lastNumber The last number
 * 
 * @returns {Number}
 */
const calculateScore = (board, selectedNumbers, lastNumber) => {
    let totalFromUnmarkedNumbers = 0;

    // console.log('winnin board', board, { selectedNumbers, lastNumber });

    // Loop through all rows and cols
    board.map(row => {
        row.map(col => {
            // If it wasn't selected, add it
            if (!selectedNumbers.includes(col)) {
                totalFromUnmarkedNumbers += col;
            }
        });
    });

    return totalFromUnmarkedNumbers * lastNumber;
}

/**
 * Plays bingo given an input and determines the score of the winning board
 * 
 * @param {String} input The input to parse and understand
 * 
 * @returns {Number} Returns the final score of the board that will win
 */
const bingo = input => {
    // Each new line is an input
    const parsedInput = input.trim().split('\n\n');
    
    // The default score will be 0, which is none
    let finalScore = 0;

    // Random numbers are the first element, but not to break the flow, the get "shifted" out of the array
    const randomNumbers = parsedInput.shift().split(',').map(number => parseInt(number));
    // console.log('The random numbers are', randomNumbers);

    const boards = parsedInput.map(parseBoard);
    // console.log('The boards are', boards);

    /* const numberOfBoards = boards.length;
    for (let boardIndex = 0; boardIndex < numberOfBoards; boardIndex++) {
        const board = boards[boardIndex];
        
        // calcular con los randomnumbers como primer for-loop
        if (isBoardWinning(board, randomNumbers)) {
            finalScore = calculateScore(board, randomNumbers);
            break;
        }
    } */

    // Keeps record of all the numbers that have been said
    let selectedNumbers = [];

    const randomNumbersLen = randomNumbers.length;
    for (let numberIndex = 0; numberIndex < randomNumbersLen; numberIndex++) {
        const number = randomNumbers[numberIndex];
        selectedNumbers.push(number);

        // Gets the boards that are winning
        const winningBoards = boards.filter(board => isBoardWinning(board, selectedNumbers));

        // If the winning boards isn't empty, we have a winner
        if (winningBoards.length) {
            finalScore = calculateScore(winningBoards[0], selectedNumbers, number);
            break;
        }
    }
    
    console.log('The final score of the winning board will be:', finalScore);

    return finalScore;
}

/**
 * Plays bingo given an input and determines the score of the winning board
 * 
 * @param {String} input The input to parse and understand
 * 
 * @returns {Number} Returns the final score of the board that will win
 */
const bingoV2 = input => {
    // Each new line is an input
    const parsedInput = input.trim().split('\n\n');
    
    // The default score will be 0, which is none
    let finalScore = 0;

    // Random numbers are the first element, but not to break the flow, the get "shifted" out of the array
    const randomNumbers = parsedInput.shift().split(',').map(number => parseInt(number));
    // console.log('The random numbers are', randomNumbers);

    const boards = parsedInput.map(parseBoard);
    // console.log('The boards are', boards);

    // Keeps record of all the numbers that have been said
    let selectedNumbers = [];

    let winningBoards = new Set([]);
    const randomNumbersLen = randomNumbers.length;
    for (let numberIndex = 0; numberIndex < randomNumbersLen; numberIndex++) {
        const number = randomNumbers[numberIndex];
        selectedNumbers.push(number);

        // Gets the boards that are winning
        const lastToWinBoards = boards.filter(board => !winningBoards.has(board) && isBoardWinning(board, selectedNumbers));

        // If the winning boards isn't empty, we have a winner
        if (lastToWinBoards.length) {
            finalScore = calculateScore(lastToWinBoards[0], selectedNumbers, number);
        }

        // After it's computed, the winnin boards will get added to winning boards
        lastToWinBoards.map(board => winningBoards.add(board));
    }
    
    console.log('The final score of the last winning board will be:', finalScore);

    return finalScore;
}

const input = `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7
`;

// const result = bingo(input);
const result = bingoV2(input);

/* const temp = isBoardWinning([
    [ 14, 21, 17, 24,  4, ],
    [ 10, 16, 15,  9, 19, ],
    [ 18,  8, 23, 26, 20, ],
    [ 22, 11, 13,  6,  5, ],
    [ 2,   0, 12,  3,  7, ],
], [
    7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1
])
console.log(temp); */
// hacer que devuelva número de números/pasos para ganar, para detectar el primero, no el que gane, devolver -1 por defecto