const NUMBER_OF_DAYS = 80;
// const NUMBER_OF_DAYS = 18;
const WILL_BE_PARENT = 0;
const RECENTLY_PARENT = 6;
const NEWBORN = 8;

/**
 * Simulates the exponential evolution of the fishes
 * 
 * @param {String} rawTimers The list, comma-separated raw timers
 * 
 * @returns {Number} The number of fishes that will spawn
 */
const simualteLanternsEvolution = rawTimers => {
    let totalFishes = 0;

    // Split the value by a comma
    let timers = rawTimers.split(',').map(timer => parseInt(timer));
    console.log('Initial state:', timers);

    // Loop through the days
    for (let day = 0; day < NUMBER_OF_DAYS; day++) {
        const timersLen = timers.length;
        // Loop through the timers
        for (let timerIndex = 0; timerIndex < timersLen; timerIndex++) {
            timers[timerIndex] = timers[timerIndex] - 1;

            const timer = timers[timerIndex];

            // A new baby is born
            if (timer < WILL_BE_PARENT) {
                timers[timerIndex] = RECENTLY_PARENT;
                timers.push(NEWBORN);
            } /* else { // The timer decreases
                // console.log('before', timers[timerIndex]);
                timers[timerIndex] = timers[timerIndex] - 1;
                // console.log('after', timers[timerIndex]);
            } */
        }  

        // Timers
        /* timers = timers.map(timer => {
            if ((timer - 1) < WILL_BE_PARENT) {
                timer = RECENTLY_PARENT;
                timers.push(NEWBORN);
            } else {
                console.log('before', timer);
                timer--;
                console.log('after', timer);
            }

            return timer;
        }); */
        
        // console.log('After day', day + 1, 'days:', timers.join(','));
    }

    totalFishes = timers.length;

    console.log('The total number of lantern fishses after', NUMBER_OF_DAYS, 'days is', totalFishes);

    return totalFishes;
};

// const timers = '3,4,3,1,2';
const timers = '3,4,3,1,2';

simualteLanternsEvolution(timers);