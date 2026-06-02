'use strict';

const { BaseModel } = require('./BaseModel');

class CharacterChecker extends BaseModel {
  static getLabel() {
    return 'Character Checker';
  }

  static check(input1, input2, caseSensitive) {
    // ── Validation ──────────────────────────────────────────────────────────
    if (!input1 || !input2) {
      return { error: 'Kedua input harus diisi.' };
    }

    const originalInput1 = input1;
    const originalInput2 = input2;
    const totalChars = input1.length;
    const matchedCharsSet = new Set();
    const steps = [];

    for (let i = 0; i < input1.length; i++) {
      const charFromInput1 = input1[i];
      let foundInInput2 = false;

      for (let j = 0; j < input2.length; j++) {
        const charFromInput2 = input2[j];

        if (caseSensitive) {
          if (charFromInput1 === charFromInput2) {
            foundInInput2 = true;
            break;
          }
        } else {
          if (charFromInput1.toLowerCase() === charFromInput2.toLowerCase()) {
            foundInInput2 = true;
            break;
          }
        }
      }

      steps.push({
        char: charFromInput1,
        index: i,
        found: foundInInput2,
      });

      if (foundInInput2) {
        matchedCharsSet.add(
          caseSensitive ? charFromInput1 : charFromInput1.toLowerCase()
        );
      }
    }

    const matchedCount = steps.filter(s => s.found).length;
    const percentage = totalChars > 0
      ? parseFloat(((matchedCount / totalChars) * 100).toFixed(2))
      : 0;

    const matchedChars = [...matchedCharsSet];

    return {
      input1: originalInput1,
      input2: originalInput2,
      caseSensitive,
      totalChars,
      matchedCount,
      percentage,
      matchedChars,
      steps,
    };
  }
}

module.exports = CharacterChecker;
