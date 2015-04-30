/**
 * Expose `Date`
 */

var parse = require('./lib/parser');

var mon = new Date('May 13, 2013 01:30:00');

console.log(parse("7 days ago", mon));

