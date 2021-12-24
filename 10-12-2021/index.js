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
main(input);