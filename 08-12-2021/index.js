/**
 * Keys are the len required
 * Values are the human number they represent
 */
const DIGITAL_NUMBERS = {
    4: 4,
    3: 7,
    7: 8,
    2: 1,
}

/**
 * Evaluates a single pattern
 * 
 * @param {String} pattern The pattern to evaluate
 * 
 * @returns {Number} Total number of ocurrences for 1, 4, 7 and 8
 */
const evaluatePattern = pattern => {
    // Total number of ocurrences for 1, 4, 7 and 8
    let occurrences = 0;

    pattern = pattern.split('|');

    // Extract the signal patterns
    const uniqueSignalPatterns = pattern[0].trim().split(' ');

    // Extract the digital ouputs it provides
    const digitalOutputs = pattern[1].trim().split(' ');

    const digitalOutputsLen = digitalOutputs.length;
    for (let digitalOutputIndex = 0; digitalOutputIndex < digitalOutputsLen; digitalOutputIndex++) {
        const digitalOutput = digitalOutputs[digitalOutputIndex];
        
        // If they appear, compute them
        if (DIGITAL_NUMBERS[digitalOutput.length]) occurrences++;
    }

    return occurrences;
}

/**
 * Return the number of times some digital numbers have been represented
 * 
 * @param {String} uniquePatterns All the unique patterns of the system
 * 
 * @returns {Number} Occurrences of 1, 4, 7 and 8
 */
const deciferSignalValues = uniquePatterns => {
    // Total number of ocurrences for 1, 4, 7 and 8
    let occurrences = 0;

    // Prepare the patterns
    const parsedUniquePatterns = uniquePatterns.trim();
    const patterns = parsedUniquePatterns.split(/\n/);

    patterns.map(pattern => occurrences += evaluatePattern(pattern))

    console.log('The total number of occurences for 1, 4, 7 and 8 was:', occurrences);

    return occurrences;
}

/**
 * Keys are the len required
 * Values are the human number they represent
 */
/* const DIGITAL_NUMBERS_V2 = {
    'acedgfb': 8,
    'gcdfa'  : 2,
    'fbcad'  : 3,
    'cdfbe'  : 5,
    'dab'    : 7,
    'cefabd' : 9,
    'cdfgeb' : 6,
    'eafb'   : 4,
    'cagedb' : 0,
    'ab'     : 1,

} */
// const DIGITAL_NUMBERS_V2 = {
    /* 'fdgacbe': 8,
    'dgebacf': 8,
    'egdcabf': 8,
    'gebdcfa': 8,
    'fadegcb': 8,
    'gbcadfe': 8,
    'gbdfcae': 8,
    'cefbgd': 9,
    'fcgedb': 9,
    'fdcagb': 9,
    'efabcd': 9,
    'dcbef': 5,
    'cedba': 3,
    'bfgea': 3,
    'cfgab': 3,
    'cefdb': 3,
    'cbgef': 5,
    'bagce': 5,
    'gcbe': 4,
    'gecf': 4,
    'ecba': 4,
    'cefg': 4,
    'fcge': 4,
    'fgae': 4,
    'cgb': 7,
    'cbg': 7,
    'bgf': 7,
    'bgc': 7,
    'cgb': 7,
    'gc': 1,
    'cg': 1,
    'cg': 1,
    'cb': 1,
    'ca': 1,
    'ed': 1,
    'cg': 1,
    'fg': 1,
    'gadfec': 6,
    'bcgafe': 6,
    'cdgba': 2, */
    
    /* 'acedgfb': 8,
    'cdfbe': 5,
    'gcdfa': 2,
    'fbcad': 3,
    'dab': 7,
    'cefabd': 9,
    'cdfgeb': 6,
    'eafb': 4,
    'cagedb': 0,
    'ab': 1, */

// }

/**
 * Try to find the key in the dict, even if they're not in proper order
 * 
 * @param {String} target The target key to find
 * @param {Object} DIGITAL_NUMBERS_V2 The dict to use
 * 
 * @returns {String}
 */
const getTrueKey = (target, DIGITAL_NUMBERS_V2) => {
    // Get the dict keys
    const keys = Object.keys(DIGITAL_NUMBERS_V2);

    const targetLen = target.length;
    const keysLen = keys.length;

    // Try to find the key
    for (let keyIndex = 0; keyIndex < keysLen; keyIndex++) {
        let key = keys[keyIndex];
        const keyLen = key.length;

        // If they're NOT the same length, we don't even bother evaluating them
        if (keyLen != targetLen) continue;

        // console.log('Have the same length!', { key, target });

        // To keep track of the score
        let score = 0;
        for (let targetIndex = 0; targetIndex < targetLen; targetIndex++) {
            const targetChar = target[targetIndex];
            
            for (let keySubIndex = keyLen - 1; keySubIndex >= 0; keySubIndex--) {
                const keyChar = key[keySubIndex];
                
                if (keyChar == targetChar) {
                    score++;
                    break;
                }
            }
        }

        // console.log({ target, key, score, isSame: score == targetLen });

        // If all the chars from target, were found in key, it's a match
        if (score == targetLen) return keys[keyIndex];
    }

    return target;
}

/**
 * Detects if it has all chars
 * 
 * @param {String} original The original string
 * @param {String[]} chars The chars to have
 * 
 * @returns {Boolean} Has all chars?
 */
const hasChars = (original, chars) => {
    // If the chars are a string, split it
    if (typeof chars === "string") chars = chars.split('');

    // Detect the chars that are not included
    chars = chars.filter(char => !original.includes(char));

    // If there are any, it's false, true otherwise
    return !chars.length;
}

/**
 * Decodes the connection between signals and outputs
 * 
 * @param {String[]} uniqueSignals The unique signals
 * @param {String[]} digitalOutputs The digital outputs
 * 
 * @returns {Object} The relation
 */
const decode = (uniqueSignals, digitalOutputs) => {
    let tempSignals = Array.from(uniqueSignals);

    let dict = {};

    // decoding is processed by retrieving first the constants, then rendering the next values
    // 1 has the two right sides, and so will 3, that's some clue right there, 7 will be the same as one,
    // but with the top one selected
    let signalsLen = tempSignals.length;
    for (let signalIndex = signalsLen - 1; signalIndex >= 0; signalIndex--) {
        const signal = tempSignals[signalIndex];
        if (!signal) continue;

        const signalLen = signal.length;
        // Removes the number if already found
        if (DIGITAL_NUMBERS[signalLen]) {
            tempSignals.splice(signalIndex);
            dict[signal] = DIGITAL_NUMBERS[signalLen];
        } /* else { // decode
            // May be 2, 3 or 5
            if (signalLen == 5) {
                if (!signal.includes('f')) {
                    dict[signal] = 2;
                    continue;
                } else if (!signal.includes('e')) {
                    dict[signal] = 3;
                    continue;
                } else {
                    dict[signal] = 5;
                    continue;
                }
            } else {
                // May be 9, 6 or 0
                if (!signal.includes('f')) {
                    dict[signal] = 0;
                    continue;
                } else if (!signal.includes('a')) {
                    dict[signal] = 6;
                    continue;
                } else {
                    dict[signal] = 9;
                    continue;
                }
            }
        } */
    }

    const seven = Object.keys(dict).find(key => dict[key] == 7);
    const one = Object.keys(dict).find(key => dict[key] == 1);
    const four = Object.keys(dict).find(key => dict[key] == 4);
    const eight = Object.keys(dict).find(key => dict[key] == 8);
    const barTop = seven.split('').filter(c => !one.includes(c)).join('');
    console.log(barTop);

    // console.log(uniqueSignals);
    // Actually decode
    signalsLen = uniqueSignals.length;
    while (Object.keys(dict).length < 6) {
        
    }
    for (let signalIndex = signalsLen - 1; signalIndex >= 0; signalIndex--) {
        const signal = uniqueSignals[signalIndex];
        if (!signal) continue;

        let value = 0;

        const signalLen = signal.length;
        // Removes the number if already found
        // May be 2, 3 or 5
        if (signalLen == 5) {
            // console.log('Has a length of 5', signal);

            if (hasChars(signal, seven)) value = 3;
        } else {
            // May be 9, 6 or 0
            if (!signal.includes('f')) {
                dict[signal] = 0;
                continue;
            } else if (!signal.includes('a')) {
                dict[signal] = 6;
                continue;
            } else {
                dict[signal] = 9;
                continue;
            }
        }

        dict[signal] = value;
    }

    // console.log({ dict });

    return dict;
}

/**
 * Evaluates a single pattern
 * 
 * @param {String} pattern The pattern to evaluate
 * 
 * @returns {Number} Total number of ocurrences for 1, 4, 7 and 8
 */
const evaluatePatternV2 = pattern => {
    pattern = pattern.split('|');

    // Extract the signal patterns
    const uniqueSignalPatterns = pattern[0].trim().split(/\s/);

    /* const DIGITAL_NUMBERS_V2 = {
        [uniqueSignalPatterns[0]]: 8,
        [uniqueSignalPatterns[1]]: 5,
        [uniqueSignalPatterns[2]]: 2,
        [uniqueSignalPatterns[3]]: 3,
        [uniqueSignalPatterns[4]]: 7,
        [uniqueSignalPatterns[5]]: 9,
        [uniqueSignalPatterns[6]]: 6,
        [uniqueSignalPatterns[7]]: 4,
        [uniqueSignalPatterns[8]]: 0,
        [uniqueSignalPatterns[9]]: 1,
    } */

    // console.log('DIGITAL_NUMBERS_V2', DIGITAL_NUMBERS_V2);

    // Extract the digital ouputs it provides
    const digitalOutputs = pattern[1].trim().split(/\s/);
    
    const DIGITAL_NUMBERS_V2 = decode(uniqueSignalPatterns, digitalOutputs);

    let total = '';
    const digitalOutputsLen = digitalOutputs.length;
    for (let digitalOutputIndex = 0; digitalOutputIndex < digitalOutputsLen; digitalOutputIndex++) {
        const digitalOutput = digitalOutputs[digitalOutputIndex].trim();
        
        const trueKey = getTrueKey(digitalOutput, DIGITAL_NUMBERS_V2);
        // const trueKey = digitalOutput;
        let value = '';

        // If they appear, compute them
        if (DIGITAL_NUMBERS[digitalOutput.length]) {
            value = DIGITAL_NUMBERS[digitalOutput.length]
        } else if (DIGITAL_NUMBERS_V2[trueKey]) {
            value = DIGITAL_NUMBERS_V2[trueKey];
        } else {
            // console.log('value', value ? parseInt(value) : 0);
        }

        total += value ? parseInt(value) : 0
    }

    if (!total) return 0;

    total = parseInt(total);

    return total;
}

/**
 * Return the number of times some digital numbers have been represented
 * 
 * @param {String} uniquePatterns All the unique patterns of the system
 * 
 * @returns {Number} Occurrences of 1, 4, 7 and 8
 */
const deciferSignalValuesV2 = uniquePatterns => {
    // Total number of ocurrences for 1, 4, 7 and 8
    let total = 0;

    // Prepare the patterns
    const parsedUniquePatterns = uniquePatterns.trim();
    const patterns = parsedUniquePatterns.split(/\n/);

    patterns.map(pattern => {
        const numberFromPattern = evaluatePatternV2(pattern);

        console.log(pattern.split('|')[1].trim(), numberFromPattern);

        total += numberFromPattern;
    })

    console.log('The total of all the patterns is:', total);

    return total;
}

const uniquePatterns = `
acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf
`;

// deciferSignalValues(uniquePatterns);
deciferSignalValuesV2(uniquePatterns);