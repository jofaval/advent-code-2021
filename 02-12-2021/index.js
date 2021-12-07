/**
 * 
 * @param {String[]} commands The array of instructions to follow
 * @param {String} separator The splitter character
 * 
 * @returns {Number} The final position
 */
const moveSubmarine = (commands, separator = ' ') => {
    // The x units of the submarine
    let horizontal = 0;
    // The depth units of the submarine
    let depth = 0;

    const commandsLen = commands.length;
    for (let commandIndex = 0; commandIndex < commandsLen; commandIndex++) {
        const command = commands[commandIndex];

        // The details of the command (type and units, in that order)
        const details = command.split(separator);
        // The type of instruction
        const type = details[0];
        // The number of units, integer, so it must be parsed
        const units = parseInt(details[1]);

        // Execute the instruction
        switch (type) {
            case 'forward':
                horizontal += units;
                break;
            case 'up':
                depth -= units;
                break;
            case 'down':
                depth += units;
                break;
        }
    }

    // Multiply the final horizontal position by the final depth units
    const result = horizontal * depth;

    console.log('Final position of', result);

    return result;
}

const commands = [
    'forward 5',
    'down 5',
    'forward 8',
    'up 3',
    'down 8',
    'forward 2',
];

moveSubmarine(commands);