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

const horizontalPositions = '16,1,2,0,4,2,7,1,2,14';

cheapestPosition(horizontalPositions);