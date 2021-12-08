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