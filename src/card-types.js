const defaultFormat = /(\d{1,4})/g;

module.exports = [
  {
    type: 'visa',
    patterns: [4],
    format: defaultFormat,
    length: [13, 16],
    cvcLength: [3],
    luhn: true
  },
  {
    type: 'mastercard',
    patterns: [
      51, 52, 53, 54, 55,
      22, 23, 24, 25, 26, 27
    ],
    format: defaultFormat,
    length: [16],
    cvcLength: [3],
    luhn: true
  },
  {
    type: 'amex',
    patterns: [34, 37],
    format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
    length: [15],
    cvcLength: [3, 4],
    luhn: true
  },
  {
    type: 'dinersclub',
    patterns: [30, 36, 38, 39],
    format: /(\d{1,4})(\d{1,6})?(\d{1,4})?/,
    length: [14],
    cvcLength: [3],
    luhn: true
  },
  {
    type: 'discover',
    patterns: [60, 64, 65, 622],
    format: defaultFormat,
    length: [16],
    cvcLength: [3],
    luhn: true
  },
  {
    type: 'unionpay',
    patterns: [62, 88],
    format: defaultFormat,
    length: [16, 17, 18, 19],
    cvcLength: [3],
    luhn: false
  },
  {
    type: 'jcb',
    patterns: [35],
    format: defaultFormat,
    length: [16],
    cvcLength: [3],
    luhn: true
  }
];
