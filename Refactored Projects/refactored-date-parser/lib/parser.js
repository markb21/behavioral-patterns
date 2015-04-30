/**
 * Module Dependencies
 */

var date = require('./date');
var debug = require('debug')('date:parser');

/**
 * Days
 */

var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
var months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september',
  'october', 'november', 'december' ]

/**
 * Regexs
 */

// 5, 05, 5:30, 5.30, 05:30:10, 05:30.10, 05.30.10, at 5
var rMeridiem = /^(\d{1,2})([:.](\d{1,2}))?([:.](\d{1,2}))?\s*([ap]m)/;
var rHourMinute = /^(\d{1,2})([:.](\d{1,2}))([:.](\d{1,2}))?/;
var rAtHour = /^at\s?(\d{1,2})$/;
var rDays = /\b(sun(day)?|mon(day)?|tues(day)?|wed(nesday)?|thur(sday|s)?|fri(day)?|sat(urday)?)s?\b/;
var rMonths = /^((\d{1,2})(st|nd|rd|th))\sof\s(january|february|march|april|may|june|july|august|september|october|november|december)/;
var rPast = /\b(last|yesterday|ago)\b/;
var rDayMod = /\b(morning|noon|afternoon|night|evening|midnight)\b/;
var rAgo = /^(\d*)\s?\b(second|minute|hour|day|week|month|year)[s]?\b\s?ago$/;

/**
 * Expose `parser`
 */

module.exports = parser;

/**
 * Initialize `parser`
 *
 * @param {String} str
 * @return {Date}
 * @api publics
 */

var Data = function(){
};

var initialize = function(){
  space.__proto__ = _next;
  _next.__proto__ = last;
  last.__proto__ = dayByName;
  dayByName.__proto__ = monthByName;
  monthByName.__proto__ = timeAgo;
  timeAgo.__proto__ = ago;
  ago.__proto__ = yesterday;
  yesterday.__proto__ = tomorrow;
  tomorrow.__proto__ = noon;
  noon.__proto__ = midnight;
  midnight.__proto__ = night;
  night.__proto__ = evening;
  evening.__proto__ = afternoon;
  afternoon.__proto__ = morning;
  morning.__proto__ = tonight;
  tonight.__proto__ = meridiem;
  meridiem.__proto__ = hourminute;
  hourminute.__proto__ = athour;
  athour.__proto__ = week;
  week.__proto__ = month;
  month.__proto__ = year;
  year.__proto__ = second;
  second.__proto__ = minute;
  minute.__proto__ = hour;
  hour.__proto__ = day;
  day.__proto__ = number;
  number.__proto__ = string;
  string.__proto__ = other;
  other.__proto__ = eos;
};

function parser(str, offset) {
  if(!(this instanceof parser)) return new parser(str, offset);
  if(typeof offset == 'string') offset = parser(offset);

  initialize();

  var d = offset || new Date;
  Data.date = new date(d);
  console.log(Data.date.date);
  Data.original = str;
  Data.str = str.toLowerCase();
  Data.stash = [];
  Data.tokens = [];
  while (advance() !== 'eos');
  debug('tokens %j', this.tokens);
  Data.nextTime(d);
  if (Data.date.date == d) throw new Error('Invalid date');
  return Data.date.date;
};

/**
 * Advance a token
 */

function advance() {

  var tok = space.handle();

  Data.tokens.push(tok);
  //console.log(tok);
  return tok;
};

/**
 * Lookahead `n` tokens.
 *
 * @param {Number} n
 * @return {Object}
 * @api private
 */

Data.lookahead = function(n){
  var fetch = n - Data.stash.length;
  if (fetch == 0) return Data.lookahead(++n);
  while (fetch-- > 0) Data.stash.push(advance());
  return Data.stash[--n];
};

/**
 * Lookahead a single token.
 *
 * @return {Token}
 * @api private
 */

Data.peek = function() {
  return Data.lookahead(1);
};

/**
 * Fetch next token including those stashed by peek.
 *
 * @return {Token}
 * @api private
 */

Data.next = function() {
  var tok = Data.stashed() || advance();
  return tok;
};

/**
 * Return the next possibly stashed token.
 *
 * @return {Token}
 * @api private
 */

Data.stashed = function() {
  var stashed = this.stash.shift();
  return stashed;
};

/**
 * Consume the given `len`.
 *
 * @param {Number|Array} len
 * @api private
 */

Data.skip = function(len){
  Data.str = Data.str.substr(Array.isArray(len)
      ? len[0].length
      : len);
};

/**
 * EOS
 */

var eos = {
  handle: function() {
    if (Data.str.length) return;
    return 'eos';
  }
}

/**
 * Space
 */
var space={
  handle: function() {
    var captures;
    if (captures = /^([ \t]+)/.exec(Data.str)) {
      Data.skip(captures);
      return advance();
    }
    return space.__proto__.handle();
  }
};

/**
 * Second
 */

var second = {
  handle: function(){
    var captures;
    if (captures = /^s(ec|econd)?s?/.exec(Data.str)) {
      Data.skip(captures);
      return 'second';
    }
    return second.__proto__.handle();
  }
};

/**
 * Minute
 */
var minute = {
  handle: function(){
    var captures;
    if (captures = /^m(in|inute)?s?/.exec(Data.str)) {
      Data.skip(captures);
      return 'minute';
    }
    return minute.__proto__.handle();
  }
};

/**
 * Hour
 */
var hour = {
  handle: function(){
    var captures;
    if (captures = /^h(r|our)s?/.exec(Data.str)) {
      Data.skip(captures);
      return 'hour';
    }
    return hour.__proto__.handle();
  }
};

/**
 * Day
 */
var day = {
  handle: function(){
    var captures;
    if (captures = /^d(ay)?s?/.exec(Data.str)) {
      Data.skip(captures);
      return 'day';
    }
    return day.__proto__.handle();
  }
};

/**
 * Day by name
 */
var dayByName = {
  handle: function(){
    var captures;
    var r = new RegExp('^' + rDays.source);
    if (captures = r.exec(Data.str)) {
      var day = captures[1];
      Data.skip(captures);
      Data.date[day](1);
      return captures[1];
    }
    return dayByName.__proto__.handle();
  }
};

/**
 * Month by name
 */
var monthByName = {
  handle: function(){
    var captures;
    if (captures = rMonths.exec(Data.str)) {
      var day = captures[2]
      var month = captures[4];
      Data.date.date.setMonth((months.indexOf(month)));
      if (day) Data.date.date.setDate(parseInt(day) - 1);
      Data.skip(captures);
      return captures[0];
    }
    return monthByName.__proto__.handle();
  }
};

var timeAgo = {
  handle: function(){
    var captures;
    if (captures = rAgo.exec(Data.str)) {
      var num = captures[1];
      var mod = captures[2];
      Data.date[mod](-num);
      Data.skip(captures);
      return 'timeAgo';
    }
    return timeAgo.__proto__.handle();
  }
};

/**
 * Week
 */
var week = {
  handle: function(){
    var captures;
    if (captures = /^w(k|eek)s?/.exec(Data.str)) {
      Data.skip(captures);
      return 'week';
    }
    return week.__proto__.handle();
  }
};

/**
 * Month
 */

var month = {
  handle: function() {
    var captures;
    if (captures = /^mon(th)?(es|s)?\b/.exec(Data.str)) {
      Data.skip(captures);
      return 'month';
    }
    return month.__proto__.handle();
  }
};

/**
 * Week
 */
var year = {
  handle: function() {
    var captures;
    if (captures = /^y(r|ear)s?/.exec(Data.str)) {
      Data.skip(captures);
      return 'year';
    }
    return year.__proto__.handle();
  }
};

/**
 * Meridiem am/pm
 */
var meridiem = {
  handle: function() {
    var captures;
    if (captures = rMeridiem.exec(Data.str)) {
      Data.skip(captures);
      Data.time(captures[1], captures[3], captures[5], captures[6]);
      return 'meridiem';
    }
    return meridiem.__proto__.handle();
  }
};

/**
 * Hour Minute (ex. 12:30)
 */
var hourminute = {
  handle: function() {
    var captures;
    if (captures = rHourMinute.exec(Data.str)) {
      Data.skip(captures);
      Data.time(captures[1], captures[3], captures[5]);
      return 'hourminute';
    }
    return hourminute.__proto__.handle();
  }
};

/**
 * At Hour (ex. at 5)
 */
var athour = {
  handle: function() {
    var captures;
    if (captures = rAtHour.exec(Data.str)) {
      Data.skip(captures);
      Data.time(captures[1], 0, 0, Data._meridiem);
      Data._meridiem = null;
      return 'athour';
    }
    return athour.__proto__.handle();
  }
};

/**
 * Time set helper
 */
Data.time = function(h, m, s, meridiem) {
  var d = this.date;
  var before = d.clone();

  if (meridiem) {
    // convert to 24 hour
    h = ('pm' == meridiem && 12 > h) ? +h + 12 : h; // 6pm => 18
    h = ('am' == meridiem && 12 == h) ? 0 : h; // 12am => 0
  }

  m = (!m && d.changed('minutes')) ? false : m;
  s = (!s && d.changed('seconds')) ? false : s;
  d.time(h, m, s);
};

/**
 * Best attempt to pick the next time this date will occur
 *
 * TODO: place at the end of the parsing
 */

Data.nextTime = function(before) {
  var d = Data.date;
  var orig = Data.original;

  if (before <= d.date || rPast.test(orig)) return this;

  // If time is in the past, we need to guess at the next time
  if (rDays.test(orig)) d.day(7);
  else if ((before - d.date) / 1000 > 60) d.day(1);

  return this;
};

/**
 * Yesterday
 */
var yesterday = {
  handle: function() {
    var captures;
    if (captures = /^(yes(terday)?)/.exec(Data.str)) {
      Data.skip(captures);
      Data.date.day(-1);
      return 'yesterday';
    }
    return yesterday.__proto__.handle();
  }
};

/**
 * Tomorrow
 */
var tomorrow = {
  handle: function() {
    var captures;
    if (captures = /^tom(orrow)?/.exec(Data.str)) {
      Data.skip(captures);
      Data.date.day(1);
      return 'tomorrow';
    }
    return tomorrow.__proto__.handle();
  }
};

/**
 * Noon
 */
var noon = {
  handle: function() {
    var captures;
    if (captures = /^noon\b/.exec(Data.str)) {
      Data.skip(captures);
      var before = Data.date.clone();
      Data.date.date.setHours(12, 0, 0);
      return 'noon';
    }
    return noon.__proto__.handle();
  }
};

/**
 * Midnight
 */
var midnight = {
  handle: function() {
    var captures;
    if (captures = /^midnight\b/.exec(Data.str)) {
      Data.skip(captures);
      var before = Data.date.clone();
      Data.date.date.setHours(0, 0, 0);
      return 'midnight';
    }
    return midnight.__proto__.handle();
  }
};

/**
 * Night (arbitrarily set at 7pm)
 */
var night = {
  handle: function() {
    var captures;
    if (captures = /^night\b/.exec(Data.str)) {
      Data.skip(captures);
      Data._meridiem = 'pm';
      var before = Data.date.clone();
      Data.date.date.setHours(19, 0, 0);
      return 'night'
    }
    return night.__proto__.handle();
  }
};

/**
 * Evening (arbitrarily set at 5pm)
 */
var evening = {
  handle: function() {
    var captures;
    if (captures = /^evening\b/.exec(Data.str)) {
      Data.skip(captures);
      Data._meridiem = 'pm';
      var before = Data.date.clone();
      Data.date.date.setHours(17, 0, 0);
      return 'evening'
    }
    return evening.__proto__.handle();
  }
};

/**
 * Afternoon (arbitrarily set at 2pm)
 */
var afternoon = {
  handle: function() {
    var captures;
    if (captures = /^afternoon\b/.exec(Data.str)) {
      Data.skip(captures);
      Data._meridiem = 'pm';
      var before = Data.date.clone();

      if (Data.date.changed('hours')) return 'afternoon';

      Data.date.date.setHours(14, 0, 0);
      return 'afternoon';
    }
    return afternoon.__proto__.handle();
  }
};

/**
 * Morning (arbitrarily set at 8am)
 */
var morning = {
  handle: function() {
    var captures;
    if (captures = /^morning\b/.exec(Data.str)) {
      Data.skip(captures);
      Data._meridiem = 'am';
      var before = Data.date.clone();
      if (!Data.date.changed('hours')) Data.date.date.setHours(8, 0, 0);
      return 'morning';
    }
    return morning.__proto__.handle();
  }
};

/**
 * Tonight
 */
var tonight = {
  handle: function() {
    var captures;
    if (captures = /^tonight\b/.exec(Data.str)) {
      Data.skip(captures);
      Data._meridiem = 'pm';
      return 'tonight';
    }
    return tonight.__proto__.handle();
  }
};

/**
 * Next time
 */
var _next= {
  handle: function() {
    var captures;
    if (captures = /^next/.exec(Data.str)) {
      Data.skip(captures);

      var d = new Date(Data.date.date);
      var mod = Data.peek();
      //console.log("mod: "+mod);
      //console.log(Data.date[mod]);
      // If we have a defined modifier, then update
      if (Data.date[mod]) {
        Data.next();
        // slight hack to modify already modified
        Data.date = date(d);
        Data.date[mod](1);
      } else if (rDayMod.test(mod)) {
        Data.date.day(1);
      }
      return 'next';
    }
    return _next.__proto__.handle();
  }
};

/**
 * Last time
 */
var last= {
  handle: function() {
    var captures;
    if (captures = /^last/.exec(Data.str)) {
      Data.skip(captures);
      var d = new Date(Data.date.date);
      var mod = Data.peek();

      // If we have a defined modifier, then update
      if (Data.date[mod]) {
        Data.next();
        // slight hack to modify already modified
        Data.date = date(d);
        Data.date[mod](-1);
      } else if (rDayMod.test(mod)) {
        Data.date.day(-1);
      }
      return 'last';
    }
    return last.__proto__.handle();
  }
};

/**
 * Ago
 */
var ago= {
  handle: function() {
    var captures;
    if (captures = /^ago\b/.exec(Data.str)) {
      Data.skip(captures);
      return 'ago';
    }
    return ago.__proto__.handle();
  }
};

/**
 * Number
 */
var number= {
  handle: function() {
    var captures;
    if (captures = /^(\d+)/.exec(Data.str)) {
      var n = captures[1];
      Data.skip(captures);
      var mod = Data.peek();

      // If we have a defined modifier, then update
      if (Data.date[mod]) {
        if ('ago' == Data.peek()) n = -n;
        Data.date[mod](n);
      } else if (Data._meridiem) {
        // when we don't have meridiem, possibly use context to guess
        Data.time(n, 0, 0, Data._meridiem);
        Data._meridiem = null;
      } else if (Data.original.indexOf('at') > -1 ) {
        Data.time(n, 0, 0, this._meridiem);
        Data._meridiem = null;
      }
      return 'number';
    }
    return number.__proto__.handle();
  }
};

/**
 * String
 */
var string= {
  handle: function() {
    var captures;
    if (captures = /^\w+/.exec(Data.str)) {
      Data.skip(captures);
      return 'string';
    }
    return string.__proto__.handle();
  }
};

/**
 * Other
 */
var other = {
  handle: function() {
    var captures;
    if (captures = /^./.exec(Data.str)) {
      Data.skip(captures);
      return 'other';
    }
    return other.__proto__.handle.apply();
  }
};
