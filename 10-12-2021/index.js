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

    return input
}

const chunksDict = {
    '(' : ')',
    '[' : ']',
    '{' : '}',
    '<' : '>',
};

const openings = Object.keys(chunksDict);
const closenings = Object.values(chunksDict);

const syntaxErrorPoints = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
}

/**
 * Find the total syntaxError of the corrupted lines
 * 
 * @param {String} input The raw input
 * 
 * @returns {Number}
 */
const main = (input) => {
    const lines = prepare(input);
    if (DEBUG) console.log('lines', lines);

    let totalSyntaxError = 0;

    // Discard corrupted lines
    const linesLen = lines.length;
    for (let lineIndex = 0; lineIndex < linesLen; lineIndex++) {
        const line = lines[lineIndex];
        if (DEBUG) console.log('line', line);

        // Reassign after each line
        let chunks = [];

        const chars = line.length
        for (let charIndex = 0; charIndex < chars; charIndex++) {
            const char = line[charIndex];

            // It's an opening
            if (openings.includes(char)) {
                if (DEBUG && OPENINGS) console.log('opening char detected', char);
                chunks.push(char);
            } else if (closenings.includes(char)) {
                if (DEBUG && CLOSENINGS) console.log('closening char detected', char);
                const lastChunkOpen = chunks.pop();

                // If the last open chunk is not closed with the proper closing char, break the loop
                if (lastChunkOpen in chunksDict && chunksDict[lastChunkOpen] != char) {
                    // And increment the total syntax error with it's proper points
                    totalSyntaxError += syntaxErrorPoints[char];

                    break;
                }
            }
        }

        if (DEBUG) console.log(chunks);
    }

    console.log(`The total syntax error is: ${totalSyntaxError}`);

    return totalSyntaxError;
};

const incompleteClosingCharsScore = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4,
}

/**
 * Find the total syntaxError of the corrupted lines
 * 
 * @param {String} input The raw input
 * 
 * @returns {Number}
 */
const mainV2 = (input) => {
    const lines = prepare(input);
    if (DEBUG) console.log('lines', lines);

    let totalSyntaxError = {};

    // Discard corrupted lines
    const linesLen = lines.length;
    for (let lineIndex = linesLen - 1; lineIndex >= 0; lineIndex--) {
        const line = lines[lineIndex];
        if (DEBUG) console.log('line', line);

        // Reassign after each line
        let chunks = [];

        const chars = line.length
        for (let charIndex = 0; charIndex < chars; charIndex++) {
            const char = line[charIndex];

            // It's an opening
            if (openings.includes(char)) {
                if (DEBUG && OPENINGS) console.log('opening char detected', char);
                chunks.push(char);
            } else if (closenings.includes(char)) {
                if (DEBUG && CLOSENINGS) console.log('closening char detected', char);
                const lastChunkOpen = chunks.pop();

                // If the last open chunk is not closed with the proper closing char, break the loop
                if (lastChunkOpen in chunksDict && chunksDict[lastChunkOpen] != char) {
                    // Remove the corrupted line
                    lines.splice(lineIndex, 1);

                    break;
                }
            }
        }

        if (DEBUG) console.log(chunks);
    }

    console.log('incomplete lines', lines.length);

    // All the chunks
    let chunks = {};

    // Now process the incomplete lines
    const incompleteLinesLen = lines.length;
    for (let lineIndex = 0; lineIndex < incompleteLinesLen; lineIndex++) {
        const line = lines[lineIndex];
        if (DEBUG) console.log('line', line);

        // Assign after each line
        chunks[lineIndex] = [];

        // Find all openings and remove the ones closed
        const chars = line.length
        for (let charIndex = 0; charIndex < chars; charIndex++) {
            const char = line[charIndex];

            // It's an opening
            if (openings.includes(char)) {
                if (DEBUG && OPENINGS) console.log('opening char detected', char);
                chunks[lineIndex].push(char);
            } else if (closenings.includes(char)) {
                if (DEBUG && CLOSENINGS) console.log('closening char detected', char);

                // Try to find the matching closing char
                const chunksLen = chunks[lineIndex].length;
                for (let chunkIndex = chunksLen - 1; chunkIndex >= 0; chunkIndex--) {
                    const chunk = chunks[lineIndex][chunkIndex];
                    const closeningChar = chunksDict[chunk];

                    // Remove the already closed opening char
                    if (closeningChar == char) {
                        chunks[lineIndex].splice(chunkIndex, 1);
                        break;
                    }
                }
            }
        }

        // Bugfix to my dislexia, the system works just fine, but in reverse :)
        chunks[lineIndex] = chunks[lineIndex].reverse();

        if (DEBUG) console.log(chunks[lineIndex]);

        // Initialize the total score
        totalSyntaxError[lineIndex] = 0;

        // Create the score
        const chunksLen = chunks[lineIndex].length;
        for (let chunkIndex = 0; chunkIndex < chunksLen; chunkIndex++) {
            const chunk = chunks[lineIndex][chunkIndex];

            const closeningChunk = chunksDict[chunk];
            // if (DEBUG && CLOSENINGS) console.log('closening chunk detected', closeningChunk);

            // Multiply by 5 before adding anything
            totalSyntaxError[lineIndex] *= 5;

            const incompleteScore = incompleteClosingCharsScore[closeningChunk];
            // And increment the total syntax error with it's proper points
            totalSyntaxError[lineIndex] += incompleteScore;

            // if (DEBUG) console.log(closeningChunk, incompleteScore);
        }
    }

    console.log(totalSyntaxError);

    // Extract only the values
    totalSyntaxError = Object.values(totalSyntaxError);
    // Sort the values numerically
    totalSyntaxError = totalSyntaxError.sort((a, b) => a - b);
    // Extract the exact middle of the array
    totalSyntaxError = totalSyntaxError[Math.floor( totalSyntaxError.length / 2 )]

    console.log(`The total syntax error is: ${totalSyntaxError}`);

    return totalSyntaxError;
};

const input = `
[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]
`;

const DEBUG = false;
const OPENINGS = false;
const CLOSENINGS = false;
// main(input);
mainV2(input);