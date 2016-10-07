var React = require('react');
var cards = require('./card-types');
var classNames = require('classnames');

var indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

var CreditCard = React.createClass({
  propTypes: {
    onChange: React.PropTypes.func
  },

  getInitialState() {
    return {
      value: null,
      cardType: null
    }
  },

  cardFromNumber(num) {
    var card, i, j, len, len1, p, pattern, ref;
    num = (num + '').replace(/\D/g, '');
    for (i = 0, len = cards.length; i < len; i++) {
      card = cards[i];
      ref = card.patterns;
      for (j = 0, len1 = ref.length; j < len1; j++) {
        pattern = ref[j];
        p = pattern + '';
        if (num.substr(0, p.length) === p) {
          return card;
        }
      }
    }
  },

  cardFromType(type) {
    var card, i, len;
    for (i = 0, len = cards.length; i < len; i++) {
      card = cards[i];
      if (card.type === type) {
        return card;
      }
    }
  },

  luhnCheck(num) {
    var digit, digits, i, len, odd, sum;
    odd = true;
    sum = 0;
    digits = (num + '').split('').reverse();
    for (i = 0, len = digits.length; i < len; i++) {
      digit = digits[i];
      digit = parseInt(digit, 10);
      if ((odd = !odd)) {
        digit *= 2;
      }
      if (digit > 9) {
        digit -= 9;
      }
      sum += digit;
    }
    return sum % 10 === 0;
  },

  hasTextSelected($target) {
    var ref;
    if (($target.selectionStart != null) && $target.selectionStart !== $target.selectionEnd) {
      return true;
    }
    if ((typeof document !== 'undefined' && document !== null ? (ref = document.selection) != null ? ref.createRange : void 0 : void 0) != null) {
      if (document.selection.createRange().text) {
        return true;
      }
    }
    return false;
  },

  safeVal(value, $target) {
    var currPair, cursor, digit, last, prevPair;
    try {
      cursor = $target.selectionStart;
    } catch (e) {
      cursor = null;
    }
    last = $target.value;
    $target.value = value;
    // console.log("Value: " + value + ", target.value:" + $target.value);
    this._onChange(value);
    if (cursor !== null && $target === document.activeElement) {
      if (cursor === last.length) {
        cursor = value.length;
      }
      if (last !== value) {
        prevPair = last.slice(cursor - 1, +cursor + 1 || 9e9);
        currPair = value.slice(cursor - 1, +cursor + 1 || 9e9);
        digit = value[cursor];
        if (/\d/.test(digit) && prevPair === (digit + " ") && currPair === (" " + digit)) {
          cursor = cursor + 1;
        }
      }
      $target.selectionStart = cursor;
      return $target.selectionEnd = cursor;
    }
  },

  replaceFullWidthChars(str) {
    var chars, chr, fullWidth, halfWidth, i, idx, len, value;
    if (str == null) {
      str = '';
    }
    fullWidth = '\uff10\uff11\uff12\uff13\uff14\uff15\uff16\uff17\uff18\uff19';
    halfWidth = '0123456789';
    value = '';
    chars = str.split('');
    for (i = 0, len = chars.length; i < len; i++) {
      chr = chars[i];
      idx = fullWidth.indexOf(chr);
      if (idx > -1) {
        chr = halfWidth[idx];
      }
      value += chr;
    }
    return value;
  },

  reFormatNumeric(e) {
    var $target;
    $target = (e.currentTarget);
    var value = $target.value;
    value = this.replaceFullWidthChars(value);
    value = value.replace(/\D/g, '');
    return this.safeVal(value, $target);
  },

  reFormatCardNumber(e) {
    var $target;
    $target = e.currentTarget;
    var value = $target.value;
    value = this.replaceFullWidthChars(value);
    value = this._formatCardNumber(value);
    return this.safeVal(value, $target);
  },

  formatCardNumber(e) {
    var $target, card, digit, length, re, upperLength, value;
    digit = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digit)) {
      return;
    }
    $target = (e.currentTarget);
    value = $target.value;
    card = this.cardFromNumber(value + digit);
    length = (value.replace(/\D/g, '') + digit).length;
    upperLength = 16;
    if (card) {
      upperLength = card.length[card.length.length - 1];
    }
    if (length >= upperLength) {
      return;
    }
    if (($target.selectionStart != null) && $target.selectionStart !== value.length) {
      return;
    }
    if (card && card.type === 'amex') {
      re = /^(\d{4}|\d{4}\s\d{6})$/;
    } else {
      re = /(?:^|\s)(\d{4})$/;
    }
    if (re.test(value)) {
      e.preventDefault();
      return setTimeout(function() {
        return $target.value = (value + ' ' + digit);
      });
    } else if (re.test(value + digit)) {
      e.preventDefault();
      return setTimeout(function() {
        return $target.value = (value + digit + ' ');
      });
    }
  },

  formatBackCardNumber(e) {
    var $target, value;
    $target = e.currentTarget;
    value = $target.value;
    if (e.which !== 8) {
      return;
    }
    if (($target.selectionStart != null) && $target.selectionStart !== value.length) {
      return;
    }
    if (/\d\s$/.test(value)) {
      e.preventDefault();
      return setTimeout(function() {
        return $target.value = (value.replace(/\d\s$/, ''));
      });
    } else if (/\s\d?$/.test(value)) {
      e.preventDefault();
      return setTimeout(function() {
        return $target.value = (value.replace(/\d$/, ''));
      });
    }
  },

  restrictNumeric(e) {
    var input;
    if (e.metaKey || e.ctrlKey) {
      return true;
    }
    if (e.which === 32) {
      return false;
    }
    if (e.which === 0) {
      return true;
    }
    if (e.which < 33) {
      return true;
    }
    input = String.fromCharCode(e.which);
    return !!/[\d\s]/.test(input);
  },

  restrictCardNumber(e) {
    var $target, card, digit, value;
    $target = e.currentTarget;
    digit = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digit)) {
      return;
    }
    if (this.hasTextSelected($target)) {
      return;
    }
    value = ($target.value + digit).replace(/\D/g, '');
    card = this.cardFromNumber(value);
    if (card) {
      return value.length <= card.length[card.length.length - 1];
    } else {
      return value.length <= 16;
    }
  },

  /**
   * Not used right now. Will hookup when needed as part of setting the classes
   *
   * @param num
   * @returns {*}
   */
  validateCardNumber(num) {
    var card, ref;
    num = (num + '').replace(/\s+|-/g, '');
    if (!/^\d+$/.test(num)) {
      return false;
    }
    card = this.cardFromNumber(num);
    if (!card) {
      return false;
    }
    return (ref = num.length, indexOf.call(card.length, ref) >= 0) && (card.luhn === false || this.luhnCheck(num));
  },

  _cardType(num) {
    var ref;
    if (!num) {
      return null;
    }
    return ((ref = this.cardFromNumber(num)) != null ? ref.type : void 0) || null;
  },

  setCardType(e) {
    this.setState({cardType: this._cardType(e.currentTarget.value)});
  },

  _formatCardNumber(num) {
    var card, groups, ref, upperLength;
    num = num.replace(/\D/g, '');
    card = this.cardFromNumber(num);
    if (!card) {
      return num;
    }
    upperLength = card.length[card.length.length - 1];
    num = num.slice(0, upperLength);
    if (card.format.global) {
      return (ref = num.match(card.format)) != null ? ref.join(' ') : void 0;
    } else {
      groups = card.format.exec(num);
      if (groups == null) {
        return;
      }
      groups.shift();
      return groups.join(' ');
    }
  },

  _onKeyPress(e) {
    this.restrictNumeric(e);
    this.restrictCardNumber(e);
    this.formatCardNumber(e)
  },

  _onInput(e) {
    this.reFormatCardNumber(e);
    this.setCardType(e);
  },

  _onChange(value) {
    if(this.props.onChange) {
      this.props.onChange(value);
    }
    this.setState({value: value})
  },

  render() {
    var classnames = classNames({'unknown': !this.state.cardType, 'identified': this.state.cardType}, this.state.cardType);

    return (<input {...this.props}
        className={classnames}
        ref={(el) => { this.creditCard = el}}
        onKeyPress={this._onKeyPress}
        onKeyDown={this.formatBackCardNumber}
        onKeyUp={this.setCardType}
        onPaste={this.reFormatCardNumber}
        onChange={this.reFormatCardNumber}
        onInput={this._onInput}
    />);
  }
});

module.exports = CreditCard;
