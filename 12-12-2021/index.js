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

    // Parse to int each number
    // input = input.map(line => line.split('').map(number => parseInt(number)));

    return input
}

/**
 * Displays an array
 * 
 * @param {Number[]} array The array to reformat for displaying
 * @param {String} separator The separator between array lines
 * 
 * @returns {void}
 */
const display = (array, separator = ',') => {
    const reformatted = array.map(line => line.join(separator)).join('\n');
    console.log(reformatted);
    console.log();
}

const START = 'start';
const END = 'end';

/**
 * Generates all the routing information
 * 
 * @param {String[]} paths All the paths information
 * @param {String} separator The path line separator
 * 
 * @returns {Object}
 */
const parse = (paths, separator = '-') => {
    const routing = {};

    const pathsLen = paths.length;
    for (let pathIndex = 0; pathIndex < pathsLen; pathIndex++) {
        const [ first, last ] = paths[pathIndex].split(separator);

        if (first in routing) routing[first].push(last);
        else routing[first] = [ last ];
    }

    return routing;
}

/**
 * Determines wether a cave is a small one or not
 * 
 * @param {String} cave The string to evaluate
 * 
 * @returns {Boolean}
 */
const isSmallCave = cave => cave == cave.toLowerCase();

/**
 * Find the total flahses after a 100 days
 * 
 * @param {String} input The raw input
 * 
 * @returns {Number}
 */
const main = (input) => {
    let paths = prepare(input);
    if (DEBUG) console.log('paths', paths);

    let totalPaths = 0;

    // Parse the routing information
    const routing = parse(paths);
    if (DEBUG) console.log('routing', routing);

    // Evaluate all the possible paths
    let alreadyVisisted = new Set();

    const nextNode = routing[START];
    nextNode
    // TODO: implement, 25/12/2021 12:39

    console.log('The total number of paths is:', totalPaths);

    return totalPaths;
};

const input = `
dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc
`;

const DEBUG = true;
main(input);