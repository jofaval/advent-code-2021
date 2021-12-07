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

/**
 * Generates the range, taking into account diagonals
 * 
 * @param {Number[]} data The positions
 * 
 * @returns {Number[]} The range
 */
const rangeV2 = data => {
    const [ x1, y1, x2, y2 ] = data;
    // console.log(x1, y1, x2, y2);

    // If it's the old version, process it as if
    if (isHorizontalOrVertical(data)) return [ range(x1, x2), range(y1, y2) ];

    let range = [];

    // Compute diagonals, they're the same numbers
    /* const min = Math.min(x1, y1, x2, y2);
    const max = Math.max(x1, y1, x2, y2);

    // less or equal than because we're working with indexes
    for (let positionIndex = min; positionIndex <= max; positionIndex++) {
        range.push([ positionIndex, positionIndex ])
    } */

    // Get the max and min of the horizontal axis
    const maxX = Math.max(x1, x2);
    const minX = Math.min(x1, x2);

    // horizontal axis
    if (x1 < x2) {
        for (let horizontalIndex = x1; horizontalIndex <= x2; horizontalIndex++) {
            range.push([ horizontalIndex ]);
        }
    } else {
        for (let horizontalIndex = x1; horizontalIndex >= x2; horizontalIndex--) {
            range.push([ horizontalIndex ]);
        }
    }

    // Get the max and min of the vertical axis
    const maxY = Math.max(y1, y2);
    const minY = Math.min(y1, y2);

    let counter = 0;
    // vertical axis
    if (y1 < y2) {
        for (let verticalIndex = y1; verticalIndex <= y2; verticalIndex++) {
            range[counter].push(verticalIndex);
    
            counter++;
        }
    }
    else {
        for (let verticalIndex = y1; verticalIndex >= y2; verticalIndex--) {
            range[counter].push(verticalIndex);
    
            counter++;
        }
    }

    // console.log({ x1, x2, y1, y2 }, range);

    return range;
}

/**
 * Prepares to be displayed
 * 
 * @param {Number[][]} field The array of numbers to reformat
 * 
 * @returns {void}
 */
const displayField = field => {
    let rows = range(0, field[0].length - 1);
    rows.unshift(' ');
    rows = rows.join(' ')

    field = field.map((val, index) => field.map(row => row[index]).reverse());
    field = field.map((row, index) => index + ' ' + row.join(' ').split('').reverse().join(''));
    field = rows + '\n' + field.join('\n');

    console.log('Final field');
    console.log(field);
}

/**
 * Determines the amount of overlapping positions in the lines of vent given
 * 
 * @param {String} linesOfVent Lines of vent
 * 
 * @returns {Number} The amount of overlapping positions in the lines of vent given
 */
const avoidVentsV2 = linesOfVent => {
    let totalOverlaps = 0;

    const lines = linesOfVent.trim().replaceAll(' -> ', ',').split('\n');
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
        if (!isHorizontalOrVertical(pos)) {
            const ranges = rangeV2(pos);

            const rangeLen = ranges.length
            // console.log(rangeLen);
            for (let rangeIndex = 0; rangeIndex < rangeLen; rangeIndex++) {
                const [ row, col ] = ranges[rangeIndex];
                // console.log('range', { row, col });

                let result = 1;
                if (!isNaN(field[row][col])) result = field[row][col] + 1;

                field[row][col] = result;
            }
        } else {
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
                    
                    field[row][col] = result;
                }
            }
        }
    });

    // Displays the field, mostly for debugging
    // displayField(field);

    // Calculate the overlapping
    totalOverlaps = field
        .map(row => row
            .filter(n => n >= MIN_OVERLAPPING).length)
        .reduce((total, row) => total + row);

    console.log('Total number of overlappings', totalOverlaps);

    return totalOverlaps;
};

const linesOfVent = `
0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2
`;

// avoidVents(linesOfVent);
avoidVentsV2(linesOfVent);