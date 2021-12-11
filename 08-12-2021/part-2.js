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
 * Removes chars from a string
 * 
 * @param {String} original The string to work with
 * @param {String} exclude The chars to exclude
 * 
 * @returns {String} The new string
 */
const exclude = (original, exclude) => {
    original = original
        .split('')
        .filter(char => !exclude.includes(char))
        .join('');

    return original;
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

    // decoding is processed by retrieving first the constants, then rendering the next values
    // 1 has the two right sides, and so will 3, that's some clue right there, 7 will be the same as one,
    // but with the top one selected

    const seven = tempSignals.find(signal => signal.length == 3);
    const one   = tempSignals.find(signal => signal.length == 2);
    const four  = tempSignals.find(signal => signal.length == 4);
    const eight = tempSignals.find(signal => signal.length == 7);

    const topBar = exclude(seven, one);

    // GROUPS OF 5 CHARACTERS
    const three = tempSignals.find(signal => {
        return signal.length == 5
            && hasChars(signal, seven);
    });
    const topLeftBar = exclude(four, three);
    const five = tempSignals.find(signal => {
        return signal.length == 5 && hasChars(signal, topLeftBar);
    });
    const two = tempSignals.find(signal => {
        return signal.length == 5 && !hasChars(signal, topLeftBar);
    });
    const centerBar = exclude(four, one + topLeftBar);
    const bottomLeftBar = exclude(two, three)
    const bottomRightBar = exclude(one, two);
    const topRightBar = exclude(one, bottomRightBar);
    const bottomBar = exclude(eight, centerBar + bottomLeftBar + bottomRightBar + topLeftBar + topRightBar + topBar)

    // console.log({ topLeftBar, topBar, bottomBar, centerBar, bottomLeftBar, bottomRightBar, topRightBar });

    // GROUPS OF 6 CHARACTERS
    /* const zero = tempSignals.find(signal => {
        return signal.length == 6
            && !hasChars(signal, centerBar);
    });
    const six = tempSignals.find(signal => {
        return signal.length == 6
            && hasChars(signal, bottomLeftBar);
    });
    const nine = tempSignals.find(signal => {
        return signal.length == 6
            && !hasChars(signal, bottomLeftBar);
    }); */
    const zero = bottomLeftBar + bottomRightBar + topLeftBar + topRightBar + topBar;
    const six = bottomBar + centerBar + bottomLeftBar + topLeftBar + topRightBar + topBar;
    const nine = bottomBar + centerBar + bottomRightBar + topLeftBar + topRightBar + topBar;

    const dict = {
        [seven]: 7,
        [one]:   1,
        [four]:  4,
        [eight]: 8,
        [three]: 3,
        [five]:  5,
        [two]:   2,
        [zero]:  0,
        [six]:   6,
        [nine]:  9,
    }

    // console.log(dict);

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

        // TODO: probar a crear el nueve e ir eliminando valores que ya hayan sido encontrados
        // If they appear, compute them
        if (DIGITAL_NUMBERS_V2[digitalOutput]) {
            value = DIGITAL_NUMBERS_V2[digitalOutput];
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
const deciferSignalValues = uniquePatterns => {
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
be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce
`;

deciferSignalValues(uniquePatterns);