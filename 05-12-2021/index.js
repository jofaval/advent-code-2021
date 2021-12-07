const MIN_OVERLAPPING = 2;
const EMPTY_FIELD_CHARACTER = '.';

/**
 * Generates a range
 * 
 * @param {Number} from The number to start
 * @param {Number} at The number to end
 * 
 * @returns {Number[]}
 */
const range = (from, at) => {
    // Create a bubble-sort method to get the true min-max given values
    let tempAt = Math.max(from, at);
    from = Math.min(from, at);
    at = tempAt;

    if (from == at) return [ at ];

    /* return [...Array(at).keys()].map(index => index + from) */
    return Array.from(Array((at - from) + 1).keys()).map(i => i + from);
};

/**
 * Determines if a position will be horizontal or vertical
 * 
 * @param {Number[]} pos The positions to evaluate
 * 
 * @returns {Boolean}
 */
const isHorizontalOrVertical = pos => pos[0] == pos[2] || pos[1] == pos[3];

/**
 * Determines the amount of overlapping positions in the lines of vent given
 * 
 * @param {String} linesOfVent Lines of vent
 * 
 * @returns {Number} The amount of overlapping positions in the lines of vent given
 */
const avoidVents = linesOfVent => {
    let totalOverlaps = 0;

    const lines = linesOfVent.replaceAll(' -> ', ',').split('\n');
    // console.log('lines', lines);
    const positions = lines.map(line => line.split(',').map(number => parseInt(number)))
    // console.log('positions', positions);

    // Get the max horizontal number
    const maxHorizontal = Math.max.apply(null, positions.map(row => Math.max(row[0], row[2]))) + 1
    // Get the max vertical number
    const maxVertical = Math.max.apply(null, positions.map(row => Math.max(row[1], row[3]))) + 1
    console.log('The field size is', maxHorizontal, maxVertical);

    // Generate the array
    let field = EMPTY_FIELD_CHARACTER.repeat(maxHorizontal).split('');
    field = field.map(row => EMPTY_FIELD_CHARACTER.repeat(maxVertical).split(''));
    // console.log('field', field);

    // Generate the overlapping
    positions.map(pos => {
        // Only horizontal and vertical
        if (!isHorizontalOrVertical(pos)) return;

        const rows = range(pos[0], pos[2]);
        const cols = range(pos[1], pos[3]);

        // console.log({ pos, rows, cols });

        const rowsLen = rows.length;
        const colsLen = cols.length;
        for (let rowIndex = 0; rowIndex < rowsLen; rowIndex++) {
            const row = rows[rowIndex];
            
            for (let colIndex = 0; colIndex < colsLen; colIndex++) {
                const col = cols[colIndex];

                let result = 1;
                if (!isNaN(field[row][col])) result = field[row][col] + 1;

                /* try {
                    if (field[row][col] == EMPTY_FIELD_CHARACTER) field[row][col] = 1;
                    else field[row][col] += 1;

                    if (isNaN(field[row][col])) console.log('ERROR', row, col);
                } catch (error) {
                    console.log('row', field[row], {
                        row, col, maxHorizontal, maxVertical
                    });

                    console.log('field', field);

                    return
                } */

                field[row][col] = result;
                // if (isNaN(field[row][col])) return console.log('FALLO', { row, col, value: field[row][col] });
            }
        }
    });

    // console.log('field', field);

    // Calculate the overlapping
    totalOverlaps = field
        .map(row => row
            .filter(n => n >= MIN_OVERLAPPING).length)
        .reduce((total, row) => total + row);

    console.log('Total number of overlappings', totalOverlaps);

    return totalOverlaps;
};

/* const linesOfVent = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`; */
/* const linesOfVent = `1,1 -> 1,3
9,7 -> 7,7`; */
const linesOfVent = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`;

avoidVents(linesOfVent);