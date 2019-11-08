// days encoded as described in https://tools.ietf.org/html/rfc5545
const days = {
  'SU': 0,
  'MO': 1,
  'TU': 2,
  'WE': 3,
  'TH': 4,
  'FR': 5,
  'SA': 6
}

const rules = {
  FREQ: { WEEKLY: 'WEEKLY' },
  BYDAY: 'byday'
}

export default { days, rules };
