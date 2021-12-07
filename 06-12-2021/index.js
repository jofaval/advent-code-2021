// This is for the first part
// const NUMBER_OF_DAYS = 80;
// const NUMBER_OF_DAYS = 18;

// This is for the second part
// const NUMBER_OF_DAYS = 256;

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
    const NUMBER_OF_DAYS = 80;
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

/**
 * Simulates the exponential evolution of the fishes
 * 
 * @param {String} rawTimers The list, comma-separated raw timers
 * 
 * @returns {Number} The number of fishes that will spawn
 */
const oldSimualteLanternsEvolutionV2 = rawTimers => {
    // const NUMBER_OF_DAYS = 256;
    // const NUMBER_OF_DAYS = 50;

    // 50 = 435
    // 100 = 33893
    // 150 = 2621894

    let totalFishes = 0;

    // Split the value by a comma
    let timers = rawTimers.split(',').map(timer => parseInt(timer));
    const timersLen = timers.length;
    console.log('Initial state:', timers);

    const NUMBER_OF_DAYS = 18;
    for (let timerIndex = 0; timerIndex < 1; timerIndex++) {
        // let childs = [];
        let childs = {
            '0': 1,
            '1': 0,
            '2': 0,
            '3': 0,
            '4': 0,
            '5': 0,
            '6': 0,
            '7': 0,
            '8': 0,
        };

        let timer = timers[timerIndex];

        // console.log({ timer, childs: Array.from(new Array(9).keys()).join(', ') });
        // console.log('empieza');

        // create child groups for looping, and regroup after a loop, for efficiency
        for (let day = 0; day < NUMBER_OF_DAYS; day++) {
            // Loop through the children to update them
            /* const childsLen = childs.length;
            for (let childIndex = 0; childIndex < childsLen; childIndex++) {
                let child = childs[childIndex];

                // New fish is born
                if (child == WILL_BE_PARENT) {
                    child = RECENTLY_PARENT;
                    childs.push(NEWBORN)
                }

                // Decrease the timer
                child--;

                // Update the modification
                childs[childIndex] = child;
            } */

            let tempChilds = childs;
            childs[1] = tempChilds[2];
            childs[2] = tempChilds[3];
            childs[3] = tempChilds[4];
            childs[4] = tempChilds[5];
            childs[5] = tempChilds[6];
            childs[6] = tempChilds[7];
            childs[7] = tempChilds[8];
            childs[8] = 0;

            if (childs[WILL_BE_PARENT] > 0) {
                childs[NEWBORN] += childs[WILL_BE_PARENT]
                childs[RECENTLY_PARENT] += childs[WILL_BE_PARENT]
                childs[WILL_BE_PARENT] = 0;
            }
            childs[WILL_BE_PARENT] = childs[1];

            // New fish is born
            /* if (timer == WILL_BE_PARENT) {
                timer = RECENTLY_PARENT;
                // childs.push(NEWBORN);

                console.log('New baby born from the original timer parent');
                if (!childs[NEWBORN]) childs[NEWBORN] = 0;
                childs[NEWBORN]++;

                if (!childs[RECENTLY_PARENT]) childs[RECENTLY_PARENT] = 0;
                childs[RECENTLY_PARENT]++;
            } */

            // Decrease the timer
            timer--;

            // Update the modification
            timers[timerIndex] = timer;

            // console.log('After day', day + 1, timer + ',' + childs.join(','));
            console.log({ timer, childs: Object.values(childs).join(', ') });
        }

        // The parent
        /* totalFishes += 1;
        totalChilds = Object.values(childs).reduce((acc, prev) => acc + prev);
        // console.log({ totalChilds });
        // And it's childs
        totalFishes += totalChilds; */

        // console.log({ totalFishes });
    }

    // Loop through the days
    /* for (let day = 0; day < NUMBER_OF_DAYS; day++) {
        const timersLen = timers.length;
        // Loop through the timers
        for (let timerIndex = 0; timerIndex < timersLen; timerIndex++) {
            timers[timerIndex] = timers[timerIndex] - 1;

            const timer = timers[timerIndex];

            // A new baby is born
            if (timer < WILL_BE_PARENT) {
                timers[timerIndex] = RECENTLY_PARENT;
                timers.push(NEWBORN);
            }
        }
        
        // console.log('After day', day + 1, 'days:', timers.join(','));
    }

    totalFishes = timers.length; */

    // Attempt to do a calculation
    // const timersLen = timers.length;

    // 50 = 435
    // 100 = 33893
    // 150 = 2621894

    /* let totalFromTimer = 0;
    const timersLen = timers.length;
    // const timersLen = 1;
    for (let timersIndex = 0; timersIndex < timersLen; timersIndex++) {
        const timer = timers[timersIndex];

        // The total number of days this timer will pass alive
        let totalTimerDays = NUMBER_OF_DAYS - timer;
        // All the childs from this first fish
        const totalFirstGenChilds = Math.floor(totalTimerDays / RECENTLY_PARENT);

        // Number of days, this one fish will produce
        totalFromTimer += totalFirstGenChilds;
        // The one fish who made all those fishes
        // totalFromTimer += 1;
        
        let days = totalTimerDays;
        let temp = 0;
        let newGenChilds = totalFirstGenChilds;


        // Calculate the subchilds
        while (days >= RECENTLY_PARENT) {
            console.log('before', { timer, days, 'childs': temp, totalFromTimer });

            // DEPRECATED - These are newborns, and so will be their timers
            // temp *= NEWBORN

            // DEPRECATED - To the total of new childs
            // const totalDays = ((days * temp) + (temp * -NEWBORN)) - (temp * 2);
            // const totalDays = temp + days;

            // DEPRECATED - Add the current days to the childs' timers, and divide it by the number of days to be a parent
            // const totalChilds = Math.floor((temp + days) / RECENTLY_PARENT);
            // let totalChilds = temp;
            // totalChilds += Math.floor((days - NEWBORN) / RECENTLY_PARENT);
            // totalFromTimer += totalChilds;
            // console.log('after', { timer, days, totalChilds, totalFromTimer });

            // DEPRECATED v2 (close call, but not exponential) - Calculate the new childs that will be born
            // let totalChildsTimer = temp * NEWBORN * days;
            // const daysOfBeingANewborn = totalChildsTimer - temp * RECENTLY_PARENT;
            // console.log({ totalChildsTimer, daysOfBeingANewborn });
            // // Get total days without the first days of it being a newborn
            // totalChildsTimer -= daysOfBeingANewborn;
            // let totalChilds = Math.floor(totalChildsTimer / RECENTLY_PARENT);

            // DEPRECATED v3 (closer than ever) - Calculate the new childs that will be born
            // The days of being a newborn
            // days -= 2;
            // const daysToBeParent = Math.floor(days / RECENTLY_PARENT);
            // console.log({ daysToBeParent, temp });
            // let totalNewChilds = temp + daysToBeParent;
            // no están todos desde el principio, y yo lo estoy calculando como si así fuese
            // all the childs aren't from the start alive, big mistake
            // timer * day

            // Calculate their growth
            // To account for newborns
            temp += newGenChilds; 

            newGenChilds = temp;

            // days -= 2;
            // Add the new total childs
            totalFromTimer += temp;
            
            // The childs will be the new parents
            // temp = totalNewChilds
            // temp %= NEWBORN;

            days -= RECENTLY_PARENT
        }

        // Add total
        totalFishes += totalFromTimer;
    } */

    console.log('The total number of lantern fishses after', NUMBER_OF_DAYS, 'days is', totalFishes);

    return totalFishes;
};

/**
 * Rotates the childs
 * 
 * @param {Object} childs The childs to rotate
 * 
 * @returns {void}
 */
const rotateChilds = childs => {
    let tempChilds = {};

    const values = Object.values(childs);

    // Actually rotates
    values.push( values.shift() )

    // Create the new key-value pair object
    const range = Array.from(new Array(9).keys());
    range.forEach((k, i) => {tempChilds[k] = values[i]})

    // The parents
    tempChilds[RECENTLY_PARENT] += childs[0];

    return tempChilds;
}

/**
 * Simulates the exponential evolution of the fishes
 * 
 * @param {String} rawTimers The list, comma-separated raw timers
 * 
 * @returns {Number} The number of fishes that will spawn
 */
const simualteLanternsEvolutionV2 = rawTimers => {
    // const NUMBER_OF_DAYS = 256;
    // const NUMBER_OF_DAYS = 50;

    // 50 = 435
    // 100 = 33893
    // 150 = 2621894

    let totalFishes = 0;

    // Split the value by a comma
    let timers = rawTimers.trim().split(',').map(timer => parseInt(timer));
    const timersLen = timers.length;
    console.log('Initial state:', timers);

    const NUMBER_OF_DAYS = 256;
    let childs = {
        '0': 0,
        '1': 0,
        '2': 0,
        '3': 0,
        '4': 0,
        '5': 0,
        '6': 0,
        '7': 0,
        '8': 0,
    };

    timers.map(timer => childs[timer]++);

    for (let day = 0; day < NUMBER_OF_DAYS; day++) {
        // console.log('before day ' + day + ': ' + Object.values(childs).join(', '));
        childs = rotateChilds(childs);
        console.log('after  day ' + day + ': ' + Object.values(childs).join(', '));

        /* if (childs[WILL_BE_PARENT] > 0) {
            childs[NEWBORN] += childs[WILL_BE_PARENT]
            childs[RECENTLY_PARENT] += childs[WILL_BE_PARENT]
            childs[WILL_BE_PARENT] = 0;
        }
        childs[WILL_BE_PARENT] = childs[1]; */

        // create child groups for looping, and regroup after a loop, for efficiency
        /* for (let timerIndex = 0; timerIndex < timersLen; timerIndex++) {
            let timer = timers[timerIndex];

            // New fish is born
            if (timer == WILL_BE_PARENT) {
                timer = RECENTLY_PARENT;
                // childs.push(NEWBORN);

                // console.log('New baby born from the original timer parent');
                if (!childs[NEWBORN]) childs[NEWBORN] = 0;
                childs[NEWBORN]++;

                if (!childs[RECENTLY_PARENT]) childs[RECENTLY_PARENT] = 0;
                childs[RECENTLY_PARENT]++;
            }

            // Decrease the timer
            timer--;

            // Update the modification
            timers[timerIndex] = timer;

            // console.log('After day', day + 1, timer + ',' + childs.join(','));
            // console.log({ timer, childs: Object.values(childs).join(', ') });
        } */

        // totalFishes += timersLen + Object.values(childs).reduce((acc, prev) => acc + prev, 0);
    }

    totalFishes = Object.values(childs).reduce((acc, prev) => acc + prev, 0);

    // 50 = 435
    // 100 = 33893
    // 150 = 2621894

    console.log('The total number of lantern fishses after', NUMBER_OF_DAYS, 'days is', totalFishes);

    return totalFishes;
};

// const timers = '3,4,3,1,2';
const timers = `
5,1,1,3,1,1,5,1,2,1,5,2,5,1,1,1,4,1,1,5,1,1,4,1,1,1,3,5,1,1,1,1,1,1,1,1,1,4,4,4,1,1,1,1,1,4,1,1,1,1,1,5,1,1,1,4,1,1,1,1,1,3,1,1,4,1,4,1,1,2,3,1,1,1,1,4,1,2,2,1,1,1,1,1,1,3,1,1,1,1,1,2,1,1,1,1,1,1,1,4,4,1,4,2,1,1,1,1,1,4,3,1,1,1,1,2,1,1,1,2,1,1,3,1,1,1,2,1,1,1,3,1,3,1,1,1,1,1,1,1,1,1,3,1,1,1,1,3,1,1,1,1,1,1,2,1,1,2,3,1,2,1,1,4,1,1,5,3,1,1,1,2,4,1,1,2,4,2,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,4,3,1,2,1,2,1,5,1,2,1,1,5,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,1,1,1,1,1,3,1,1,5,1,1,1,1,5,1,4,1,1,1,4,1,3,4,1,4,1,1,1,1,1,1,1,1,1,3,5,1,3,1,1,1,1,4,1,5,3,1,1,1,1,1,5,1,1,1,2,2
`;

// simualteLanternsEvolution(timers);
simualteLanternsEvolutionV2(timers);

// Test-case for object rotation
// const childs = {
//     '0': 0,
//     '1': 1,
//     '2': 0,
//     '3': 0,
//     '4': 250,
//     '5': 0,
//     '6': 0,
//     '7': 0,
//     '8': 0,
// };
// let changed = rotateChilds(childs);
// changed = rotateChilds(changed);
// changed = rotateChilds(changed);
// changed = rotateChilds(changed);
// console.log(changed);