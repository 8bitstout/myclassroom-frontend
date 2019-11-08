import constants from './constants.js';

class RecurrencePattern {
  constructor(rule) {
    this.rule = rule;
  }

  parse = (ruleString=this.rule) => {
    const { rules, days } = constants;
    const p = ruleString.split(';').map(rule => {
      if (rule.includes('FREQ=')) {
        return rule.split('=')[1];
      }
      else if (rule.includes('BYDAY=')) {
        const day = rule.split('=')[1];
        return days[day];
      }
    });
    return ({
      frequency: rules.FREQ[p[0]],
      byday: p[1]
    })
  }
}

export default RecurrencePattern;