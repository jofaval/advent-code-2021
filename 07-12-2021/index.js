/**
 * Calculates the total fuel given a target position and the horizontal positions
 * 
 * @param {Number[]} dataset The number of horizontal positions
 * @param {Number} target The desired position
 * 
 * @returns {Number} The total amount of fuel
 */
const calculateFuel = (dataset, target) => {
    let fuel = 0;

    const datasetLen = dataset.length;
    for (let datasetIndex = 0; datasetIndex < datasetLen; datasetIndex++) {
        const position = dataset[datasetIndex];
        
        // Calculate the fuel per move
        const moves = Math.max(target, position) - Math.min(target, position);
        // And add it to the total
        fuel += moves;
    }

    return fuel;
}

/**
 * Determins which position is the cheapest (minimum total fuel) to align all the positions
 * 
 * @param {String} horizontalPositions The comma-separated horizontal positions of the crabs
 * 
 * @returns {Number} The cheapest position
 */
const cheapestPosition = horizontalPositions => {
   const positions = horizontalPositions.split(',');

   let minPosition = 0;
   let minFuel = Number.MAX_SAFE_INTEGER;

   const positionsLen = positions.length;
   for (let positionIndex = 0; positionIndex < positionsLen; positionIndex++) {
       const position = positions[positionIndex];
       
       // Calculate the fuel
       const fuel = calculateFuel(positions, position);

       // If the new position spends less fuel than the previous one, it's the winner
       if (fuel < minFuel) {
            minFuel = fuel;
            minPosition = position;
       }
   }

   console.log('The position', minPosition + 1, 'spends the least fuel a total of', minFuel);

   return minFuel;
};

/**
 * Computes the summatory of a given number
 * 
 * @param {Number} number The number from which to get the max summatory
 * 
 * @returns {Number} The result from the summatory
 */
const summatory = number => {
    let summatory = 0;

    for (let index = 1; index <= number; index++) {
        summatory += (index);
    }

    return summatory;
}

/**
 * Calculates the total fuel given a target position and the horizontal positions
 * 
 * @param {Number[]} dataset The number of horizontal positions
 * @param {Number} target The desired position
 * @param {Number} max The maximum amount of fuel to top
 * 
 * @returns {Number} The total amount of fuel
 */
const calculateFuelV2 = (dataset, target, max) => {
    let fuel = 0;

    const datasetLen = dataset.length;
    for (let datasetIndex = 0; datasetIndex < datasetLen; datasetIndex++) {
        const position = dataset[datasetIndex];
        
        // Calculate the fuel per move
        const moves = Math.max(target, position) - Math.min(target, position);
        const movesFuel = summatory(moves)
        // console.log({ moves, movesFuel });
        // And add it to the total
        fuel += movesFuel;

        // If it's too much, don't calculate the rest
        if (fuel > max) return Number.MAX_SAFE_INTEGER;
    }

    return fuel;
}

/**
 * Determins which position is the cheapest (minimum total fuel) to align all the positions
 * 
 * @param {String} horizontalPositions The comma-separated horizontal positions of the crabs
 * 
 * @returns {Number} The cheapest position
 */
const cheapestPositionV2 = horizontalPositions => {
    const positions = horizontalPositions.trim().split(',').map(p => parseInt(p));
    const positionsLen = positions.length;

    let lowestPosition = 0;
    let lowestFuel = Number.MAX_SAFE_INTEGER;

    const minPosition = Math.min.apply(null, positions)
    const maxPosition = Math.max.apply(null, positions)
    const possibilities = Array.from(new Array(maxPosition).keys()).map(k => k + minPosition);

    const possibilitiesLen = possibilities.length;
    for (let possibilityIndex = 0; possibilityIndex < possibilitiesLen; possibilityIndex++) {
        const possibility = possibilities[possibilityIndex];
        // console.log('Running possibility', possibility, 'lowest at the moment', lowestPosition);
        
        let previousFuels = [];
        for (let positionIndex = 0; positionIndex < positionsLen; positionIndex++) {
            const position = positions[positionIndex];

            // Calculate the fuel
            const fuel = calculateFuelV2(positions, possibility);
            
            // If the new position spends less fuel than the previous one, it's the winner
            if (fuel < lowestFuel) {
                lowestFuel = fuel;
                lowestPosition = possibility;
            }

            // Optimized so it doesn't check others if it's already too big
            if (fuel > (Math.max.apply(null, previousFuels) * 3)) break;

            previousFuels.push(fuel);
        }
    }

    console.log('The position', lowestPosition + 1, 'spends the least fuel a total of', lowestFuel);

    return lowestFuel;
};

const horizontalPositions = '16,1,2,0,4,2,7,1,2,14';

// cheapestPosition(horizontalPositions);
cheapestPositionV2(horizontalPositions);

// Test-case for the operation
// console.log(summatory(Math.max(16, 5) - Math.min(16, 5)), 66)
// console.log(summatory(Math.max(1, 5) - Math.min(1, 5)), 10)
// console.log(summatory(Math.max(2, 5) - Math.min(2, 5)), 6)
// console.log(summatory(Math.max(0, 5) - Math.min(0, 5)), 15)
// console.log(summatory(Math.max(4, 5) - Math.min(4, 5)), 1)
// console.log(summatory(Math.max(2, 5) - Math.min(2, 5)), 6)
// console.log(summatory(Math.max(7, 5) - Math.min(7, 5)), 3)
// console.log(summatory(Math.max(1, 5) - Math.min(1, 5)), 10)
// console.log(summatory(Math.max(2, 5) - Math.min(2, 5)), 6)
// console.log(summatory(Math.max(14, 5) - Math.min(14, 5)), 45)