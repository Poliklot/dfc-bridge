// Generated from bridge.schema.json with pinned Ajv/formats; do not edit.
/* Bundled ajv runtime helpers
The MIT License (MIT)

Copyright (c) 2015-2021 Evgeny Poberezkin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


*/
/* Bundled ajv-formats runtime helpers
MIT License

Copyright (c) 2020 Evgeny Poberezkin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/
/* Bundled fast-deep-equal runtime helpers
MIT License

Copyright (c) 2017 Evgeny Poberezkin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
};

// node_modules/ajv/dist/runtime/ucs2length.js
var require_ucs2length = __commonJS({
  "node_modules/ajv/dist/runtime/ucs2length.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function ucs2length(str) {
      const len = str.length;
      let length = 0;
      let pos = 0;
      let value;
      while (pos < len) {
        length++;
        value = str.charCodeAt(pos++);
        if (value >= 55296 && value <= 56319 && pos < len) {
          value = str.charCodeAt(pos);
          if ((value & 64512) === 56320)
            pos++;
        }
      }
      return length;
    }
    exports.default = ucs2length;
  }
});

// node_modules/ajv-formats/dist/formats.js
var require_formats = __commonJS({
  "node_modules/ajv-formats/dist/formats.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.formatNames = exports.fastFormats = exports.fullFormats = void 0;
    function fmtDef(validate2, compare) {
      return { validate: validate2, compare };
    }
    exports.fullFormats = {
      // date: http://tools.ietf.org/html/rfc3339#section-5.6
      date: fmtDef(date, compareDate),
      // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
      time: fmtDef(getTime(true), compareTime),
      "date-time": fmtDef(getDateTime(true), compareDateTime),
      "iso-time": fmtDef(getTime(), compareIsoTime),
      "iso-date-time": fmtDef(getDateTime(), compareIsoDateTime),
      // duration: https://tools.ietf.org/html/rfc3339#appendix-A
      duration: /^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/,
      uri,
      "uri-reference": /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i,
      // uri-template: https://tools.ietf.org/html/rfc6570
      "uri-template": /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i,
      // For the source: https://gist.github.com/dperini/729294
      // For test cases: https://mathiasbynens.be/demo/url-regex
      url: /^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu,
      email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
      hostname: /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i,
      // optimized https://www.safaribooksonline.com/library/view/regular-expressions-cookbook/9780596802837/ch07s16.html
      ipv4: /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/,
      ipv6: /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i,
      regex,
      // uuid: http://tools.ietf.org/html/rfc4122
      uuid: /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i,
      // JSON-pointer: https://tools.ietf.org/html/rfc6901
      // uri fragment: https://tools.ietf.org/html/rfc3986#appendix-A
      "json-pointer": /^(?:\/(?:[^~/]|~0|~1)*)*$/,
      "json-pointer-uri-fragment": /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i,
      // relative JSON-pointer: http://tools.ietf.org/html/draft-luff-relative-json-pointer-00
      "relative-json-pointer": /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/,
      // the following formats are used by the openapi specification: https://spec.openapis.org/oas/v3.0.0#data-types
      // byte: https://github.com/miguelmota/is-base64
      byte,
      // signed 32 bit integer
      int32: { type: "number", validate: validateInt32 },
      // signed 64 bit integer
      int64: { type: "number", validate: validateInt64 },
      // C-type float
      float: { type: "number", validate: validateNumber },
      // C-type double
      double: { type: "number", validate: validateNumber },
      // hint to the UI to hide input strings
      password: true,
      // unchecked string payload
      binary: true
    };
    exports.fastFormats = {
      ...exports.fullFormats,
      date: fmtDef(/^\d\d\d\d-[0-1]\d-[0-3]\d$/, compareDate),
      time: fmtDef(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, compareTime),
      "date-time": fmtDef(/^\d\d\d\d-[0-1]\d-[0-3]\dt(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, compareDateTime),
      "iso-time": fmtDef(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, compareIsoTime),
      "iso-date-time": fmtDef(/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, compareIsoDateTime),
      // uri: https://github.com/mafintosh/is-my-json-valid/blob/master/formats.js
      uri: /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i,
      "uri-reference": /^(?:(?:[a-z][a-z0-9+\-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,
      // email (sources from jsen validator):
      // http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address#answer-8829363
      // http://www.w3.org/TR/html5/forms.html#valid-e-mail-address (search for 'wilful violation')
      email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i
    };
    exports.formatNames = Object.keys(exports.fullFormats);
    function isLeapYear(year) {
      return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    }
    var DATE = /^(\d\d\d\d)-(\d\d)-(\d\d)$/;
    var DAYS = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    function date(str) {
      const matches = DATE.exec(str);
      if (!matches)
        return false;
      const year = +matches[1];
      const month = +matches[2];
      const day = +matches[3];
      return month >= 1 && month <= 12 && day >= 1 && day <= (month === 2 && isLeapYear(year) ? 29 : DAYS[month]);
    }
    function compareDate(d1, d2) {
      if (!(d1 && d2))
        return void 0;
      if (d1 > d2)
        return 1;
      if (d1 < d2)
        return -1;
      return 0;
    }
    var TIME = /^(\d\d):(\d\d):(\d\d(?:\.\d+)?)(z|([+-])(\d\d)(?::?(\d\d))?)?$/i;
    function getTime(strictTimeZone) {
      return function time(str) {
        const matches = TIME.exec(str);
        if (!matches)
          return false;
        const hr = +matches[1];
        const min = +matches[2];
        const sec = +matches[3];
        const tz = matches[4];
        const tzSign = matches[5] === "-" ? -1 : 1;
        const tzH = +(matches[6] || 0);
        const tzM = +(matches[7] || 0);
        if (tzH > 23 || tzM > 59 || strictTimeZone && !tz)
          return false;
        if (hr <= 23 && min <= 59 && sec < 60)
          return true;
        const utcMin = min - tzM * tzSign;
        const utcHr = hr - tzH * tzSign - (utcMin < 0 ? 1 : 0);
        return (utcHr === 23 || utcHr === -1) && (utcMin === 59 || utcMin === -1) && sec < 61;
      };
    }
    function compareTime(s1, s2) {
      if (!(s1 && s2))
        return void 0;
      const t1 = (/* @__PURE__ */ new Date("2020-01-01T" + s1)).valueOf();
      const t2 = (/* @__PURE__ */ new Date("2020-01-01T" + s2)).valueOf();
      if (!(t1 && t2))
        return void 0;
      return t1 - t2;
    }
    function compareIsoTime(t1, t2) {
      if (!(t1 && t2))
        return void 0;
      const a1 = TIME.exec(t1);
      const a2 = TIME.exec(t2);
      if (!(a1 && a2))
        return void 0;
      t1 = a1[1] + a1[2] + a1[3];
      t2 = a2[1] + a2[2] + a2[3];
      if (t1 > t2)
        return 1;
      if (t1 < t2)
        return -1;
      return 0;
    }
    var DATE_TIME_SEPARATOR = /t|\s/i;
    function getDateTime(strictTimeZone) {
      const time = getTime(strictTimeZone);
      return function date_time(str) {
        const dateTime = str.split(DATE_TIME_SEPARATOR);
        return dateTime.length === 2 && date(dateTime[0]) && time(dateTime[1]);
      };
    }
    function compareDateTime(dt1, dt2) {
      if (!(dt1 && dt2))
        return void 0;
      const d1 = new Date(dt1).valueOf();
      const d2 = new Date(dt2).valueOf();
      if (!(d1 && d2))
        return void 0;
      return d1 - d2;
    }
    function compareIsoDateTime(dt1, dt2) {
      if (!(dt1 && dt2))
        return void 0;
      const [d1, t1] = dt1.split(DATE_TIME_SEPARATOR);
      const [d2, t2] = dt2.split(DATE_TIME_SEPARATOR);
      const res = compareDate(d1, d2);
      if (res === void 0)
        return void 0;
      return res || compareTime(t1, t2);
    }
    var NOT_URI_FRAGMENT = /\/|:/;
    var URI = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
    function uri(str) {
      return NOT_URI_FRAGMENT.test(str) && URI.test(str);
    }
    var BYTE = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
    function byte(str) {
      BYTE.lastIndex = 0;
      return BYTE.test(str);
    }
    var MIN_INT32 = -(2 ** 31);
    var MAX_INT32 = 2 ** 31 - 1;
    function validateInt32(value) {
      return Number.isInteger(value) && value <= MAX_INT32 && value >= MIN_INT32;
    }
    function validateInt64(value) {
      return Number.isInteger(value);
    }
    function validateNumber() {
      return true;
    }
    var Z_ANCHOR = /[^\\]\\Z/;
    function regex(str) {
      if (Z_ANCHOR.test(str))
        return false;
      try {
        new RegExp(str);
        return true;
      } catch (e) {
        return false;
      }
    }
  }
});

// node_modules/fast-deep-equal/index.js
var require_fast_deep_equal = __commonJS({
  "node_modules/fast-deep-equal/index.js"(exports, module) {
    "use strict";
    module.exports = function equal(a, b) {
      if (a === b) return true;
      if (a && b && typeof a == "object" && typeof b == "object") {
        if (a.constructor !== b.constructor) return false;
        var length, i, keys;
        if (Array.isArray(a)) {
          length = a.length;
          if (length != b.length) return false;
          for (i = length; i-- !== 0; )
            if (!equal(a[i], b[i])) return false;
          return true;
        }
        if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
        if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
        if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();
        keys = Object.keys(a);
        length = keys.length;
        if (length !== Object.keys(b).length) return false;
        for (i = length; i-- !== 0; )
          if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
        for (i = length; i-- !== 0; ) {
          var key = keys[i];
          if (!equal(a[key], b[key])) return false;
        }
        return true;
      }
      return a !== a && b !== b;
    };
  }
});

// node_modules/ajv/dist/runtime/equal.js
var require_equal = __commonJS({
  "node_modules/ajv/dist/runtime/equal.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var equal = require_fast_deep_equal();
    exports.default = equal;
  }
});

// bridge-standalone.mjs
var validate = validate20;
var bridge_standalone_default = validate20;
var pattern4 = new RegExp("^(?:0|[1-9][0-9]*)\\.(?:0|[1-9][0-9]*)\\.(?:0|[1-9][0-9]*)$", "u");
var func1 = require_ucs2length().default;
var formats0 = require_formats().fullFormats["date-time"];
function validate22(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate22.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (errors === 0) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
      if (Object.keys(data).length < 1) {
        validate22.errors = [{ instancePath, schemaPath: "#/minProperties", keyword: "minProperties", params: { limit: 1 }, message: "must NOT have fewer than 1 properties" }];
        return false;
      } else {
        if (data.tool !== void 0) {
          let data0 = data.tool;
          const _errs2 = errors;
          const _errs3 = errors;
          if (errors === _errs3) {
            if (typeof data0 === "string") {
              if (func1(data0) < 1) {
                validate22.errors = [{ instancePath: instancePath + "/tool", schemaPath: "#/$defs/nonEmpty/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                return false;
              }
            } else {
              validate22.errors = [{ instancePath: instancePath + "/tool", schemaPath: "#/$defs/nonEmpty/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
              return false;
            }
          }
          var valid0 = _errs2 === errors;
        } else {
          var valid0 = true;
        }
        if (valid0) {
          if (data.documentId !== void 0) {
            let data1 = data.documentId;
            const _errs5 = errors;
            const _errs6 = errors;
            if (errors === _errs6) {
              if (typeof data1 === "string") {
                if (func1(data1) < 1) {
                  validate22.errors = [{ instancePath: instancePath + "/documentId", schemaPath: "#/$defs/nonEmpty/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                  return false;
                }
              } else {
                validate22.errors = [{ instancePath: instancePath + "/documentId", schemaPath: "#/$defs/nonEmpty/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                return false;
              }
            }
            var valid0 = _errs5 === errors;
          } else {
            var valid0 = true;
          }
          if (valid0) {
            if (data.revision !== void 0) {
              let data2 = data.revision;
              const _errs8 = errors;
              const _errs9 = errors;
              if (errors === _errs9) {
                if (typeof data2 === "string") {
                  if (func1(data2) < 1) {
                    validate22.errors = [{ instancePath: instancePath + "/revision", schemaPath: "#/$defs/nonEmpty/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                    return false;
                  }
                } else {
                  validate22.errors = [{ instancePath: instancePath + "/revision", schemaPath: "#/$defs/nonEmpty/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                  return false;
                }
              }
              var valid0 = _errs8 === errors;
            } else {
              var valid0 = true;
            }
            if (valid0) {
              if (data.exportedAt !== void 0) {
                let data3 = data.exportedAt;
                const _errs11 = errors;
                if (errors === _errs11) {
                  if (errors === _errs11) {
                    if (typeof data3 === "string") {
                      if (!formats0.validate(data3)) {
                        validate22.errors = [{ instancePath: instancePath + "/exportedAt", schemaPath: "#/properties/exportedAt/format", keyword: "format", params: { format: "date-time" }, message: 'must match format "date-time"' }];
                        return false;
                      }
                    } else {
                      validate22.errors = [{ instancePath: instancePath + "/exportedAt", schemaPath: "#/properties/exportedAt/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                      return false;
                    }
                  }
                }
                var valid0 = _errs11 === errors;
              } else {
                var valid0 = true;
              }
            }
          }
        }
      }
    } else {
      validate22.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
      return false;
    }
  }
  validate22.errors = vErrors;
  return errors === 0;
}
validate22.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
var func0 = require_equal().default;
var pattern7 = new RegExp("^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$", "u");
var schema46 = { "type": "object", "additionalProperties": true, "required": ["kind", "rootIdentity", "boundary", "assetBoundary", "hostCompliance", "selectionMode", "contextIds", "readinessClaim"], "properties": { "kind": { "const": "section" }, "rootIdentity": { "$ref": "#/$defs/ref" }, "boundary": { "const": "selected-subtree" }, "assetBoundary": { "enum": ["none", "selected-root-opaque"] }, "hostCompliance": { "enum": ["legacy-out-of-scope", "bridge-out-of-scope", "unknown-out-of-scope"] }, "selectionMode": { "enum": ["single-root", "explicit-variants"] }, "contextIds": { "type": "array", "minItems": 1, "uniqueItems": true, "items": { "$ref": "#/$defs/ref" } }, "readinessClaim": { "const": "section-source-only" } }, "allOf": [{ "if": { "properties": { "selectionMode": { "const": "single-root" } }, "required": ["selectionMode"] }, "then": { "properties": { "contextIds": { "type": "array", "maxItems": 1 } } } }, { "if": { "properties": { "selectionMode": { "const": "explicit-variants" } }, "required": ["selectionMode"] }, "then": { "properties": { "contextIds": { "type": "array", "minItems": 2 } } } }] };
function validate25(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate25.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  const _errs1 = errors;
  const _errs2 = errors;
  let valid1 = true;
  const _errs3 = errors;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    let missing0;
    if (data.selectionMode === void 0 && (missing0 = "selectionMode")) {
      const err0 = {};
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    } else {
      if (data.selectionMode !== void 0) {
        if ("single-root" !== data.selectionMode) {
          const err1 = {};
          if (vErrors === null) {
            vErrors = [err1];
          } else {
            vErrors.push(err1);
          }
          errors++;
        }
      }
    }
  }
  var _valid0 = _errs3 === errors;
  errors = _errs2;
  if (vErrors !== null) {
    if (_errs2) {
      vErrors.length = _errs2;
    } else {
      vErrors = null;
    }
  }
  if (_valid0) {
    const _errs5 = errors;
    if (data && typeof data == "object" && !Array.isArray(data)) {
      if (data.contextIds !== void 0) {
        let data1 = data.contextIds;
        const _errs6 = errors;
        if (errors === _errs6) {
          if (Array.isArray(data1)) {
            if (data1.length > 1) {
              validate25.errors = [{ instancePath: instancePath + "/contextIds", schemaPath: "#/allOf/0/then/properties/contextIds/maxItems", keyword: "maxItems", params: { limit: 1 }, message: "must NOT have more than 1 items" }];
              return false;
            }
          } else {
            validate25.errors = [{ instancePath: instancePath + "/contextIds", schemaPath: "#/allOf/0/then/properties/contextIds/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
            return false;
          }
        }
      }
    }
    var _valid0 = _errs5 === errors;
    valid1 = _valid0;
    if (valid1) {
      var props0 = {};
      props0.contextIds = true;
      props0.selectionMode = true;
    }
  }
  if (!valid1) {
    const err2 = { instancePath, schemaPath: "#/allOf/0/if", keyword: "if", params: { failingKeyword: "then" }, message: 'must match "then" schema' };
    if (vErrors === null) {
      vErrors = [err2];
    } else {
      vErrors.push(err2);
    }
    errors++;
    validate25.errors = vErrors;
    return false;
  }
  var valid0 = _errs1 === errors;
  if (valid0) {
    const _errs8 = errors;
    const _errs9 = errors;
    let valid4 = true;
    const _errs10 = errors;
    if (data && typeof data == "object" && !Array.isArray(data)) {
      let missing1;
      if (data.selectionMode === void 0 && (missing1 = "selectionMode")) {
        const err3 = {};
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      } else {
        if (data.selectionMode !== void 0) {
          if ("explicit-variants" !== data.selectionMode) {
            const err4 = {};
            if (vErrors === null) {
              vErrors = [err4];
            } else {
              vErrors.push(err4);
            }
            errors++;
          }
        }
      }
    }
    var _valid1 = _errs10 === errors;
    errors = _errs9;
    if (vErrors !== null) {
      if (_errs9) {
        vErrors.length = _errs9;
      } else {
        vErrors = null;
      }
    }
    if (_valid1) {
      const _errs12 = errors;
      if (data && typeof data == "object" && !Array.isArray(data)) {
        if (data.contextIds !== void 0) {
          let data3 = data.contextIds;
          const _errs13 = errors;
          if (errors === _errs13) {
            if (Array.isArray(data3)) {
              if (data3.length < 2) {
                validate25.errors = [{ instancePath: instancePath + "/contextIds", schemaPath: "#/allOf/1/then/properties/contextIds/minItems", keyword: "minItems", params: { limit: 2 }, message: "must NOT have fewer than 2 items" }];
                return false;
              }
            } else {
              validate25.errors = [{ instancePath: instancePath + "/contextIds", schemaPath: "#/allOf/1/then/properties/contextIds/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
              return false;
            }
          }
        }
      }
      var _valid1 = _errs12 === errors;
      valid4 = _valid1;
      if (valid4) {
        var props1 = {};
        props1.contextIds = true;
        props1.selectionMode = true;
      }
    }
    if (!valid4) {
      const err5 = { instancePath, schemaPath: "#/allOf/1/if", keyword: "if", params: { failingKeyword: "then" }, message: 'must match "then" schema' };
      if (vErrors === null) {
        vErrors = [err5];
      } else {
        vErrors.push(err5);
      }
      errors++;
      validate25.errors = vErrors;
      return false;
    }
    var valid0 = _errs8 === errors;
    if (valid0) {
      if (props0 !== true && props1 !== void 0) {
        if (props1 === true) {
          props0 = true;
        } else {
          props0 = props0 || {};
          Object.assign(props0, props1);
        }
      }
    }
  }
  if (errors === 0) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
      let missing2;
      if (data.kind === void 0 && (missing2 = "kind") || data.rootIdentity === void 0 && (missing2 = "rootIdentity") || data.boundary === void 0 && (missing2 = "boundary") || data.assetBoundary === void 0 && (missing2 = "assetBoundary") || data.hostCompliance === void 0 && (missing2 = "hostCompliance") || data.selectionMode === void 0 && (missing2 = "selectionMode") || data.contextIds === void 0 && (missing2 = "contextIds") || data.readinessClaim === void 0 && (missing2 = "readinessClaim")) {
        validate25.errors = [{ instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: missing2 }, message: "must have required property '" + missing2 + "'" }];
        return false;
      } else {
        if (data.kind !== void 0) {
          const _errs16 = errors;
          if ("section" !== data.kind) {
            validate25.errors = [{ instancePath: instancePath + "/kind", schemaPath: "#/properties/kind/const", keyword: "const", params: { allowedValue: "section" }, message: "must be equal to constant" }];
            return false;
          }
          var valid7 = _errs16 === errors;
        } else {
          var valid7 = true;
        }
        if (valid7) {
          if (data.rootIdentity !== void 0) {
            let data5 = data.rootIdentity;
            const _errs17 = errors;
            const _errs18 = errors;
            if (errors === _errs18) {
              if (typeof data5 === "string") {
                if (!pattern7.test(data5)) {
                  validate25.errors = [{ instancePath: instancePath + "/rootIdentity", schemaPath: "#/$defs/ref/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$" }, message: 'must match pattern "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$"' }];
                  return false;
                }
              } else {
                validate25.errors = [{ instancePath: instancePath + "/rootIdentity", schemaPath: "#/$defs/ref/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                return false;
              }
            }
            var valid7 = _errs17 === errors;
          } else {
            var valid7 = true;
          }
          if (valid7) {
            if (data.boundary !== void 0) {
              const _errs20 = errors;
              if ("selected-subtree" !== data.boundary) {
                validate25.errors = [{ instancePath: instancePath + "/boundary", schemaPath: "#/properties/boundary/const", keyword: "const", params: { allowedValue: "selected-subtree" }, message: "must be equal to constant" }];
                return false;
              }
              var valid7 = _errs20 === errors;
            } else {
              var valid7 = true;
            }
            if (valid7) {
              if (data.assetBoundary !== void 0) {
                let data7 = data.assetBoundary;
                const _errs21 = errors;
                if (!(data7 === "none" || data7 === "selected-root-opaque")) {
                  validate25.errors = [{ instancePath: instancePath + "/assetBoundary", schemaPath: "#/properties/assetBoundary/enum", keyword: "enum", params: { allowedValues: schema46.properties.assetBoundary.enum }, message: "must be equal to one of the allowed values" }];
                  return false;
                }
                var valid7 = _errs21 === errors;
              } else {
                var valid7 = true;
              }
              if (valid7) {
                if (data.hostCompliance !== void 0) {
                  let data8 = data.hostCompliance;
                  const _errs22 = errors;
                  if (!(data8 === "legacy-out-of-scope" || data8 === "bridge-out-of-scope" || data8 === "unknown-out-of-scope")) {
                    validate25.errors = [{ instancePath: instancePath + "/hostCompliance", schemaPath: "#/properties/hostCompliance/enum", keyword: "enum", params: { allowedValues: schema46.properties.hostCompliance.enum }, message: "must be equal to one of the allowed values" }];
                    return false;
                  }
                  var valid7 = _errs22 === errors;
                } else {
                  var valid7 = true;
                }
                if (valid7) {
                  if (data.selectionMode !== void 0) {
                    let data9 = data.selectionMode;
                    const _errs23 = errors;
                    if (!(data9 === "single-root" || data9 === "explicit-variants")) {
                      validate25.errors = [{ instancePath: instancePath + "/selectionMode", schemaPath: "#/properties/selectionMode/enum", keyword: "enum", params: { allowedValues: schema46.properties.selectionMode.enum }, message: "must be equal to one of the allowed values" }];
                      return false;
                    }
                    var valid7 = _errs23 === errors;
                  } else {
                    var valid7 = true;
                  }
                  if (valid7) {
                    if (data.contextIds !== void 0) {
                      let data10 = data.contextIds;
                      const _errs24 = errors;
                      if (errors === _errs24) {
                        if (Array.isArray(data10)) {
                          if (data10.length < 1) {
                            validate25.errors = [{ instancePath: instancePath + "/contextIds", schemaPath: "#/properties/contextIds/minItems", keyword: "minItems", params: { limit: 1 }, message: "must NOT have fewer than 1 items" }];
                            return false;
                          } else {
                            var valid9 = true;
                            const len0 = data10.length;
                            for (let i0 = 0; i0 < len0; i0++) {
                              let data11 = data10[i0];
                              const _errs26 = errors;
                              const _errs27 = errors;
                              if (errors === _errs27) {
                                if (typeof data11 === "string") {
                                  if (!pattern7.test(data11)) {
                                    validate25.errors = [{ instancePath: instancePath + "/contextIds/" + i0, schemaPath: "#/$defs/ref/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$" }, message: 'must match pattern "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$"' }];
                                    return false;
                                  }
                                } else {
                                  validate25.errors = [{ instancePath: instancePath + "/contextIds/" + i0, schemaPath: "#/$defs/ref/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                  return false;
                                }
                              }
                              var valid9 = _errs26 === errors;
                              if (!valid9) {
                                break;
                              }
                            }
                            if (valid9) {
                              let i1 = data10.length;
                              let j0;
                              if (i1 > 1) {
                                outer0:
                                  for (; i1--; ) {
                                    for (j0 = i1; j0--; ) {
                                      if (func0(data10[i1], data10[j0])) {
                                        validate25.errors = [{ instancePath: instancePath + "/contextIds", schemaPath: "#/properties/contextIds/uniqueItems", keyword: "uniqueItems", params: { i: i1, j: j0 }, message: "must NOT have duplicate items (items ## " + j0 + " and " + i1 + " are identical)" }];
                                        return false;
                                        break outer0;
                                      }
                                    }
                                  }
                              }
                            }
                          }
                        } else {
                          validate25.errors = [{ instancePath: instancePath + "/contextIds", schemaPath: "#/properties/contextIds/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                          return false;
                        }
                      }
                      var valid7 = _errs24 === errors;
                    } else {
                      var valid7 = true;
                    }
                    if (valid7) {
                      if (data.readinessClaim !== void 0) {
                        const _errs29 = errors;
                        if ("section-source-only" !== data.readinessClaim) {
                          validate25.errors = [{ instancePath: instancePath + "/readinessClaim", schemaPath: "#/properties/readinessClaim/const", keyword: "const", params: { allowedValue: "section-source-only" }, message: "must be equal to constant" }];
                          return false;
                        }
                        var valid7 = _errs29 === errors;
                      } else {
                        var valid7 = true;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    } else {
      validate25.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
      return false;
    }
  }
  validate25.errors = vErrors;
  return errors === 0;
}
validate25.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
var schema49 = { "type": "object", "additionalProperties": true, "required": ["id", "kind", "reference", "status", "owner"], "properties": { "id": { "$ref": "#/$defs/id" }, "kind": { "enum": ["route", "anchor", "modal", "state", "form", "reset", "component", "data", "host-layout", "other"] }, "reference": { "$ref": "#/$defs/nonEmpty" }, "status": { "enum": ["resolved", "deferred", "unverified"] }, "owner": { "$ref": "#/$defs/owner" }, "contractUri": { "$ref": "#/$defs/uriReference" }, "reviewAt": { "$ref": "#/$defs/nonEmpty" }, "evidence": { "$ref": "#/$defs/refList" } }, "allOf": [{ "if": { "properties": { "status": { "const": "resolved" } }, "required": ["status"] }, "then": { "required": ["contractUri"] } }, { "if": { "properties": { "status": { "enum": ["deferred", "unverified"] } }, "required": ["status"] }, "then": { "required": ["reviewAt"] } }] };
function validate28(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate28.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  const _errs0 = errors;
  let valid0 = false;
  let passing0 = null;
  const _errs1 = errors;
  const _errs2 = errors;
  if (errors === _errs2) {
    if (typeof data === "string") {
      if (func1(data) < 1) {
        const err0 = { instancePath, schemaPath: "#/$defs/nonEmpty/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
        if (vErrors === null) {
          vErrors = [err0];
        } else {
          vErrors.push(err0);
        }
        errors++;
      }
    } else {
      const err1 = { instancePath, schemaPath: "#/$defs/nonEmpty/type", keyword: "type", params: { type: "string" }, message: "must be string" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
  }
  var _valid0 = _errs1 === errors;
  if (_valid0) {
    valid0 = true;
    passing0 = 0;
  }
  const _errs4 = errors;
  if (errors === _errs4) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
      let missing0;
      if (data.id === void 0 && (missing0 = "id") || data.role === void 0 && (missing0 = "role")) {
        const err2 = { instancePath, schemaPath: "#/oneOf/1/required", keyword: "required", params: { missingProperty: missing0 }, message: "must have required property '" + missing0 + "'" };
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
      } else {
        if (data.id !== void 0) {
          let data0 = data.id;
          const _errs7 = errors;
          const _errs8 = errors;
          if (errors === _errs8) {
            if (typeof data0 === "string") {
              if (!pattern7.test(data0)) {
                const err3 = { instancePath: instancePath + "/id", schemaPath: "#/$defs/id/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$" }, message: 'must match pattern "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$"' };
                if (vErrors === null) {
                  vErrors = [err3];
                } else {
                  vErrors.push(err3);
                }
                errors++;
              }
            } else {
              const err4 = { instancePath: instancePath + "/id", schemaPath: "#/$defs/id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
              if (vErrors === null) {
                vErrors = [err4];
              } else {
                vErrors.push(err4);
              }
              errors++;
            }
          }
          var valid2 = _errs7 === errors;
        } else {
          var valid2 = true;
        }
        if (valid2) {
          if (data.role !== void 0) {
            let data1 = data.role;
            const _errs10 = errors;
            const _errs11 = errors;
            if (errors === _errs11) {
              if (typeof data1 === "string") {
                if (func1(data1) < 1) {
                  const err5 = { instancePath: instancePath + "/role", schemaPath: "#/$defs/nonEmpty/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
                  if (vErrors === null) {
                    vErrors = [err5];
                  } else {
                    vErrors.push(err5);
                  }
                  errors++;
                }
              } else {
                const err6 = { instancePath: instancePath + "/role", schemaPath: "#/$defs/nonEmpty/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err6];
                } else {
                  vErrors.push(err6);
                }
                errors++;
              }
            }
            var valid2 = _errs10 === errors;
          } else {
            var valid2 = true;
          }
        }
      }
    } else {
      const err7 = { instancePath, schemaPath: "#/oneOf/1/type", keyword: "type", params: { type: "object" }, message: "must be object" };
      if (vErrors === null) {
        vErrors = [err7];
      } else {
        vErrors.push(err7);
      }
      errors++;
    }
  }
  var _valid0 = _errs4 === errors;
  if (_valid0 && valid0) {
    valid0 = false;
    passing0 = [passing0, 1];
  } else {
    if (_valid0) {
      valid0 = true;
      passing0 = 1;
      var props0 = true;
    }
  }
  if (!valid0) {
    const err8 = { instancePath, schemaPath: "#/oneOf", keyword: "oneOf", params: { passingSchemas: passing0 }, message: "must match exactly one schema in oneOf" };
    if (vErrors === null) {
      vErrors = [err8];
    } else {
      vErrors.push(err8);
    }
    errors++;
    validate28.errors = vErrors;
    return false;
  } else {
    errors = _errs0;
    if (vErrors !== null) {
      if (_errs0) {
        vErrors.length = _errs0;
      } else {
        vErrors = null;
      }
    }
  }
  validate28.errors = vErrors;
  evaluated0.props = props0;
  return errors === 0;
}
validate28.evaluated = { "dynamicProps": true, "dynamicItems": false };
function validate30(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate30.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (errors === 0) {
    if (Array.isArray(data)) {
      var valid0 = true;
      const len0 = data.length;
      for (let i0 = 0; i0 < len0; i0++) {
        let data0 = data[i0];
        const _errs1 = errors;
        const _errs2 = errors;
        if (errors === _errs2) {
          if (typeof data0 === "string") {
            if (!pattern7.test(data0)) {
              validate30.errors = [{ instancePath: instancePath + "/" + i0, schemaPath: "#/$defs/ref/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$" }, message: 'must match pattern "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$"' }];
              return false;
            }
          } else {
            validate30.errors = [{ instancePath: instancePath + "/" + i0, schemaPath: "#/$defs/ref/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
            return false;
          }
        }
        var valid0 = _errs1 === errors;
        if (!valid0) {
          break;
        }
      }
      if (valid0) {
        let i1 = data.length;
        let j0;
        if (i1 > 1) {
          outer0:
            for (; i1--; ) {
              for (j0 = i1; j0--; ) {
                if (func0(data[i1], data[j0])) {
                  validate30.errors = [{ instancePath, schemaPath: "#/uniqueItems", keyword: "uniqueItems", params: { i: i1, j: j0 }, message: "must NOT have duplicate items (items ## " + j0 + " and " + i1 + " are identical)" }];
                  return false;
                  break outer0;
                }
              }
            }
        }
      }
    } else {
      validate30.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
      return false;
    }
  }
  validate30.errors = vErrors;
  return errors === 0;
}
validate30.evaluated = { "items": true, "dynamicProps": false, "dynamicItems": false };
function validate27(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate27.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  const _errs1 = errors;
  const _errs2 = errors;
  let valid1 = true;
  const _errs3 = errors;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    let missing0;
    if (data.status === void 0 && (missing0 = "status")) {
      const err0 = {};
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    } else {
      if (data.status !== void 0) {
        if ("resolved" !== data.status) {
          const err1 = {};
          if (vErrors === null) {
            vErrors = [err1];
          } else {
            vErrors.push(err1);
          }
          errors++;
        }
      }
    }
  }
  var _valid0 = _errs3 === errors;
  errors = _errs2;
  if (vErrors !== null) {
    if (_errs2) {
      vErrors.length = _errs2;
    } else {
      vErrors = null;
    }
  }
  if (_valid0) {
    const _errs5 = errors;
    if (data && typeof data == "object" && !Array.isArray(data)) {
      let missing1;
      if (data.contractUri === void 0 && (missing1 = "contractUri")) {
        validate27.errors = [{ instancePath, schemaPath: "#/allOf/0/then/required", keyword: "required", params: { missingProperty: missing1 }, message: "must have required property '" + missing1 + "'" }];
        return false;
      }
    }
    var _valid0 = _errs5 === errors;
    valid1 = _valid0;
  }
  if (!valid1) {
    const err2 = { instancePath, schemaPath: "#/allOf/0/if", keyword: "if", params: { failingKeyword: "then" }, message: 'must match "then" schema' };
    if (vErrors === null) {
      vErrors = [err2];
    } else {
      vErrors.push(err2);
    }
    errors++;
    validate27.errors = vErrors;
    return false;
  }
  var valid0 = _errs1 === errors;
  if (valid0) {
    const _errs6 = errors;
    const _errs7 = errors;
    let valid3 = true;
    const _errs8 = errors;
    if (data && typeof data == "object" && !Array.isArray(data)) {
      let missing2;
      if (data.status === void 0 && (missing2 = "status")) {
        const err3 = {};
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      } else {
        if (data.status !== void 0) {
          let data1 = data.status;
          if (!(data1 === "deferred" || data1 === "unverified")) {
            const err4 = {};
            if (vErrors === null) {
              vErrors = [err4];
            } else {
              vErrors.push(err4);
            }
            errors++;
          }
        }
      }
    }
    var _valid1 = _errs8 === errors;
    errors = _errs7;
    if (vErrors !== null) {
      if (_errs7) {
        vErrors.length = _errs7;
      } else {
        vErrors = null;
      }
    }
    if (_valid1) {
      const _errs10 = errors;
      if (data && typeof data == "object" && !Array.isArray(data)) {
        let missing3;
        if (data.reviewAt === void 0 && (missing3 = "reviewAt")) {
          validate27.errors = [{ instancePath, schemaPath: "#/allOf/1/then/required", keyword: "required", params: { missingProperty: missing3 }, message: "must have required property '" + missing3 + "'" }];
          return false;
        }
      }
      var _valid1 = _errs10 === errors;
      valid3 = _valid1;
    }
    if (!valid3) {
      const err5 = { instancePath, schemaPath: "#/allOf/1/if", keyword: "if", params: { failingKeyword: "then" }, message: 'must match "then" schema' };
      if (vErrors === null) {
        vErrors = [err5];
      } else {
        vErrors.push(err5);
      }
      errors++;
      validate27.errors = vErrors;
      return false;
    }
    var valid0 = _errs6 === errors;
  }
  if (errors === 0) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
      let missing4;
      if (data.id === void 0 && (missing4 = "id") || data.kind === void 0 && (missing4 = "kind") || data.reference === void 0 && (missing4 = "reference") || data.status === void 0 && (missing4 = "status") || data.owner === void 0 && (missing4 = "owner")) {
        validate27.errors = [{ instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: missing4 }, message: "must have required property '" + missing4 + "'" }];
        return false;
      } else {
        if (data.id !== void 0) {
          let data2 = data.id;
          const _errs12 = errors;
          const _errs13 = errors;
          if (errors === _errs13) {
            if (typeof data2 === "string") {
              if (!pattern7.test(data2)) {
                validate27.errors = [{ instancePath: instancePath + "/id", schemaPath: "#/$defs/id/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$" }, message: 'must match pattern "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$"' }];
                return false;
              }
            } else {
              validate27.errors = [{ instancePath: instancePath + "/id", schemaPath: "#/$defs/id/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
              return false;
            }
          }
          var valid5 = _errs12 === errors;
        } else {
          var valid5 = true;
        }
        if (valid5) {
          if (data.kind !== void 0) {
            let data3 = data.kind;
            const _errs15 = errors;
            if (!(data3 === "route" || data3 === "anchor" || data3 === "modal" || data3 === "state" || data3 === "form" || data3 === "reset" || data3 === "component" || data3 === "data" || data3 === "host-layout" || data3 === "other")) {
              validate27.errors = [{ instancePath: instancePath + "/kind", schemaPath: "#/properties/kind/enum", keyword: "enum", params: { allowedValues: schema49.properties.kind.enum }, message: "must be equal to one of the allowed values" }];
              return false;
            }
            var valid5 = _errs15 === errors;
          } else {
            var valid5 = true;
          }
          if (valid5) {
            if (data.reference !== void 0) {
              let data4 = data.reference;
              const _errs16 = errors;
              const _errs17 = errors;
              if (errors === _errs17) {
                if (typeof data4 === "string") {
                  if (func1(data4) < 1) {
                    validate27.errors = [{ instancePath: instancePath + "/reference", schemaPath: "#/$defs/nonEmpty/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                    return false;
                  }
                } else {
                  validate27.errors = [{ instancePath: instancePath + "/reference", schemaPath: "#/$defs/nonEmpty/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                  return false;
                }
              }
              var valid5 = _errs16 === errors;
            } else {
              var valid5 = true;
            }
            if (valid5) {
              if (data.status !== void 0) {
                let data5 = data.status;
                const _errs19 = errors;
                if (!(data5 === "resolved" || data5 === "deferred" || data5 === "unverified")) {
                  validate27.errors = [{ instancePath: instancePath + "/status", schemaPath: "#/properties/status/enum", keyword: "enum", params: { allowedValues: schema49.properties.status.enum }, message: "must be equal to one of the allowed values" }];
                  return false;
                }
                var valid5 = _errs19 === errors;
              } else {
                var valid5 = true;
              }
              if (valid5) {
                if (data.owner !== void 0) {
                  const _errs20 = errors;
                  if (!validate28(data.owner, { instancePath: instancePath + "/owner", parentData: data, parentDataProperty: "owner", rootData, dynamicAnchors })) {
                    vErrors = vErrors === null ? validate28.errors : vErrors.concat(validate28.errors);
                    errors = vErrors.length;
                  }
                  var valid5 = _errs20 === errors;
                } else {
                  var valid5 = true;
                }
                if (valid5) {
                  if (data.contractUri !== void 0) {
                    let data7 = data.contractUri;
                    const _errs21 = errors;
                    const _errs22 = errors;
                    if (errors === _errs22) {
                      if (typeof data7 === "string") {
                        if (func1(data7) < 1) {
                          validate27.errors = [{ instancePath: instancePath + "/contractUri", schemaPath: "#/$defs/uriReference/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                          return false;
                        }
                      } else {
                        validate27.errors = [{ instancePath: instancePath + "/contractUri", schemaPath: "#/$defs/uriReference/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                        return false;
                      }
                    }
                    var valid5 = _errs21 === errors;
                  } else {
                    var valid5 = true;
                  }
                  if (valid5) {
                    if (data.reviewAt !== void 0) {
                      let data8 = data.reviewAt;
                      const _errs24 = errors;
                      const _errs25 = errors;
                      if (errors === _errs25) {
                        if (typeof data8 === "string") {
                          if (func1(data8) < 1) {
                            validate27.errors = [{ instancePath: instancePath + "/reviewAt", schemaPath: "#/$defs/nonEmpty/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                            return false;
                          }
                        } else {
                          validate27.errors = [{ instancePath: instancePath + "/reviewAt", schemaPath: "#/$defs/nonEmpty/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                          return false;
                        }
                      }
                      var valid5 = _errs24 === errors;
                    } else {
                      var valid5 = true;
                    }
                    if (valid5) {
                      if (data.evidence !== void 0) {
                        const _errs27 = errors;
                        if (!validate30(data.evidence, { instancePath: instancePath + "/evidence", parentData: data, parentDataProperty: "evidence", rootData, dynamicAnchors })) {
                          vErrors = vErrors === null ? validate30.errors : vErrors.concat(validate30.errors);
                          errors = vErrors.length;
                        }
                        var valid5 = _errs27 === errors;
                      } else {
                        var valid5 = true;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    } else {
      validate27.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
      return false;
    }
  }
  validate27.errors = vErrors;
  return errors === 0;
}
validate27.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
function validate24(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate24.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (errors === 0) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
      if (Object.keys(data).length < 1) {
        validate24.errors = [{ instancePath, schemaPath: "#/minProperties", keyword: "minProperties", params: { limit: 1 }, message: "must NOT have fewer than 1 properties" }];
        return false;
      } else {
        if (data.project !== void 0) {
          let data0 = data.project;
          const _errs2 = errors;
          const _errs3 = errors;
          if (errors === _errs3) {
            if (typeof data0 === "string") {
              if (func1(data0) < 1) {
                validate24.errors = [{ instancePath: instancePath + "/project", schemaPath: "#/$defs/nonEmpty/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                return false;
              }
            } else {
              validate24.errors = [{ instancePath: instancePath + "/project", schemaPath: "#/$defs/nonEmpty/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
              return false;
            }
          }
          var valid0 = _errs2 === errors;
        } else {
          var valid0 = true;
        }
        if (valid0) {
          if (data.product !== void 0) {
            let data1 = data.product;
            const _errs5 = errors;
            const _errs6 = errors;
            if (errors === _errs6) {
              if (typeof data1 === "string") {
                if (func1(data1) < 1) {
                  validate24.errors = [{ instancePath: instancePath + "/product", schemaPath: "#/$defs/nonEmpty/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                  return false;
                }
              } else {
                validate24.errors = [{ instancePath: instancePath + "/product", schemaPath: "#/$defs/nonEmpty/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                return false;
              }
            }
            var valid0 = _errs5 === errors;
          } else {
            var valid0 = true;
          }
          if (valid0) {
            if (data.page !== void 0) {
              let data2 = data.page;
              const _errs8 = errors;
              const _errs9 = errors;
              if (errors === _errs9) {
                if (typeof data2 === "string") {
                  if (!pattern7.test(data2)) {
                    validate24.errors = [{ instancePath: instancePath + "/page", schemaPath: "#/$defs/id/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$" }, message: 'must match pattern "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$"' }];
                    return false;
                  }
                } else {
                  validate24.errors = [{ instancePath: instancePath + "/page", schemaPath: "#/$defs/id/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                  return false;
                }
              }
              var valid0 = _errs8 === errors;
            } else {
              var valid0 = true;
            }
            if (valid0) {
              if (data.route !== void 0) {
                let data3 = data.route;
                const _errs11 = errors;
                const _errs12 = errors;
                if (errors === _errs12) {
                  if (typeof data3 === "string") {
                    if (func1(data3) < 1) {
                      validate24.errors = [{ instancePath: instancePath + "/route", schemaPath: "#/$defs/nonEmpty/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                      return false;
                    }
                  } else {
                    validate24.errors = [{ instancePath: instancePath + "/route", schemaPath: "#/$defs/nonEmpty/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                    return false;
                  }
                }
                var valid0 = _errs11 === errors;
              } else {
                var valid0 = true;
              }
              if (valid0) {
                if (data.targets !== void 0) {
                  let data4 = data.targets;
                  const _errs14 = errors;
                  if (errors === _errs14) {
                    if (Array.isArray(data4)) {
                      var valid5 = true;
                      const len0 = data4.length;
                      for (let i0 = 0; i0 < len0; i0++) {
                        let data5 = data4[i0];
                        const _errs16 = errors;
                        const _errs17 = errors;
                        if (errors === _errs17) {
                          if (typeof data5 === "string") {
                            if (func1(data5) < 1) {
                              validate24.errors = [{ instancePath: instancePath + "/targets/" + i0, schemaPath: "#/$defs/nonEmpty/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                              return false;
                            }
                          } else {
                            validate24.errors = [{ instancePath: instancePath + "/targets/" + i0, schemaPath: "#/$defs/nonEmpty/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                            return false;
                          }
                        }
                        var valid5 = _errs16 === errors;
                        if (!valid5) {
                          break;
                        }
                      }
                      if (valid5) {
                        let i1 = data4.length;
                        let j0;
                        if (i1 > 1) {
                          outer0:
                            for (; i1--; ) {
                              for (j0 = i1; j0--; ) {
                                if (func0(data4[i1], data4[j0])) {
                                  validate24.errors = [{ instancePath: instancePath + "/targets", schemaPath: "#/properties/targets/uniqueItems", keyword: "uniqueItems", params: { i: i1, j: j0 }, message: "must NOT have duplicate items (items ## " + j0 + " and " + i1 + " are identical)" }];
                                  return false;
                                  break outer0;
                                }
                              }
                            }
                        }
                      }
                    } else {
                      validate24.errors = [{ instancePath: instancePath + "/targets", schemaPath: "#/properties/targets/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                      return false;
                    }
                  }
                  var valid0 = _errs14 === errors;
                } else {
                  var valid0 = true;
                }
                if (valid0) {
                  if (data.scope !== void 0) {
                    const _errs19 = errors;
                    if (!validate25(data.scope, { instancePath: instancePath + "/scope", parentData: data, parentDataProperty: "scope", rootData, dynamicAnchors })) {
                      vErrors = vErrors === null ? validate25.errors : vErrors.concat(validate25.errors);
                      errors = vErrors.length;
                    }
                    var valid0 = _errs19 === errors;
                  } else {
                    var valid0 = true;
                  }
                  if (valid0) {
                    if (data.externalDependencies !== void 0) {
                      let data7 = data.externalDependencies;
                      const _errs20 = errors;
                      if (errors === _errs20) {
                        if (Array.isArray(data7)) {
                          var valid8 = true;
                          const len1 = data7.length;
                          for (let i2 = 0; i2 < len1; i2++) {
                            const _errs22 = errors;
                            if (!validate27(data7[i2], { instancePath: instancePath + "/externalDependencies/" + i2, parentData: data7, parentDataProperty: i2, rootData, dynamicAnchors })) {
                              vErrors = vErrors === null ? validate27.errors : vErrors.concat(validate27.errors);
                              errors = vErrors.length;
                            }
                            var valid8 = _errs22 === errors;
                            if (!valid8) {
                              break;
                            }
                          }
                          if (valid8) {
                            let i3 = data7.length;
                            let j1;
                            if (i3 > 1) {
                              outer1:
                                for (; i3--; ) {
                                  for (j1 = i3; j1--; ) {
                                    if (func0(data7[i3], data7[j1])) {
                                      validate24.errors = [{ instancePath: instancePath + "/externalDependencies", schemaPath: "#/properties/externalDependencies/uniqueItems", keyword: "uniqueItems", params: { i: i3, j: j1 }, message: "must NOT have duplicate items (items ## " + j1 + " and " + i3 + " are identical)" }];
                                      return false;
                                      break outer1;
                                    }
                                  }
                                }
                            }
                          }
                        } else {
                          validate24.errors = [{ instancePath: instancePath + "/externalDependencies", schemaPath: "#/properties/externalDependencies/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                          return false;
                        }
                      }
                      var valid0 = _errs20 === errors;
                    } else {
                      var valid0 = true;
                    }
                  }
                }
              }
            }
          }
        }
      }
    } else {
      validate24.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
      return false;
    }
  }
  validate24.errors = vErrors;
  return errors === 0;
}
validate24.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
function validate36(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate36.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (errors === 0) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
      let missing0;
      if (data.kind === void 0 && (missing0 = "kind")) {
        validate36.errors = [{ instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: missing0 }, message: "must have required property '" + missing0 + "'" }];
        return false;
      } else {
        if (data.kind !== void 0) {
          let data0 = data.kind;
          const _errs2 = errors;
          const _errs3 = errors;
          if (errors === _errs3) {
            if (typeof data0 === "string") {
              if (!pattern7.test(data0)) {
                validate36.errors = [{ instancePath: instancePath + "/kind", schemaPath: "#/$defs/id/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$" }, message: 'must match pattern "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$"' }];
                return false;
              }
            } else {
              validate36.errors = [{ instancePath: instancePath + "/kind", schemaPath: "#/$defs/id/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
              return false;
            }
          }
          var valid0 = _errs2 === errors;
        } else {
          var valid0 = true;
        }
        if (valid0) {
          if (data.semantics !== void 0) {
            let data1 = data.semantics;
            const _errs5 = errors;
            const _errs6 = errors;
            if (errors === _errs6) {
              if (typeof data1 === "string") {
                if (func1(data1) < 1) {
                  validate36.errors = [{ instancePath: instancePath + "/semantics", schemaPath: "#/$defs/nonEmpty/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                  return false;
                }
              } else {
                validate36.errors = [{ instancePath: instancePath + "/semantics", schemaPath: "#/$defs/nonEmpty/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                return false;
              }
            }
            var valid0 = _errs5 === errors;
          } else {
            var valid0 = true;
          }
        }
      }
    } else {
      validate36.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
      return false;
    }
  }
  validate36.errors = vErrors;
  return errors === 0;
}
validate36.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
function validate38(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate38.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (errors === 0) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
      let missing0;
      if (data.templateKey === void 0 && (missing0 = "templateKey")) {
        validate38.errors = [{ instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: missing0 }, message: "must have required property '" + missing0 + "'" }];
        return false;
      } else {
        if (data.templateKey !== void 0) {
          let data0 = data.templateKey;
          const _errs2 = errors;
          const _errs3 = errors;
          if (errors === _errs3) {
            if (typeof data0 === "string") {
              if (!pattern7.test(data0)) {
                validate38.errors = [{ instancePath: instancePath + "/templateKey", schemaPath: "#/$defs/id/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$" }, message: 'must match pattern "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$"' }];
                return false;
              }
            } else {
              validate38.errors = [{ instancePath: instancePath + "/templateKey", schemaPath: "#/$defs/id/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
              return false;
            }
          }
          var valid0 = _errs2 === errors;
        } else {
          var valid0 = true;
        }
        if (valid0) {
          if (data.sourceComponentId !== void 0) {
            let data1 = data.sourceComponentId;
            const _errs5 = errors;
            const _errs6 = errors;
            if (errors === _errs6) {
              if (typeof data1 === "string") {
                if (func1(data1) < 1) {
                  validate38.errors = [{ instancePath: instancePath + "/sourceComponentId", schemaPath: "#/$defs/nonEmpty/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                  return false;
                }
              } else {
                validate38.errors = [{ instancePath: instancePath + "/sourceComponentId", schemaPath: "#/$defs/nonEmpty/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                return false;
              }
            }
            var valid0 = _errs5 === errors;
          } else {
            var valid0 = true;
          }
          if (valid0) {
            if (data.sourceComponentName !== void 0) {
              let data2 = data.sourceComponentName;
              const _errs8 = errors;
              const _errs9 = errors;
              if (errors === _errs9) {
                if (typeof data2 === "string") {
                  if (func1(data2) < 1) {
                    validate38.errors = [{ instancePath: instancePath + "/sourceComponentName", schemaPath: "#/$defs/nonEmpty/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                    return false;
                  }
                } else {
                  validate38.errors = [{ instancePath: instancePath + "/sourceComponentName", schemaPath: "#/$defs/nonEmpty/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                  return false;
                }
              }
              var valid0 = _errs8 === errors;
            } else {
              var valid0 = true;
            }
          }
        }
      }
    } else {
      validate38.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
      return false;
    }
  }
  validate38.errors = vErrors;
  return errors === 0;
}
validate38.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
function validate41(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate41.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (errors === 0) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
      let missing0;
      if (data.contextId === void 0 && (missing0 = "contextId") || data.nodeId === void 0 && (missing0 = "nodeId") || data.layerPath === void 0 && (missing0 = "layerPath")) {
        validate41.errors = [{ instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: missing0 }, message: "must have required property '" + missing0 + "'" }];
        return false;
      } else {
        if (data.contextId !== void 0) {
          let data0 = data.contextId;
          const _errs2 = errors;
          const _errs3 = errors;
          if (errors === _errs3) {
            if (typeof data0 === "string") {
              if (!pattern7.test(data0)) {
                validate41.errors = [{ instancePath: instancePath + "/contextId", schemaPath: "#/$defs/ref/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$" }, message: 'must match pattern "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$"' }];
                return false;
              }
            } else {
              validate41.errors = [{ instancePath: instancePath + "/contextId", schemaPath: "#/$defs/ref/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
              return false;
            }
          }
          var valid0 = _errs2 === errors;
        } else {
          var valid0 = true;
        }
        if (valid0) {
          if (data.nodeId !== void 0) {
            let data1 = data.nodeId;
            const _errs5 = errors;
            const _errs6 = errors;
            if (errors === _errs6) {
              if (typeof data1 === "string") {
                if (func1(data1) < 1) {
                  validate41.errors = [{ instancePath: instancePath + "/nodeId", schemaPath: "#/$defs/nonEmpty/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                  return false;
                }
              } else {
                validate41.errors = [{ instancePath: instancePath + "/nodeId", schemaPath: "#/$defs/nonEmpty/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                return false;
              }
            }
            var valid0 = _errs5 === errors;
          } else {
            var valid0 = true;
          }
          if (valid0) {
            if (data.layerPath !== void 0) {
              let data2 = data.layerPath;
              const _errs8 = errors;
              const _errs9 = errors;
              let valid3 = false;
              let passing0 = null;
              const _errs10 = errors;
              const _errs11 = errors;
              if (errors === _errs11) {
                if (typeof data2 === "string") {
                  if (func1(data2) < 1) {
                    const err0 = { instancePath: instancePath + "/layerPath", schemaPath: "#/$defs/nonEmpty/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
                    if (vErrors === null) {
                      vErrors = [err0];
                    } else {
                      vErrors.push(err0);
                    }
                    errors++;
                  }
                } else {
                  const err1 = { instancePath: instancePath + "/layerPath", schemaPath: "#/$defs/nonEmpty/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                  if (vErrors === null) {
                    vErrors = [err1];
                  } else {
                    vErrors.push(err1);
                  }
                  errors++;
                }
              }
              var _valid0 = _errs10 === errors;
              if (_valid0) {
                valid3 = true;
                passing0 = 0;
              }
              const _errs13 = errors;
              if (errors === _errs13) {
                if (Array.isArray(data2)) {
                  if (data2.length < 1) {
                    const err2 = { instancePath: instancePath + "/layerPath", schemaPath: "#/properties/layerPath/oneOf/1/minItems", keyword: "minItems", params: { limit: 1 }, message: "must NOT have fewer than 1 items" };
                    if (vErrors === null) {
                      vErrors = [err2];
                    } else {
                      vErrors.push(err2);
                    }
                    errors++;
                  } else {
                    var valid5 = true;
                    const len0 = data2.length;
                    for (let i0 = 0; i0 < len0; i0++) {
                      let data3 = data2[i0];
                      const _errs15 = errors;
                      const _errs16 = errors;
                      if (errors === _errs16) {
                        if (typeof data3 === "string") {
                          if (func1(data3) < 1) {
                            const err3 = { instancePath: instancePath + "/layerPath/" + i0, schemaPath: "#/$defs/nonEmpty/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
                            if (vErrors === null) {
                              vErrors = [err3];
                            } else {
                              vErrors.push(err3);
                            }
                            errors++;
                          }
                        } else {
                          const err4 = { instancePath: instancePath + "/layerPath/" + i0, schemaPath: "#/$defs/nonEmpty/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                          if (vErrors === null) {
                            vErrors = [err4];
                          } else {
                            vErrors.push(err4);
                          }
                          errors++;
                        }
                      }
                      var valid5 = _errs15 === errors;
                      if (!valid5) {
                        break;
                      }
                    }
                  }
                } else {
                  const err5 = { instancePath: instancePath + "/layerPath", schemaPath: "#/properties/layerPath/oneOf/1/type", keyword: "type", params: { type: "array" }, message: "must be array" };
                  if (vErrors === null) {
                    vErrors = [err5];
                  } else {
                    vErrors.push(err5);
                  }
                  errors++;
                }
              }
              var _valid0 = _errs13 === errors;
              if (_valid0 && valid3) {
                valid3 = false;
                passing0 = [passing0, 1];
              } else {
                if (_valid0) {
                  valid3 = true;
                  passing0 = 1;
                }
              }
              if (!valid3) {
                const err6 = { instancePath: instancePath + "/layerPath", schemaPath: "#/properties/layerPath/oneOf", keyword: "oneOf", params: { passingSchemas: passing0 }, message: "must match exactly one schema in oneOf" };
                if (vErrors === null) {
                  vErrors = [err6];
                } else {
                  vErrors.push(err6);
                }
                errors++;
                validate41.errors = vErrors;
                return false;
              } else {
                errors = _errs9;
                if (vErrors !== null) {
                  if (_errs9) {
                    vErrors.length = _errs9;
                  } else {
                    vErrors = null;
                  }
                }
              }
              var valid0 = _errs8 === errors;
            } else {
              var valid0 = true;
            }
          }
        }
      }
    } else {
      validate41.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
      return false;
    }
  }
  validate41.errors = vErrors;
  return errors === 0;
}
validate41.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
function validate40(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate40.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (errors === 0) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
      let missing0;
      if (data.designInstanceKey === void 0 && (missing0 = "designInstanceKey") || data.sourceNodes === void 0 && (missing0 = "sourceNodes")) {
        validate40.errors = [{ instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: missing0 }, message: "must have required property '" + missing0 + "'" }];
        return false;
      } else {
        if (data.designInstanceKey !== void 0) {
          let data0 = data.designInstanceKey;
          const _errs2 = errors;
          const _errs3 = errors;
          if (errors === _errs3) {
            if (typeof data0 === "string") {
              if (!pattern7.test(data0)) {
                validate40.errors = [{ instancePath: instancePath + "/designInstanceKey", schemaPath: "#/$defs/id/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$" }, message: 'must match pattern "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$"' }];
                return false;
              }
            } else {
              validate40.errors = [{ instancePath: instancePath + "/designInstanceKey", schemaPath: "#/$defs/id/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
              return false;
            }
          }
          var valid0 = _errs2 === errors;
        } else {
          var valid0 = true;
        }
        if (valid0) {
          if (data.sourceNodes !== void 0) {
            let data1 = data.sourceNodes;
            const _errs5 = errors;
            if (errors === _errs5) {
              if (Array.isArray(data1)) {
                if (data1.length < 1) {
                  validate40.errors = [{ instancePath: instancePath + "/sourceNodes", schemaPath: "#/properties/sourceNodes/minItems", keyword: "minItems", params: { limit: 1 }, message: "must NOT have fewer than 1 items" }];
                  return false;
                } else {
                  var valid2 = true;
                  const len0 = data1.length;
                  for (let i0 = 0; i0 < len0; i0++) {
                    const _errs7 = errors;
                    if (!validate41(data1[i0], { instancePath: instancePath + "/sourceNodes/" + i0, parentData: data1, parentDataProperty: i0, rootData, dynamicAnchors })) {
                      vErrors = vErrors === null ? validate41.errors : vErrors.concat(validate41.errors);
                      errors = vErrors.length;
                    }
                    var valid2 = _errs7 === errors;
                    if (!valid2) {
                      break;
                    }
                  }
                }
              } else {
                validate40.errors = [{ instancePath: instancePath + "/sourceNodes", schemaPath: "#/properties/sourceNodes/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                return false;
              }
            }
            var valid0 = _errs5 === errors;
          } else {
            var valid0 = true;
          }
        }
      }
    } else {
      validate40.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
      return false;
    }
  }
  validate40.errors = vErrors;
  return errors === 0;
}
validate40.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
function validate44(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate44.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (errors === 0) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
      let missing0;
      if (data.collection === void 0 && (missing0 = "collection") || data.keyField === void 0 && (missing0 = "keyField")) {
        validate44.errors = [{ instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: missing0 }, message: "must have required property '" + missing0 + "'" }];
        return false;
      } else {
        if (data.collection !== void 0) {
          let data0 = data.collection;
          const _errs2 = errors;
          const _errs3 = errors;
          if (errors === _errs3) {
            if (typeof data0 === "string") {
              if (!pattern7.test(data0)) {
                validate44.errors = [{ instancePath: instancePath + "/collection", schemaPath: "#/$defs/id/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$" }, message: 'must match pattern "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$"' }];
                return false;
              }
            } else {
              validate44.errors = [{ instancePath: instancePath + "/collection", schemaPath: "#/$defs/id/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
              return false;
            }
          }
          var valid0 = _errs2 === errors;
        } else {
          var valid0 = true;
        }
        if (valid0) {
          if (data.keyField !== void 0) {
            let data1 = data.keyField;
            const _errs5 = errors;
            const _errs6 = errors;
            if (errors === _errs6) {
              if (typeof data1 === "string") {
                if (!pattern7.test(data1)) {
                  validate44.errors = [{ instancePath: instancePath + "/keyField", schemaPath: "#/$defs/id/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$" }, message: 'must match pattern "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$"' }];
                  return false;
                }
              } else {
                validate44.errors = [{ instancePath: instancePath + "/keyField", schemaPath: "#/$defs/id/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                return false;
              }
            }
            var valid0 = _errs5 === errors;
          } else {
            var valid0 = true;
          }
          if (valid0) {
            if (data.fixtureKey !== void 0) {
              let data2 = data.fixtureKey;
              const _errs8 = errors;
              const _errs9 = errors;
              if (errors === _errs9) {
                if (typeof data2 === "string") {
                  if (!pattern7.test(data2)) {
                    validate44.errors = [{ instancePath: instancePath + "/fixtureKey", schemaPath: "#/$defs/id/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$" }, message: 'must match pattern "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$"' }];
                    return false;
                  }
                } else {
                  validate44.errors = [{ instancePath: instancePath + "/fixtureKey", schemaPath: "#/$defs/id/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                  return false;
                }
              }
              var valid0 = _errs8 === errors;
            } else {
              var valid0 = true;
            }
            if (valid0) {
              if (data.runtimeDataKey !== void 0) {
                let data3 = data.runtimeDataKey;
                const _errs11 = errors;
                const _errs12 = errors;
                if (errors === _errs12) {
                  if (typeof data3 === "string") {
                    if (func1(data3) < 1) {
                      validate44.errors = [{ instancePath: instancePath + "/runtimeDataKey", schemaPath: "#/$defs/nonEmpty/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                      return false;
                    }
                  } else {
                    validate44.errors = [{ instancePath: instancePath + "/runtimeDataKey", schemaPath: "#/$defs/nonEmpty/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                    return false;
                  }
                }
                var valid0 = _errs11 === errors;
              } else {
                var valid0 = true;
              }
            }
          }
        }
      }
    } else {
      validate44.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
      return false;
    }
  }
  validate44.errors = vErrors;
  return errors === 0;
}
validate44.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
function validate46(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate46.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (errors === 0) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
      let missing0;
      if (data.platform === void 0 && (missing0 = "platform") || data.kind === void 0 && (missing0 = "kind") || data.targetKey === void 0 && (missing0 = "targetKey")) {
        validate46.errors = [{ instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: missing0 }, message: "must have required property '" + missing0 + "'" }];
        return false;
      } else {
        if (data.platform !== void 0) {
          let data0 = data.platform;
          const _errs2 = errors;
          const _errs3 = errors;
          if (errors === _errs3) {
            if (typeof data0 === "string") {
              if (!pattern7.test(data0)) {
                validate46.errors = [{ instancePath: instancePath + "/platform", schemaPath: "#/$defs/id/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$" }, message: 'must match pattern "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$"' }];
                return false;
              }
            } else {
              validate46.errors = [{ instancePath: instancePath + "/platform", schemaPath: "#/$defs/id/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
              return false;
            }
          }
          var valid0 = _errs2 === errors;
        } else {
          var valid0 = true;
        }
        if (valid0) {
          if (data.kind !== void 0) {
            let data1 = data.kind;
            const _errs5 = errors;
            const _errs6 = errors;
            if (errors === _errs6) {
              if (typeof data1 === "string") {
                if (!pattern7.test(data1)) {
                  validate46.errors = [{ instancePath: instancePath + "/kind", schemaPath: "#/$defs/id/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$" }, message: 'must match pattern "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$"' }];
                  return false;
                }
              } else {
                validate46.errors = [{ instancePath: instancePath + "/kind", schemaPath: "#/$defs/id/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                return false;
              }
            }
            var valid0 = _errs5 === errors;
          } else {
            var valid0 = true;
          }
          if (valid0) {
            if (data.targetKey !== void 0) {
              let data2 = data.targetKey;
              const _errs8 = errors;
              const _errs9 = errors;
              if (errors === _errs9) {
                if (typeof data2 === "string") {
                  if (func1(data2) < 1) {
                    validate46.errors = [{ instancePath: instancePath + "/targetKey", schemaPath: "#/$defs/nonEmpty/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                    return false;
                  }
                } else {
                  validate46.errors = [{ instancePath: instancePath + "/targetKey", schemaPath: "#/$defs/nonEmpty/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                  return false;
                }
              }
              var valid0 = _errs8 === errors;
            } else {
              var valid0 = true;
            }
            if (valid0) {
              if (data.locator !== void 0) {
                let data3 = data.locator;
                const _errs11 = errors;
                const _errs12 = errors;
                if (errors === _errs12) {
                  if (typeof data3 === "string") {
                    if (func1(data3) < 1) {
                      validate46.errors = [{ instancePath: instancePath + "/locator", schemaPath: "#/$defs/nonEmpty/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                      return false;
                    }
                  } else {
                    validate46.errors = [{ instancePath: instancePath + "/locator", schemaPath: "#/$defs/nonEmpty/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                    return false;
                  }
                }
                var valid0 = _errs11 === errors;
              } else {
                var valid0 = true;
              }
            }
          }
        }
      }
    } else {
      validate46.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
      return false;
    }
  }
  validate46.errors = vErrors;
  return errors === 0;
}
validate46.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
function validate35(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate35.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (errors === 0) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
      let missing0;
      if (data.bridgeKey === void 0 && (missing0 = "bridgeKey") || data.role === void 0 && (missing0 = "role") || data.designInstance === void 0 && (missing0 = "designInstance")) {
        validate35.errors = [{ instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: missing0 }, message: "must have required property '" + missing0 + "'" }];
        return false;
      } else {
        if (data.bridgeKey !== void 0) {
          let data0 = data.bridgeKey;
          const _errs2 = errors;
          const _errs3 = errors;
          if (errors === _errs3) {
            if (typeof data0 === "string") {
              if (!pattern7.test(data0)) {
                validate35.errors = [{ instancePath: instancePath + "/bridgeKey", schemaPath: "#/$defs/id/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$" }, message: 'must match pattern "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$"' }];
                return false;
              }
            } else {
              validate35.errors = [{ instancePath: instancePath + "/bridgeKey", schemaPath: "#/$defs/id/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
              return false;
            }
          }
          var valid0 = _errs2 === errors;
        } else {
          var valid0 = true;
        }
        if (valid0) {
          if (data.role !== void 0) {
            const _errs5 = errors;
            if (!validate36(data.role, { instancePath: instancePath + "/role", parentData: data, parentDataProperty: "role", rootData, dynamicAnchors })) {
              vErrors = vErrors === null ? validate36.errors : vErrors.concat(validate36.errors);
              errors = vErrors.length;
            }
            var valid0 = _errs5 === errors;
          } else {
            var valid0 = true;
          }
          if (valid0) {
            if (data.template !== void 0) {
              const _errs6 = errors;
              if (!validate38(data.template, { instancePath: instancePath + "/template", parentData: data, parentDataProperty: "template", rootData, dynamicAnchors })) {
                vErrors = vErrors === null ? validate38.errors : vErrors.concat(validate38.errors);
                errors = vErrors.length;
              }
              var valid0 = _errs6 === errors;
            } else {
              var valid0 = true;
            }
            if (valid0) {
              if (data.designInstance !== void 0) {
                const _errs7 = errors;
                if (!validate40(data.designInstance, { instancePath: instancePath + "/designInstance", parentData: data, parentDataProperty: "designInstance", rootData, dynamicAnchors })) {
                  vErrors = vErrors === null ? validate40.errors : vErrors.concat(validate40.errors);
                  errors = vErrors.length;
                }
                var valid0 = _errs7 === errors;
              } else {
                var valid0 = true;
              }
              if (valid0) {
                if (data.runtimeData !== void 0) {
                  const _errs8 = errors;
                  if (!validate44(data.runtimeData, { instancePath: instancePath + "/runtimeData", parentData: data, parentDataProperty: "runtimeData", rootData, dynamicAnchors })) {
                    vErrors = vErrors === null ? validate44.errors : vErrors.concat(validate44.errors);
                    errors = vErrors.length;
                  }
                  var valid0 = _errs8 === errors;
                } else {
                  var valid0 = true;
                }
                if (valid0) {
                  if (data.target !== void 0) {
                    const _errs9 = errors;
                    if (!validate46(data.target, { instancePath: instancePath + "/target", parentData: data, parentDataProperty: "target", rootData, dynamicAnchors })) {
                      vErrors = vErrors === null ? validate46.errors : vErrors.concat(validate46.errors);
                      errors = vErrors.length;
                    }
                    var valid0 = _errs9 === errors;
                  } else {
                    var valid0 = true;
                  }
                }
              }
            }
          }
        }
      }
    } else {
      validate35.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
      return false;
    }
  }
  validate35.errors = vErrors;
  return errors === 0;
}
validate35.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
function validate34(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate34.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (errors === 0) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
      let missing0;
      if (data.elements === void 0 && (missing0 = "elements")) {
        validate34.errors = [{ instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: missing0 }, message: "must have required property '" + missing0 + "'" }];
        return false;
      } else {
        if (data.elements !== void 0) {
          let data0 = data.elements;
          const _errs2 = errors;
          if (errors === _errs2) {
            if (Array.isArray(data0)) {
              if (data0.length < 1) {
                validate34.errors = [{ instancePath: instancePath + "/elements", schemaPath: "#/properties/elements/minItems", keyword: "minItems", params: { limit: 1 }, message: "must NOT have fewer than 1 items" }];
                return false;
              } else {
                var valid1 = true;
                const len0 = data0.length;
                for (let i0 = 0; i0 < len0; i0++) {
                  const _errs4 = errors;
                  if (!validate35(data0[i0], { instancePath: instancePath + "/elements/" + i0, parentData: data0, parentDataProperty: i0, rootData, dynamicAnchors })) {
                    vErrors = vErrors === null ? validate35.errors : vErrors.concat(validate35.errors);
                    errors = vErrors.length;
                  }
                  var valid1 = _errs4 === errors;
                  if (!valid1) {
                    break;
                  }
                }
              }
            } else {
              validate34.errors = [{ instancePath: instancePath + "/elements", schemaPath: "#/properties/elements/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
              return false;
            }
          }
        }
      }
    } else {
      validate34.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
      return false;
    }
  }
  validate34.errors = vErrors;
  return errors === 0;
}
validate34.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
var wrapper0 = { validate: validate52 };
function validate53(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate53.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (errors === 0) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
      if (Object.keys(data).length < 1) {
        validate53.errors = [{ instancePath, schemaPath: "#/minProperties", keyword: "minProperties", params: { limit: 1 }, message: "must NOT have fewer than 1 properties" }];
        return false;
      } else {
        for (const key0 in data) {
          let data0 = data[key0];
          const _errs2 = errors;
          if (errors === _errs2) {
            if (Array.isArray(data0)) {
              var valid1 = true;
              const len0 = data0.length;
              for (let i0 = 0; i0 < len0; i0++) {
                let data1 = data0[i0];
                const _errs4 = errors;
                const _errs5 = errors;
                if (errors === _errs5) {
                  if (typeof data1 === "string") {
                    if (!pattern7.test(data1)) {
                      validate53.errors = [{ instancePath: instancePath + "/" + key0.replace(/~/g, "~0").replace(/\//g, "~1") + "/" + i0, schemaPath: "#/$defs/ref/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$" }, message: 'must match pattern "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$"' }];
                      return false;
                    }
                  } else {
                    validate53.errors = [{ instancePath: instancePath + "/" + key0.replace(/~/g, "~0").replace(/\//g, "~1") + "/" + i0, schemaPath: "#/$defs/ref/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                    return false;
                  }
                }
                var valid1 = _errs4 === errors;
                if (!valid1) {
                  break;
                }
              }
            } else {
              validate53.errors = [{ instancePath: instancePath + "/" + key0.replace(/~/g, "~0").replace(/\//g, "~1"), schemaPath: "#/additionalProperties/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
              return false;
            }
          }
          var valid0 = _errs2 === errors;
          if (!valid0) {
            break;
          }
        }
      }
    } else {
      validate53.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
      return false;
    }
  }
  validate53.errors = vErrors;
  return errors === 0;
}
validate53.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
function validate52(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate52.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  const _errs0 = errors;
  let valid0 = false;
  let passing0 = null;
  const _errs1 = errors;
  const _errs2 = errors;
  if (errors === _errs2) {
    if (typeof data === "string") {
      if (!pattern7.test(data)) {
        const err0 = { instancePath, schemaPath: "#/$defs/ref/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$" }, message: 'must match pattern "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$"' };
        if (vErrors === null) {
          vErrors = [err0];
        } else {
          vErrors.push(err0);
        }
        errors++;
      }
    } else {
      const err1 = { instancePath, schemaPath: "#/$defs/ref/type", keyword: "type", params: { type: "string" }, message: "must be string" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
  }
  var _valid0 = _errs1 === errors;
  if (_valid0) {
    valid0 = true;
    passing0 = 0;
  }
  const _errs4 = errors;
  if (errors === _errs4) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
      let missing0;
      if (data.identity === void 0 && (missing0 = "identity")) {
        const err2 = { instancePath, schemaPath: "#/oneOf/1/required", keyword: "required", params: { missingProperty: missing0 }, message: "must have required property '" + missing0 + "'" };
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
      } else {
        if (data.identity !== void 0) {
          let data0 = data.identity;
          const _errs7 = errors;
          const _errs8 = errors;
          if (errors === _errs8) {
            if (typeof data0 === "string") {
              if (!pattern7.test(data0)) {
                const err3 = { instancePath: instancePath + "/identity", schemaPath: "#/$defs/ref/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$" }, message: 'must match pattern "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$"' };
                if (vErrors === null) {
                  vErrors = [err3];
                } else {
                  vErrors.push(err3);
                }
                errors++;
              }
            } else {
              const err4 = { instancePath: instancePath + "/identity", schemaPath: "#/$defs/ref/type", keyword: "type", params: { type: "string" }, message: "must be string" };
              if (vErrors === null) {
                vErrors = [err4];
              } else {
                vErrors.push(err4);
              }
              errors++;
            }
          }
          var valid2 = _errs7 === errors;
        } else {
          var valid2 = true;
        }
        if (valid2) {
          if (data.children !== void 0) {
            let data1 = data.children;
            const _errs10 = errors;
            if (errors === _errs10) {
              if (Array.isArray(data1)) {
                var valid4 = true;
                const len0 = data1.length;
                for (let i0 = 0; i0 < len0; i0++) {
                  const _errs12 = errors;
                  if (!wrapper0.validate(data1[i0], { instancePath: instancePath + "/children/" + i0, parentData: data1, parentDataProperty: i0, rootData, dynamicAnchors })) {
                    vErrors = vErrors === null ? wrapper0.validate.errors : vErrors.concat(wrapper0.validate.errors);
                    errors = vErrors.length;
                  }
                  var valid4 = _errs12 === errors;
                  if (!valid4) {
                    break;
                  }
                }
              } else {
                const err5 = { instancePath: instancePath + "/children", schemaPath: "#/oneOf/1/properties/children/type", keyword: "type", params: { type: "array" }, message: "must be array" };
                if (vErrors === null) {
                  vErrors = [err5];
                } else {
                  vErrors.push(err5);
                }
                errors++;
              }
            }
            var valid2 = _errs10 === errors;
          } else {
            var valid2 = true;
          }
        }
      }
    } else {
      const err6 = { instancePath, schemaPath: "#/oneOf/1/type", keyword: "type", params: { type: "object" }, message: "must be object" };
      if (vErrors === null) {
        vErrors = [err6];
      } else {
        vErrors.push(err6);
      }
      errors++;
    }
  }
  var _valid0 = _errs4 === errors;
  if (_valid0 && valid0) {
    valid0 = false;
    passing0 = [passing0, 1];
  } else {
    if (_valid0) {
      valid0 = true;
      passing0 = 1;
      var props1 = true;
    }
    const _errs13 = errors;
    if (!validate53(data, { instancePath, parentData, parentDataProperty, rootData, dynamicAnchors })) {
      vErrors = vErrors === null ? validate53.errors : vErrors.concat(validate53.errors);
      errors = vErrors.length;
    }
    var _valid0 = _errs13 === errors;
    if (_valid0 && valid0) {
      valid0 = false;
      passing0 = [passing0, 2];
    } else {
      if (_valid0) {
        valid0 = true;
        passing0 = 2;
        if (props1 !== true) {
          props1 = true;
        }
      }
    }
  }
  if (!valid0) {
    const err7 = { instancePath, schemaPath: "#/oneOf", keyword: "oneOf", params: { passingSchemas: passing0 }, message: "must match exactly one schema in oneOf" };
    if (vErrors === null) {
      vErrors = [err7];
    } else {
      vErrors.push(err7);
    }
    errors++;
    validate52.errors = vErrors;
    return false;
  } else {
    errors = _errs0;
    if (vErrors !== null) {
      if (_errs0) {
        vErrors.length = _errs0;
      } else {
        vErrors = null;
      }
    }
  }
  validate52.errors = vErrors;
  evaluated0.props = props1;
  return errors === 0;
}
validate52.evaluated = { "dynamicProps": true, "dynamicItems": false };
function validate51(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate51.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (errors === 0) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
      let missing0;
      if (data.id === void 0 && (missing0 = "id") || data.rootIdentity === void 0 && (missing0 = "rootIdentity") || data.tree === void 0 && (missing0 = "tree")) {
        validate51.errors = [{ instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: missing0 }, message: "must have required property '" + missing0 + "'" }];
        return false;
      } else {
        if (data.id !== void 0) {
          let data0 = data.id;
          const _errs2 = errors;
          const _errs3 = errors;
          if (errors === _errs3) {
            if (typeof data0 === "string") {
              if (!pattern7.test(data0)) {
                validate51.errors = [{ instancePath: instancePath + "/id", schemaPath: "#/$defs/id/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$" }, message: 'must match pattern "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$"' }];
                return false;
              }
            } else {
              validate51.errors = [{ instancePath: instancePath + "/id", schemaPath: "#/$defs/id/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
              return false;
            }
          }
          var valid0 = _errs2 === errors;
        } else {
          var valid0 = true;
        }
        if (valid0) {
          if (data.rootIdentity !== void 0) {
            let data1 = data.rootIdentity;
            const _errs5 = errors;
            const _errs6 = errors;
            if (errors === _errs6) {
              if (typeof data1 === "string") {
                if (!pattern7.test(data1)) {
                  validate51.errors = [{ instancePath: instancePath + "/rootIdentity", schemaPath: "#/$defs/ref/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$" }, message: 'must match pattern "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$"' }];
                  return false;
                }
              } else {
                validate51.errors = [{ instancePath: instancePath + "/rootIdentity", schemaPath: "#/$defs/ref/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                return false;
              }
            }
            var valid0 = _errs5 === errors;
          } else {
            var valid0 = true;
          }
          if (valid0) {
            if (data.tree !== void 0) {
              const _errs8 = errors;
              if (!validate52(data.tree, { instancePath: instancePath + "/tree", parentData: data, parentDataProperty: "tree", rootData, dynamicAnchors })) {
                vErrors = vErrors === null ? validate52.errors : vErrors.concat(validate52.errors);
                errors = vErrors.length;
              }
              var valid0 = _errs8 === errors;
            } else {
              var valid0 = true;
            }
          }
        }
      }
    } else {
      validate51.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
      return false;
    }
  }
  validate51.errors = vErrors;
  return errors === 0;
}
validate51.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
function validate50(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate50.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (errors === 0) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
      let missing0;
      if (data.contexts === void 0 && (missing0 = "contexts")) {
        validate50.errors = [{ instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: missing0 }, message: "must have required property '" + missing0 + "'" }];
        return false;
      } else {
        if (data.contexts !== void 0) {
          let data0 = data.contexts;
          const _errs2 = errors;
          if (errors === _errs2) {
            if (Array.isArray(data0)) {
              if (data0.length < 1) {
                validate50.errors = [{ instancePath: instancePath + "/contexts", schemaPath: "#/properties/contexts/minItems", keyword: "minItems", params: { limit: 1 }, message: "must NOT have fewer than 1 items" }];
                return false;
              } else {
                var valid1 = true;
                const len0 = data0.length;
                for (let i0 = 0; i0 < len0; i0++) {
                  const _errs4 = errors;
                  if (!validate51(data0[i0], { instancePath: instancePath + "/contexts/" + i0, parentData: data0, parentDataProperty: i0, rootData, dynamicAnchors })) {
                    vErrors = vErrors === null ? validate51.errors : vErrors.concat(validate51.errors);
                    errors = vErrors.length;
                  }
                  var valid1 = _errs4 === errors;
                  if (!valid1) {
                    break;
                  }
                }
              }
            } else {
              validate50.errors = [{ instancePath: instancePath + "/contexts", schemaPath: "#/properties/contexts/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
              return false;
            }
          }
        }
      }
    } else {
      validate50.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
      return false;
    }
  }
  validate50.errors = vErrors;
  return errors === 0;
}
validate50.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
function validate59(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate59.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (errors === 0) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
      let missing0;
      if (data.displayId === void 0 && (missing0 = "displayId") || data.purpose === void 0 && (missing0 = "purpose") || data.source === void 0 && (missing0 = "source") || data.states === void 0 && (missing0 = "states")) {
        validate59.errors = [{ instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: missing0 }, message: "must have required property '" + missing0 + "'" }];
        return false;
      } else {
        if (data.displayId !== void 0) {
          let data0 = data.displayId;
          const _errs2 = errors;
          const _errs3 = errors;
          if (errors === _errs3) {
            if (typeof data0 === "string") {
              if (!pattern7.test(data0)) {
                validate59.errors = [{ instancePath: instancePath + "/displayId", schemaPath: "#/$defs/ref/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$" }, message: 'must match pattern "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$"' }];
                return false;
              }
            } else {
              validate59.errors = [{ instancePath: instancePath + "/displayId", schemaPath: "#/$defs/ref/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
              return false;
            }
          }
          var valid0 = _errs2 === errors;
        } else {
          var valid0 = true;
        }
        if (valid0) {
          if (data.purpose !== void 0) {
            let data1 = data.purpose;
            const _errs5 = errors;
            const _errs6 = errors;
            if (errors === _errs6) {
              if (typeof data1 === "string") {
                if (func1(data1) < 1) {
                  validate59.errors = [{ instancePath: instancePath + "/purpose", schemaPath: "#/$defs/nonEmpty/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                  return false;
                }
              } else {
                validate59.errors = [{ instancePath: instancePath + "/purpose", schemaPath: "#/$defs/nonEmpty/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                return false;
              }
            }
            var valid0 = _errs5 === errors;
          } else {
            var valid0 = true;
          }
          if (valid0) {
            if (data.source !== void 0) {
              let data2 = data.source;
              const _errs8 = errors;
              const _errs9 = errors;
              if (errors === _errs9) {
                if (data2 && typeof data2 == "object" && !Array.isArray(data2)) {
                } else {
                  validate59.errors = [{ instancePath: instancePath + "/source", schemaPath: "#/$defs/extensionObject/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                  return false;
                }
              }
              var valid0 = _errs8 === errors;
            } else {
              var valid0 = true;
            }
            if (valid0) {
              if (data.dimensions !== void 0) {
                let data3 = data.dimensions;
                const _errs12 = errors;
                if (errors === _errs12) {
                  if (Array.isArray(data3)) {
                    var valid4 = true;
                    const len0 = data3.length;
                    for (let i0 = 0; i0 < len0; i0++) {
                      let data4 = data3[i0];
                      const _errs14 = errors;
                      const _errs15 = errors;
                      if (errors === _errs15) {
                        if (data4 && typeof data4 == "object" && !Array.isArray(data4)) {
                        } else {
                          validate59.errors = [{ instancePath: instancePath + "/dimensions/" + i0, schemaPath: "#/$defs/extensionObject/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                          return false;
                        }
                      }
                      var valid4 = _errs14 === errors;
                      if (!valid4) {
                        break;
                      }
                    }
                  } else {
                    validate59.errors = [{ instancePath: instancePath + "/dimensions", schemaPath: "#/properties/dimensions/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                    return false;
                  }
                }
                var valid0 = _errs12 === errors;
              } else {
                var valid0 = true;
              }
              if (valid0) {
                if (data.measures !== void 0) {
                  let data5 = data.measures;
                  const _errs18 = errors;
                  if (errors === _errs18) {
                    if (Array.isArray(data5)) {
                      var valid6 = true;
                      const len1 = data5.length;
                      for (let i1 = 0; i1 < len1; i1++) {
                        let data6 = data5[i1];
                        const _errs20 = errors;
                        const _errs21 = errors;
                        if (errors === _errs21) {
                          if (data6 && typeof data6 == "object" && !Array.isArray(data6)) {
                          } else {
                            validate59.errors = [{ instancePath: instancePath + "/measures/" + i1, schemaPath: "#/$defs/extensionObject/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                            return false;
                          }
                        }
                        var valid6 = _errs20 === errors;
                        if (!valid6) {
                          break;
                        }
                      }
                    } else {
                      validate59.errors = [{ instancePath: instancePath + "/measures", schemaPath: "#/properties/measures/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                      return false;
                    }
                  }
                  var valid0 = _errs18 === errors;
                } else {
                  var valid0 = true;
                }
                if (valid0) {
                  if (data.format !== void 0) {
                    let data7 = data.format;
                    const _errs24 = errors;
                    const _errs25 = errors;
                    if (errors === _errs25) {
                      if (data7 && typeof data7 == "object" && !Array.isArray(data7)) {
                      } else {
                        validate59.errors = [{ instancePath: instancePath + "/format", schemaPath: "#/$defs/extensionObject/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                        return false;
                      }
                    }
                    var valid0 = _errs24 === errors;
                  } else {
                    var valid0 = true;
                  }
                  if (valid0) {
                    if (data.states !== void 0) {
                      let data8 = data.states;
                      const _errs28 = errors;
                      if (errors === _errs28) {
                        if (Array.isArray(data8)) {
                          if (data8.length < 1) {
                            validate59.errors = [{ instancePath: instancePath + "/states", schemaPath: "#/properties/states/minItems", keyword: "minItems", params: { limit: 1 }, message: "must NOT have fewer than 1 items" }];
                            return false;
                          } else {
                            var valid9 = true;
                            const len2 = data8.length;
                            for (let i2 = 0; i2 < len2; i2++) {
                              let data9 = data8[i2];
                              const _errs30 = errors;
                              const _errs31 = errors;
                              if (errors === _errs31) {
                                if (typeof data9 === "string") {
                                  if (!pattern7.test(data9)) {
                                    validate59.errors = [{ instancePath: instancePath + "/states/" + i2, schemaPath: "#/$defs/id/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$" }, message: 'must match pattern "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$"' }];
                                    return false;
                                  }
                                } else {
                                  validate59.errors = [{ instancePath: instancePath + "/states/" + i2, schemaPath: "#/$defs/id/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                  return false;
                                }
                              }
                              var valid9 = _errs30 === errors;
                              if (!valid9) {
                                break;
                              }
                            }
                            if (valid9) {
                              let i3 = data8.length;
                              let j0;
                              if (i3 > 1) {
                                outer0:
                                  for (; i3--; ) {
                                    for (j0 = i3; j0--; ) {
                                      if (func0(data8[i3], data8[j0])) {
                                        validate59.errors = [{ instancePath: instancePath + "/states", schemaPath: "#/properties/states/uniqueItems", keyword: "uniqueItems", params: { i: i3, j: j0 }, message: "must NOT have duplicate items (items ## " + j0 + " and " + i3 + " are identical)" }];
                                        return false;
                                        break outer0;
                                      }
                                    }
                                  }
                              }
                            }
                          }
                        } else {
                          validate59.errors = [{ instancePath: instancePath + "/states", schemaPath: "#/properties/states/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                          return false;
                        }
                      }
                      var valid0 = _errs28 === errors;
                    } else {
                      var valid0 = true;
                    }
                    if (valid0) {
                      if (data.accessibleEquivalent !== void 0) {
                        let data10 = data.accessibleEquivalent;
                        const _errs33 = errors;
                        const _errs34 = errors;
                        if (errors === _errs34) {
                          if (typeof data10 === "string") {
                            if (!pattern7.test(data10)) {
                              validate59.errors = [{ instancePath: instancePath + "/accessibleEquivalent", schemaPath: "#/$defs/ref/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$" }, message: 'must match pattern "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$"' }];
                              return false;
                            }
                          } else {
                            validate59.errors = [{ instancePath: instancePath + "/accessibleEquivalent", schemaPath: "#/$defs/ref/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                            return false;
                          }
                        }
                        var valid0 = _errs33 === errors;
                      } else {
                        var valid0 = true;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    } else {
      validate59.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
      return false;
    }
  }
  validate59.errors = vErrors;
  return errors === 0;
}
validate59.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
function validate58(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate58.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (errors === 0) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
      let missing0;
      if (data.displays === void 0 && (missing0 = "displays")) {
        validate58.errors = [{ instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: missing0 }, message: "must have required property '" + missing0 + "'" }];
        return false;
      } else {
        if (data.displays !== void 0) {
          let data0 = data.displays;
          const _errs2 = errors;
          if (errors === _errs2) {
            if (Array.isArray(data0)) {
              var valid1 = true;
              const len0 = data0.length;
              for (let i0 = 0; i0 < len0; i0++) {
                const _errs4 = errors;
                if (!validate59(data0[i0], { instancePath: instancePath + "/displays/" + i0, parentData: data0, parentDataProperty: i0, rootData, dynamicAnchors })) {
                  vErrors = vErrors === null ? validate59.errors : vErrors.concat(validate59.errors);
                  errors = vErrors.length;
                }
                var valid1 = _errs4 === errors;
                if (!valid1) {
                  break;
                }
              }
            } else {
              validate58.errors = [{ instancePath: instancePath + "/displays", schemaPath: "#/properties/displays/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
              return false;
            }
          }
        }
      }
    } else {
      validate58.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
      return false;
    }
  }
  validate58.errors = vErrors;
  return errors === 0;
}
validate58.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
var schema107 = { "type": "object", "additionalProperties": true, "required": ["id", "driver"], "properties": { "id": { "$ref": "#/$defs/id" }, "driver": { "enum": ["viewport", "container"] }, "width": { "type": "number", "exclusiveMinimum": 0 }, "label": { "$ref": "#/$defs/nonEmpty" }, "labelSource": { "enum": ["declared", "inferred-from-selected-root-width"] } } };
function validate63(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate63.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (errors === 0) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
      let missing0;
      if (data.id === void 0 && (missing0 = "id") || data.driver === void 0 && (missing0 = "driver")) {
        validate63.errors = [{ instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: missing0 }, message: "must have required property '" + missing0 + "'" }];
        return false;
      } else {
        if (data.id !== void 0) {
          let data0 = data.id;
          const _errs2 = errors;
          const _errs3 = errors;
          if (errors === _errs3) {
            if (typeof data0 === "string") {
              if (!pattern7.test(data0)) {
                validate63.errors = [{ instancePath: instancePath + "/id", schemaPath: "#/$defs/id/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$" }, message: 'must match pattern "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$"' }];
                return false;
              }
            } else {
              validate63.errors = [{ instancePath: instancePath + "/id", schemaPath: "#/$defs/id/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
              return false;
            }
          }
          var valid0 = _errs2 === errors;
        } else {
          var valid0 = true;
        }
        if (valid0) {
          if (data.driver !== void 0) {
            let data1 = data.driver;
            const _errs5 = errors;
            if (!(data1 === "viewport" || data1 === "container")) {
              validate63.errors = [{ instancePath: instancePath + "/driver", schemaPath: "#/properties/driver/enum", keyword: "enum", params: { allowedValues: schema107.properties.driver.enum }, message: "must be equal to one of the allowed values" }];
              return false;
            }
            var valid0 = _errs5 === errors;
          } else {
            var valid0 = true;
          }
          if (valid0) {
            if (data.width !== void 0) {
              let data2 = data.width;
              const _errs6 = errors;
              if (errors === _errs6) {
                if (typeof data2 == "number" && isFinite(data2)) {
                  if (data2 <= 0 || isNaN(data2)) {
                    validate63.errors = [{ instancePath: instancePath + "/width", schemaPath: "#/properties/width/exclusiveMinimum", keyword: "exclusiveMinimum", params: { comparison: ">", limit: 0 }, message: "must be > 0" }];
                    return false;
                  }
                } else {
                  validate63.errors = [{ instancePath: instancePath + "/width", schemaPath: "#/properties/width/type", keyword: "type", params: { type: "number" }, message: "must be number" }];
                  return false;
                }
              }
              var valid0 = _errs6 === errors;
            } else {
              var valid0 = true;
            }
            if (valid0) {
              if (data.label !== void 0) {
                let data3 = data.label;
                const _errs8 = errors;
                const _errs9 = errors;
                if (errors === _errs9) {
                  if (typeof data3 === "string") {
                    if (func1(data3) < 1) {
                      validate63.errors = [{ instancePath: instancePath + "/label", schemaPath: "#/$defs/nonEmpty/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                      return false;
                    }
                  } else {
                    validate63.errors = [{ instancePath: instancePath + "/label", schemaPath: "#/$defs/nonEmpty/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                    return false;
                  }
                }
                var valid0 = _errs8 === errors;
              } else {
                var valid0 = true;
              }
              if (valid0) {
                if (data.labelSource !== void 0) {
                  let data4 = data.labelSource;
                  const _errs11 = errors;
                  if (!(data4 === "declared" || data4 === "inferred-from-selected-root-width")) {
                    validate63.errors = [{ instancePath: instancePath + "/labelSource", schemaPath: "#/properties/labelSource/enum", keyword: "enum", params: { allowedValues: schema107.properties.labelSource.enum }, message: "must be equal to one of the allowed values" }];
                    return false;
                  }
                  var valid0 = _errs11 === errors;
                } else {
                  var valid0 = true;
                }
              }
            }
          }
        }
      }
    } else {
      validate63.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
      return false;
    }
  }
  validate63.errors = vErrors;
  return errors === 0;
}
validate63.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
var schema110 = { "type": "object", "additionalProperties": true, "required": ["id", "fromContext", "toContext", "when", "mappings", "preserves"], "properties": { "id": { "$ref": "#/$defs/id" }, "fromContext": { "$ref": "#/$defs/ref" }, "toContext": { "$ref": "#/$defs/ref" }, "when": { "type": "object", "additionalProperties": true, "required": ["driver", "condition"], "properties": { "driver": { "enum": ["viewport", "container"] }, "container": { "$ref": "#/$defs/ref" }, "condition": { "$ref": "#/$defs/nonEmpty" } } }, "mappings": { "type": "array", "minItems": 1, "items": { "type": "object", "additionalProperties": true, "required": ["source", "target", "semantics"], "properties": { "source": { "$ref": "#/$defs/refList" }, "target": { "$ref": "#/$defs/refList" }, "semantics": { "$ref": "#/$defs/nonEmpty" } } } }, "preserves": { "type": "array", "minItems": 1, "uniqueItems": true, "items": { "$ref": "#/$defs/id" } }, "focusOrder": { "$ref": "#/$defs/refList" }, "readingOrder": { "$ref": "#/$defs/refList" }, "stateTransfer": { "oneOf": [{ "$ref": "#/$defs/nonEmpty" }, { "$ref": "#/$defs/extensionObject" }] }, "history": { "oneOf": [{ "$ref": "#/$defs/nonEmpty" }, { "$ref": "#/$defs/extensionObject" }] } } };
function validate65(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate65.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (errors === 0) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
      let missing0;
      if (data.id === void 0 && (missing0 = "id") || data.fromContext === void 0 && (missing0 = "fromContext") || data.toContext === void 0 && (missing0 = "toContext") || data.when === void 0 && (missing0 = "when") || data.mappings === void 0 && (missing0 = "mappings") || data.preserves === void 0 && (missing0 = "preserves")) {
        validate65.errors = [{ instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: missing0 }, message: "must have required property '" + missing0 + "'" }];
        return false;
      } else {
        if (data.id !== void 0) {
          let data0 = data.id;
          const _errs2 = errors;
          const _errs3 = errors;
          if (errors === _errs3) {
            if (typeof data0 === "string") {
              if (!pattern7.test(data0)) {
                validate65.errors = [{ instancePath: instancePath + "/id", schemaPath: "#/$defs/id/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$" }, message: 'must match pattern "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$"' }];
                return false;
              }
            } else {
              validate65.errors = [{ instancePath: instancePath + "/id", schemaPath: "#/$defs/id/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
              return false;
            }
          }
          var valid0 = _errs2 === errors;
        } else {
          var valid0 = true;
        }
        if (valid0) {
          if (data.fromContext !== void 0) {
            let data1 = data.fromContext;
            const _errs5 = errors;
            const _errs6 = errors;
            if (errors === _errs6) {
              if (typeof data1 === "string") {
                if (!pattern7.test(data1)) {
                  validate65.errors = [{ instancePath: instancePath + "/fromContext", schemaPath: "#/$defs/ref/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$" }, message: 'must match pattern "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$"' }];
                  return false;
                }
              } else {
                validate65.errors = [{ instancePath: instancePath + "/fromContext", schemaPath: "#/$defs/ref/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                return false;
              }
            }
            var valid0 = _errs5 === errors;
          } else {
            var valid0 = true;
          }
          if (valid0) {
            if (data.toContext !== void 0) {
              let data2 = data.toContext;
              const _errs8 = errors;
              const _errs9 = errors;
              if (errors === _errs9) {
                if (typeof data2 === "string") {
                  if (!pattern7.test(data2)) {
                    validate65.errors = [{ instancePath: instancePath + "/toContext", schemaPath: "#/$defs/ref/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$" }, message: 'must match pattern "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$"' }];
                    return false;
                  }
                } else {
                  validate65.errors = [{ instancePath: instancePath + "/toContext", schemaPath: "#/$defs/ref/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                  return false;
                }
              }
              var valid0 = _errs8 === errors;
            } else {
              var valid0 = true;
            }
            if (valid0) {
              if (data.when !== void 0) {
                let data3 = data.when;
                const _errs11 = errors;
                if (errors === _errs11) {
                  if (data3 && typeof data3 == "object" && !Array.isArray(data3)) {
                    let missing1;
                    if (data3.driver === void 0 && (missing1 = "driver") || data3.condition === void 0 && (missing1 = "condition")) {
                      validate65.errors = [{ instancePath: instancePath + "/when", schemaPath: "#/properties/when/required", keyword: "required", params: { missingProperty: missing1 }, message: "must have required property '" + missing1 + "'" }];
                      return false;
                    } else {
                      if (data3.driver !== void 0) {
                        let data4 = data3.driver;
                        const _errs14 = errors;
                        if (!(data4 === "viewport" || data4 === "container")) {
                          validate65.errors = [{ instancePath: instancePath + "/when/driver", schemaPath: "#/properties/when/properties/driver/enum", keyword: "enum", params: { allowedValues: schema110.properties.when.properties.driver.enum }, message: "must be equal to one of the allowed values" }];
                          return false;
                        }
                        var valid4 = _errs14 === errors;
                      } else {
                        var valid4 = true;
                      }
                      if (valid4) {
                        if (data3.container !== void 0) {
                          let data5 = data3.container;
                          const _errs15 = errors;
                          const _errs16 = errors;
                          if (errors === _errs16) {
                            if (typeof data5 === "string") {
                              if (!pattern7.test(data5)) {
                                validate65.errors = [{ instancePath: instancePath + "/when/container", schemaPath: "#/$defs/ref/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$" }, message: 'must match pattern "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$"' }];
                                return false;
                              }
                            } else {
                              validate65.errors = [{ instancePath: instancePath + "/when/container", schemaPath: "#/$defs/ref/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                              return false;
                            }
                          }
                          var valid4 = _errs15 === errors;
                        } else {
                          var valid4 = true;
                        }
                        if (valid4) {
                          if (data3.condition !== void 0) {
                            let data6 = data3.condition;
                            const _errs18 = errors;
                            const _errs19 = errors;
                            if (errors === _errs19) {
                              if (typeof data6 === "string") {
                                if (func1(data6) < 1) {
                                  validate65.errors = [{ instancePath: instancePath + "/when/condition", schemaPath: "#/$defs/nonEmpty/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                                  return false;
                                }
                              } else {
                                validate65.errors = [{ instancePath: instancePath + "/when/condition", schemaPath: "#/$defs/nonEmpty/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                return false;
                              }
                            }
                            var valid4 = _errs18 === errors;
                          } else {
                            var valid4 = true;
                          }
                        }
                      }
                    }
                  } else {
                    validate65.errors = [{ instancePath: instancePath + "/when", schemaPath: "#/properties/when/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                    return false;
                  }
                }
                var valid0 = _errs11 === errors;
              } else {
                var valid0 = true;
              }
              if (valid0) {
                if (data.mappings !== void 0) {
                  let data7 = data.mappings;
                  const _errs21 = errors;
                  if (errors === _errs21) {
                    if (Array.isArray(data7)) {
                      if (data7.length < 1) {
                        validate65.errors = [{ instancePath: instancePath + "/mappings", schemaPath: "#/properties/mappings/minItems", keyword: "minItems", params: { limit: 1 }, message: "must NOT have fewer than 1 items" }];
                        return false;
                      } else {
                        var valid7 = true;
                        const len0 = data7.length;
                        for (let i0 = 0; i0 < len0; i0++) {
                          let data8 = data7[i0];
                          const _errs23 = errors;
                          if (errors === _errs23) {
                            if (data8 && typeof data8 == "object" && !Array.isArray(data8)) {
                              let missing2;
                              if (data8.source === void 0 && (missing2 = "source") || data8.target === void 0 && (missing2 = "target") || data8.semantics === void 0 && (missing2 = "semantics")) {
                                validate65.errors = [{ instancePath: instancePath + "/mappings/" + i0, schemaPath: "#/properties/mappings/items/required", keyword: "required", params: { missingProperty: missing2 }, message: "must have required property '" + missing2 + "'" }];
                                return false;
                              } else {
                                if (data8.source !== void 0) {
                                  const _errs26 = errors;
                                  if (!validate30(data8.source, { instancePath: instancePath + "/mappings/" + i0 + "/source", parentData: data8, parentDataProperty: "source", rootData, dynamicAnchors })) {
                                    vErrors = vErrors === null ? validate30.errors : vErrors.concat(validate30.errors);
                                    errors = vErrors.length;
                                  }
                                  var valid8 = _errs26 === errors;
                                } else {
                                  var valid8 = true;
                                }
                                if (valid8) {
                                  if (data8.target !== void 0) {
                                    const _errs27 = errors;
                                    if (!validate30(data8.target, { instancePath: instancePath + "/mappings/" + i0 + "/target", parentData: data8, parentDataProperty: "target", rootData, dynamicAnchors })) {
                                      vErrors = vErrors === null ? validate30.errors : vErrors.concat(validate30.errors);
                                      errors = vErrors.length;
                                    }
                                    var valid8 = _errs27 === errors;
                                  } else {
                                    var valid8 = true;
                                  }
                                  if (valid8) {
                                    if (data8.semantics !== void 0) {
                                      let data11 = data8.semantics;
                                      const _errs28 = errors;
                                      const _errs29 = errors;
                                      if (errors === _errs29) {
                                        if (typeof data11 === "string") {
                                          if (func1(data11) < 1) {
                                            validate65.errors = [{ instancePath: instancePath + "/mappings/" + i0 + "/semantics", schemaPath: "#/$defs/nonEmpty/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                                            return false;
                                          }
                                        } else {
                                          validate65.errors = [{ instancePath: instancePath + "/mappings/" + i0 + "/semantics", schemaPath: "#/$defs/nonEmpty/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                          return false;
                                        }
                                      }
                                      var valid8 = _errs28 === errors;
                                    } else {
                                      var valid8 = true;
                                    }
                                  }
                                }
                              }
                            } else {
                              validate65.errors = [{ instancePath: instancePath + "/mappings/" + i0, schemaPath: "#/properties/mappings/items/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                              return false;
                            }
                          }
                          var valid7 = _errs23 === errors;
                          if (!valid7) {
                            break;
                          }
                        }
                      }
                    } else {
                      validate65.errors = [{ instancePath: instancePath + "/mappings", schemaPath: "#/properties/mappings/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                      return false;
                    }
                  }
                  var valid0 = _errs21 === errors;
                } else {
                  var valid0 = true;
                }
                if (valid0) {
                  if (data.preserves !== void 0) {
                    let data12 = data.preserves;
                    const _errs31 = errors;
                    if (errors === _errs31) {
                      if (Array.isArray(data12)) {
                        if (data12.length < 1) {
                          validate65.errors = [{ instancePath: instancePath + "/preserves", schemaPath: "#/properties/preserves/minItems", keyword: "minItems", params: { limit: 1 }, message: "must NOT have fewer than 1 items" }];
                          return false;
                        } else {
                          var valid10 = true;
                          const len1 = data12.length;
                          for (let i1 = 0; i1 < len1; i1++) {
                            let data13 = data12[i1];
                            const _errs33 = errors;
                            const _errs34 = errors;
                            if (errors === _errs34) {
                              if (typeof data13 === "string") {
                                if (!pattern7.test(data13)) {
                                  validate65.errors = [{ instancePath: instancePath + "/preserves/" + i1, schemaPath: "#/$defs/id/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$" }, message: 'must match pattern "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$"' }];
                                  return false;
                                }
                              } else {
                                validate65.errors = [{ instancePath: instancePath + "/preserves/" + i1, schemaPath: "#/$defs/id/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                return false;
                              }
                            }
                            var valid10 = _errs33 === errors;
                            if (!valid10) {
                              break;
                            }
                          }
                          if (valid10) {
                            let i2 = data12.length;
                            let j0;
                            if (i2 > 1) {
                              outer0:
                                for (; i2--; ) {
                                  for (j0 = i2; j0--; ) {
                                    if (func0(data12[i2], data12[j0])) {
                                      validate65.errors = [{ instancePath: instancePath + "/preserves", schemaPath: "#/properties/preserves/uniqueItems", keyword: "uniqueItems", params: { i: i2, j: j0 }, message: "must NOT have duplicate items (items ## " + j0 + " and " + i2 + " are identical)" }];
                                      return false;
                                      break outer0;
                                    }
                                  }
                                }
                            }
                          }
                        }
                      } else {
                        validate65.errors = [{ instancePath: instancePath + "/preserves", schemaPath: "#/properties/preserves/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                        return false;
                      }
                    }
                    var valid0 = _errs31 === errors;
                  } else {
                    var valid0 = true;
                  }
                  if (valid0) {
                    if (data.focusOrder !== void 0) {
                      const _errs36 = errors;
                      if (!validate30(data.focusOrder, { instancePath: instancePath + "/focusOrder", parentData: data, parentDataProperty: "focusOrder", rootData, dynamicAnchors })) {
                        vErrors = vErrors === null ? validate30.errors : vErrors.concat(validate30.errors);
                        errors = vErrors.length;
                      }
                      var valid0 = _errs36 === errors;
                    } else {
                      var valid0 = true;
                    }
                    if (valid0) {
                      if (data.readingOrder !== void 0) {
                        const _errs37 = errors;
                        if (!validate30(data.readingOrder, { instancePath: instancePath + "/readingOrder", parentData: data, parentDataProperty: "readingOrder", rootData, dynamicAnchors })) {
                          vErrors = vErrors === null ? validate30.errors : vErrors.concat(validate30.errors);
                          errors = vErrors.length;
                        }
                        var valid0 = _errs37 === errors;
                      } else {
                        var valid0 = true;
                      }
                      if (valid0) {
                        if (data.stateTransfer !== void 0) {
                          let data16 = data.stateTransfer;
                          const _errs38 = errors;
                          const _errs39 = errors;
                          let valid13 = false;
                          let passing0 = null;
                          const _errs40 = errors;
                          const _errs41 = errors;
                          if (errors === _errs41) {
                            if (typeof data16 === "string") {
                              if (func1(data16) < 1) {
                                const err0 = { instancePath: instancePath + "/stateTransfer", schemaPath: "#/$defs/nonEmpty/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
                                if (vErrors === null) {
                                  vErrors = [err0];
                                } else {
                                  vErrors.push(err0);
                                }
                                errors++;
                              }
                            } else {
                              const err1 = { instancePath: instancePath + "/stateTransfer", schemaPath: "#/$defs/nonEmpty/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                              if (vErrors === null) {
                                vErrors = [err1];
                              } else {
                                vErrors.push(err1);
                              }
                              errors++;
                            }
                          }
                          var _valid0 = _errs40 === errors;
                          if (_valid0) {
                            valid13 = true;
                            passing0 = 0;
                          }
                          const _errs43 = errors;
                          const _errs44 = errors;
                          if (errors === _errs44) {
                            if (data16 && typeof data16 == "object" && !Array.isArray(data16)) {
                            } else {
                              const err2 = { instancePath: instancePath + "/stateTransfer", schemaPath: "#/$defs/extensionObject/type", keyword: "type", params: { type: "object" }, message: "must be object" };
                              if (vErrors === null) {
                                vErrors = [err2];
                              } else {
                                vErrors.push(err2);
                              }
                              errors++;
                            }
                          }
                          var _valid0 = _errs43 === errors;
                          if (_valid0 && valid13) {
                            valid13 = false;
                            passing0 = [passing0, 1];
                          } else {
                            if (_valid0) {
                              valid13 = true;
                              passing0 = 1;
                            }
                          }
                          if (!valid13) {
                            const err3 = { instancePath: instancePath + "/stateTransfer", schemaPath: "#/properties/stateTransfer/oneOf", keyword: "oneOf", params: { passingSchemas: passing0 }, message: "must match exactly one schema in oneOf" };
                            if (vErrors === null) {
                              vErrors = [err3];
                            } else {
                              vErrors.push(err3);
                            }
                            errors++;
                            validate65.errors = vErrors;
                            return false;
                          } else {
                            errors = _errs39;
                            if (vErrors !== null) {
                              if (_errs39) {
                                vErrors.length = _errs39;
                              } else {
                                vErrors = null;
                              }
                            }
                          }
                          var valid0 = _errs38 === errors;
                        } else {
                          var valid0 = true;
                        }
                        if (valid0) {
                          if (data.history !== void 0) {
                            let data17 = data.history;
                            const _errs47 = errors;
                            const _errs48 = errors;
                            let valid16 = false;
                            let passing1 = null;
                            const _errs49 = errors;
                            const _errs50 = errors;
                            if (errors === _errs50) {
                              if (typeof data17 === "string") {
                                if (func1(data17) < 1) {
                                  const err4 = { instancePath: instancePath + "/history", schemaPath: "#/$defs/nonEmpty/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
                                  if (vErrors === null) {
                                    vErrors = [err4];
                                  } else {
                                    vErrors.push(err4);
                                  }
                                  errors++;
                                }
                              } else {
                                const err5 = { instancePath: instancePath + "/history", schemaPath: "#/$defs/nonEmpty/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                                if (vErrors === null) {
                                  vErrors = [err5];
                                } else {
                                  vErrors.push(err5);
                                }
                                errors++;
                              }
                            }
                            var _valid1 = _errs49 === errors;
                            if (_valid1) {
                              valid16 = true;
                              passing1 = 0;
                            }
                            const _errs52 = errors;
                            const _errs53 = errors;
                            if (errors === _errs53) {
                              if (data17 && typeof data17 == "object" && !Array.isArray(data17)) {
                              } else {
                                const err6 = { instancePath: instancePath + "/history", schemaPath: "#/$defs/extensionObject/type", keyword: "type", params: { type: "object" }, message: "must be object" };
                                if (vErrors === null) {
                                  vErrors = [err6];
                                } else {
                                  vErrors.push(err6);
                                }
                                errors++;
                              }
                            }
                            var _valid1 = _errs52 === errors;
                            if (_valid1 && valid16) {
                              valid16 = false;
                              passing1 = [passing1, 1];
                            } else {
                              if (_valid1) {
                                valid16 = true;
                                passing1 = 1;
                              }
                            }
                            if (!valid16) {
                              const err7 = { instancePath: instancePath + "/history", schemaPath: "#/properties/history/oneOf", keyword: "oneOf", params: { passingSchemas: passing1 }, message: "must match exactly one schema in oneOf" };
                              if (vErrors === null) {
                                vErrors = [err7];
                              } else {
                                vErrors.push(err7);
                              }
                              errors++;
                              validate65.errors = vErrors;
                              return false;
                            } else {
                              errors = _errs48;
                              if (vErrors !== null) {
                                if (_errs48) {
                                  vErrors.length = _errs48;
                                } else {
                                  vErrors = null;
                                }
                              }
                            }
                            var valid0 = _errs47 === errors;
                          } else {
                            var valid0 = true;
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    } else {
      validate65.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
      return false;
    }
  }
  validate65.errors = vErrors;
  return errors === 0;
}
validate65.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
function validate62(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate62.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (errors === 0) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
      let missing0;
      if (data.defaultPolicy === void 0 && (missing0 = "defaultPolicy") || data.contexts === void 0 && (missing0 = "contexts")) {
        validate62.errors = [{ instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: missing0 }, message: "must have required property '" + missing0 + "'" }];
        return false;
      } else {
        if (data.defaultPolicy !== void 0) {
          const _errs2 = errors;
          if ("same-tree" !== data.defaultPolicy) {
            validate62.errors = [{ instancePath: instancePath + "/defaultPolicy", schemaPath: "#/properties/defaultPolicy/const", keyword: "const", params: { allowedValue: "same-tree" }, message: "must be equal to constant" }];
            return false;
          }
          var valid0 = _errs2 === errors;
        } else {
          var valid0 = true;
        }
        if (valid0) {
          if (data.contexts !== void 0) {
            let data1 = data.contexts;
            const _errs3 = errors;
            if (errors === _errs3) {
              if (Array.isArray(data1)) {
                if (data1.length < 1) {
                  validate62.errors = [{ instancePath: instancePath + "/contexts", schemaPath: "#/properties/contexts/minItems", keyword: "minItems", params: { limit: 1 }, message: "must NOT have fewer than 1 items" }];
                  return false;
                } else {
                  var valid1 = true;
                  const len0 = data1.length;
                  for (let i0 = 0; i0 < len0; i0++) {
                    const _errs5 = errors;
                    if (!validate63(data1[i0], { instancePath: instancePath + "/contexts/" + i0, parentData: data1, parentDataProperty: i0, rootData, dynamicAnchors })) {
                      vErrors = vErrors === null ? validate63.errors : vErrors.concat(validate63.errors);
                      errors = vErrors.length;
                    }
                    var valid1 = _errs5 === errors;
                    if (!valid1) {
                      break;
                    }
                  }
                }
              } else {
                validate62.errors = [{ instancePath: instancePath + "/contexts", schemaPath: "#/properties/contexts/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                return false;
              }
            }
            var valid0 = _errs3 === errors;
          } else {
            var valid0 = true;
          }
          if (valid0) {
            if (data.transformations !== void 0) {
              let data3 = data.transformations;
              const _errs6 = errors;
              if (errors === _errs6) {
                if (Array.isArray(data3)) {
                  var valid2 = true;
                  const len1 = data3.length;
                  for (let i1 = 0; i1 < len1; i1++) {
                    const _errs8 = errors;
                    if (!validate65(data3[i1], { instancePath: instancePath + "/transformations/" + i1, parentData: data3, parentDataProperty: i1, rootData, dynamicAnchors })) {
                      vErrors = vErrors === null ? validate65.errors : vErrors.concat(validate65.errors);
                      errors = vErrors.length;
                    }
                    var valid2 = _errs8 === errors;
                    if (!valid2) {
                      break;
                    }
                  }
                } else {
                  validate62.errors = [{ instancePath: instancePath + "/transformations", schemaPath: "#/properties/transformations/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                  return false;
                }
              }
              var valid0 = _errs6 === errors;
            } else {
              var valid0 = true;
            }
          }
        }
      }
    } else {
      validate62.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
      return false;
    }
  }
  validate62.errors = vErrors;
  return errors === 0;
}
validate62.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
function validate74(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate74.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  const _errs1 = errors;
  let valid0 = false;
  const _errs2 = errors;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    let missing0;
    if (data.to === void 0 && (missing0 = "to")) {
      const err0 = { instancePath, schemaPath: "#/anyOf/0/required", keyword: "required", params: { missingProperty: missing0 }, message: "must have required property '" + missing0 + "'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
  }
  var _valid0 = _errs2 === errors;
  valid0 = valid0 || _valid0;
  const _errs3 = errors;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    let missing1;
    if (data.outcomes === void 0 && (missing1 = "outcomes")) {
      const err1 = { instancePath, schemaPath: "#/anyOf/1/required", keyword: "required", params: { missingProperty: missing1 }, message: "must have required property '" + missing1 + "'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
  }
  var _valid0 = _errs3 === errors;
  valid0 = valid0 || _valid0;
  const _errs4 = errors;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    let missing2;
    if (data.effects === void 0 && (missing2 = "effects")) {
      const err2 = { instancePath, schemaPath: "#/anyOf/2/required", keyword: "required", params: { missingProperty: missing2 }, message: "must have required property '" + missing2 + "'" };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
  }
  var _valid0 = _errs4 === errors;
  valid0 = valid0 || _valid0;
  if (!valid0) {
    const err3 = { instancePath, schemaPath: "#/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
    if (vErrors === null) {
      vErrors = [err3];
    } else {
      vErrors.push(err3);
    }
    errors++;
    validate74.errors = vErrors;
    return false;
  } else {
    errors = _errs1;
    if (vErrors !== null) {
      if (_errs1) {
        vErrors.length = _errs1;
      } else {
        vErrors = null;
      }
    }
  }
  if (errors === 0) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
      let missing3;
      if (data.id === void 0 && (missing3 = "id") || data.from === void 0 && (missing3 = "from") || data.event === void 0 && (missing3 = "event")) {
        validate74.errors = [{ instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: missing3 }, message: "must have required property '" + missing3 + "'" }];
        return false;
      } else {
        if (data.id !== void 0) {
          let data0 = data.id;
          const _errs6 = errors;
          const _errs7 = errors;
          if (errors === _errs7) {
            if (typeof data0 === "string") {
              if (!pattern7.test(data0)) {
                validate74.errors = [{ instancePath: instancePath + "/id", schemaPath: "#/$defs/id/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$" }, message: 'must match pattern "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$"' }];
                return false;
              }
            } else {
              validate74.errors = [{ instancePath: instancePath + "/id", schemaPath: "#/$defs/id/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
              return false;
            }
          }
          var valid1 = _errs6 === errors;
        } else {
          var valid1 = true;
        }
        if (valid1) {
          if (data.from !== void 0) {
            let data1 = data.from;
            const _errs9 = errors;
            const _errs10 = errors;
            let valid3 = false;
            let passing0 = null;
            const _errs11 = errors;
            const _errs12 = errors;
            if (errors === _errs12) {
              if (typeof data1 === "string") {
                if (!pattern7.test(data1)) {
                  const err4 = { instancePath: instancePath + "/from", schemaPath: "#/$defs/id/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$" }, message: 'must match pattern "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$"' };
                  if (vErrors === null) {
                    vErrors = [err4];
                  } else {
                    vErrors.push(err4);
                  }
                  errors++;
                }
              } else {
                const err5 = { instancePath: instancePath + "/from", schemaPath: "#/$defs/id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err5];
                } else {
                  vErrors.push(err5);
                }
                errors++;
              }
            }
            var _valid1 = _errs11 === errors;
            if (_valid1) {
              valid3 = true;
              passing0 = 0;
            }
            const _errs14 = errors;
            if (errors === _errs14) {
              if (Array.isArray(data1)) {
                var valid5 = true;
                const len0 = data1.length;
                for (let i0 = 0; i0 < len0; i0++) {
                  let data2 = data1[i0];
                  const _errs16 = errors;
                  const _errs17 = errors;
                  if (errors === _errs17) {
                    if (typeof data2 === "string") {
                      if (!pattern7.test(data2)) {
                        const err6 = { instancePath: instancePath + "/from/" + i0, schemaPath: "#/$defs/id/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$" }, message: 'must match pattern "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$"' };
                        if (vErrors === null) {
                          vErrors = [err6];
                        } else {
                          vErrors.push(err6);
                        }
                        errors++;
                      }
                    } else {
                      const err7 = { instancePath: instancePath + "/from/" + i0, schemaPath: "#/$defs/id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                      if (vErrors === null) {
                        vErrors = [err7];
                      } else {
                        vErrors.push(err7);
                      }
                      errors++;
                    }
                  }
                  var valid5 = _errs16 === errors;
                  if (!valid5) {
                    break;
                  }
                }
              } else {
                const err8 = { instancePath: instancePath + "/from", schemaPath: "#/properties/from/oneOf/1/type", keyword: "type", params: { type: "array" }, message: "must be array" };
                if (vErrors === null) {
                  vErrors = [err8];
                } else {
                  vErrors.push(err8);
                }
                errors++;
              }
            }
            var _valid1 = _errs14 === errors;
            if (_valid1 && valid3) {
              valid3 = false;
              passing0 = [passing0, 1];
            } else {
              if (_valid1) {
                valid3 = true;
                passing0 = 1;
              }
            }
            if (!valid3) {
              const err9 = { instancePath: instancePath + "/from", schemaPath: "#/properties/from/oneOf", keyword: "oneOf", params: { passingSchemas: passing0 }, message: "must match exactly one schema in oneOf" };
              if (vErrors === null) {
                vErrors = [err9];
              } else {
                vErrors.push(err9);
              }
              errors++;
              validate74.errors = vErrors;
              return false;
            } else {
              errors = _errs10;
              if (vErrors !== null) {
                if (_errs10) {
                  vErrors.length = _errs10;
                } else {
                  vErrors = null;
                }
              }
            }
            var valid1 = _errs9 === errors;
          } else {
            var valid1 = true;
          }
          if (valid1) {
            if (data.event !== void 0) {
              let data3 = data.event;
              const _errs19 = errors;
              const _errs20 = errors;
              let valid7 = false;
              let passing1 = null;
              const _errs21 = errors;
              const _errs22 = errors;
              if (errors === _errs22) {
                if (typeof data3 === "string") {
                  if (!pattern7.test(data3)) {
                    const err10 = { instancePath: instancePath + "/event", schemaPath: "#/$defs/id/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$" }, message: 'must match pattern "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$"' };
                    if (vErrors === null) {
                      vErrors = [err10];
                    } else {
                      vErrors.push(err10);
                    }
                    errors++;
                  }
                } else {
                  const err11 = { instancePath: instancePath + "/event", schemaPath: "#/$defs/id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                  if (vErrors === null) {
                    vErrors = [err11];
                  } else {
                    vErrors.push(err11);
                  }
                  errors++;
                }
              }
              var _valid2 = _errs21 === errors;
              if (_valid2) {
                valid7 = true;
                passing1 = 0;
              }
              const _errs24 = errors;
              if (errors === _errs24) {
                if (data3 && typeof data3 == "object" && !Array.isArray(data3)) {
                  let missing4;
                  if (data3.type === void 0 && (missing4 = "type") || data3.source === void 0 && (missing4 = "source")) {
                    const err12 = { instancePath: instancePath + "/event", schemaPath: "#/properties/event/oneOf/1/required", keyword: "required", params: { missingProperty: missing4 }, message: "must have required property '" + missing4 + "'" };
                    if (vErrors === null) {
                      vErrors = [err12];
                    } else {
                      vErrors.push(err12);
                    }
                    errors++;
                  } else {
                    if (data3.type !== void 0) {
                      let data4 = data3.type;
                      const _errs27 = errors;
                      const _errs28 = errors;
                      if (errors === _errs28) {
                        if (typeof data4 === "string") {
                          if (!pattern7.test(data4)) {
                            const err13 = { instancePath: instancePath + "/event/type", schemaPath: "#/$defs/id/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$" }, message: 'must match pattern "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$"' };
                            if (vErrors === null) {
                              vErrors = [err13];
                            } else {
                              vErrors.push(err13);
                            }
                            errors++;
                          }
                        } else {
                          const err14 = { instancePath: instancePath + "/event/type", schemaPath: "#/$defs/id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                          if (vErrors === null) {
                            vErrors = [err14];
                          } else {
                            vErrors.push(err14);
                          }
                          errors++;
                        }
                      }
                      var valid9 = _errs27 === errors;
                    } else {
                      var valid9 = true;
                    }
                    if (valid9) {
                      if (data3.source !== void 0) {
                        let data5 = data3.source;
                        const _errs30 = errors;
                        const _errs31 = errors;
                        if (errors === _errs31) {
                          if (typeof data5 === "string") {
                            if (!pattern7.test(data5)) {
                              const err15 = { instancePath: instancePath + "/event/source", schemaPath: "#/$defs/ref/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$" }, message: 'must match pattern "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$"' };
                              if (vErrors === null) {
                                vErrors = [err15];
                              } else {
                                vErrors.push(err15);
                              }
                              errors++;
                            }
                          } else {
                            const err16 = { instancePath: instancePath + "/event/source", schemaPath: "#/$defs/ref/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                            if (vErrors === null) {
                              vErrors = [err16];
                            } else {
                              vErrors.push(err16);
                            }
                            errors++;
                          }
                        }
                        var valid9 = _errs30 === errors;
                      } else {
                        var valid9 = true;
                      }
                    }
                  }
                } else {
                  const err17 = { instancePath: instancePath + "/event", schemaPath: "#/properties/event/oneOf/1/type", keyword: "type", params: { type: "object" }, message: "must be object" };
                  if (vErrors === null) {
                    vErrors = [err17];
                  } else {
                    vErrors.push(err17);
                  }
                  errors++;
                }
              }
              var _valid2 = _errs24 === errors;
              if (_valid2 && valid7) {
                valid7 = false;
                passing1 = [passing1, 1];
              } else {
                if (_valid2) {
                  valid7 = true;
                  passing1 = 1;
                }
              }
              if (!valid7) {
                const err18 = { instancePath: instancePath + "/event", schemaPath: "#/properties/event/oneOf", keyword: "oneOf", params: { passingSchemas: passing1 }, message: "must match exactly one schema in oneOf" };
                if (vErrors === null) {
                  vErrors = [err18];
                } else {
                  vErrors.push(err18);
                }
                errors++;
                validate74.errors = vErrors;
                return false;
              } else {
                errors = _errs20;
                if (vErrors !== null) {
                  if (_errs20) {
                    vErrors.length = _errs20;
                  } else {
                    vErrors = null;
                  }
                }
              }
              var valid1 = _errs19 === errors;
            } else {
              var valid1 = true;
            }
            if (valid1) {
              if (data.guard !== void 0) {
                let data6 = data.guard;
                const _errs33 = errors;
                const _errs34 = errors;
                let valid12 = false;
                let passing2 = null;
                const _errs35 = errors;
                const _errs36 = errors;
                if (errors === _errs36) {
                  if (typeof data6 === "string") {
                    if (func1(data6) < 1) {
                      const err19 = { instancePath: instancePath + "/guard", schemaPath: "#/$defs/nonEmpty/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
                      if (vErrors === null) {
                        vErrors = [err19];
                      } else {
                        vErrors.push(err19);
                      }
                      errors++;
                    }
                  } else {
                    const err20 = { instancePath: instancePath + "/guard", schemaPath: "#/$defs/nonEmpty/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                    if (vErrors === null) {
                      vErrors = [err20];
                    } else {
                      vErrors.push(err20);
                    }
                    errors++;
                  }
                }
                var _valid3 = _errs35 === errors;
                if (_valid3) {
                  valid12 = true;
                  passing2 = 0;
                }
                const _errs38 = errors;
                const _errs39 = errors;
                if (errors === _errs39) {
                  if (data6 && typeof data6 == "object" && !Array.isArray(data6)) {
                  } else {
                    const err21 = { instancePath: instancePath + "/guard", schemaPath: "#/$defs/extensionObject/type", keyword: "type", params: { type: "object" }, message: "must be object" };
                    if (vErrors === null) {
                      vErrors = [err21];
                    } else {
                      vErrors.push(err21);
                    }
                    errors++;
                  }
                }
                var _valid3 = _errs38 === errors;
                if (_valid3 && valid12) {
                  valid12 = false;
                  passing2 = [passing2, 1];
                } else {
                  if (_valid3) {
                    valid12 = true;
                    passing2 = 1;
                  }
                }
                if (!valid12) {
                  const err22 = { instancePath: instancePath + "/guard", schemaPath: "#/properties/guard/oneOf", keyword: "oneOf", params: { passingSchemas: passing2 }, message: "must match exactly one schema in oneOf" };
                  if (vErrors === null) {
                    vErrors = [err22];
                  } else {
                    vErrors.push(err22);
                  }
                  errors++;
                  validate74.errors = vErrors;
                  return false;
                } else {
                  errors = _errs34;
                  if (vErrors !== null) {
                    if (_errs34) {
                      vErrors.length = _errs34;
                    } else {
                      vErrors = null;
                    }
                  }
                }
                var valid1 = _errs33 === errors;
              } else {
                var valid1 = true;
              }
              if (valid1) {
                if (data.pending !== void 0) {
                  let data7 = data.pending;
                  const _errs42 = errors;
                  const _errs43 = errors;
                  if (errors === _errs43) {
                    if (data7 && typeof data7 == "object" && !Array.isArray(data7)) {
                    } else {
                      validate74.errors = [{ instancePath: instancePath + "/pending", schemaPath: "#/$defs/extensionObject/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                      return false;
                    }
                  }
                  var valid1 = _errs42 === errors;
                } else {
                  var valid1 = true;
                }
                if (valid1) {
                  if (data.outcomes !== void 0) {
                    let data8 = data.outcomes;
                    const _errs46 = errors;
                    const _errs47 = errors;
                    let valid16 = false;
                    let passing3 = null;
                    const _errs48 = errors;
                    if (errors === _errs48) {
                      if (Array.isArray(data8)) {
                        if (data8.length < 1) {
                          const err23 = { instancePath: instancePath + "/outcomes", schemaPath: "#/properties/outcomes/oneOf/0/minItems", keyword: "minItems", params: { limit: 1 }, message: "must NOT have fewer than 1 items" };
                          if (vErrors === null) {
                            vErrors = [err23];
                          } else {
                            vErrors.push(err23);
                          }
                          errors++;
                        } else {
                          var valid17 = true;
                          const len1 = data8.length;
                          for (let i1 = 0; i1 < len1; i1++) {
                            let data9 = data8[i1];
                            const _errs50 = errors;
                            const _errs51 = errors;
                            if (errors === _errs51) {
                              if (data9 && typeof data9 == "object" && !Array.isArray(data9)) {
                              } else {
                                const err24 = { instancePath: instancePath + "/outcomes/" + i1, schemaPath: "#/$defs/extensionObject/type", keyword: "type", params: { type: "object" }, message: "must be object" };
                                if (vErrors === null) {
                                  vErrors = [err24];
                                } else {
                                  vErrors.push(err24);
                                }
                                errors++;
                              }
                            }
                            var valid17 = _errs50 === errors;
                            if (!valid17) {
                              break;
                            }
                          }
                        }
                      } else {
                        const err25 = { instancePath: instancePath + "/outcomes", schemaPath: "#/properties/outcomes/oneOf/0/type", keyword: "type", params: { type: "array" }, message: "must be array" };
                        if (vErrors === null) {
                          vErrors = [err25];
                        } else {
                          vErrors.push(err25);
                        }
                        errors++;
                      }
                    }
                    var _valid4 = _errs48 === errors;
                    if (_valid4) {
                      valid16 = true;
                      passing3 = 0;
                    }
                    const _errs54 = errors;
                    if (errors === _errs54) {
                      if (data8 && typeof data8 == "object" && !Array.isArray(data8)) {
                        if (Object.keys(data8).length < 1) {
                          const err26 = { instancePath: instancePath + "/outcomes", schemaPath: "#/properties/outcomes/oneOf/1/minProperties", keyword: "minProperties", params: { limit: 1 }, message: "must NOT have fewer than 1 properties" };
                          if (vErrors === null) {
                            vErrors = [err26];
                          } else {
                            vErrors.push(err26);
                          }
                          errors++;
                        } else {
                          for (const key0 in data8) {
                            let data10 = data8[key0];
                            const _errs57 = errors;
                            const _errs58 = errors;
                            if (errors === _errs58) {
                              if (data10 && typeof data10 == "object" && !Array.isArray(data10)) {
                              } else {
                                const err27 = { instancePath: instancePath + "/outcomes/" + key0.replace(/~/g, "~0").replace(/\//g, "~1"), schemaPath: "#/$defs/extensionObject/type", keyword: "type", params: { type: "object" }, message: "must be object" };
                                if (vErrors === null) {
                                  vErrors = [err27];
                                } else {
                                  vErrors.push(err27);
                                }
                                errors++;
                              }
                            }
                            var valid19 = _errs57 === errors;
                            if (!valid19) {
                              break;
                            }
                          }
                        }
                      } else {
                        const err28 = { instancePath: instancePath + "/outcomes", schemaPath: "#/properties/outcomes/oneOf/1/type", keyword: "type", params: { type: "object" }, message: "must be object" };
                        if (vErrors === null) {
                          vErrors = [err28];
                        } else {
                          vErrors.push(err28);
                        }
                        errors++;
                      }
                    }
                    var _valid4 = _errs54 === errors;
                    if (_valid4 && valid16) {
                      valid16 = false;
                      passing3 = [passing3, 1];
                    } else {
                      if (_valid4) {
                        valid16 = true;
                        passing3 = 1;
                      }
                    }
                    if (!valid16) {
                      const err29 = { instancePath: instancePath + "/outcomes", schemaPath: "#/properties/outcomes/oneOf", keyword: "oneOf", params: { passingSchemas: passing3 }, message: "must match exactly one schema in oneOf" };
                      if (vErrors === null) {
                        vErrors = [err29];
                      } else {
                        vErrors.push(err29);
                      }
                      errors++;
                      validate74.errors = vErrors;
                      return false;
                    } else {
                      errors = _errs47;
                      if (vErrors !== null) {
                        if (_errs47) {
                          vErrors.length = _errs47;
                        } else {
                          vErrors = null;
                        }
                      }
                    }
                    var valid1 = _errs46 === errors;
                  } else {
                    var valid1 = true;
                  }
                  if (valid1) {
                    if (data.to !== void 0) {
                      let data11 = data.to;
                      const _errs61 = errors;
                      const _errs62 = errors;
                      if (errors === _errs62) {
                        if (typeof data11 === "string") {
                          if (!pattern7.test(data11)) {
                            validate74.errors = [{ instancePath: instancePath + "/to", schemaPath: "#/$defs/id/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$" }, message: 'must match pattern "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$"' }];
                            return false;
                          }
                        } else {
                          validate74.errors = [{ instancePath: instancePath + "/to", schemaPath: "#/$defs/id/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                          return false;
                        }
                      }
                      var valid1 = _errs61 === errors;
                    } else {
                      var valid1 = true;
                    }
                    if (valid1) {
                      if (data.effects !== void 0) {
                        let data12 = data.effects;
                        const _errs64 = errors;
                        if (errors === _errs64) {
                          if (Array.isArray(data12)) {
                            var valid22 = true;
                            const len2 = data12.length;
                            for (let i2 = 0; i2 < len2; i2++) {
                              let data13 = data12[i2];
                              const _errs66 = errors;
                              const _errs67 = errors;
                              if (errors === _errs67) {
                                if (data13 && typeof data13 == "object" && !Array.isArray(data13)) {
                                } else {
                                  validate74.errors = [{ instancePath: instancePath + "/effects/" + i2, schemaPath: "#/$defs/extensionObject/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                                  return false;
                                }
                              }
                              var valid22 = _errs66 === errors;
                              if (!valid22) {
                                break;
                              }
                            }
                          } else {
                            validate74.errors = [{ instancePath: instancePath + "/effects", schemaPath: "#/properties/effects/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                            return false;
                          }
                        }
                        var valid1 = _errs64 === errors;
                      } else {
                        var valid1 = true;
                      }
                      if (valid1) {
                        if (data.feedback !== void 0) {
                          let data14 = data.feedback;
                          const _errs70 = errors;
                          const _errs71 = errors;
                          if (errors === _errs71) {
                            if (data14 && typeof data14 == "object" && !Array.isArray(data14)) {
                            } else {
                              validate74.errors = [{ instancePath: instancePath + "/feedback", schemaPath: "#/$defs/extensionObject/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                              return false;
                            }
                          }
                          var valid1 = _errs70 === errors;
                        } else {
                          var valid1 = true;
                        }
                        if (valid1) {
                          if (data.focus !== void 0) {
                            let data15 = data.focus;
                            const _errs74 = errors;
                            const _errs75 = errors;
                            if (errors === _errs75) {
                              if (data15 && typeof data15 == "object" && !Array.isArray(data15)) {
                              } else {
                                validate74.errors = [{ instancePath: instancePath + "/focus", schemaPath: "#/$defs/extensionObject/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                                return false;
                              }
                            }
                            var valid1 = _errs74 === errors;
                          } else {
                            var valid1 = true;
                          }
                          if (valid1) {
                            if (data.history !== void 0) {
                              let data16 = data.history;
                              const _errs78 = errors;
                              const _errs79 = errors;
                              let valid26 = false;
                              let passing4 = null;
                              const _errs80 = errors;
                              const _errs81 = errors;
                              if (errors === _errs81) {
                                if (typeof data16 === "string") {
                                  if (func1(data16) < 1) {
                                    const err30 = { instancePath: instancePath + "/history", schemaPath: "#/$defs/nonEmpty/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
                                    if (vErrors === null) {
                                      vErrors = [err30];
                                    } else {
                                      vErrors.push(err30);
                                    }
                                    errors++;
                                  }
                                } else {
                                  const err31 = { instancePath: instancePath + "/history", schemaPath: "#/$defs/nonEmpty/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                                  if (vErrors === null) {
                                    vErrors = [err31];
                                  } else {
                                    vErrors.push(err31);
                                  }
                                  errors++;
                                }
                              }
                              var _valid5 = _errs80 === errors;
                              if (_valid5) {
                                valid26 = true;
                                passing4 = 0;
                              }
                              const _errs83 = errors;
                              const _errs84 = errors;
                              if (errors === _errs84) {
                                if (data16 && typeof data16 == "object" && !Array.isArray(data16)) {
                                } else {
                                  const err32 = { instancePath: instancePath + "/history", schemaPath: "#/$defs/extensionObject/type", keyword: "type", params: { type: "object" }, message: "must be object" };
                                  if (vErrors === null) {
                                    vErrors = [err32];
                                  } else {
                                    vErrors.push(err32);
                                  }
                                  errors++;
                                }
                              }
                              var _valid5 = _errs83 === errors;
                              if (_valid5 && valid26) {
                                valid26 = false;
                                passing4 = [passing4, 1];
                              } else {
                                if (_valid5) {
                                  valid26 = true;
                                  passing4 = 1;
                                }
                              }
                              if (!valid26) {
                                const err33 = { instancePath: instancePath + "/history", schemaPath: "#/properties/history/oneOf", keyword: "oneOf", params: { passingSchemas: passing4 }, message: "must match exactly one schema in oneOf" };
                                if (vErrors === null) {
                                  vErrors = [err33];
                                } else {
                                  vErrors.push(err33);
                                }
                                errors++;
                                validate74.errors = vErrors;
                                return false;
                              } else {
                                errors = _errs79;
                                if (vErrors !== null) {
                                  if (_errs79) {
                                    vErrors.length = _errs79;
                                  } else {
                                    vErrors = null;
                                  }
                                }
                              }
                              var valid1 = _errs78 === errors;
                            } else {
                              var valid1 = true;
                            }
                            if (valid1) {
                              if (data.concurrency !== void 0) {
                                let data17 = data.concurrency;
                                const _errs87 = errors;
                                const _errs88 = errors;
                                if (errors === _errs88) {
                                  if (data17 && typeof data17 == "object" && !Array.isArray(data17)) {
                                  } else {
                                    validate74.errors = [{ instancePath: instancePath + "/concurrency", schemaPath: "#/$defs/extensionObject/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                                    return false;
                                  }
                                }
                                var valid1 = _errs87 === errors;
                              } else {
                                var valid1 = true;
                              }
                              if (valid1) {
                                if (data.persistence !== void 0) {
                                  let data18 = data.persistence;
                                  const _errs91 = errors;
                                  const _errs92 = errors;
                                  if (errors === _errs92) {
                                    if (data18 && typeof data18 == "object" && !Array.isArray(data18)) {
                                    } else {
                                      validate74.errors = [{ instancePath: instancePath + "/persistence", schemaPath: "#/$defs/extensionObject/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                                      return false;
                                    }
                                  }
                                  var valid1 = _errs91 === errors;
                                } else {
                                  var valid1 = true;
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    } else {
      validate74.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
      return false;
    }
  }
  validate74.errors = vErrors;
  return errors === 0;
}
validate74.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
function validate73(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate73.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (errors === 0) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
      let missing0;
      if (data.id === void 0 && (missing0 = "id") || data.initial === void 0 && (missing0 = "initial") || data.states === void 0 && (missing0 = "states") || data.transitions === void 0 && (missing0 = "transitions")) {
        validate73.errors = [{ instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: missing0 }, message: "must have required property '" + missing0 + "'" }];
        return false;
      } else {
        if (data.id !== void 0) {
          let data0 = data.id;
          const _errs2 = errors;
          const _errs3 = errors;
          if (errors === _errs3) {
            if (typeof data0 === "string") {
              if (!pattern7.test(data0)) {
                validate73.errors = [{ instancePath: instancePath + "/id", schemaPath: "#/$defs/id/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$" }, message: 'must match pattern "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$"' }];
                return false;
              }
            } else {
              validate73.errors = [{ instancePath: instancePath + "/id", schemaPath: "#/$defs/id/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
              return false;
            }
          }
          var valid0 = _errs2 === errors;
        } else {
          var valid0 = true;
        }
        if (valid0) {
          if (data.scope !== void 0) {
            let data1 = data.scope;
            const _errs5 = errors;
            const _errs6 = errors;
            if (errors === _errs6) {
              if (typeof data1 === "string") {
                if (!pattern7.test(data1)) {
                  validate73.errors = [{ instancePath: instancePath + "/scope", schemaPath: "#/$defs/ref/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$" }, message: 'must match pattern "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$"' }];
                  return false;
                }
              } else {
                validate73.errors = [{ instancePath: instancePath + "/scope", schemaPath: "#/$defs/ref/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                return false;
              }
            }
            var valid0 = _errs5 === errors;
          } else {
            var valid0 = true;
          }
          if (valid0) {
            if (data.initial !== void 0) {
              let data2 = data.initial;
              const _errs8 = errors;
              const _errs9 = errors;
              if (errors === _errs9) {
                if (typeof data2 === "string") {
                  if (!pattern7.test(data2)) {
                    validate73.errors = [{ instancePath: instancePath + "/initial", schemaPath: "#/$defs/id/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$" }, message: 'must match pattern "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$"' }];
                    return false;
                  }
                } else {
                  validate73.errors = [{ instancePath: instancePath + "/initial", schemaPath: "#/$defs/id/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                  return false;
                }
              }
              var valid0 = _errs8 === errors;
            } else {
              var valid0 = true;
            }
            if (valid0) {
              if (data.states !== void 0) {
                let data3 = data.states;
                const _errs11 = errors;
                if (errors === _errs11) {
                  if (Array.isArray(data3)) {
                    if (data3.length < 1) {
                      validate73.errors = [{ instancePath: instancePath + "/states", schemaPath: "#/properties/states/minItems", keyword: "minItems", params: { limit: 1 }, message: "must NOT have fewer than 1 items" }];
                      return false;
                    } else {
                      var valid4 = true;
                      const len0 = data3.length;
                      for (let i0 = 0; i0 < len0; i0++) {
                        let data4 = data3[i0];
                        const _errs13 = errors;
                        const _errs14 = errors;
                        if (errors === _errs14) {
                          if (typeof data4 === "string") {
                            if (!pattern7.test(data4)) {
                              validate73.errors = [{ instancePath: instancePath + "/states/" + i0, schemaPath: "#/$defs/id/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$" }, message: 'must match pattern "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$"' }];
                              return false;
                            }
                          } else {
                            validate73.errors = [{ instancePath: instancePath + "/states/" + i0, schemaPath: "#/$defs/id/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                            return false;
                          }
                        }
                        var valid4 = _errs13 === errors;
                        if (!valid4) {
                          break;
                        }
                      }
                      if (valid4) {
                        let i1 = data3.length;
                        let j0;
                        if (i1 > 1) {
                          outer0:
                            for (; i1--; ) {
                              for (j0 = i1; j0--; ) {
                                if (func0(data3[i1], data3[j0])) {
                                  validate73.errors = [{ instancePath: instancePath + "/states", schemaPath: "#/properties/states/uniqueItems", keyword: "uniqueItems", params: { i: i1, j: j0 }, message: "must NOT have duplicate items (items ## " + j0 + " and " + i1 + " are identical)" }];
                                  return false;
                                  break outer0;
                                }
                              }
                            }
                        }
                      }
                    }
                  } else {
                    validate73.errors = [{ instancePath: instancePath + "/states", schemaPath: "#/properties/states/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                    return false;
                  }
                }
                var valid0 = _errs11 === errors;
              } else {
                var valid0 = true;
              }
              if (valid0) {
                if (data.transitions !== void 0) {
                  let data5 = data.transitions;
                  const _errs16 = errors;
                  if (errors === _errs16) {
                    if (Array.isArray(data5)) {
                      var valid7 = true;
                      const len1 = data5.length;
                      for (let i2 = 0; i2 < len1; i2++) {
                        const _errs18 = errors;
                        if (!validate74(data5[i2], { instancePath: instancePath + "/transitions/" + i2, parentData: data5, parentDataProperty: i2, rootData, dynamicAnchors })) {
                          vErrors = vErrors === null ? validate74.errors : vErrors.concat(validate74.errors);
                          errors = vErrors.length;
                        }
                        var valid7 = _errs18 === errors;
                        if (!valid7) {
                          break;
                        }
                      }
                    } else {
                      validate73.errors = [{ instancePath: instancePath + "/transitions", schemaPath: "#/properties/transitions/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                      return false;
                    }
                  }
                  var valid0 = _errs16 === errors;
                } else {
                  var valid0 = true;
                }
              }
            }
          }
        }
      }
    } else {
      validate73.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
      return false;
    }
  }
  validate73.errors = vErrors;
  return errors === 0;
}
validate73.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
function validate72(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate72.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (errors === 0) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
      let missing0;
      if (data.stateMachines === void 0 && (missing0 = "stateMachines")) {
        validate72.errors = [{ instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: missing0 }, message: "must have required property '" + missing0 + "'" }];
        return false;
      } else {
        if (data.stateMachines !== void 0) {
          let data0 = data.stateMachines;
          const _errs2 = errors;
          if (errors === _errs2) {
            if (Array.isArray(data0)) {
              var valid1 = true;
              const len0 = data0.length;
              for (let i0 = 0; i0 < len0; i0++) {
                const _errs4 = errors;
                if (!validate73(data0[i0], { instancePath: instancePath + "/stateMachines/" + i0, parentData: data0, parentDataProperty: i0, rootData, dynamicAnchors })) {
                  vErrors = vErrors === null ? validate73.errors : vErrors.concat(validate73.errors);
                  errors = vErrors.length;
                }
                var valid1 = _errs4 === errors;
                if (!valid1) {
                  break;
                }
              }
            } else {
              validate72.errors = [{ instancePath: instancePath + "/stateMachines", schemaPath: "#/properties/stateMachines/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
              return false;
            }
          }
        }
      }
    } else {
      validate72.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
      return false;
    }
  }
  validate72.errors = vErrors;
  return errors === 0;
}
validate72.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
var schema149 = { "type": "object", "additionalProperties": true, "required": ["sequenceId", "purpose", "driver", "scenes", "reducedMotion"], "properties": { "sequenceId": { "$ref": "#/$defs/id" }, "purpose": { "$ref": "#/$defs/nonEmpty" }, "driver": { "type": "object", "additionalProperties": true, "required": ["type"], "properties": { "type": { "enum": ["time", "user-event", "scroll-progress", "scroll-threshold", "view", "media", "data", "system"] }, "source": { "$ref": "#/$defs/nonEmpty" }, "range": { "$ref": "#/$defs/extensionObject" } } }, "scenes": { "type": "array", "minItems": 1, "items": { "$ref": "#/$defs/extensionObject" } }, "tracks": { "type": "array", "items": { "$ref": "#/$defs/extensionObject" } }, "pin": { "$ref": "#/$defs/extensionObject" }, "reentry": { "$ref": "#/$defs/nonEmpty" }, "reverse": { "$ref": "#/$defs/nonEmpty" }, "interruption": { "$ref": "#/$defs/nonEmpty" }, "reducedMotion": { "oneOf": [{ "$ref": "#/$defs/nonEmpty" }, { "$ref": "#/$defs/extensionObject" }] }, "fallback": { "oneOf": [{ "$ref": "#/$defs/nonEmpty" }, { "$ref": "#/$defs/extensionObject" }] } } };
function validate79(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate79.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (errors === 0) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
      let missing0;
      if (data.sequenceId === void 0 && (missing0 = "sequenceId") || data.purpose === void 0 && (missing0 = "purpose") || data.driver === void 0 && (missing0 = "driver") || data.scenes === void 0 && (missing0 = "scenes") || data.reducedMotion === void 0 && (missing0 = "reducedMotion")) {
        validate79.errors = [{ instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: missing0 }, message: "must have required property '" + missing0 + "'" }];
        return false;
      } else {
        if (data.sequenceId !== void 0) {
          let data0 = data.sequenceId;
          const _errs2 = errors;
          const _errs3 = errors;
          if (errors === _errs3) {
            if (typeof data0 === "string") {
              if (!pattern7.test(data0)) {
                validate79.errors = [{ instancePath: instancePath + "/sequenceId", schemaPath: "#/$defs/id/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$" }, message: 'must match pattern "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$"' }];
                return false;
              }
            } else {
              validate79.errors = [{ instancePath: instancePath + "/sequenceId", schemaPath: "#/$defs/id/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
              return false;
            }
          }
          var valid0 = _errs2 === errors;
        } else {
          var valid0 = true;
        }
        if (valid0) {
          if (data.purpose !== void 0) {
            let data1 = data.purpose;
            const _errs5 = errors;
            const _errs6 = errors;
            if (errors === _errs6) {
              if (typeof data1 === "string") {
                if (func1(data1) < 1) {
                  validate79.errors = [{ instancePath: instancePath + "/purpose", schemaPath: "#/$defs/nonEmpty/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                  return false;
                }
              } else {
                validate79.errors = [{ instancePath: instancePath + "/purpose", schemaPath: "#/$defs/nonEmpty/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                return false;
              }
            }
            var valid0 = _errs5 === errors;
          } else {
            var valid0 = true;
          }
          if (valid0) {
            if (data.driver !== void 0) {
              let data2 = data.driver;
              const _errs8 = errors;
              if (errors === _errs8) {
                if (data2 && typeof data2 == "object" && !Array.isArray(data2)) {
                  let missing1;
                  if (data2.type === void 0 && (missing1 = "type")) {
                    validate79.errors = [{ instancePath: instancePath + "/driver", schemaPath: "#/properties/driver/required", keyword: "required", params: { missingProperty: missing1 }, message: "must have required property '" + missing1 + "'" }];
                    return false;
                  } else {
                    if (data2.type !== void 0) {
                      let data3 = data2.type;
                      const _errs11 = errors;
                      if (!(data3 === "time" || data3 === "user-event" || data3 === "scroll-progress" || data3 === "scroll-threshold" || data3 === "view" || data3 === "media" || data3 === "data" || data3 === "system")) {
                        validate79.errors = [{ instancePath: instancePath + "/driver/type", schemaPath: "#/properties/driver/properties/type/enum", keyword: "enum", params: { allowedValues: schema149.properties.driver.properties.type.enum }, message: "must be equal to one of the allowed values" }];
                        return false;
                      }
                      var valid3 = _errs11 === errors;
                    } else {
                      var valid3 = true;
                    }
                    if (valid3) {
                      if (data2.source !== void 0) {
                        let data4 = data2.source;
                        const _errs12 = errors;
                        const _errs13 = errors;
                        if (errors === _errs13) {
                          if (typeof data4 === "string") {
                            if (func1(data4) < 1) {
                              validate79.errors = [{ instancePath: instancePath + "/driver/source", schemaPath: "#/$defs/nonEmpty/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                              return false;
                            }
                          } else {
                            validate79.errors = [{ instancePath: instancePath + "/driver/source", schemaPath: "#/$defs/nonEmpty/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                            return false;
                          }
                        }
                        var valid3 = _errs12 === errors;
                      } else {
                        var valid3 = true;
                      }
                      if (valid3) {
                        if (data2.range !== void 0) {
                          let data5 = data2.range;
                          const _errs15 = errors;
                          const _errs16 = errors;
                          if (errors === _errs16) {
                            if (data5 && typeof data5 == "object" && !Array.isArray(data5)) {
                            } else {
                              validate79.errors = [{ instancePath: instancePath + "/driver/range", schemaPath: "#/$defs/extensionObject/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                              return false;
                            }
                          }
                          var valid3 = _errs15 === errors;
                        } else {
                          var valid3 = true;
                        }
                      }
                    }
                  }
                } else {
                  validate79.errors = [{ instancePath: instancePath + "/driver", schemaPath: "#/properties/driver/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                  return false;
                }
              }
              var valid0 = _errs8 === errors;
            } else {
              var valid0 = true;
            }
            if (valid0) {
              if (data.scenes !== void 0) {
                let data6 = data.scenes;
                const _errs19 = errors;
                if (errors === _errs19) {
                  if (Array.isArray(data6)) {
                    if (data6.length < 1) {
                      validate79.errors = [{ instancePath: instancePath + "/scenes", schemaPath: "#/properties/scenes/minItems", keyword: "minItems", params: { limit: 1 }, message: "must NOT have fewer than 1 items" }];
                      return false;
                    } else {
                      var valid6 = true;
                      const len0 = data6.length;
                      for (let i0 = 0; i0 < len0; i0++) {
                        let data7 = data6[i0];
                        const _errs21 = errors;
                        const _errs22 = errors;
                        if (errors === _errs22) {
                          if (data7 && typeof data7 == "object" && !Array.isArray(data7)) {
                          } else {
                            validate79.errors = [{ instancePath: instancePath + "/scenes/" + i0, schemaPath: "#/$defs/extensionObject/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                            return false;
                          }
                        }
                        var valid6 = _errs21 === errors;
                        if (!valid6) {
                          break;
                        }
                      }
                    }
                  } else {
                    validate79.errors = [{ instancePath: instancePath + "/scenes", schemaPath: "#/properties/scenes/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                    return false;
                  }
                }
                var valid0 = _errs19 === errors;
              } else {
                var valid0 = true;
              }
              if (valid0) {
                if (data.tracks !== void 0) {
                  let data8 = data.tracks;
                  const _errs25 = errors;
                  if (errors === _errs25) {
                    if (Array.isArray(data8)) {
                      var valid8 = true;
                      const len1 = data8.length;
                      for (let i1 = 0; i1 < len1; i1++) {
                        let data9 = data8[i1];
                        const _errs27 = errors;
                        const _errs28 = errors;
                        if (errors === _errs28) {
                          if (data9 && typeof data9 == "object" && !Array.isArray(data9)) {
                          } else {
                            validate79.errors = [{ instancePath: instancePath + "/tracks/" + i1, schemaPath: "#/$defs/extensionObject/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                            return false;
                          }
                        }
                        var valid8 = _errs27 === errors;
                        if (!valid8) {
                          break;
                        }
                      }
                    } else {
                      validate79.errors = [{ instancePath: instancePath + "/tracks", schemaPath: "#/properties/tracks/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                      return false;
                    }
                  }
                  var valid0 = _errs25 === errors;
                } else {
                  var valid0 = true;
                }
                if (valid0) {
                  if (data.pin !== void 0) {
                    let data10 = data.pin;
                    const _errs31 = errors;
                    const _errs32 = errors;
                    if (errors === _errs32) {
                      if (data10 && typeof data10 == "object" && !Array.isArray(data10)) {
                      } else {
                        validate79.errors = [{ instancePath: instancePath + "/pin", schemaPath: "#/$defs/extensionObject/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                        return false;
                      }
                    }
                    var valid0 = _errs31 === errors;
                  } else {
                    var valid0 = true;
                  }
                  if (valid0) {
                    if (data.reentry !== void 0) {
                      let data11 = data.reentry;
                      const _errs35 = errors;
                      const _errs36 = errors;
                      if (errors === _errs36) {
                        if (typeof data11 === "string") {
                          if (func1(data11) < 1) {
                            validate79.errors = [{ instancePath: instancePath + "/reentry", schemaPath: "#/$defs/nonEmpty/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                            return false;
                          }
                        } else {
                          validate79.errors = [{ instancePath: instancePath + "/reentry", schemaPath: "#/$defs/nonEmpty/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                          return false;
                        }
                      }
                      var valid0 = _errs35 === errors;
                    } else {
                      var valid0 = true;
                    }
                    if (valid0) {
                      if (data.reverse !== void 0) {
                        let data12 = data.reverse;
                        const _errs38 = errors;
                        const _errs39 = errors;
                        if (errors === _errs39) {
                          if (typeof data12 === "string") {
                            if (func1(data12) < 1) {
                              validate79.errors = [{ instancePath: instancePath + "/reverse", schemaPath: "#/$defs/nonEmpty/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                              return false;
                            }
                          } else {
                            validate79.errors = [{ instancePath: instancePath + "/reverse", schemaPath: "#/$defs/nonEmpty/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                            return false;
                          }
                        }
                        var valid0 = _errs38 === errors;
                      } else {
                        var valid0 = true;
                      }
                      if (valid0) {
                        if (data.interruption !== void 0) {
                          let data13 = data.interruption;
                          const _errs41 = errors;
                          const _errs42 = errors;
                          if (errors === _errs42) {
                            if (typeof data13 === "string") {
                              if (func1(data13) < 1) {
                                validate79.errors = [{ instancePath: instancePath + "/interruption", schemaPath: "#/$defs/nonEmpty/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                                return false;
                              }
                            } else {
                              validate79.errors = [{ instancePath: instancePath + "/interruption", schemaPath: "#/$defs/nonEmpty/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                              return false;
                            }
                          }
                          var valid0 = _errs41 === errors;
                        } else {
                          var valid0 = true;
                        }
                        if (valid0) {
                          if (data.reducedMotion !== void 0) {
                            let data14 = data.reducedMotion;
                            const _errs44 = errors;
                            const _errs45 = errors;
                            let valid14 = false;
                            let passing0 = null;
                            const _errs46 = errors;
                            const _errs47 = errors;
                            if (errors === _errs47) {
                              if (typeof data14 === "string") {
                                if (func1(data14) < 1) {
                                  const err0 = { instancePath: instancePath + "/reducedMotion", schemaPath: "#/$defs/nonEmpty/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
                                  if (vErrors === null) {
                                    vErrors = [err0];
                                  } else {
                                    vErrors.push(err0);
                                  }
                                  errors++;
                                }
                              } else {
                                const err1 = { instancePath: instancePath + "/reducedMotion", schemaPath: "#/$defs/nonEmpty/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                                if (vErrors === null) {
                                  vErrors = [err1];
                                } else {
                                  vErrors.push(err1);
                                }
                                errors++;
                              }
                            }
                            var _valid0 = _errs46 === errors;
                            if (_valid0) {
                              valid14 = true;
                              passing0 = 0;
                            }
                            const _errs49 = errors;
                            const _errs50 = errors;
                            if (errors === _errs50) {
                              if (data14 && typeof data14 == "object" && !Array.isArray(data14)) {
                              } else {
                                const err2 = { instancePath: instancePath + "/reducedMotion", schemaPath: "#/$defs/extensionObject/type", keyword: "type", params: { type: "object" }, message: "must be object" };
                                if (vErrors === null) {
                                  vErrors = [err2];
                                } else {
                                  vErrors.push(err2);
                                }
                                errors++;
                              }
                            }
                            var _valid0 = _errs49 === errors;
                            if (_valid0 && valid14) {
                              valid14 = false;
                              passing0 = [passing0, 1];
                            } else {
                              if (_valid0) {
                                valid14 = true;
                                passing0 = 1;
                              }
                            }
                            if (!valid14) {
                              const err3 = { instancePath: instancePath + "/reducedMotion", schemaPath: "#/properties/reducedMotion/oneOf", keyword: "oneOf", params: { passingSchemas: passing0 }, message: "must match exactly one schema in oneOf" };
                              if (vErrors === null) {
                                vErrors = [err3];
                              } else {
                                vErrors.push(err3);
                              }
                              errors++;
                              validate79.errors = vErrors;
                              return false;
                            } else {
                              errors = _errs45;
                              if (vErrors !== null) {
                                if (_errs45) {
                                  vErrors.length = _errs45;
                                } else {
                                  vErrors = null;
                                }
                              }
                            }
                            var valid0 = _errs44 === errors;
                          } else {
                            var valid0 = true;
                          }
                          if (valid0) {
                            if (data.fallback !== void 0) {
                              let data15 = data.fallback;
                              const _errs53 = errors;
                              const _errs54 = errors;
                              let valid17 = false;
                              let passing1 = null;
                              const _errs55 = errors;
                              const _errs56 = errors;
                              if (errors === _errs56) {
                                if (typeof data15 === "string") {
                                  if (func1(data15) < 1) {
                                    const err4 = { instancePath: instancePath + "/fallback", schemaPath: "#/$defs/nonEmpty/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
                                    if (vErrors === null) {
                                      vErrors = [err4];
                                    } else {
                                      vErrors.push(err4);
                                    }
                                    errors++;
                                  }
                                } else {
                                  const err5 = { instancePath: instancePath + "/fallback", schemaPath: "#/$defs/nonEmpty/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                                  if (vErrors === null) {
                                    vErrors = [err5];
                                  } else {
                                    vErrors.push(err5);
                                  }
                                  errors++;
                                }
                              }
                              var _valid1 = _errs55 === errors;
                              if (_valid1) {
                                valid17 = true;
                                passing1 = 0;
                              }
                              const _errs58 = errors;
                              const _errs59 = errors;
                              if (errors === _errs59) {
                                if (data15 && typeof data15 == "object" && !Array.isArray(data15)) {
                                } else {
                                  const err6 = { instancePath: instancePath + "/fallback", schemaPath: "#/$defs/extensionObject/type", keyword: "type", params: { type: "object" }, message: "must be object" };
                                  if (vErrors === null) {
                                    vErrors = [err6];
                                  } else {
                                    vErrors.push(err6);
                                  }
                                  errors++;
                                }
                              }
                              var _valid1 = _errs58 === errors;
                              if (_valid1 && valid17) {
                                valid17 = false;
                                passing1 = [passing1, 1];
                              } else {
                                if (_valid1) {
                                  valid17 = true;
                                  passing1 = 1;
                                }
                              }
                              if (!valid17) {
                                const err7 = { instancePath: instancePath + "/fallback", schemaPath: "#/properties/fallback/oneOf", keyword: "oneOf", params: { passingSchemas: passing1 }, message: "must match exactly one schema in oneOf" };
                                if (vErrors === null) {
                                  vErrors = [err7];
                                } else {
                                  vErrors.push(err7);
                                }
                                errors++;
                                validate79.errors = vErrors;
                                return false;
                              } else {
                                errors = _errs54;
                                if (vErrors !== null) {
                                  if (_errs54) {
                                    vErrors.length = _errs54;
                                  } else {
                                    vErrors = null;
                                  }
                                }
                              }
                              var valid0 = _errs53 === errors;
                            } else {
                              var valid0 = true;
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    } else {
      validate79.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
      return false;
    }
  }
  validate79.errors = vErrors;
  return errors === 0;
}
validate79.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
function validate78(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate78.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (errors === 0) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
      let missing0;
      if (data.sequences === void 0 && (missing0 = "sequences")) {
        validate78.errors = [{ instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: missing0 }, message: "must have required property '" + missing0 + "'" }];
        return false;
      } else {
        if (data.sequences !== void 0) {
          let data0 = data.sequences;
          const _errs2 = errors;
          if (errors === _errs2) {
            if (Array.isArray(data0)) {
              var valid1 = true;
              const len0 = data0.length;
              for (let i0 = 0; i0 < len0; i0++) {
                const _errs4 = errors;
                if (!validate79(data0[i0], { instancePath: instancePath + "/sequences/" + i0, parentData: data0, parentDataProperty: i0, rootData, dynamicAnchors })) {
                  vErrors = vErrors === null ? validate79.errors : vErrors.concat(validate79.errors);
                  errors = vErrors.length;
                }
                var valid1 = _errs4 === errors;
                if (!valid1) {
                  break;
                }
              }
            } else {
              validate78.errors = [{ instancePath: instancePath + "/sequences", schemaPath: "#/properties/sequences/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
              return false;
            }
          }
        }
      }
    } else {
      validate78.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
      return false;
    }
  }
  validate78.errors = vErrors;
  return errors === 0;
}
validate78.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
var schema164 = { "type": "object", "additionalProperties": true, "required": ["profile", "elements"], "properties": { "profile": { "type": "object", "additionalProperties": true, "required": ["standard", "version", "level"], "properties": { "standard": { "const": "WCAG" }, "version": { "enum": ["2.1", "2.2"] }, "level": { "enum": ["A", "AA", "AAA"] }, "scope": { "$ref": "#/$defs/nonEmpty" } } }, "elements": { "type": "array", "items": { "$ref": "#/$defs/accessibilityElement" } }, "tests": { "type": "array", "items": { "$ref": "#/$defs/extensionObject" } } } };
function validate83(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate83.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (errors === 0) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
      let missing0;
      if (data.element === void 0 && (missing0 = "element")) {
        validate83.errors = [{ instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: missing0 }, message: "must have required property '" + missing0 + "'" }];
        return false;
      } else {
        if (data.element !== void 0) {
          let data0 = data.element;
          const _errs2 = errors;
          const _errs3 = errors;
          if (errors === _errs3) {
            if (typeof data0 === "string") {
              if (!pattern7.test(data0)) {
                validate83.errors = [{ instancePath: instancePath + "/element", schemaPath: "#/$defs/ref/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$" }, message: 'must match pattern "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$"' }];
                return false;
              }
            } else {
              validate83.errors = [{ instancePath: instancePath + "/element", schemaPath: "#/$defs/ref/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
              return false;
            }
          }
          var valid0 = _errs2 === errors;
        } else {
          var valid0 = true;
        }
        if (valid0) {
          if (data.name !== void 0) {
            let data1 = data.name;
            const _errs5 = errors;
            const _errs6 = errors;
            if (errors === _errs6) {
              if (typeof data1 === "string") {
                if (func1(data1) < 1) {
                  validate83.errors = [{ instancePath: instancePath + "/name", schemaPath: "#/$defs/nonEmpty/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                  return false;
                }
              } else {
                validate83.errors = [{ instancePath: instancePath + "/name", schemaPath: "#/$defs/nonEmpty/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                return false;
              }
            }
            var valid0 = _errs5 === errors;
          } else {
            var valid0 = true;
          }
          if (valid0) {
            if (data.description !== void 0) {
              let data2 = data.description;
              const _errs8 = errors;
              const _errs9 = errors;
              if (errors === _errs9) {
                if (typeof data2 === "string") {
                  if (func1(data2) < 1) {
                    validate83.errors = [{ instancePath: instancePath + "/description", schemaPath: "#/$defs/nonEmpty/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                    return false;
                  }
                } else {
                  validate83.errors = [{ instancePath: instancePath + "/description", schemaPath: "#/$defs/nonEmpty/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                  return false;
                }
              }
              var valid0 = _errs8 === errors;
            } else {
              var valid0 = true;
            }
            if (valid0) {
              if (data.details !== void 0) {
                let data3 = data.details;
                const _errs11 = errors;
                const _errs12 = errors;
                let valid4 = false;
                let passing0 = null;
                const _errs13 = errors;
                const _errs14 = errors;
                if (errors === _errs14) {
                  if (typeof data3 === "string") {
                    if (func1(data3) < 1) {
                      const err0 = { instancePath: instancePath + "/details", schemaPath: "#/$defs/nonEmpty/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
                      if (vErrors === null) {
                        vErrors = [err0];
                      } else {
                        vErrors.push(err0);
                      }
                      errors++;
                    }
                  } else {
                    const err1 = { instancePath: instancePath + "/details", schemaPath: "#/$defs/nonEmpty/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                    if (vErrors === null) {
                      vErrors = [err1];
                    } else {
                      vErrors.push(err1);
                    }
                    errors++;
                  }
                }
                var _valid0 = _errs13 === errors;
                if (_valid0) {
                  valid4 = true;
                  passing0 = 0;
                }
                const _errs16 = errors;
                const _errs17 = errors;
                if (errors === _errs17) {
                  if (data3 && typeof data3 == "object" && !Array.isArray(data3)) {
                  } else {
                    const err2 = { instancePath: instancePath + "/details", schemaPath: "#/$defs/extensionObject/type", keyword: "type", params: { type: "object" }, message: "must be object" };
                    if (vErrors === null) {
                      vErrors = [err2];
                    } else {
                      vErrors.push(err2);
                    }
                    errors++;
                  }
                }
                var _valid0 = _errs16 === errors;
                if (_valid0 && valid4) {
                  valid4 = false;
                  passing0 = [passing0, 1];
                } else {
                  if (_valid0) {
                    valid4 = true;
                    passing0 = 1;
                  }
                }
                if (!valid4) {
                  const err3 = { instancePath: instancePath + "/details", schemaPath: "#/properties/details/oneOf", keyword: "oneOf", params: { passingSchemas: passing0 }, message: "must match exactly one schema in oneOf" };
                  if (vErrors === null) {
                    vErrors = [err3];
                  } else {
                    vErrors.push(err3);
                  }
                  errors++;
                  validate83.errors = vErrors;
                  return false;
                } else {
                  errors = _errs12;
                  if (vErrors !== null) {
                    if (_errs12) {
                      vErrors.length = _errs12;
                    } else {
                      vErrors = null;
                    }
                  }
                }
                var valid0 = _errs11 === errors;
              } else {
                var valid0 = true;
              }
              if (valid0) {
                if (data.readingOrder !== void 0) {
                  let data4 = data.readingOrder;
                  const _errs20 = errors;
                  const _errs21 = errors;
                  let valid7 = false;
                  let passing1 = null;
                  const _errs22 = errors;
                  if (!(typeof data4 == "number" && (!(data4 % 1) && !isNaN(data4)) && isFinite(data4))) {
                    const err4 = { instancePath: instancePath + "/readingOrder", schemaPath: "#/properties/readingOrder/oneOf/0/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
                    if (vErrors === null) {
                      vErrors = [err4];
                    } else {
                      vErrors.push(err4);
                    }
                    errors++;
                  }
                  if (errors === _errs22) {
                    if (typeof data4 == "number" && isFinite(data4)) {
                      if (data4 < 1 || isNaN(data4)) {
                        const err5 = { instancePath: instancePath + "/readingOrder", schemaPath: "#/properties/readingOrder/oneOf/0/minimum", keyword: "minimum", params: { comparison: ">=", limit: 1 }, message: "must be >= 1" };
                        if (vErrors === null) {
                          vErrors = [err5];
                        } else {
                          vErrors.push(err5);
                        }
                        errors++;
                      }
                    }
                  }
                  var _valid1 = _errs22 === errors;
                  if (_valid1) {
                    valid7 = true;
                    passing1 = 0;
                  }
                  const _errs24 = errors;
                  if (!validate30(data4, { instancePath: instancePath + "/readingOrder", parentData: data, parentDataProperty: "readingOrder", rootData, dynamicAnchors })) {
                    vErrors = vErrors === null ? validate30.errors : vErrors.concat(validate30.errors);
                    errors = vErrors.length;
                  }
                  var _valid1 = _errs24 === errors;
                  if (_valid1 && valid7) {
                    valid7 = false;
                    passing1 = [passing1, 1];
                  } else {
                    if (_valid1) {
                      valid7 = true;
                      passing1 = 1;
                    }
                  }
                  if (!valid7) {
                    const err6 = { instancePath: instancePath + "/readingOrder", schemaPath: "#/properties/readingOrder/oneOf", keyword: "oneOf", params: { passingSchemas: passing1 }, message: "must match exactly one schema in oneOf" };
                    if (vErrors === null) {
                      vErrors = [err6];
                    } else {
                      vErrors.push(err6);
                    }
                    errors++;
                    validate83.errors = vErrors;
                    return false;
                  } else {
                    errors = _errs21;
                    if (vErrors !== null) {
                      if (_errs21) {
                        vErrors.length = _errs21;
                      } else {
                        vErrors = null;
                      }
                    }
                  }
                  var valid0 = _errs20 === errors;
                } else {
                  var valid0 = true;
                }
                if (valid0) {
                  if (data.reducedMotion !== void 0) {
                    let data5 = data.reducedMotion;
                    const _errs25 = errors;
                    const _errs26 = errors;
                    if (errors === _errs26) {
                      if (typeof data5 === "string") {
                        if (func1(data5) < 1) {
                          validate83.errors = [{ instancePath: instancePath + "/reducedMotion", schemaPath: "#/$defs/nonEmpty/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                          return false;
                        }
                      } else {
                        validate83.errors = [{ instancePath: instancePath + "/reducedMotion", schemaPath: "#/$defs/nonEmpty/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                        return false;
                      }
                    }
                    var valid0 = _errs25 === errors;
                  } else {
                    var valid0 = true;
                  }
                  if (valid0) {
                    if (data.testIds !== void 0) {
                      const _errs28 = errors;
                      if (!validate30(data.testIds, { instancePath: instancePath + "/testIds", parentData: data, parentDataProperty: "testIds", rootData, dynamicAnchors })) {
                        vErrors = vErrors === null ? validate30.errors : vErrors.concat(validate30.errors);
                        errors = vErrors.length;
                      }
                      var valid0 = _errs28 === errors;
                    } else {
                      var valid0 = true;
                    }
                  }
                }
              }
            }
          }
        }
      }
    } else {
      validate83.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
      return false;
    }
  }
  validate83.errors = vErrors;
  return errors === 0;
}
validate83.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
function validate82(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate82.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (errors === 0) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
      let missing0;
      if (data.profile === void 0 && (missing0 = "profile") || data.elements === void 0 && (missing0 = "elements")) {
        validate82.errors = [{ instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: missing0 }, message: "must have required property '" + missing0 + "'" }];
        return false;
      } else {
        if (data.profile !== void 0) {
          let data0 = data.profile;
          const _errs2 = errors;
          if (errors === _errs2) {
            if (data0 && typeof data0 == "object" && !Array.isArray(data0)) {
              let missing1;
              if (data0.standard === void 0 && (missing1 = "standard") || data0.version === void 0 && (missing1 = "version") || data0.level === void 0 && (missing1 = "level")) {
                validate82.errors = [{ instancePath: instancePath + "/profile", schemaPath: "#/properties/profile/required", keyword: "required", params: { missingProperty: missing1 }, message: "must have required property '" + missing1 + "'" }];
                return false;
              } else {
                if (data0.standard !== void 0) {
                  const _errs5 = errors;
                  if ("WCAG" !== data0.standard) {
                    validate82.errors = [{ instancePath: instancePath + "/profile/standard", schemaPath: "#/properties/profile/properties/standard/const", keyword: "const", params: { allowedValue: "WCAG" }, message: "must be equal to constant" }];
                    return false;
                  }
                  var valid1 = _errs5 === errors;
                } else {
                  var valid1 = true;
                }
                if (valid1) {
                  if (data0.version !== void 0) {
                    let data2 = data0.version;
                    const _errs6 = errors;
                    if (!(data2 === "2.1" || data2 === "2.2")) {
                      validate82.errors = [{ instancePath: instancePath + "/profile/version", schemaPath: "#/properties/profile/properties/version/enum", keyword: "enum", params: { allowedValues: schema164.properties.profile.properties.version.enum }, message: "must be equal to one of the allowed values" }];
                      return false;
                    }
                    var valid1 = _errs6 === errors;
                  } else {
                    var valid1 = true;
                  }
                  if (valid1) {
                    if (data0.level !== void 0) {
                      let data3 = data0.level;
                      const _errs7 = errors;
                      if (!(data3 === "A" || data3 === "AA" || data3 === "AAA")) {
                        validate82.errors = [{ instancePath: instancePath + "/profile/level", schemaPath: "#/properties/profile/properties/level/enum", keyword: "enum", params: { allowedValues: schema164.properties.profile.properties.level.enum }, message: "must be equal to one of the allowed values" }];
                        return false;
                      }
                      var valid1 = _errs7 === errors;
                    } else {
                      var valid1 = true;
                    }
                    if (valid1) {
                      if (data0.scope !== void 0) {
                        let data4 = data0.scope;
                        const _errs8 = errors;
                        const _errs9 = errors;
                        if (errors === _errs9) {
                          if (typeof data4 === "string") {
                            if (func1(data4) < 1) {
                              validate82.errors = [{ instancePath: instancePath + "/profile/scope", schemaPath: "#/$defs/nonEmpty/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                              return false;
                            }
                          } else {
                            validate82.errors = [{ instancePath: instancePath + "/profile/scope", schemaPath: "#/$defs/nonEmpty/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                            return false;
                          }
                        }
                        var valid1 = _errs8 === errors;
                      } else {
                        var valid1 = true;
                      }
                    }
                  }
                }
              }
            } else {
              validate82.errors = [{ instancePath: instancePath + "/profile", schemaPath: "#/properties/profile/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
              return false;
            }
          }
          var valid0 = _errs2 === errors;
        } else {
          var valid0 = true;
        }
        if (valid0) {
          if (data.elements !== void 0) {
            let data5 = data.elements;
            const _errs11 = errors;
            if (errors === _errs11) {
              if (Array.isArray(data5)) {
                var valid3 = true;
                const len0 = data5.length;
                for (let i0 = 0; i0 < len0; i0++) {
                  const _errs13 = errors;
                  if (!validate83(data5[i0], { instancePath: instancePath + "/elements/" + i0, parentData: data5, parentDataProperty: i0, rootData, dynamicAnchors })) {
                    vErrors = vErrors === null ? validate83.errors : vErrors.concat(validate83.errors);
                    errors = vErrors.length;
                  }
                  var valid3 = _errs13 === errors;
                  if (!valid3) {
                    break;
                  }
                }
              } else {
                validate82.errors = [{ instancePath: instancePath + "/elements", schemaPath: "#/properties/elements/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                return false;
              }
            }
            var valid0 = _errs11 === errors;
          } else {
            var valid0 = true;
          }
          if (valid0) {
            if (data.tests !== void 0) {
              let data7 = data.tests;
              const _errs14 = errors;
              if (errors === _errs14) {
                if (Array.isArray(data7)) {
                  var valid4 = true;
                  const len1 = data7.length;
                  for (let i1 = 0; i1 < len1; i1++) {
                    let data8 = data7[i1];
                    const _errs16 = errors;
                    const _errs17 = errors;
                    if (errors === _errs17) {
                      if (data8 && typeof data8 == "object" && !Array.isArray(data8)) {
                      } else {
                        validate82.errors = [{ instancePath: instancePath + "/tests/" + i1, schemaPath: "#/$defs/extensionObject/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                        return false;
                      }
                    }
                    var valid4 = _errs16 === errors;
                    if (!valid4) {
                      break;
                    }
                  }
                } else {
                  validate82.errors = [{ instancePath: instancePath + "/tests", schemaPath: "#/properties/tests/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                  return false;
                }
              }
              var valid0 = _errs14 === errors;
            } else {
              var valid0 = true;
            }
          }
        }
      }
    } else {
      validate82.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
      return false;
    }
  }
  validate82.errors = vErrors;
  return errors === 0;
}
validate82.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
var schema174 = { "type": "object", "additionalProperties": true, "required": ["transferId", "contractRevision", "sourceRevision", "status", "owners", "requirements", "evidence", "deviations"], "properties": { "transferId": { "$ref": "#/$defs/id" }, "contractRevision": { "$ref": "#/$defs/nonEmpty" }, "sourceRevision": { "$ref": "#/$defs/nonEmpty" }, "targetRevision": { "$ref": "#/$defs/nonEmpty" }, "status": { "enum": ["draft", "review", "accepted", "implementing", "verified", "released", "superseded", "withdrawn", "handoff", "qa"] }, "owners": { "oneOf": [{ "type": "array", "minItems": 1, "items": { "$ref": "#/$defs/owner" } }, { "type": "object", "minProperties": 1, "additionalProperties": { "$ref": "#/$defs/nonEmpty" } }] }, "requirements": { "oneOf": [{ "type": "array", "minItems": 1, "items": { "$ref": "#/$defs/requirement" } }, { "$ref": "#/$defs/refList" }] }, "evidence": { "oneOf": [{ "type": "array", "items": { "$ref": "#/$defs/evidence" } }, { "type": "object", "minProperties": 1, "additionalProperties": { "type": "array", "items": { "$ref": "#/$defs/nonEmpty" } } }] }, "deviations": { "type": "array", "items": { "$ref": "#/$defs/deviation" } } } };
var schema180 = { "type": "object", "additionalProperties": true, "required": ["id", "statement", "status"], "properties": { "id": { "$ref": "#/$defs/id" }, "statement": { "$ref": "#/$defs/nonEmpty" }, "status": { "enum": ["draft", "accepted", "verified", "failed", "waived"] }, "evidence": { "$ref": "#/$defs/refList" } } };
function validate90(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate90.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (errors === 0) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
      let missing0;
      if (data.id === void 0 && (missing0 = "id") || data.statement === void 0 && (missing0 = "statement") || data.status === void 0 && (missing0 = "status")) {
        validate90.errors = [{ instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: missing0 }, message: "must have required property '" + missing0 + "'" }];
        return false;
      } else {
        if (data.id !== void 0) {
          let data0 = data.id;
          const _errs2 = errors;
          const _errs3 = errors;
          if (errors === _errs3) {
            if (typeof data0 === "string") {
              if (!pattern7.test(data0)) {
                validate90.errors = [{ instancePath: instancePath + "/id", schemaPath: "#/$defs/id/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$" }, message: 'must match pattern "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$"' }];
                return false;
              }
            } else {
              validate90.errors = [{ instancePath: instancePath + "/id", schemaPath: "#/$defs/id/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
              return false;
            }
          }
          var valid0 = _errs2 === errors;
        } else {
          var valid0 = true;
        }
        if (valid0) {
          if (data.statement !== void 0) {
            let data1 = data.statement;
            const _errs5 = errors;
            const _errs6 = errors;
            if (errors === _errs6) {
              if (typeof data1 === "string") {
                if (func1(data1) < 1) {
                  validate90.errors = [{ instancePath: instancePath + "/statement", schemaPath: "#/$defs/nonEmpty/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                  return false;
                }
              } else {
                validate90.errors = [{ instancePath: instancePath + "/statement", schemaPath: "#/$defs/nonEmpty/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                return false;
              }
            }
            var valid0 = _errs5 === errors;
          } else {
            var valid0 = true;
          }
          if (valid0) {
            if (data.status !== void 0) {
              let data2 = data.status;
              const _errs8 = errors;
              if (!(data2 === "draft" || data2 === "accepted" || data2 === "verified" || data2 === "failed" || data2 === "waived")) {
                validate90.errors = [{ instancePath: instancePath + "/status", schemaPath: "#/properties/status/enum", keyword: "enum", params: { allowedValues: schema180.properties.status.enum }, message: "must be equal to one of the allowed values" }];
                return false;
              }
              var valid0 = _errs8 === errors;
            } else {
              var valid0 = true;
            }
            if (valid0) {
              if (data.evidence !== void 0) {
                const _errs9 = errors;
                if (!validate30(data.evidence, { instancePath: instancePath + "/evidence", parentData: data, parentDataProperty: "evidence", rootData, dynamicAnchors })) {
                  vErrors = vErrors === null ? validate30.errors : vErrors.concat(validate30.errors);
                  errors = vErrors.length;
                }
                var valid0 = _errs9 === errors;
              } else {
                var valid0 = true;
              }
            }
          }
        }
      }
    } else {
      validate90.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
      return false;
    }
  }
  validate90.errors = vErrors;
  return errors === 0;
}
validate90.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
function validate94(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate94.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (errors === 0) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
      let missing0;
      if (data.id === void 0 && (missing0 = "id") || data.kind === void 0 && (missing0 = "kind") || data.uri === void 0 && (missing0 = "uri")) {
        validate94.errors = [{ instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: missing0 }, message: "must have required property '" + missing0 + "'" }];
        return false;
      } else {
        if (data.id !== void 0) {
          let data0 = data.id;
          const _errs2 = errors;
          const _errs3 = errors;
          if (errors === _errs3) {
            if (typeof data0 === "string") {
              if (!pattern7.test(data0)) {
                validate94.errors = [{ instancePath: instancePath + "/id", schemaPath: "#/$defs/id/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$" }, message: 'must match pattern "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$"' }];
                return false;
              }
            } else {
              validate94.errors = [{ instancePath: instancePath + "/id", schemaPath: "#/$defs/id/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
              return false;
            }
          }
          var valid0 = _errs2 === errors;
        } else {
          var valid0 = true;
        }
        if (valid0) {
          if (data.kind !== void 0) {
            let data1 = data.kind;
            const _errs5 = errors;
            const _errs6 = errors;
            if (errors === _errs6) {
              if (typeof data1 === "string") {
                if (!pattern7.test(data1)) {
                  validate94.errors = [{ instancePath: instancePath + "/kind", schemaPath: "#/$defs/id/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$" }, message: 'must match pattern "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$"' }];
                  return false;
                }
              } else {
                validate94.errors = [{ instancePath: instancePath + "/kind", schemaPath: "#/$defs/id/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                return false;
              }
            }
            var valid0 = _errs5 === errors;
          } else {
            var valid0 = true;
          }
          if (valid0) {
            if (data.uri !== void 0) {
              let data2 = data.uri;
              const _errs8 = errors;
              const _errs9 = errors;
              if (errors === _errs9) {
                if (typeof data2 === "string") {
                  if (func1(data2) < 1) {
                    validate94.errors = [{ instancePath: instancePath + "/uri", schemaPath: "#/$defs/uriReference/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                    return false;
                  }
                } else {
                  validate94.errors = [{ instancePath: instancePath + "/uri", schemaPath: "#/$defs/uriReference/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                  return false;
                }
              }
              var valid0 = _errs8 === errors;
            } else {
              var valid0 = true;
            }
            if (valid0) {
              if (data.createdAt !== void 0) {
                let data3 = data.createdAt;
                const _errs11 = errors;
                if (errors === _errs11) {
                  if (errors === _errs11) {
                    if (typeof data3 === "string") {
                      if (!formats0.validate(data3)) {
                        validate94.errors = [{ instancePath: instancePath + "/createdAt", schemaPath: "#/properties/createdAt/format", keyword: "format", params: { format: "date-time" }, message: 'must match format "date-time"' }];
                        return false;
                      }
                    } else {
                      validate94.errors = [{ instancePath: instancePath + "/createdAt", schemaPath: "#/properties/createdAt/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                      return false;
                    }
                  }
                }
                var valid0 = _errs11 === errors;
              } else {
                var valid0 = true;
              }
            }
          }
        }
      }
    } else {
      validate94.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
      return false;
    }
  }
  validate94.errors = vErrors;
  return errors === 0;
}
validate94.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
var schema188 = { "type": "object", "additionalProperties": true, "required": ["id", "requirement", "scope", "reason", "impact", "mitigation", "owner", "status"], "properties": { "id": { "$ref": "#/$defs/id" }, "requirement": { "$ref": "#/$defs/ref" }, "scope": { "$ref": "#/$defs/refList" }, "reason": { "$ref": "#/$defs/nonEmpty" }, "impact": { "$ref": "#/$defs/nonEmpty" }, "mitigation": { "$ref": "#/$defs/nonEmpty" }, "owner": { "$ref": "#/$defs/owner" }, "status": { "enum": ["proposed", "accepted", "rejected", "resolved", "expired"] }, "reviewDate": { "type": "string", "format": "date" }, "evidence": { "$ref": "#/$defs/refList" } } };
var formats4 = require_formats().fullFormats.date;
function validate96(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate96.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (errors === 0) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
      let missing0;
      if (data.id === void 0 && (missing0 = "id") || data.requirement === void 0 && (missing0 = "requirement") || data.scope === void 0 && (missing0 = "scope") || data.reason === void 0 && (missing0 = "reason") || data.impact === void 0 && (missing0 = "impact") || data.mitigation === void 0 && (missing0 = "mitigation") || data.owner === void 0 && (missing0 = "owner") || data.status === void 0 && (missing0 = "status")) {
        validate96.errors = [{ instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: missing0 }, message: "must have required property '" + missing0 + "'" }];
        return false;
      } else {
        if (data.id !== void 0) {
          let data0 = data.id;
          const _errs2 = errors;
          const _errs3 = errors;
          if (errors === _errs3) {
            if (typeof data0 === "string") {
              if (!pattern7.test(data0)) {
                validate96.errors = [{ instancePath: instancePath + "/id", schemaPath: "#/$defs/id/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$" }, message: 'must match pattern "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$"' }];
                return false;
              }
            } else {
              validate96.errors = [{ instancePath: instancePath + "/id", schemaPath: "#/$defs/id/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
              return false;
            }
          }
          var valid0 = _errs2 === errors;
        } else {
          var valid0 = true;
        }
        if (valid0) {
          if (data.requirement !== void 0) {
            let data1 = data.requirement;
            const _errs5 = errors;
            const _errs6 = errors;
            if (errors === _errs6) {
              if (typeof data1 === "string") {
                if (!pattern7.test(data1)) {
                  validate96.errors = [{ instancePath: instancePath + "/requirement", schemaPath: "#/$defs/ref/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$" }, message: 'must match pattern "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$"' }];
                  return false;
                }
              } else {
                validate96.errors = [{ instancePath: instancePath + "/requirement", schemaPath: "#/$defs/ref/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                return false;
              }
            }
            var valid0 = _errs5 === errors;
          } else {
            var valid0 = true;
          }
          if (valid0) {
            if (data.scope !== void 0) {
              const _errs8 = errors;
              if (!validate30(data.scope, { instancePath: instancePath + "/scope", parentData: data, parentDataProperty: "scope", rootData, dynamicAnchors })) {
                vErrors = vErrors === null ? validate30.errors : vErrors.concat(validate30.errors);
                errors = vErrors.length;
              }
              var valid0 = _errs8 === errors;
            } else {
              var valid0 = true;
            }
            if (valid0) {
              if (data.reason !== void 0) {
                let data3 = data.reason;
                const _errs9 = errors;
                const _errs10 = errors;
                if (errors === _errs10) {
                  if (typeof data3 === "string") {
                    if (func1(data3) < 1) {
                      validate96.errors = [{ instancePath: instancePath + "/reason", schemaPath: "#/$defs/nonEmpty/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                      return false;
                    }
                  } else {
                    validate96.errors = [{ instancePath: instancePath + "/reason", schemaPath: "#/$defs/nonEmpty/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                    return false;
                  }
                }
                var valid0 = _errs9 === errors;
              } else {
                var valid0 = true;
              }
              if (valid0) {
                if (data.impact !== void 0) {
                  let data4 = data.impact;
                  const _errs12 = errors;
                  const _errs13 = errors;
                  if (errors === _errs13) {
                    if (typeof data4 === "string") {
                      if (func1(data4) < 1) {
                        validate96.errors = [{ instancePath: instancePath + "/impact", schemaPath: "#/$defs/nonEmpty/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                        return false;
                      }
                    } else {
                      validate96.errors = [{ instancePath: instancePath + "/impact", schemaPath: "#/$defs/nonEmpty/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                      return false;
                    }
                  }
                  var valid0 = _errs12 === errors;
                } else {
                  var valid0 = true;
                }
                if (valid0) {
                  if (data.mitigation !== void 0) {
                    let data5 = data.mitigation;
                    const _errs15 = errors;
                    const _errs16 = errors;
                    if (errors === _errs16) {
                      if (typeof data5 === "string") {
                        if (func1(data5) < 1) {
                          validate96.errors = [{ instancePath: instancePath + "/mitigation", schemaPath: "#/$defs/nonEmpty/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                          return false;
                        }
                      } else {
                        validate96.errors = [{ instancePath: instancePath + "/mitigation", schemaPath: "#/$defs/nonEmpty/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                        return false;
                      }
                    }
                    var valid0 = _errs15 === errors;
                  } else {
                    var valid0 = true;
                  }
                  if (valid0) {
                    if (data.owner !== void 0) {
                      const _errs18 = errors;
                      if (!validate28(data.owner, { instancePath: instancePath + "/owner", parentData: data, parentDataProperty: "owner", rootData, dynamicAnchors })) {
                        vErrors = vErrors === null ? validate28.errors : vErrors.concat(validate28.errors);
                        errors = vErrors.length;
                      }
                      var valid0 = _errs18 === errors;
                    } else {
                      var valid0 = true;
                    }
                    if (valid0) {
                      if (data.status !== void 0) {
                        let data7 = data.status;
                        const _errs19 = errors;
                        if (!(data7 === "proposed" || data7 === "accepted" || data7 === "rejected" || data7 === "resolved" || data7 === "expired")) {
                          validate96.errors = [{ instancePath: instancePath + "/status", schemaPath: "#/properties/status/enum", keyword: "enum", params: { allowedValues: schema188.properties.status.enum }, message: "must be equal to one of the allowed values" }];
                          return false;
                        }
                        var valid0 = _errs19 === errors;
                      } else {
                        var valid0 = true;
                      }
                      if (valid0) {
                        if (data.reviewDate !== void 0) {
                          let data8 = data.reviewDate;
                          const _errs20 = errors;
                          if (errors === _errs20) {
                            if (errors === _errs20) {
                              if (typeof data8 === "string") {
                                if (!formats4.validate(data8)) {
                                  validate96.errors = [{ instancePath: instancePath + "/reviewDate", schemaPath: "#/properties/reviewDate/format", keyword: "format", params: { format: "date" }, message: 'must match format "date"' }];
                                  return false;
                                }
                              } else {
                                validate96.errors = [{ instancePath: instancePath + "/reviewDate", schemaPath: "#/properties/reviewDate/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                return false;
                              }
                            }
                          }
                          var valid0 = _errs20 === errors;
                        } else {
                          var valid0 = true;
                        }
                        if (valid0) {
                          if (data.evidence !== void 0) {
                            const _errs22 = errors;
                            if (!validate30(data.evidence, { instancePath: instancePath + "/evidence", parentData: data, parentDataProperty: "evidence", rootData, dynamicAnchors })) {
                              vErrors = vErrors === null ? validate30.errors : vErrors.concat(validate30.errors);
                              errors = vErrors.length;
                            }
                            var valid0 = _errs22 === errors;
                          } else {
                            var valid0 = true;
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    } else {
      validate96.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
      return false;
    }
  }
  validate96.errors = vErrors;
  return errors === 0;
}
validate96.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
function validate88(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate88.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (errors === 0) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
      let missing0;
      if (data.transferId === void 0 && (missing0 = "transferId") || data.contractRevision === void 0 && (missing0 = "contractRevision") || data.sourceRevision === void 0 && (missing0 = "sourceRevision") || data.status === void 0 && (missing0 = "status") || data.owners === void 0 && (missing0 = "owners") || data.requirements === void 0 && (missing0 = "requirements") || data.evidence === void 0 && (missing0 = "evidence") || data.deviations === void 0 && (missing0 = "deviations")) {
        validate88.errors = [{ instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: missing0 }, message: "must have required property '" + missing0 + "'" }];
        return false;
      } else {
        if (data.transferId !== void 0) {
          let data0 = data.transferId;
          const _errs2 = errors;
          const _errs3 = errors;
          if (errors === _errs3) {
            if (typeof data0 === "string") {
              if (!pattern7.test(data0)) {
                validate88.errors = [{ instancePath: instancePath + "/transferId", schemaPath: "#/$defs/id/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$" }, message: 'must match pattern "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$"' }];
                return false;
              }
            } else {
              validate88.errors = [{ instancePath: instancePath + "/transferId", schemaPath: "#/$defs/id/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
              return false;
            }
          }
          var valid0 = _errs2 === errors;
        } else {
          var valid0 = true;
        }
        if (valid0) {
          if (data.contractRevision !== void 0) {
            let data1 = data.contractRevision;
            const _errs5 = errors;
            const _errs6 = errors;
            if (errors === _errs6) {
              if (typeof data1 === "string") {
                if (func1(data1) < 1) {
                  validate88.errors = [{ instancePath: instancePath + "/contractRevision", schemaPath: "#/$defs/nonEmpty/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                  return false;
                }
              } else {
                validate88.errors = [{ instancePath: instancePath + "/contractRevision", schemaPath: "#/$defs/nonEmpty/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                return false;
              }
            }
            var valid0 = _errs5 === errors;
          } else {
            var valid0 = true;
          }
          if (valid0) {
            if (data.sourceRevision !== void 0) {
              let data2 = data.sourceRevision;
              const _errs8 = errors;
              const _errs9 = errors;
              if (errors === _errs9) {
                if (typeof data2 === "string") {
                  if (func1(data2) < 1) {
                    validate88.errors = [{ instancePath: instancePath + "/sourceRevision", schemaPath: "#/$defs/nonEmpty/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                    return false;
                  }
                } else {
                  validate88.errors = [{ instancePath: instancePath + "/sourceRevision", schemaPath: "#/$defs/nonEmpty/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                  return false;
                }
              }
              var valid0 = _errs8 === errors;
            } else {
              var valid0 = true;
            }
            if (valid0) {
              if (data.targetRevision !== void 0) {
                let data3 = data.targetRevision;
                const _errs11 = errors;
                const _errs12 = errors;
                if (errors === _errs12) {
                  if (typeof data3 === "string") {
                    if (func1(data3) < 1) {
                      validate88.errors = [{ instancePath: instancePath + "/targetRevision", schemaPath: "#/$defs/nonEmpty/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                      return false;
                    }
                  } else {
                    validate88.errors = [{ instancePath: instancePath + "/targetRevision", schemaPath: "#/$defs/nonEmpty/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                    return false;
                  }
                }
                var valid0 = _errs11 === errors;
              } else {
                var valid0 = true;
              }
              if (valid0) {
                if (data.status !== void 0) {
                  let data4 = data.status;
                  const _errs14 = errors;
                  if (!(data4 === "draft" || data4 === "review" || data4 === "accepted" || data4 === "implementing" || data4 === "verified" || data4 === "released" || data4 === "superseded" || data4 === "withdrawn" || data4 === "handoff" || data4 === "qa")) {
                    validate88.errors = [{ instancePath: instancePath + "/status", schemaPath: "#/properties/status/enum", keyword: "enum", params: { allowedValues: schema174.properties.status.enum }, message: "must be equal to one of the allowed values" }];
                    return false;
                  }
                  var valid0 = _errs14 === errors;
                } else {
                  var valid0 = true;
                }
                if (valid0) {
                  if (data.owners !== void 0) {
                    let data5 = data.owners;
                    const _errs15 = errors;
                    const _errs16 = errors;
                    let valid5 = false;
                    let passing0 = null;
                    const _errs17 = errors;
                    if (errors === _errs17) {
                      if (Array.isArray(data5)) {
                        if (data5.length < 1) {
                          const err0 = { instancePath: instancePath + "/owners", schemaPath: "#/properties/owners/oneOf/0/minItems", keyword: "minItems", params: { limit: 1 }, message: "must NOT have fewer than 1 items" };
                          if (vErrors === null) {
                            vErrors = [err0];
                          } else {
                            vErrors.push(err0);
                          }
                          errors++;
                        } else {
                          var valid6 = true;
                          const len0 = data5.length;
                          for (let i0 = 0; i0 < len0; i0++) {
                            const _errs19 = errors;
                            if (!validate28(data5[i0], { instancePath: instancePath + "/owners/" + i0, parentData: data5, parentDataProperty: i0, rootData, dynamicAnchors })) {
                              vErrors = vErrors === null ? validate28.errors : vErrors.concat(validate28.errors);
                              errors = vErrors.length;
                            }
                            var valid6 = _errs19 === errors;
                            if (!valid6) {
                              break;
                            }
                          }
                        }
                      } else {
                        const err1 = { instancePath: instancePath + "/owners", schemaPath: "#/properties/owners/oneOf/0/type", keyword: "type", params: { type: "array" }, message: "must be array" };
                        if (vErrors === null) {
                          vErrors = [err1];
                        } else {
                          vErrors.push(err1);
                        }
                        errors++;
                      }
                    }
                    var _valid0 = _errs17 === errors;
                    if (_valid0) {
                      valid5 = true;
                      passing0 = 0;
                    }
                    const _errs20 = errors;
                    if (errors === _errs20) {
                      if (data5 && typeof data5 == "object" && !Array.isArray(data5)) {
                        if (Object.keys(data5).length < 1) {
                          const err2 = { instancePath: instancePath + "/owners", schemaPath: "#/properties/owners/oneOf/1/minProperties", keyword: "minProperties", params: { limit: 1 }, message: "must NOT have fewer than 1 properties" };
                          if (vErrors === null) {
                            vErrors = [err2];
                          } else {
                            vErrors.push(err2);
                          }
                          errors++;
                        } else {
                          for (const key0 in data5) {
                            let data7 = data5[key0];
                            const _errs23 = errors;
                            const _errs24 = errors;
                            if (errors === _errs24) {
                              if (typeof data7 === "string") {
                                if (func1(data7) < 1) {
                                  const err3 = { instancePath: instancePath + "/owners/" + key0.replace(/~/g, "~0").replace(/\//g, "~1"), schemaPath: "#/$defs/nonEmpty/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
                                  if (vErrors === null) {
                                    vErrors = [err3];
                                  } else {
                                    vErrors.push(err3);
                                  }
                                  errors++;
                                }
                              } else {
                                const err4 = { instancePath: instancePath + "/owners/" + key0.replace(/~/g, "~0").replace(/\//g, "~1"), schemaPath: "#/$defs/nonEmpty/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                                if (vErrors === null) {
                                  vErrors = [err4];
                                } else {
                                  vErrors.push(err4);
                                }
                                errors++;
                              }
                            }
                            var valid7 = _errs23 === errors;
                            if (!valid7) {
                              break;
                            }
                          }
                        }
                      } else {
                        const err5 = { instancePath: instancePath + "/owners", schemaPath: "#/properties/owners/oneOf/1/type", keyword: "type", params: { type: "object" }, message: "must be object" };
                        if (vErrors === null) {
                          vErrors = [err5];
                        } else {
                          vErrors.push(err5);
                        }
                        errors++;
                      }
                    }
                    var _valid0 = _errs20 === errors;
                    if (_valid0 && valid5) {
                      valid5 = false;
                      passing0 = [passing0, 1];
                    } else {
                      if (_valid0) {
                        valid5 = true;
                        passing0 = 1;
                      }
                    }
                    if (!valid5) {
                      const err6 = { instancePath: instancePath + "/owners", schemaPath: "#/properties/owners/oneOf", keyword: "oneOf", params: { passingSchemas: passing0 }, message: "must match exactly one schema in oneOf" };
                      if (vErrors === null) {
                        vErrors = [err6];
                      } else {
                        vErrors.push(err6);
                      }
                      errors++;
                      validate88.errors = vErrors;
                      return false;
                    } else {
                      errors = _errs16;
                      if (vErrors !== null) {
                        if (_errs16) {
                          vErrors.length = _errs16;
                        } else {
                          vErrors = null;
                        }
                      }
                    }
                    var valid0 = _errs15 === errors;
                  } else {
                    var valid0 = true;
                  }
                  if (valid0) {
                    if (data.requirements !== void 0) {
                      let data8 = data.requirements;
                      const _errs26 = errors;
                      const _errs27 = errors;
                      let valid9 = false;
                      let passing1 = null;
                      const _errs28 = errors;
                      if (errors === _errs28) {
                        if (Array.isArray(data8)) {
                          if (data8.length < 1) {
                            const err7 = { instancePath: instancePath + "/requirements", schemaPath: "#/properties/requirements/oneOf/0/minItems", keyword: "minItems", params: { limit: 1 }, message: "must NOT have fewer than 1 items" };
                            if (vErrors === null) {
                              vErrors = [err7];
                            } else {
                              vErrors.push(err7);
                            }
                            errors++;
                          } else {
                            var valid10 = true;
                            const len1 = data8.length;
                            for (let i1 = 0; i1 < len1; i1++) {
                              const _errs30 = errors;
                              if (!validate90(data8[i1], { instancePath: instancePath + "/requirements/" + i1, parentData: data8, parentDataProperty: i1, rootData, dynamicAnchors })) {
                                vErrors = vErrors === null ? validate90.errors : vErrors.concat(validate90.errors);
                                errors = vErrors.length;
                              }
                              var valid10 = _errs30 === errors;
                              if (!valid10) {
                                break;
                              }
                            }
                          }
                        } else {
                          const err8 = { instancePath: instancePath + "/requirements", schemaPath: "#/properties/requirements/oneOf/0/type", keyword: "type", params: { type: "array" }, message: "must be array" };
                          if (vErrors === null) {
                            vErrors = [err8];
                          } else {
                            vErrors.push(err8);
                          }
                          errors++;
                        }
                      }
                      var _valid1 = _errs28 === errors;
                      if (_valid1) {
                        valid9 = true;
                        passing1 = 0;
                        var items1 = true;
                      }
                      const _errs31 = errors;
                      if (!validate30(data8, { instancePath: instancePath + "/requirements", parentData: data, parentDataProperty: "requirements", rootData, dynamicAnchors })) {
                        vErrors = vErrors === null ? validate30.errors : vErrors.concat(validate30.errors);
                        errors = vErrors.length;
                      }
                      var _valid1 = _errs31 === errors;
                      if (_valid1 && valid9) {
                        valid9 = false;
                        passing1 = [passing1, 1];
                      } else {
                        if (_valid1) {
                          valid9 = true;
                          passing1 = 1;
                          if (items1 !== true) {
                            items1 = true;
                          }
                        }
                      }
                      if (!valid9) {
                        const err9 = { instancePath: instancePath + "/requirements", schemaPath: "#/properties/requirements/oneOf", keyword: "oneOf", params: { passingSchemas: passing1 }, message: "must match exactly one schema in oneOf" };
                        if (vErrors === null) {
                          vErrors = [err9];
                        } else {
                          vErrors.push(err9);
                        }
                        errors++;
                        validate88.errors = vErrors;
                        return false;
                      } else {
                        errors = _errs27;
                        if (vErrors !== null) {
                          if (_errs27) {
                            vErrors.length = _errs27;
                          } else {
                            vErrors = null;
                          }
                        }
                      }
                      var valid0 = _errs26 === errors;
                    } else {
                      var valid0 = true;
                    }
                    if (valid0) {
                      if (data.evidence !== void 0) {
                        let data10 = data.evidence;
                        const _errs32 = errors;
                        const _errs33 = errors;
                        let valid11 = false;
                        let passing2 = null;
                        const _errs34 = errors;
                        if (errors === _errs34) {
                          if (Array.isArray(data10)) {
                            var valid12 = true;
                            const len2 = data10.length;
                            for (let i2 = 0; i2 < len2; i2++) {
                              const _errs36 = errors;
                              if (!validate94(data10[i2], { instancePath: instancePath + "/evidence/" + i2, parentData: data10, parentDataProperty: i2, rootData, dynamicAnchors })) {
                                vErrors = vErrors === null ? validate94.errors : vErrors.concat(validate94.errors);
                                errors = vErrors.length;
                              }
                              var valid12 = _errs36 === errors;
                              if (!valid12) {
                                break;
                              }
                            }
                          } else {
                            const err10 = { instancePath: instancePath + "/evidence", schemaPath: "#/properties/evidence/oneOf/0/type", keyword: "type", params: { type: "array" }, message: "must be array" };
                            if (vErrors === null) {
                              vErrors = [err10];
                            } else {
                              vErrors.push(err10);
                            }
                            errors++;
                          }
                        }
                        var _valid2 = _errs34 === errors;
                        if (_valid2) {
                          valid11 = true;
                          passing2 = 0;
                        }
                        const _errs37 = errors;
                        if (errors === _errs37) {
                          if (data10 && typeof data10 == "object" && !Array.isArray(data10)) {
                            if (Object.keys(data10).length < 1) {
                              const err11 = { instancePath: instancePath + "/evidence", schemaPath: "#/properties/evidence/oneOf/1/minProperties", keyword: "minProperties", params: { limit: 1 }, message: "must NOT have fewer than 1 properties" };
                              if (vErrors === null) {
                                vErrors = [err11];
                              } else {
                                vErrors.push(err11);
                              }
                              errors++;
                            } else {
                              for (const key1 in data10) {
                                let data12 = data10[key1];
                                const _errs40 = errors;
                                if (errors === _errs40) {
                                  if (Array.isArray(data12)) {
                                    var valid14 = true;
                                    const len3 = data12.length;
                                    for (let i3 = 0; i3 < len3; i3++) {
                                      let data13 = data12[i3];
                                      const _errs42 = errors;
                                      const _errs43 = errors;
                                      if (errors === _errs43) {
                                        if (typeof data13 === "string") {
                                          if (func1(data13) < 1) {
                                            const err12 = { instancePath: instancePath + "/evidence/" + key1.replace(/~/g, "~0").replace(/\//g, "~1") + "/" + i3, schemaPath: "#/$defs/nonEmpty/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
                                            if (vErrors === null) {
                                              vErrors = [err12];
                                            } else {
                                              vErrors.push(err12);
                                            }
                                            errors++;
                                          }
                                        } else {
                                          const err13 = { instancePath: instancePath + "/evidence/" + key1.replace(/~/g, "~0").replace(/\//g, "~1") + "/" + i3, schemaPath: "#/$defs/nonEmpty/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                                          if (vErrors === null) {
                                            vErrors = [err13];
                                          } else {
                                            vErrors.push(err13);
                                          }
                                          errors++;
                                        }
                                      }
                                      var valid14 = _errs42 === errors;
                                      if (!valid14) {
                                        break;
                                      }
                                    }
                                  } else {
                                    const err14 = { instancePath: instancePath + "/evidence/" + key1.replace(/~/g, "~0").replace(/\//g, "~1"), schemaPath: "#/properties/evidence/oneOf/1/additionalProperties/type", keyword: "type", params: { type: "array" }, message: "must be array" };
                                    if (vErrors === null) {
                                      vErrors = [err14];
                                    } else {
                                      vErrors.push(err14);
                                    }
                                    errors++;
                                  }
                                }
                                var valid13 = _errs40 === errors;
                                if (!valid13) {
                                  break;
                                }
                              }
                            }
                          } else {
                            const err15 = { instancePath: instancePath + "/evidence", schemaPath: "#/properties/evidence/oneOf/1/type", keyword: "type", params: { type: "object" }, message: "must be object" };
                            if (vErrors === null) {
                              vErrors = [err15];
                            } else {
                              vErrors.push(err15);
                            }
                            errors++;
                          }
                        }
                        var _valid2 = _errs37 === errors;
                        if (_valid2 && valid11) {
                          valid11 = false;
                          passing2 = [passing2, 1];
                        } else {
                          if (_valid2) {
                            valid11 = true;
                            passing2 = 1;
                          }
                        }
                        if (!valid11) {
                          const err16 = { instancePath: instancePath + "/evidence", schemaPath: "#/properties/evidence/oneOf", keyword: "oneOf", params: { passingSchemas: passing2 }, message: "must match exactly one schema in oneOf" };
                          if (vErrors === null) {
                            vErrors = [err16];
                          } else {
                            vErrors.push(err16);
                          }
                          errors++;
                          validate88.errors = vErrors;
                          return false;
                        } else {
                          errors = _errs33;
                          if (vErrors !== null) {
                            if (_errs33) {
                              vErrors.length = _errs33;
                            } else {
                              vErrors = null;
                            }
                          }
                        }
                        var valid0 = _errs32 === errors;
                      } else {
                        var valid0 = true;
                      }
                      if (valid0) {
                        if (data.deviations !== void 0) {
                          let data14 = data.deviations;
                          const _errs45 = errors;
                          if (errors === _errs45) {
                            if (Array.isArray(data14)) {
                              var valid16 = true;
                              const len4 = data14.length;
                              for (let i4 = 0; i4 < len4; i4++) {
                                const _errs47 = errors;
                                if (!validate96(data14[i4], { instancePath: instancePath + "/deviations/" + i4, parentData: data14, parentDataProperty: i4, rootData, dynamicAnchors })) {
                                  vErrors = vErrors === null ? validate96.errors : vErrors.concat(validate96.errors);
                                  errors = vErrors.length;
                                }
                                var valid16 = _errs47 === errors;
                                if (!valid16) {
                                  break;
                                }
                              }
                            } else {
                              validate88.errors = [{ instancePath: instancePath + "/deviations", schemaPath: "#/properties/deviations/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                              return false;
                            }
                          }
                          var valid0 = _errs45 === errors;
                        } else {
                          var valid0 = true;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    } else {
      validate88.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
      return false;
    }
  }
  validate88.errors = vErrors;
  return errors === 0;
}
validate88.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
var schema194 = { "type": "object", "additionalProperties": true, "required": ["id", "requirement", "scope", "reason", "impact", "mitigation", "owner", "status"], "properties": { "id": { "$ref": "#/$defs/id" }, "requirement": { "$ref": "#/$defs/ref" }, "scope": { "$ref": "#/$defs/refList" }, "reason": { "$ref": "#/$defs/nonEmpty" }, "impact": { "$ref": "#/$defs/nonEmpty" }, "mitigation": { "$ref": "#/$defs/nonEmpty" }, "owner": { "$ref": "#/$defs/owner" }, "status": { "enum": ["proposed", "accepted", "rejected", "resolved", "expired"] }, "reviewDate": { "type": "string", "format": "date" }, "evidence": { "$ref": "#/$defs/refList" } } };
function validate102(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate102.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (errors === 0) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
      let missing0;
      if (data.id === void 0 && (missing0 = "id") || data.requirement === void 0 && (missing0 = "requirement") || data.scope === void 0 && (missing0 = "scope") || data.reason === void 0 && (missing0 = "reason") || data.impact === void 0 && (missing0 = "impact") || data.mitigation === void 0 && (missing0 = "mitigation") || data.owner === void 0 && (missing0 = "owner") || data.status === void 0 && (missing0 = "status")) {
        validate102.errors = [{ instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: missing0 }, message: "must have required property '" + missing0 + "'" }];
        return false;
      } else {
        if (data.id !== void 0) {
          let data0 = data.id;
          const _errs2 = errors;
          const _errs3 = errors;
          if (errors === _errs3) {
            if (typeof data0 === "string") {
              if (!pattern7.test(data0)) {
                validate102.errors = [{ instancePath: instancePath + "/id", schemaPath: "#/$defs/id/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$" }, message: 'must match pattern "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$"' }];
                return false;
              }
            } else {
              validate102.errors = [{ instancePath: instancePath + "/id", schemaPath: "#/$defs/id/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
              return false;
            }
          }
          var valid0 = _errs2 === errors;
        } else {
          var valid0 = true;
        }
        if (valid0) {
          if (data.requirement !== void 0) {
            let data1 = data.requirement;
            const _errs5 = errors;
            const _errs6 = errors;
            if (errors === _errs6) {
              if (typeof data1 === "string") {
                if (!pattern7.test(data1)) {
                  validate102.errors = [{ instancePath: instancePath + "/requirement", schemaPath: "#/$defs/ref/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$" }, message: 'must match pattern "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$"' }];
                  return false;
                }
              } else {
                validate102.errors = [{ instancePath: instancePath + "/requirement", schemaPath: "#/$defs/ref/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                return false;
              }
            }
            var valid0 = _errs5 === errors;
          } else {
            var valid0 = true;
          }
          if (valid0) {
            if (data.scope !== void 0) {
              const _errs8 = errors;
              if (!validate30(data.scope, { instancePath: instancePath + "/scope", parentData: data, parentDataProperty: "scope", rootData, dynamicAnchors })) {
                vErrors = vErrors === null ? validate30.errors : vErrors.concat(validate30.errors);
                errors = vErrors.length;
              }
              var valid0 = _errs8 === errors;
            } else {
              var valid0 = true;
            }
            if (valid0) {
              if (data.reason !== void 0) {
                let data3 = data.reason;
                const _errs9 = errors;
                const _errs10 = errors;
                if (errors === _errs10) {
                  if (typeof data3 === "string") {
                    if (func1(data3) < 1) {
                      validate102.errors = [{ instancePath: instancePath + "/reason", schemaPath: "#/$defs/nonEmpty/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                      return false;
                    }
                  } else {
                    validate102.errors = [{ instancePath: instancePath + "/reason", schemaPath: "#/$defs/nonEmpty/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                    return false;
                  }
                }
                var valid0 = _errs9 === errors;
              } else {
                var valid0 = true;
              }
              if (valid0) {
                if (data.impact !== void 0) {
                  let data4 = data.impact;
                  const _errs12 = errors;
                  const _errs13 = errors;
                  if (errors === _errs13) {
                    if (typeof data4 === "string") {
                      if (func1(data4) < 1) {
                        validate102.errors = [{ instancePath: instancePath + "/impact", schemaPath: "#/$defs/nonEmpty/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                        return false;
                      }
                    } else {
                      validate102.errors = [{ instancePath: instancePath + "/impact", schemaPath: "#/$defs/nonEmpty/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                      return false;
                    }
                  }
                  var valid0 = _errs12 === errors;
                } else {
                  var valid0 = true;
                }
                if (valid0) {
                  if (data.mitigation !== void 0) {
                    let data5 = data.mitigation;
                    const _errs15 = errors;
                    const _errs16 = errors;
                    if (errors === _errs16) {
                      if (typeof data5 === "string") {
                        if (func1(data5) < 1) {
                          validate102.errors = [{ instancePath: instancePath + "/mitigation", schemaPath: "#/$defs/nonEmpty/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                          return false;
                        }
                      } else {
                        validate102.errors = [{ instancePath: instancePath + "/mitigation", schemaPath: "#/$defs/nonEmpty/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                        return false;
                      }
                    }
                    var valid0 = _errs15 === errors;
                  } else {
                    var valid0 = true;
                  }
                  if (valid0) {
                    if (data.owner !== void 0) {
                      const _errs18 = errors;
                      if (!validate28(data.owner, { instancePath: instancePath + "/owner", parentData: data, parentDataProperty: "owner", rootData, dynamicAnchors })) {
                        vErrors = vErrors === null ? validate28.errors : vErrors.concat(validate28.errors);
                        errors = vErrors.length;
                      }
                      var valid0 = _errs18 === errors;
                    } else {
                      var valid0 = true;
                    }
                    if (valid0) {
                      if (data.status !== void 0) {
                        let data7 = data.status;
                        const _errs19 = errors;
                        if (!(data7 === "proposed" || data7 === "accepted" || data7 === "rejected" || data7 === "resolved" || data7 === "expired")) {
                          validate102.errors = [{ instancePath: instancePath + "/status", schemaPath: "#/properties/status/enum", keyword: "enum", params: { allowedValues: schema194.properties.status.enum }, message: "must be equal to one of the allowed values" }];
                          return false;
                        }
                        var valid0 = _errs19 === errors;
                      } else {
                        var valid0 = true;
                      }
                      if (valid0) {
                        if (data.reviewDate !== void 0) {
                          let data8 = data.reviewDate;
                          const _errs20 = errors;
                          if (errors === _errs20) {
                            if (errors === _errs20) {
                              if (typeof data8 === "string") {
                                if (!formats4.validate(data8)) {
                                  validate102.errors = [{ instancePath: instancePath + "/reviewDate", schemaPath: "#/properties/reviewDate/format", keyword: "format", params: { format: "date" }, message: 'must match format "date"' }];
                                  return false;
                                }
                              } else {
                                validate102.errors = [{ instancePath: instancePath + "/reviewDate", schemaPath: "#/properties/reviewDate/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                return false;
                              }
                            }
                          }
                          var valid0 = _errs20 === errors;
                        } else {
                          var valid0 = true;
                        }
                        if (valid0) {
                          if (data.evidence !== void 0) {
                            const _errs22 = errors;
                            if (!validate30(data.evidence, { instancePath: instancePath + "/evidence", parentData: data, parentDataProperty: "evidence", rootData, dynamicAnchors })) {
                              vErrors = vErrors === null ? validate30.errors : vErrors.concat(validate30.errors);
                              errors = vErrors.length;
                            }
                            var valid0 = _errs22 === errors;
                          } else {
                            var valid0 = true;
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    } else {
      validate102.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
      return false;
    }
  }
  validate102.errors = vErrors;
  return errors === 0;
}
validate102.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
var schema200 = { "type": "object", "additionalProperties": true, "required": ["id", "question", "owner", "blocking", "status", "fallback"], "properties": { "id": { "$ref": "#/$defs/id" }, "scopeRef": { "$ref": "#/$defs/ref" }, "question": { "$ref": "#/$defs/nonEmpty" }, "owner": { "$ref": "#/$defs/owner" }, "blocking": { "type": "boolean" }, "status": { "enum": ["open", "investigating", "answered", "deferred", "closed"] }, "due": { "type": "string", "format": "date" }, "reviewAt": { "$ref": "#/$defs/nonEmpty" }, "fallback": { "$ref": "#/$defs/nonEmpty" }, "decisionLink": { "$ref": "#/$defs/uriReference" }, "scope": { "$ref": "#/$defs/refList" } }, "allOf": [{ "if": { "properties": { "status": { "enum": ["open", "investigating", "deferred"] } }, "required": ["status"] }, "then": { "anyOf": [{ "required": ["due"] }, { "required": ["reviewAt"] }] } }, { "if": { "properties": { "status": { "enum": ["answered", "closed"] } }, "required": ["status"] }, "then": { "required": ["decisionLink"] } }], "anyOf": [{ "required": ["scopeRef"] }, { "required": ["scope"] }] };
function validate107(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate107.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  const _errs1 = errors;
  let valid0 = false;
  const _errs2 = errors;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    let missing0;
    if (data.scopeRef === void 0 && (missing0 = "scopeRef")) {
      const err0 = { instancePath, schemaPath: "#/anyOf/0/required", keyword: "required", params: { missingProperty: missing0 }, message: "must have required property '" + missing0 + "'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
  }
  var _valid0 = _errs2 === errors;
  valid0 = valid0 || _valid0;
  const _errs3 = errors;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    let missing1;
    if (data.scope === void 0 && (missing1 = "scope")) {
      const err1 = { instancePath, schemaPath: "#/anyOf/1/required", keyword: "required", params: { missingProperty: missing1 }, message: "must have required property '" + missing1 + "'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
  }
  var _valid0 = _errs3 === errors;
  valid0 = valid0 || _valid0;
  if (!valid0) {
    const err2 = { instancePath, schemaPath: "#/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
    if (vErrors === null) {
      vErrors = [err2];
    } else {
      vErrors.push(err2);
    }
    errors++;
    validate107.errors = vErrors;
    return false;
  } else {
    errors = _errs1;
    if (vErrors !== null) {
      if (_errs1) {
        vErrors.length = _errs1;
      } else {
        vErrors = null;
      }
    }
    const _errs4 = errors;
    const _errs5 = errors;
    let valid2 = true;
    const _errs6 = errors;
    if (data && typeof data == "object" && !Array.isArray(data)) {
      let missing2;
      if (data.status === void 0 && (missing2 = "status")) {
        const err3 = {};
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      } else {
        if (data.status !== void 0) {
          let data0 = data.status;
          if (!(data0 === "open" || data0 === "investigating" || data0 === "deferred")) {
            const err4 = {};
            if (vErrors === null) {
              vErrors = [err4];
            } else {
              vErrors.push(err4);
            }
            errors++;
          }
        }
      }
    }
    var _valid1 = _errs6 === errors;
    errors = _errs5;
    if (vErrors !== null) {
      if (_errs5) {
        vErrors.length = _errs5;
      } else {
        vErrors = null;
      }
    }
    if (_valid1) {
      const _errs8 = errors;
      const _errs9 = errors;
      let valid4 = false;
      const _errs10 = errors;
      if (data && typeof data == "object" && !Array.isArray(data)) {
        let missing3;
        if (data.due === void 0 && (missing3 = "due")) {
          const err5 = { instancePath, schemaPath: "#/allOf/0/then/anyOf/0/required", keyword: "required", params: { missingProperty: missing3 }, message: "must have required property '" + missing3 + "'" };
          if (vErrors === null) {
            vErrors = [err5];
          } else {
            vErrors.push(err5);
          }
          errors++;
        }
      }
      var _valid2 = _errs10 === errors;
      valid4 = valid4 || _valid2;
      const _errs11 = errors;
      if (data && typeof data == "object" && !Array.isArray(data)) {
        let missing4;
        if (data.reviewAt === void 0 && (missing4 = "reviewAt")) {
          const err6 = { instancePath, schemaPath: "#/allOf/0/then/anyOf/1/required", keyword: "required", params: { missingProperty: missing4 }, message: "must have required property '" + missing4 + "'" };
          if (vErrors === null) {
            vErrors = [err6];
          } else {
            vErrors.push(err6);
          }
          errors++;
        }
      }
      var _valid2 = _errs11 === errors;
      valid4 = valid4 || _valid2;
      if (!valid4) {
        const err7 = { instancePath, schemaPath: "#/allOf/0/then/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
        if (vErrors === null) {
          vErrors = [err7];
        } else {
          vErrors.push(err7);
        }
        errors++;
        validate107.errors = vErrors;
        return false;
      } else {
        errors = _errs9;
        if (vErrors !== null) {
          if (_errs9) {
            vErrors.length = _errs9;
          } else {
            vErrors = null;
          }
        }
      }
      var _valid1 = _errs8 === errors;
      valid2 = _valid1;
    }
    if (!valid2) {
      const err8 = { instancePath, schemaPath: "#/allOf/0/if", keyword: "if", params: { failingKeyword: "then" }, message: 'must match "then" schema' };
      if (vErrors === null) {
        vErrors = [err8];
      } else {
        vErrors.push(err8);
      }
      errors++;
      validate107.errors = vErrors;
      return false;
    }
    var valid1 = _errs4 === errors;
    if (valid1) {
      const _errs12 = errors;
      const _errs13 = errors;
      let valid5 = true;
      const _errs14 = errors;
      if (data && typeof data == "object" && !Array.isArray(data)) {
        let missing5;
        if (data.status === void 0 && (missing5 = "status")) {
          const err9 = {};
          if (vErrors === null) {
            vErrors = [err9];
          } else {
            vErrors.push(err9);
          }
          errors++;
        } else {
          if (data.status !== void 0) {
            let data1 = data.status;
            if (!(data1 === "answered" || data1 === "closed")) {
              const err10 = {};
              if (vErrors === null) {
                vErrors = [err10];
              } else {
                vErrors.push(err10);
              }
              errors++;
            }
          }
        }
      }
      var _valid3 = _errs14 === errors;
      errors = _errs13;
      if (vErrors !== null) {
        if (_errs13) {
          vErrors.length = _errs13;
        } else {
          vErrors = null;
        }
      }
      if (_valid3) {
        const _errs16 = errors;
        if (data && typeof data == "object" && !Array.isArray(data)) {
          let missing6;
          if (data.decisionLink === void 0 && (missing6 = "decisionLink")) {
            validate107.errors = [{ instancePath, schemaPath: "#/allOf/1/then/required", keyword: "required", params: { missingProperty: missing6 }, message: "must have required property '" + missing6 + "'" }];
            return false;
          }
        }
        var _valid3 = _errs16 === errors;
        valid5 = _valid3;
      }
      if (!valid5) {
        const err11 = { instancePath, schemaPath: "#/allOf/1/if", keyword: "if", params: { failingKeyword: "then" }, message: 'must match "then" schema' };
        if (vErrors === null) {
          vErrors = [err11];
        } else {
          vErrors.push(err11);
        }
        errors++;
        validate107.errors = vErrors;
        return false;
      }
      var valid1 = _errs12 === errors;
    }
  }
  if (errors === 0) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
      let missing7;
      if (data.id === void 0 && (missing7 = "id") || data.question === void 0 && (missing7 = "question") || data.owner === void 0 && (missing7 = "owner") || data.blocking === void 0 && (missing7 = "blocking") || data.status === void 0 && (missing7 = "status") || data.fallback === void 0 && (missing7 = "fallback")) {
        validate107.errors = [{ instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: missing7 }, message: "must have required property '" + missing7 + "'" }];
        return false;
      } else {
        if (data.id !== void 0) {
          let data2 = data.id;
          const _errs18 = errors;
          const _errs19 = errors;
          if (errors === _errs19) {
            if (typeof data2 === "string") {
              if (!pattern7.test(data2)) {
                validate107.errors = [{ instancePath: instancePath + "/id", schemaPath: "#/$defs/id/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$" }, message: 'must match pattern "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$"' }];
                return false;
              }
            } else {
              validate107.errors = [{ instancePath: instancePath + "/id", schemaPath: "#/$defs/id/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
              return false;
            }
          }
          var valid7 = _errs18 === errors;
        } else {
          var valid7 = true;
        }
        if (valid7) {
          if (data.scopeRef !== void 0) {
            let data3 = data.scopeRef;
            const _errs21 = errors;
            const _errs22 = errors;
            if (errors === _errs22) {
              if (typeof data3 === "string") {
                if (!pattern7.test(data3)) {
                  validate107.errors = [{ instancePath: instancePath + "/scopeRef", schemaPath: "#/$defs/ref/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$" }, message: 'must match pattern "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$"' }];
                  return false;
                }
              } else {
                validate107.errors = [{ instancePath: instancePath + "/scopeRef", schemaPath: "#/$defs/ref/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                return false;
              }
            }
            var valid7 = _errs21 === errors;
          } else {
            var valid7 = true;
          }
          if (valid7) {
            if (data.question !== void 0) {
              let data4 = data.question;
              const _errs24 = errors;
              const _errs25 = errors;
              if (errors === _errs25) {
                if (typeof data4 === "string") {
                  if (func1(data4) < 1) {
                    validate107.errors = [{ instancePath: instancePath + "/question", schemaPath: "#/$defs/nonEmpty/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                    return false;
                  }
                } else {
                  validate107.errors = [{ instancePath: instancePath + "/question", schemaPath: "#/$defs/nonEmpty/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                  return false;
                }
              }
              var valid7 = _errs24 === errors;
            } else {
              var valid7 = true;
            }
            if (valid7) {
              if (data.owner !== void 0) {
                const _errs27 = errors;
                if (!validate28(data.owner, { instancePath: instancePath + "/owner", parentData: data, parentDataProperty: "owner", rootData, dynamicAnchors })) {
                  vErrors = vErrors === null ? validate28.errors : vErrors.concat(validate28.errors);
                  errors = vErrors.length;
                }
                var valid7 = _errs27 === errors;
              } else {
                var valid7 = true;
              }
              if (valid7) {
                if (data.blocking !== void 0) {
                  const _errs28 = errors;
                  if (typeof data.blocking !== "boolean") {
                    validate107.errors = [{ instancePath: instancePath + "/blocking", schemaPath: "#/properties/blocking/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" }];
                    return false;
                  }
                  var valid7 = _errs28 === errors;
                } else {
                  var valid7 = true;
                }
                if (valid7) {
                  if (data.status !== void 0) {
                    let data7 = data.status;
                    const _errs30 = errors;
                    if (!(data7 === "open" || data7 === "investigating" || data7 === "answered" || data7 === "deferred" || data7 === "closed")) {
                      validate107.errors = [{ instancePath: instancePath + "/status", schemaPath: "#/properties/status/enum", keyword: "enum", params: { allowedValues: schema200.properties.status.enum }, message: "must be equal to one of the allowed values" }];
                      return false;
                    }
                    var valid7 = _errs30 === errors;
                  } else {
                    var valid7 = true;
                  }
                  if (valid7) {
                    if (data.due !== void 0) {
                      let data8 = data.due;
                      const _errs31 = errors;
                      if (errors === _errs31) {
                        if (errors === _errs31) {
                          if (typeof data8 === "string") {
                            if (!formats4.validate(data8)) {
                              validate107.errors = [{ instancePath: instancePath + "/due", schemaPath: "#/properties/due/format", keyword: "format", params: { format: "date" }, message: 'must match format "date"' }];
                              return false;
                            }
                          } else {
                            validate107.errors = [{ instancePath: instancePath + "/due", schemaPath: "#/properties/due/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                            return false;
                          }
                        }
                      }
                      var valid7 = _errs31 === errors;
                    } else {
                      var valid7 = true;
                    }
                    if (valid7) {
                      if (data.reviewAt !== void 0) {
                        let data9 = data.reviewAt;
                        const _errs33 = errors;
                        const _errs34 = errors;
                        if (errors === _errs34) {
                          if (typeof data9 === "string") {
                            if (func1(data9) < 1) {
                              validate107.errors = [{ instancePath: instancePath + "/reviewAt", schemaPath: "#/$defs/nonEmpty/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                              return false;
                            }
                          } else {
                            validate107.errors = [{ instancePath: instancePath + "/reviewAt", schemaPath: "#/$defs/nonEmpty/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                            return false;
                          }
                        }
                        var valid7 = _errs33 === errors;
                      } else {
                        var valid7 = true;
                      }
                      if (valid7) {
                        if (data.fallback !== void 0) {
                          let data10 = data.fallback;
                          const _errs36 = errors;
                          const _errs37 = errors;
                          if (errors === _errs37) {
                            if (typeof data10 === "string") {
                              if (func1(data10) < 1) {
                                validate107.errors = [{ instancePath: instancePath + "/fallback", schemaPath: "#/$defs/nonEmpty/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                                return false;
                              }
                            } else {
                              validate107.errors = [{ instancePath: instancePath + "/fallback", schemaPath: "#/$defs/nonEmpty/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                              return false;
                            }
                          }
                          var valid7 = _errs36 === errors;
                        } else {
                          var valid7 = true;
                        }
                        if (valid7) {
                          if (data.decisionLink !== void 0) {
                            let data11 = data.decisionLink;
                            const _errs39 = errors;
                            const _errs40 = errors;
                            if (errors === _errs40) {
                              if (typeof data11 === "string") {
                                if (func1(data11) < 1) {
                                  validate107.errors = [{ instancePath: instancePath + "/decisionLink", schemaPath: "#/$defs/uriReference/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                                  return false;
                                }
                              } else {
                                validate107.errors = [{ instancePath: instancePath + "/decisionLink", schemaPath: "#/$defs/uriReference/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                return false;
                              }
                            }
                            var valid7 = _errs39 === errors;
                          } else {
                            var valid7 = true;
                          }
                          if (valid7) {
                            if (data.scope !== void 0) {
                              const _errs42 = errors;
                              if (!validate30(data.scope, { instancePath: instancePath + "/scope", parentData: data, parentDataProperty: "scope", rootData, dynamicAnchors })) {
                                vErrors = vErrors === null ? validate30.errors : vErrors.concat(validate30.errors);
                                errors = vErrors.length;
                              }
                              var valid7 = _errs42 === errors;
                            } else {
                              var valid7 = true;
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    } else {
      validate107.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
      return false;
    }
  }
  validate107.errors = vErrors;
  return errors === 0;
}
validate107.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
var schema208 = { "type": "object", "additionalProperties": true, "required": ["id", "target"], "properties": { "id": { "$ref": "#/$defs/id" }, "target": { "type": "object", "additionalProperties": true, "required": ["platform"], "properties": { "platform": { "$ref": "#/$defs/id" }, "runtime": { "$ref": "#/$defs/nonEmpty" } } }, "essentialExperience": { "type": "array", "uniqueItems": true, "items": { "$ref": "#/$defs/ref" } }, "supports": { "type": "array", "uniqueItems": true, "items": { "$ref": "#/$defs/id" } }, "unsupported": { "type": "array", "items": { "type": "object", "additionalProperties": true, "required": ["capability", "fallback"], "properties": { "capability": { "$ref": "#/$defs/id" }, "fallback": { "$ref": "#/$defs/nonEmpty" }, "owner": { "$ref": "#/$defs/owner" } } } }, "assets": { "type": "array", "items": { "type": "object", "additionalProperties": true, "required": ["element"], "properties": { "element": { "$ref": "#/$defs/ref" }, "width": { "type": "number", "exclusiveMinimum": 0 }, "height": { "type": "number", "exclusiveMinimum": 0 }, "formats": { "type": "array", "uniqueItems": true, "items": { "$ref": "#/$defs/id" } }, "quality": { "oneOf": [{ "type": "number", "minimum": 0, "maximum": 100 }, { "$ref": "#/$defs/nonEmpty" }] }, "artDirection": { "$ref": "#/$defs/nonEmpty" }, "loading": { "type": "object", "additionalProperties": true, "properties": { "priority": { "$ref": "#/$defs/id" }, "poster": { "oneOf": [{ "$ref": "#/$defs/uriReference" }, { "type": "null" }] }, "strategy": { "$ref": "#/$defs/nonEmpty" } } } } } }, "data": { "type": "object", "additionalProperties": true, "properties": { "expectedItems": { "type": "integer", "minimum": 0 }, "maximumItems": { "type": "integer", "minimum": 0 }, "virtualizeAfter": { "type": "integer", "minimum": 1 }, "strategy": { "$ref": "#/$defs/nonEmpty" } } }, "conditions": { "type": "array", "uniqueItems": true, "items": { "enum": ["low-bandwidth", "offline", "data-saver", "low-power"] } }, "budgets": { "type": "array", "items": { "type": "object", "additionalProperties": true, "required": ["metric", "limit", "owner", "measureAt"], "properties": { "metric": { "$ref": "#/$defs/id" }, "limit": { "type": "number", "exclusiveMinimum": 0 }, "unit": { "$ref": "#/$defs/nonEmpty" }, "owner": { "$ref": "#/$defs/owner" }, "measureAt": { "$ref": "#/$defs/nonEmpty" } } } } } };
function validate112(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate112.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (errors === 0) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
      let missing0;
      if (data.id === void 0 && (missing0 = "id") || data.target === void 0 && (missing0 = "target")) {
        validate112.errors = [{ instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: missing0 }, message: "must have required property '" + missing0 + "'" }];
        return false;
      } else {
        if (data.id !== void 0) {
          let data0 = data.id;
          const _errs2 = errors;
          const _errs3 = errors;
          if (errors === _errs3) {
            if (typeof data0 === "string") {
              if (!pattern7.test(data0)) {
                validate112.errors = [{ instancePath: instancePath + "/id", schemaPath: "#/$defs/id/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$" }, message: 'must match pattern "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$"' }];
                return false;
              }
            } else {
              validate112.errors = [{ instancePath: instancePath + "/id", schemaPath: "#/$defs/id/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
              return false;
            }
          }
          var valid0 = _errs2 === errors;
        } else {
          var valid0 = true;
        }
        if (valid0) {
          if (data.target !== void 0) {
            let data1 = data.target;
            const _errs5 = errors;
            if (errors === _errs5) {
              if (data1 && typeof data1 == "object" && !Array.isArray(data1)) {
                let missing1;
                if (data1.platform === void 0 && (missing1 = "platform")) {
                  validate112.errors = [{ instancePath: instancePath + "/target", schemaPath: "#/properties/target/required", keyword: "required", params: { missingProperty: missing1 }, message: "must have required property '" + missing1 + "'" }];
                  return false;
                } else {
                  if (data1.platform !== void 0) {
                    let data2 = data1.platform;
                    const _errs8 = errors;
                    const _errs9 = errors;
                    if (errors === _errs9) {
                      if (typeof data2 === "string") {
                        if (!pattern7.test(data2)) {
                          validate112.errors = [{ instancePath: instancePath + "/target/platform", schemaPath: "#/$defs/id/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$" }, message: 'must match pattern "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$"' }];
                          return false;
                        }
                      } else {
                        validate112.errors = [{ instancePath: instancePath + "/target/platform", schemaPath: "#/$defs/id/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                        return false;
                      }
                    }
                    var valid2 = _errs8 === errors;
                  } else {
                    var valid2 = true;
                  }
                  if (valid2) {
                    if (data1.runtime !== void 0) {
                      let data3 = data1.runtime;
                      const _errs11 = errors;
                      const _errs12 = errors;
                      if (errors === _errs12) {
                        if (typeof data3 === "string") {
                          if (func1(data3) < 1) {
                            validate112.errors = [{ instancePath: instancePath + "/target/runtime", schemaPath: "#/$defs/nonEmpty/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                            return false;
                          }
                        } else {
                          validate112.errors = [{ instancePath: instancePath + "/target/runtime", schemaPath: "#/$defs/nonEmpty/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                          return false;
                        }
                      }
                      var valid2 = _errs11 === errors;
                    } else {
                      var valid2 = true;
                    }
                  }
                }
              } else {
                validate112.errors = [{ instancePath: instancePath + "/target", schemaPath: "#/properties/target/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                return false;
              }
            }
            var valid0 = _errs5 === errors;
          } else {
            var valid0 = true;
          }
          if (valid0) {
            if (data.essentialExperience !== void 0) {
              let data4 = data.essentialExperience;
              const _errs14 = errors;
              if (errors === _errs14) {
                if (Array.isArray(data4)) {
                  var valid5 = true;
                  const len0 = data4.length;
                  for (let i0 = 0; i0 < len0; i0++) {
                    let data5 = data4[i0];
                    const _errs16 = errors;
                    const _errs17 = errors;
                    if (errors === _errs17) {
                      if (typeof data5 === "string") {
                        if (!pattern7.test(data5)) {
                          validate112.errors = [{ instancePath: instancePath + "/essentialExperience/" + i0, schemaPath: "#/$defs/ref/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$" }, message: 'must match pattern "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$"' }];
                          return false;
                        }
                      } else {
                        validate112.errors = [{ instancePath: instancePath + "/essentialExperience/" + i0, schemaPath: "#/$defs/ref/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                        return false;
                      }
                    }
                    var valid5 = _errs16 === errors;
                    if (!valid5) {
                      break;
                    }
                  }
                  if (valid5) {
                    let i1 = data4.length;
                    let j0;
                    if (i1 > 1) {
                      outer0:
                        for (; i1--; ) {
                          for (j0 = i1; j0--; ) {
                            if (func0(data4[i1], data4[j0])) {
                              validate112.errors = [{ instancePath: instancePath + "/essentialExperience", schemaPath: "#/properties/essentialExperience/uniqueItems", keyword: "uniqueItems", params: { i: i1, j: j0 }, message: "must NOT have duplicate items (items ## " + j0 + " and " + i1 + " are identical)" }];
                              return false;
                              break outer0;
                            }
                          }
                        }
                    }
                  }
                } else {
                  validate112.errors = [{ instancePath: instancePath + "/essentialExperience", schemaPath: "#/properties/essentialExperience/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                  return false;
                }
              }
              var valid0 = _errs14 === errors;
            } else {
              var valid0 = true;
            }
            if (valid0) {
              if (data.supports !== void 0) {
                let data6 = data.supports;
                const _errs19 = errors;
                if (errors === _errs19) {
                  if (Array.isArray(data6)) {
                    var valid8 = true;
                    const len1 = data6.length;
                    for (let i2 = 0; i2 < len1; i2++) {
                      let data7 = data6[i2];
                      const _errs21 = errors;
                      const _errs22 = errors;
                      if (errors === _errs22) {
                        if (typeof data7 === "string") {
                          if (!pattern7.test(data7)) {
                            validate112.errors = [{ instancePath: instancePath + "/supports/" + i2, schemaPath: "#/$defs/id/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$" }, message: 'must match pattern "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$"' }];
                            return false;
                          }
                        } else {
                          validate112.errors = [{ instancePath: instancePath + "/supports/" + i2, schemaPath: "#/$defs/id/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                          return false;
                        }
                      }
                      var valid8 = _errs21 === errors;
                      if (!valid8) {
                        break;
                      }
                    }
                    if (valid8) {
                      let i3 = data6.length;
                      let j1;
                      if (i3 > 1) {
                        outer1:
                          for (; i3--; ) {
                            for (j1 = i3; j1--; ) {
                              if (func0(data6[i3], data6[j1])) {
                                validate112.errors = [{ instancePath: instancePath + "/supports", schemaPath: "#/properties/supports/uniqueItems", keyword: "uniqueItems", params: { i: i3, j: j1 }, message: "must NOT have duplicate items (items ## " + j1 + " and " + i3 + " are identical)" }];
                                return false;
                                break outer1;
                              }
                            }
                          }
                      }
                    }
                  } else {
                    validate112.errors = [{ instancePath: instancePath + "/supports", schemaPath: "#/properties/supports/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                    return false;
                  }
                }
                var valid0 = _errs19 === errors;
              } else {
                var valid0 = true;
              }
              if (valid0) {
                if (data.unsupported !== void 0) {
                  let data8 = data.unsupported;
                  const _errs24 = errors;
                  if (errors === _errs24) {
                    if (Array.isArray(data8)) {
                      var valid11 = true;
                      const len2 = data8.length;
                      for (let i4 = 0; i4 < len2; i4++) {
                        let data9 = data8[i4];
                        const _errs26 = errors;
                        if (errors === _errs26) {
                          if (data9 && typeof data9 == "object" && !Array.isArray(data9)) {
                            let missing2;
                            if (data9.capability === void 0 && (missing2 = "capability") || data9.fallback === void 0 && (missing2 = "fallback")) {
                              validate112.errors = [{ instancePath: instancePath + "/unsupported/" + i4, schemaPath: "#/properties/unsupported/items/required", keyword: "required", params: { missingProperty: missing2 }, message: "must have required property '" + missing2 + "'" }];
                              return false;
                            } else {
                              if (data9.capability !== void 0) {
                                let data10 = data9.capability;
                                const _errs29 = errors;
                                const _errs30 = errors;
                                if (errors === _errs30) {
                                  if (typeof data10 === "string") {
                                    if (!pattern7.test(data10)) {
                                      validate112.errors = [{ instancePath: instancePath + "/unsupported/" + i4 + "/capability", schemaPath: "#/$defs/id/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$" }, message: 'must match pattern "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$"' }];
                                      return false;
                                    }
                                  } else {
                                    validate112.errors = [{ instancePath: instancePath + "/unsupported/" + i4 + "/capability", schemaPath: "#/$defs/id/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                    return false;
                                  }
                                }
                                var valid12 = _errs29 === errors;
                              } else {
                                var valid12 = true;
                              }
                              if (valid12) {
                                if (data9.fallback !== void 0) {
                                  let data11 = data9.fallback;
                                  const _errs32 = errors;
                                  const _errs33 = errors;
                                  if (errors === _errs33) {
                                    if (typeof data11 === "string") {
                                      if (func1(data11) < 1) {
                                        validate112.errors = [{ instancePath: instancePath + "/unsupported/" + i4 + "/fallback", schemaPath: "#/$defs/nonEmpty/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                                        return false;
                                      }
                                    } else {
                                      validate112.errors = [{ instancePath: instancePath + "/unsupported/" + i4 + "/fallback", schemaPath: "#/$defs/nonEmpty/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                      return false;
                                    }
                                  }
                                  var valid12 = _errs32 === errors;
                                } else {
                                  var valid12 = true;
                                }
                                if (valid12) {
                                  if (data9.owner !== void 0) {
                                    const _errs35 = errors;
                                    if (!validate28(data9.owner, { instancePath: instancePath + "/unsupported/" + i4 + "/owner", parentData: data9, parentDataProperty: "owner", rootData, dynamicAnchors })) {
                                      vErrors = vErrors === null ? validate28.errors : vErrors.concat(validate28.errors);
                                      errors = vErrors.length;
                                    }
                                    var valid12 = _errs35 === errors;
                                  } else {
                                    var valid12 = true;
                                  }
                                }
                              }
                            }
                          } else {
                            validate112.errors = [{ instancePath: instancePath + "/unsupported/" + i4, schemaPath: "#/properties/unsupported/items/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                            return false;
                          }
                        }
                        var valid11 = _errs26 === errors;
                        if (!valid11) {
                          break;
                        }
                      }
                    } else {
                      validate112.errors = [{ instancePath: instancePath + "/unsupported", schemaPath: "#/properties/unsupported/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                      return false;
                    }
                  }
                  var valid0 = _errs24 === errors;
                } else {
                  var valid0 = true;
                }
                if (valid0) {
                  if (data.assets !== void 0) {
                    let data13 = data.assets;
                    const _errs36 = errors;
                    if (errors === _errs36) {
                      if (Array.isArray(data13)) {
                        var valid15 = true;
                        const len3 = data13.length;
                        for (let i5 = 0; i5 < len3; i5++) {
                          let data14 = data13[i5];
                          const _errs38 = errors;
                          if (errors === _errs38) {
                            if (data14 && typeof data14 == "object" && !Array.isArray(data14)) {
                              let missing3;
                              if (data14.element === void 0 && (missing3 = "element")) {
                                validate112.errors = [{ instancePath: instancePath + "/assets/" + i5, schemaPath: "#/properties/assets/items/required", keyword: "required", params: { missingProperty: missing3 }, message: "must have required property '" + missing3 + "'" }];
                                return false;
                              } else {
                                if (data14.element !== void 0) {
                                  let data15 = data14.element;
                                  const _errs41 = errors;
                                  const _errs42 = errors;
                                  if (errors === _errs42) {
                                    if (typeof data15 === "string") {
                                      if (!pattern7.test(data15)) {
                                        validate112.errors = [{ instancePath: instancePath + "/assets/" + i5 + "/element", schemaPath: "#/$defs/ref/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$" }, message: 'must match pattern "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$"' }];
                                        return false;
                                      }
                                    } else {
                                      validate112.errors = [{ instancePath: instancePath + "/assets/" + i5 + "/element", schemaPath: "#/$defs/ref/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                      return false;
                                    }
                                  }
                                  var valid16 = _errs41 === errors;
                                } else {
                                  var valid16 = true;
                                }
                                if (valid16) {
                                  if (data14.width !== void 0) {
                                    let data16 = data14.width;
                                    const _errs44 = errors;
                                    if (errors === _errs44) {
                                      if (typeof data16 == "number" && isFinite(data16)) {
                                        if (data16 <= 0 || isNaN(data16)) {
                                          validate112.errors = [{ instancePath: instancePath + "/assets/" + i5 + "/width", schemaPath: "#/properties/assets/items/properties/width/exclusiveMinimum", keyword: "exclusiveMinimum", params: { comparison: ">", limit: 0 }, message: "must be > 0" }];
                                          return false;
                                        }
                                      } else {
                                        validate112.errors = [{ instancePath: instancePath + "/assets/" + i5 + "/width", schemaPath: "#/properties/assets/items/properties/width/type", keyword: "type", params: { type: "number" }, message: "must be number" }];
                                        return false;
                                      }
                                    }
                                    var valid16 = _errs44 === errors;
                                  } else {
                                    var valid16 = true;
                                  }
                                  if (valid16) {
                                    if (data14.height !== void 0) {
                                      let data17 = data14.height;
                                      const _errs46 = errors;
                                      if (errors === _errs46) {
                                        if (typeof data17 == "number" && isFinite(data17)) {
                                          if (data17 <= 0 || isNaN(data17)) {
                                            validate112.errors = [{ instancePath: instancePath + "/assets/" + i5 + "/height", schemaPath: "#/properties/assets/items/properties/height/exclusiveMinimum", keyword: "exclusiveMinimum", params: { comparison: ">", limit: 0 }, message: "must be > 0" }];
                                            return false;
                                          }
                                        } else {
                                          validate112.errors = [{ instancePath: instancePath + "/assets/" + i5 + "/height", schemaPath: "#/properties/assets/items/properties/height/type", keyword: "type", params: { type: "number" }, message: "must be number" }];
                                          return false;
                                        }
                                      }
                                      var valid16 = _errs46 === errors;
                                    } else {
                                      var valid16 = true;
                                    }
                                    if (valid16) {
                                      if (data14.formats !== void 0) {
                                        let data18 = data14.formats;
                                        const _errs48 = errors;
                                        if (errors === _errs48) {
                                          if (Array.isArray(data18)) {
                                            var valid18 = true;
                                            const len4 = data18.length;
                                            for (let i6 = 0; i6 < len4; i6++) {
                                              let data19 = data18[i6];
                                              const _errs50 = errors;
                                              const _errs51 = errors;
                                              if (errors === _errs51) {
                                                if (typeof data19 === "string") {
                                                  if (!pattern7.test(data19)) {
                                                    validate112.errors = [{ instancePath: instancePath + "/assets/" + i5 + "/formats/" + i6, schemaPath: "#/$defs/id/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$" }, message: 'must match pattern "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$"' }];
                                                    return false;
                                                  }
                                                } else {
                                                  validate112.errors = [{ instancePath: instancePath + "/assets/" + i5 + "/formats/" + i6, schemaPath: "#/$defs/id/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                  return false;
                                                }
                                              }
                                              var valid18 = _errs50 === errors;
                                              if (!valid18) {
                                                break;
                                              }
                                            }
                                            if (valid18) {
                                              let i7 = data18.length;
                                              let j2;
                                              if (i7 > 1) {
                                                outer2:
                                                  for (; i7--; ) {
                                                    for (j2 = i7; j2--; ) {
                                                      if (func0(data18[i7], data18[j2])) {
                                                        validate112.errors = [{ instancePath: instancePath + "/assets/" + i5 + "/formats", schemaPath: "#/properties/assets/items/properties/formats/uniqueItems", keyword: "uniqueItems", params: { i: i7, j: j2 }, message: "must NOT have duplicate items (items ## " + j2 + " and " + i7 + " are identical)" }];
                                                        return false;
                                                        break outer2;
                                                      }
                                                    }
                                                  }
                                              }
                                            }
                                          } else {
                                            validate112.errors = [{ instancePath: instancePath + "/assets/" + i5 + "/formats", schemaPath: "#/properties/assets/items/properties/formats/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                                            return false;
                                          }
                                        }
                                        var valid16 = _errs48 === errors;
                                      } else {
                                        var valid16 = true;
                                      }
                                      if (valid16) {
                                        if (data14.quality !== void 0) {
                                          let data20 = data14.quality;
                                          const _errs53 = errors;
                                          const _errs54 = errors;
                                          let valid21 = false;
                                          let passing0 = null;
                                          const _errs55 = errors;
                                          if (errors === _errs55) {
                                            if (typeof data20 == "number" && isFinite(data20)) {
                                              if (data20 > 100 || isNaN(data20)) {
                                                const err0 = { instancePath: instancePath + "/assets/" + i5 + "/quality", schemaPath: "#/properties/assets/items/properties/quality/oneOf/0/maximum", keyword: "maximum", params: { comparison: "<=", limit: 100 }, message: "must be <= 100" };
                                                if (vErrors === null) {
                                                  vErrors = [err0];
                                                } else {
                                                  vErrors.push(err0);
                                                }
                                                errors++;
                                              } else {
                                                if (data20 < 0 || isNaN(data20)) {
                                                  const err1 = { instancePath: instancePath + "/assets/" + i5 + "/quality", schemaPath: "#/properties/assets/items/properties/quality/oneOf/0/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" };
                                                  if (vErrors === null) {
                                                    vErrors = [err1];
                                                  } else {
                                                    vErrors.push(err1);
                                                  }
                                                  errors++;
                                                }
                                              }
                                            } else {
                                              const err2 = { instancePath: instancePath + "/assets/" + i5 + "/quality", schemaPath: "#/properties/assets/items/properties/quality/oneOf/0/type", keyword: "type", params: { type: "number" }, message: "must be number" };
                                              if (vErrors === null) {
                                                vErrors = [err2];
                                              } else {
                                                vErrors.push(err2);
                                              }
                                              errors++;
                                            }
                                          }
                                          var _valid0 = _errs55 === errors;
                                          if (_valid0) {
                                            valid21 = true;
                                            passing0 = 0;
                                          }
                                          const _errs57 = errors;
                                          const _errs58 = errors;
                                          if (errors === _errs58) {
                                            if (typeof data20 === "string") {
                                              if (func1(data20) < 1) {
                                                const err3 = { instancePath: instancePath + "/assets/" + i5 + "/quality", schemaPath: "#/$defs/nonEmpty/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
                                                if (vErrors === null) {
                                                  vErrors = [err3];
                                                } else {
                                                  vErrors.push(err3);
                                                }
                                                errors++;
                                              }
                                            } else {
                                              const err4 = { instancePath: instancePath + "/assets/" + i5 + "/quality", schemaPath: "#/$defs/nonEmpty/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                                              if (vErrors === null) {
                                                vErrors = [err4];
                                              } else {
                                                vErrors.push(err4);
                                              }
                                              errors++;
                                            }
                                          }
                                          var _valid0 = _errs57 === errors;
                                          if (_valid0 && valid21) {
                                            valid21 = false;
                                            passing0 = [passing0, 1];
                                          } else {
                                            if (_valid0) {
                                              valid21 = true;
                                              passing0 = 1;
                                            }
                                          }
                                          if (!valid21) {
                                            const err5 = { instancePath: instancePath + "/assets/" + i5 + "/quality", schemaPath: "#/properties/assets/items/properties/quality/oneOf", keyword: "oneOf", params: { passingSchemas: passing0 }, message: "must match exactly one schema in oneOf" };
                                            if (vErrors === null) {
                                              vErrors = [err5];
                                            } else {
                                              vErrors.push(err5);
                                            }
                                            errors++;
                                            validate112.errors = vErrors;
                                            return false;
                                          } else {
                                            errors = _errs54;
                                            if (vErrors !== null) {
                                              if (_errs54) {
                                                vErrors.length = _errs54;
                                              } else {
                                                vErrors = null;
                                              }
                                            }
                                          }
                                          var valid16 = _errs53 === errors;
                                        } else {
                                          var valid16 = true;
                                        }
                                        if (valid16) {
                                          if (data14.artDirection !== void 0) {
                                            let data21 = data14.artDirection;
                                            const _errs60 = errors;
                                            const _errs61 = errors;
                                            if (errors === _errs61) {
                                              if (typeof data21 === "string") {
                                                if (func1(data21) < 1) {
                                                  validate112.errors = [{ instancePath: instancePath + "/assets/" + i5 + "/artDirection", schemaPath: "#/$defs/nonEmpty/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                                                  return false;
                                                }
                                              } else {
                                                validate112.errors = [{ instancePath: instancePath + "/assets/" + i5 + "/artDirection", schemaPath: "#/$defs/nonEmpty/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                return false;
                                              }
                                            }
                                            var valid16 = _errs60 === errors;
                                          } else {
                                            var valid16 = true;
                                          }
                                          if (valid16) {
                                            if (data14.loading !== void 0) {
                                              let data22 = data14.loading;
                                              const _errs63 = errors;
                                              if (errors === _errs63) {
                                                if (data22 && typeof data22 == "object" && !Array.isArray(data22)) {
                                                  if (data22.priority !== void 0) {
                                                    let data23 = data22.priority;
                                                    const _errs66 = errors;
                                                    const _errs67 = errors;
                                                    if (errors === _errs67) {
                                                      if (typeof data23 === "string") {
                                                        if (!pattern7.test(data23)) {
                                                          validate112.errors = [{ instancePath: instancePath + "/assets/" + i5 + "/loading/priority", schemaPath: "#/$defs/id/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$" }, message: 'must match pattern "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$"' }];
                                                          return false;
                                                        }
                                                      } else {
                                                        validate112.errors = [{ instancePath: instancePath + "/assets/" + i5 + "/loading/priority", schemaPath: "#/$defs/id/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                        return false;
                                                      }
                                                    }
                                                    var valid24 = _errs66 === errors;
                                                  } else {
                                                    var valid24 = true;
                                                  }
                                                  if (valid24) {
                                                    if (data22.poster !== void 0) {
                                                      let data24 = data22.poster;
                                                      const _errs69 = errors;
                                                      const _errs70 = errors;
                                                      let valid26 = false;
                                                      let passing1 = null;
                                                      const _errs71 = errors;
                                                      const _errs72 = errors;
                                                      if (errors === _errs72) {
                                                        if (typeof data24 === "string") {
                                                          if (func1(data24) < 1) {
                                                            const err6 = { instancePath: instancePath + "/assets/" + i5 + "/loading/poster", schemaPath: "#/$defs/uriReference/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
                                                            if (vErrors === null) {
                                                              vErrors = [err6];
                                                            } else {
                                                              vErrors.push(err6);
                                                            }
                                                            errors++;
                                                          }
                                                        } else {
                                                          const err7 = { instancePath: instancePath + "/assets/" + i5 + "/loading/poster", schemaPath: "#/$defs/uriReference/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                                                          if (vErrors === null) {
                                                            vErrors = [err7];
                                                          } else {
                                                            vErrors.push(err7);
                                                          }
                                                          errors++;
                                                        }
                                                      }
                                                      var _valid1 = _errs71 === errors;
                                                      if (_valid1) {
                                                        valid26 = true;
                                                        passing1 = 0;
                                                      }
                                                      const _errs74 = errors;
                                                      if (data24 !== null) {
                                                        const err8 = { instancePath: instancePath + "/assets/" + i5 + "/loading/poster", schemaPath: "#/properties/assets/items/properties/loading/properties/poster/oneOf/1/type", keyword: "type", params: { type: "null" }, message: "must be null" };
                                                        if (vErrors === null) {
                                                          vErrors = [err8];
                                                        } else {
                                                          vErrors.push(err8);
                                                        }
                                                        errors++;
                                                      }
                                                      var _valid1 = _errs74 === errors;
                                                      if (_valid1 && valid26) {
                                                        valid26 = false;
                                                        passing1 = [passing1, 1];
                                                      } else {
                                                        if (_valid1) {
                                                          valid26 = true;
                                                          passing1 = 1;
                                                        }
                                                      }
                                                      if (!valid26) {
                                                        const err9 = { instancePath: instancePath + "/assets/" + i5 + "/loading/poster", schemaPath: "#/properties/assets/items/properties/loading/properties/poster/oneOf", keyword: "oneOf", params: { passingSchemas: passing1 }, message: "must match exactly one schema in oneOf" };
                                                        if (vErrors === null) {
                                                          vErrors = [err9];
                                                        } else {
                                                          vErrors.push(err9);
                                                        }
                                                        errors++;
                                                        validate112.errors = vErrors;
                                                        return false;
                                                      } else {
                                                        errors = _errs70;
                                                        if (vErrors !== null) {
                                                          if (_errs70) {
                                                            vErrors.length = _errs70;
                                                          } else {
                                                            vErrors = null;
                                                          }
                                                        }
                                                      }
                                                      var valid24 = _errs69 === errors;
                                                    } else {
                                                      var valid24 = true;
                                                    }
                                                    if (valid24) {
                                                      if (data22.strategy !== void 0) {
                                                        let data25 = data22.strategy;
                                                        const _errs76 = errors;
                                                        const _errs77 = errors;
                                                        if (errors === _errs77) {
                                                          if (typeof data25 === "string") {
                                                            if (func1(data25) < 1) {
                                                              validate112.errors = [{ instancePath: instancePath + "/assets/" + i5 + "/loading/strategy", schemaPath: "#/$defs/nonEmpty/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                                                              return false;
                                                            }
                                                          } else {
                                                            validate112.errors = [{ instancePath: instancePath + "/assets/" + i5 + "/loading/strategy", schemaPath: "#/$defs/nonEmpty/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                            return false;
                                                          }
                                                        }
                                                        var valid24 = _errs76 === errors;
                                                      } else {
                                                        var valid24 = true;
                                                      }
                                                    }
                                                  }
                                                } else {
                                                  validate112.errors = [{ instancePath: instancePath + "/assets/" + i5 + "/loading", schemaPath: "#/properties/assets/items/properties/loading/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                                                  return false;
                                                }
                                              }
                                              var valid16 = _errs63 === errors;
                                            } else {
                                              var valid16 = true;
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            } else {
                              validate112.errors = [{ instancePath: instancePath + "/assets/" + i5, schemaPath: "#/properties/assets/items/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                              return false;
                            }
                          }
                          var valid15 = _errs38 === errors;
                          if (!valid15) {
                            break;
                          }
                        }
                      } else {
                        validate112.errors = [{ instancePath: instancePath + "/assets", schemaPath: "#/properties/assets/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                        return false;
                      }
                    }
                    var valid0 = _errs36 === errors;
                  } else {
                    var valid0 = true;
                  }
                  if (valid0) {
                    if (data.data !== void 0) {
                      let data26 = data.data;
                      const _errs79 = errors;
                      if (errors === _errs79) {
                        if (data26 && typeof data26 == "object" && !Array.isArray(data26)) {
                          if (data26.expectedItems !== void 0) {
                            let data27 = data26.expectedItems;
                            const _errs82 = errors;
                            if (!(typeof data27 == "number" && (!(data27 % 1) && !isNaN(data27)) && isFinite(data27))) {
                              validate112.errors = [{ instancePath: instancePath + "/data/expectedItems", schemaPath: "#/properties/data/properties/expectedItems/type", keyword: "type", params: { type: "integer" }, message: "must be integer" }];
                              return false;
                            }
                            if (errors === _errs82) {
                              if (typeof data27 == "number" && isFinite(data27)) {
                                if (data27 < 0 || isNaN(data27)) {
                                  validate112.errors = [{ instancePath: instancePath + "/data/expectedItems", schemaPath: "#/properties/data/properties/expectedItems/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" }];
                                  return false;
                                }
                              }
                            }
                            var valid29 = _errs82 === errors;
                          } else {
                            var valid29 = true;
                          }
                          if (valid29) {
                            if (data26.maximumItems !== void 0) {
                              let data28 = data26.maximumItems;
                              const _errs84 = errors;
                              if (!(typeof data28 == "number" && (!(data28 % 1) && !isNaN(data28)) && isFinite(data28))) {
                                validate112.errors = [{ instancePath: instancePath + "/data/maximumItems", schemaPath: "#/properties/data/properties/maximumItems/type", keyword: "type", params: { type: "integer" }, message: "must be integer" }];
                                return false;
                              }
                              if (errors === _errs84) {
                                if (typeof data28 == "number" && isFinite(data28)) {
                                  if (data28 < 0 || isNaN(data28)) {
                                    validate112.errors = [{ instancePath: instancePath + "/data/maximumItems", schemaPath: "#/properties/data/properties/maximumItems/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" }];
                                    return false;
                                  }
                                }
                              }
                              var valid29 = _errs84 === errors;
                            } else {
                              var valid29 = true;
                            }
                            if (valid29) {
                              if (data26.virtualizeAfter !== void 0) {
                                let data29 = data26.virtualizeAfter;
                                const _errs86 = errors;
                                if (!(typeof data29 == "number" && (!(data29 % 1) && !isNaN(data29)) && isFinite(data29))) {
                                  validate112.errors = [{ instancePath: instancePath + "/data/virtualizeAfter", schemaPath: "#/properties/data/properties/virtualizeAfter/type", keyword: "type", params: { type: "integer" }, message: "must be integer" }];
                                  return false;
                                }
                                if (errors === _errs86) {
                                  if (typeof data29 == "number" && isFinite(data29)) {
                                    if (data29 < 1 || isNaN(data29)) {
                                      validate112.errors = [{ instancePath: instancePath + "/data/virtualizeAfter", schemaPath: "#/properties/data/properties/virtualizeAfter/minimum", keyword: "minimum", params: { comparison: ">=", limit: 1 }, message: "must be >= 1" }];
                                      return false;
                                    }
                                  }
                                }
                                var valid29 = _errs86 === errors;
                              } else {
                                var valid29 = true;
                              }
                              if (valid29) {
                                if (data26.strategy !== void 0) {
                                  let data30 = data26.strategy;
                                  const _errs88 = errors;
                                  const _errs89 = errors;
                                  if (errors === _errs89) {
                                    if (typeof data30 === "string") {
                                      if (func1(data30) < 1) {
                                        validate112.errors = [{ instancePath: instancePath + "/data/strategy", schemaPath: "#/$defs/nonEmpty/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                                        return false;
                                      }
                                    } else {
                                      validate112.errors = [{ instancePath: instancePath + "/data/strategy", schemaPath: "#/$defs/nonEmpty/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                      return false;
                                    }
                                  }
                                  var valid29 = _errs88 === errors;
                                } else {
                                  var valid29 = true;
                                }
                              }
                            }
                          }
                        } else {
                          validate112.errors = [{ instancePath: instancePath + "/data", schemaPath: "#/properties/data/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                          return false;
                        }
                      }
                      var valid0 = _errs79 === errors;
                    } else {
                      var valid0 = true;
                    }
                    if (valid0) {
                      if (data.conditions !== void 0) {
                        let data31 = data.conditions;
                        const _errs91 = errors;
                        if (errors === _errs91) {
                          if (Array.isArray(data31)) {
                            var valid31 = true;
                            const len5 = data31.length;
                            for (let i8 = 0; i8 < len5; i8++) {
                              let data32 = data31[i8];
                              const _errs93 = errors;
                              if (!(data32 === "low-bandwidth" || data32 === "offline" || data32 === "data-saver" || data32 === "low-power")) {
                                validate112.errors = [{ instancePath: instancePath + "/conditions/" + i8, schemaPath: "#/properties/conditions/items/enum", keyword: "enum", params: { allowedValues: schema208.properties.conditions.items.enum }, message: "must be equal to one of the allowed values" }];
                                return false;
                              }
                              var valid31 = _errs93 === errors;
                              if (!valid31) {
                                break;
                              }
                            }
                            if (valid31) {
                              let i9 = data31.length;
                              let j3;
                              if (i9 > 1) {
                                outer3:
                                  for (; i9--; ) {
                                    for (j3 = i9; j3--; ) {
                                      if (func0(data31[i9], data31[j3])) {
                                        validate112.errors = [{ instancePath: instancePath + "/conditions", schemaPath: "#/properties/conditions/uniqueItems", keyword: "uniqueItems", params: { i: i9, j: j3 }, message: "must NOT have duplicate items (items ## " + j3 + " and " + i9 + " are identical)" }];
                                        return false;
                                        break outer3;
                                      }
                                    }
                                  }
                              }
                            }
                          } else {
                            validate112.errors = [{ instancePath: instancePath + "/conditions", schemaPath: "#/properties/conditions/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                            return false;
                          }
                        }
                        var valid0 = _errs91 === errors;
                      } else {
                        var valid0 = true;
                      }
                      if (valid0) {
                        if (data.budgets !== void 0) {
                          let data33 = data.budgets;
                          const _errs94 = errors;
                          if (errors === _errs94) {
                            if (Array.isArray(data33)) {
                              var valid33 = true;
                              const len6 = data33.length;
                              for (let i10 = 0; i10 < len6; i10++) {
                                let data34 = data33[i10];
                                const _errs96 = errors;
                                if (errors === _errs96) {
                                  if (data34 && typeof data34 == "object" && !Array.isArray(data34)) {
                                    let missing4;
                                    if (data34.metric === void 0 && (missing4 = "metric") || data34.limit === void 0 && (missing4 = "limit") || data34.owner === void 0 && (missing4 = "owner") || data34.measureAt === void 0 && (missing4 = "measureAt")) {
                                      validate112.errors = [{ instancePath: instancePath + "/budgets/" + i10, schemaPath: "#/properties/budgets/items/required", keyword: "required", params: { missingProperty: missing4 }, message: "must have required property '" + missing4 + "'" }];
                                      return false;
                                    } else {
                                      if (data34.metric !== void 0) {
                                        let data35 = data34.metric;
                                        const _errs99 = errors;
                                        const _errs100 = errors;
                                        if (errors === _errs100) {
                                          if (typeof data35 === "string") {
                                            if (!pattern7.test(data35)) {
                                              validate112.errors = [{ instancePath: instancePath + "/budgets/" + i10 + "/metric", schemaPath: "#/$defs/id/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$" }, message: 'must match pattern "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$"' }];
                                              return false;
                                            }
                                          } else {
                                            validate112.errors = [{ instancePath: instancePath + "/budgets/" + i10 + "/metric", schemaPath: "#/$defs/id/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                            return false;
                                          }
                                        }
                                        var valid34 = _errs99 === errors;
                                      } else {
                                        var valid34 = true;
                                      }
                                      if (valid34) {
                                        if (data34.limit !== void 0) {
                                          let data36 = data34.limit;
                                          const _errs102 = errors;
                                          if (errors === _errs102) {
                                            if (typeof data36 == "number" && isFinite(data36)) {
                                              if (data36 <= 0 || isNaN(data36)) {
                                                validate112.errors = [{ instancePath: instancePath + "/budgets/" + i10 + "/limit", schemaPath: "#/properties/budgets/items/properties/limit/exclusiveMinimum", keyword: "exclusiveMinimum", params: { comparison: ">", limit: 0 }, message: "must be > 0" }];
                                                return false;
                                              }
                                            } else {
                                              validate112.errors = [{ instancePath: instancePath + "/budgets/" + i10 + "/limit", schemaPath: "#/properties/budgets/items/properties/limit/type", keyword: "type", params: { type: "number" }, message: "must be number" }];
                                              return false;
                                            }
                                          }
                                          var valid34 = _errs102 === errors;
                                        } else {
                                          var valid34 = true;
                                        }
                                        if (valid34) {
                                          if (data34.unit !== void 0) {
                                            let data37 = data34.unit;
                                            const _errs104 = errors;
                                            const _errs105 = errors;
                                            if (errors === _errs105) {
                                              if (typeof data37 === "string") {
                                                if (func1(data37) < 1) {
                                                  validate112.errors = [{ instancePath: instancePath + "/budgets/" + i10 + "/unit", schemaPath: "#/$defs/nonEmpty/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                                                  return false;
                                                }
                                              } else {
                                                validate112.errors = [{ instancePath: instancePath + "/budgets/" + i10 + "/unit", schemaPath: "#/$defs/nonEmpty/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                return false;
                                              }
                                            }
                                            var valid34 = _errs104 === errors;
                                          } else {
                                            var valid34 = true;
                                          }
                                          if (valid34) {
                                            if (data34.owner !== void 0) {
                                              const _errs107 = errors;
                                              if (!validate28(data34.owner, { instancePath: instancePath + "/budgets/" + i10 + "/owner", parentData: data34, parentDataProperty: "owner", rootData, dynamicAnchors })) {
                                                vErrors = vErrors === null ? validate28.errors : vErrors.concat(validate28.errors);
                                                errors = vErrors.length;
                                              }
                                              var valid34 = _errs107 === errors;
                                            } else {
                                              var valid34 = true;
                                            }
                                            if (valid34) {
                                              if (data34.measureAt !== void 0) {
                                                let data39 = data34.measureAt;
                                                const _errs108 = errors;
                                                const _errs109 = errors;
                                                if (errors === _errs109) {
                                                  if (typeof data39 === "string") {
                                                    if (func1(data39) < 1) {
                                                      validate112.errors = [{ instancePath: instancePath + "/budgets/" + i10 + "/measureAt", schemaPath: "#/$defs/nonEmpty/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                                                      return false;
                                                    }
                                                  } else {
                                                    validate112.errors = [{ instancePath: instancePath + "/budgets/" + i10 + "/measureAt", schemaPath: "#/$defs/nonEmpty/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                    return false;
                                                  }
                                                }
                                                var valid34 = _errs108 === errors;
                                              } else {
                                                var valid34 = true;
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  } else {
                                    validate112.errors = [{ instancePath: instancePath + "/budgets/" + i10, schemaPath: "#/properties/budgets/items/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                                    return false;
                                  }
                                }
                                var valid33 = _errs96 === errors;
                                if (!valid33) {
                                  break;
                                }
                              }
                            } else {
                              validate112.errors = [{ instancePath: instancePath + "/budgets", schemaPath: "#/properties/budgets/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                              return false;
                            }
                          }
                          var valid0 = _errs94 === errors;
                        } else {
                          var valid0 = true;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    } else {
      validate112.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
      return false;
    }
  }
  validate112.errors = vErrors;
  return errors === 0;
}
validate112.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
function validate111(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate111.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (errors === 0) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
      let missing0;
      if (data.profiles === void 0 && (missing0 = "profiles")) {
        validate111.errors = [{ instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: missing0 }, message: "must have required property '" + missing0 + "'" }];
        return false;
      } else {
        if (data.profiles !== void 0) {
          let data0 = data.profiles;
          const _errs2 = errors;
          if (errors === _errs2) {
            if (Array.isArray(data0)) {
              if (data0.length < 1) {
                validate111.errors = [{ instancePath: instancePath + "/profiles", schemaPath: "#/properties/profiles/minItems", keyword: "minItems", params: { limit: 1 }, message: "must NOT have fewer than 1 items" }];
                return false;
              } else {
                var valid1 = true;
                const len0 = data0.length;
                for (let i0 = 0; i0 < len0; i0++) {
                  const _errs4 = errors;
                  if (!validate112(data0[i0], { instancePath: instancePath + "/profiles/" + i0, parentData: data0, parentDataProperty: i0, rootData, dynamicAnchors })) {
                    vErrors = vErrors === null ? validate112.errors : vErrors.concat(validate112.errors);
                    errors = vErrors.length;
                  }
                  var valid1 = _errs4 === errors;
                  if (!valid1) {
                    break;
                  }
                }
              }
            } else {
              validate111.errors = [{ instancePath: instancePath + "/profiles", schemaPath: "#/properties/profiles/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
              return false;
            }
          }
        }
      }
    } else {
      validate111.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
      return false;
    }
  }
  validate111.errors = vErrors;
  return errors === 0;
}
validate111.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
function validate21(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate21.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (errors === 0) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
      let missing0;
      if (data.contractVersion === void 0 && (missing0 = "contractVersion") || data.methodologyVersion === void 0 && (missing0 = "methodologyVersion") || data.rulesVersion === void 0 && (missing0 = "rulesVersion") || data.source === void 0 && (missing0 = "source") || data.context === void 0 && (missing0 = "context") || data.identity === void 0 && (missing0 = "identity")) {
        validate21.errors = [{ instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: missing0 }, message: "must have required property '" + missing0 + "'" }];
        return false;
      } else {
        if (data.contractVersion !== void 0) {
          let data0 = data.contractVersion;
          const _errs2 = errors;
          const _errs3 = errors;
          if (errors === _errs3) {
            if (typeof data0 === "string") {
              if (!pattern4.test(data0)) {
                validate21.errors = [{ instancePath: instancePath + "/contractVersion", schemaPath: "#/$defs/semver/pattern", keyword: "pattern", params: { pattern: "^(?:0|[1-9][0-9]*)\\.(?:0|[1-9][0-9]*)\\.(?:0|[1-9][0-9]*)$" }, message: 'must match pattern "^(?:0|[1-9][0-9]*)\\.(?:0|[1-9][0-9]*)\\.(?:0|[1-9][0-9]*)$"' }];
                return false;
              }
            } else {
              validate21.errors = [{ instancePath: instancePath + "/contractVersion", schemaPath: "#/$defs/semver/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
              return false;
            }
          }
          var valid1 = _errs3 === errors;
          if (valid1) {
            if ("0.2.0" !== data0) {
              validate21.errors = [{ instancePath: instancePath + "/contractVersion", schemaPath: "#/properties/contractVersion/const", keyword: "const", params: { allowedValue: "0.2.0" }, message: "must be equal to constant" }];
              return false;
            }
          }
          var valid0 = _errs2 === errors;
        } else {
          var valid0 = true;
        }
        if (valid0) {
          if (data.methodologyVersion !== void 0) {
            let data1 = data.methodologyVersion;
            const _errs5 = errors;
            const _errs6 = errors;
            if (errors === _errs6) {
              if (typeof data1 === "string") {
                if (!pattern4.test(data1)) {
                  validate21.errors = [{ instancePath: instancePath + "/methodologyVersion", schemaPath: "#/$defs/semver/pattern", keyword: "pattern", params: { pattern: "^(?:0|[1-9][0-9]*)\\.(?:0|[1-9][0-9]*)\\.(?:0|[1-9][0-9]*)$" }, message: 'must match pattern "^(?:0|[1-9][0-9]*)\\.(?:0|[1-9][0-9]*)\\.(?:0|[1-9][0-9]*)$"' }];
                  return false;
                }
              } else {
                validate21.errors = [{ instancePath: instancePath + "/methodologyVersion", schemaPath: "#/$defs/semver/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                return false;
              }
            }
            var valid0 = _errs5 === errors;
          } else {
            var valid0 = true;
          }
          if (valid0) {
            if (data.rulesVersion !== void 0) {
              let data2 = data.rulesVersion;
              const _errs8 = errors;
              const _errs9 = errors;
              if (errors === _errs9) {
                if (typeof data2 === "string") {
                  if (!pattern4.test(data2)) {
                    validate21.errors = [{ instancePath: instancePath + "/rulesVersion", schemaPath: "#/$defs/semver/pattern", keyword: "pattern", params: { pattern: "^(?:0|[1-9][0-9]*)\\.(?:0|[1-9][0-9]*)\\.(?:0|[1-9][0-9]*)$" }, message: 'must match pattern "^(?:0|[1-9][0-9]*)\\.(?:0|[1-9][0-9]*)\\.(?:0|[1-9][0-9]*)$"' }];
                    return false;
                  }
                } else {
                  validate21.errors = [{ instancePath: instancePath + "/rulesVersion", schemaPath: "#/$defs/semver/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                  return false;
                }
              }
              var valid0 = _errs8 === errors;
            } else {
              var valid0 = true;
            }
            if (valid0) {
              if (data.source !== void 0) {
                const _errs11 = errors;
                if (!validate22(data.source, { instancePath: instancePath + "/source", parentData: data, parentDataProperty: "source", rootData, dynamicAnchors })) {
                  vErrors = vErrors === null ? validate22.errors : vErrors.concat(validate22.errors);
                  errors = vErrors.length;
                }
                var valid0 = _errs11 === errors;
              } else {
                var valid0 = true;
              }
              if (valid0) {
                if (data.context !== void 0) {
                  const _errs12 = errors;
                  if (!validate24(data.context, { instancePath: instancePath + "/context", parentData: data, parentDataProperty: "context", rootData, dynamicAnchors })) {
                    vErrors = vErrors === null ? validate24.errors : vErrors.concat(validate24.errors);
                    errors = vErrors.length;
                  }
                  var valid0 = _errs12 === errors;
                } else {
                  var valid0 = true;
                }
                if (valid0) {
                  if (data.identity !== void 0) {
                    const _errs13 = errors;
                    if (!validate34(data.identity, { instancePath: instancePath + "/identity", parentData: data, parentDataProperty: "identity", rootData, dynamicAnchors })) {
                      vErrors = vErrors === null ? validate34.errors : vErrors.concat(validate34.errors);
                      errors = vErrors.length;
                    }
                    var valid0 = _errs13 === errors;
                  } else {
                    var valid0 = true;
                  }
                  if (valid0) {
                    if (data.structure !== void 0) {
                      const _errs14 = errors;
                      if (!validate50(data.structure, { instancePath: instancePath + "/structure", parentData: data, parentDataProperty: "structure", rootData, dynamicAnchors })) {
                        vErrors = vErrors === null ? validate50.errors : vErrors.concat(validate50.errors);
                        errors = vErrors.length;
                      }
                      var valid0 = _errs14 === errors;
                    } else {
                      var valid0 = true;
                    }
                    if (valid0) {
                      if (data.data !== void 0) {
                        const _errs15 = errors;
                        if (!validate58(data.data, { instancePath: instancePath + "/data", parentData: data, parentDataProperty: "data", rootData, dynamicAnchors })) {
                          vErrors = vErrors === null ? validate58.errors : vErrors.concat(validate58.errors);
                          errors = vErrors.length;
                        }
                        var valid0 = _errs15 === errors;
                      } else {
                        var valid0 = true;
                      }
                      if (valid0) {
                        if (data.responsive !== void 0) {
                          const _errs16 = errors;
                          if (!validate62(data.responsive, { instancePath: instancePath + "/responsive", parentData: data, parentDataProperty: "responsive", rootData, dynamicAnchors })) {
                            vErrors = vErrors === null ? validate62.errors : vErrors.concat(validate62.errors);
                            errors = vErrors.length;
                          }
                          var valid0 = _errs16 === errors;
                        } else {
                          var valid0 = true;
                        }
                        if (valid0) {
                          if (data.interaction !== void 0) {
                            const _errs17 = errors;
                            if (!validate72(data.interaction, { instancePath: instancePath + "/interaction", parentData: data, parentDataProperty: "interaction", rootData, dynamicAnchors })) {
                              vErrors = vErrors === null ? validate72.errors : vErrors.concat(validate72.errors);
                              errors = vErrors.length;
                            }
                            var valid0 = _errs17 === errors;
                          } else {
                            var valid0 = true;
                          }
                          if (valid0) {
                            if (data.motion !== void 0) {
                              const _errs18 = errors;
                              if (!validate78(data.motion, { instancePath: instancePath + "/motion", parentData: data, parentDataProperty: "motion", rootData, dynamicAnchors })) {
                                vErrors = vErrors === null ? validate78.errors : vErrors.concat(validate78.errors);
                                errors = vErrors.length;
                              }
                              var valid0 = _errs18 === errors;
                            } else {
                              var valid0 = true;
                            }
                            if (valid0) {
                              if (data.accessibility !== void 0) {
                                const _errs19 = errors;
                                if (!validate82(data.accessibility, { instancePath: instancePath + "/accessibility", parentData: data, parentDataProperty: "accessibility", rootData, dynamicAnchors })) {
                                  vErrors = vErrors === null ? validate82.errors : vErrors.concat(validate82.errors);
                                  errors = vErrors.length;
                                }
                                var valid0 = _errs19 === errors;
                              } else {
                                var valid0 = true;
                              }
                              if (valid0) {
                                if (data.lifecycle !== void 0) {
                                  const _errs20 = errors;
                                  if (!validate88(data.lifecycle, { instancePath: instancePath + "/lifecycle", parentData: data, parentDataProperty: "lifecycle", rootData, dynamicAnchors })) {
                                    vErrors = vErrors === null ? validate88.errors : vErrors.concat(validate88.errors);
                                    errors = vErrors.length;
                                  }
                                  var valid0 = _errs20 === errors;
                                } else {
                                  var valid0 = true;
                                }
                                if (valid0) {
                                  if (data.exceptions !== void 0) {
                                    let data13 = data.exceptions;
                                    const _errs21 = errors;
                                    if (errors === _errs21) {
                                      if (Array.isArray(data13)) {
                                        var valid4 = true;
                                        const len0 = data13.length;
                                        for (let i0 = 0; i0 < len0; i0++) {
                                          const _errs23 = errors;
                                          if (!validate102(data13[i0], { instancePath: instancePath + "/exceptions/" + i0, parentData: data13, parentDataProperty: i0, rootData, dynamicAnchors })) {
                                            vErrors = vErrors === null ? validate102.errors : vErrors.concat(validate102.errors);
                                            errors = vErrors.length;
                                          }
                                          var valid4 = _errs23 === errors;
                                          if (!valid4) {
                                            break;
                                          }
                                        }
                                      } else {
                                        validate21.errors = [{ instancePath: instancePath + "/exceptions", schemaPath: "#/properties/exceptions/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                                        return false;
                                      }
                                    }
                                    var valid0 = _errs21 === errors;
                                  } else {
                                    var valid0 = true;
                                  }
                                  if (valid0) {
                                    if (data.openQuestions !== void 0) {
                                      let data15 = data.openQuestions;
                                      const _errs24 = errors;
                                      if (errors === _errs24) {
                                        if (Array.isArray(data15)) {
                                          var valid5 = true;
                                          const len1 = data15.length;
                                          for (let i1 = 0; i1 < len1; i1++) {
                                            const _errs26 = errors;
                                            if (!validate107(data15[i1], { instancePath: instancePath + "/openQuestions/" + i1, parentData: data15, parentDataProperty: i1, rootData, dynamicAnchors })) {
                                              vErrors = vErrors === null ? validate107.errors : vErrors.concat(validate107.errors);
                                              errors = vErrors.length;
                                            }
                                            var valid5 = _errs26 === errors;
                                            if (!valid5) {
                                              break;
                                            }
                                          }
                                        } else {
                                          validate21.errors = [{ instancePath: instancePath + "/openQuestions", schemaPath: "#/properties/openQuestions/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                                          return false;
                                        }
                                      }
                                      var valid0 = _errs24 === errors;
                                    } else {
                                      var valid0 = true;
                                    }
                                    if (valid0) {
                                      if (data.capabilities !== void 0) {
                                        const _errs27 = errors;
                                        if (!validate111(data.capabilities, { instancePath: instancePath + "/capabilities", parentData: data, parentDataProperty: "capabilities", rootData, dynamicAnchors })) {
                                          vErrors = vErrors === null ? validate111.errors : vErrors.concat(validate111.errors);
                                          errors = vErrors.length;
                                        }
                                        var valid0 = _errs27 === errors;
                                      } else {
                                        var valid0 = true;
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    } else {
      validate21.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
      return false;
    }
  }
  validate21.errors = vErrors;
  return errors === 0;
}
validate21.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
function validate20(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate20.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (errors === 0) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
      let missing0;
      if (data.bridge === void 0 && (missing0 = "bridge")) {
        validate20.errors = [{ instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: missing0 }, message: "must have required property '" + missing0 + "'" }];
        return false;
      } else {
        const _errs1 = errors;
        for (const key0 in data) {
          if (!(key0 === "$schema" || key0 === "bridge")) {
            validate20.errors = [{ instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" }];
            return false;
            break;
          }
        }
        if (_errs1 === errors) {
          if (data.$schema !== void 0) {
            const _errs2 = errors;
            if (typeof data.$schema !== "string") {
              validate20.errors = [{ instancePath: instancePath + "/$schema", schemaPath: "#/properties/%24schema/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
              return false;
            }
            var valid0 = _errs2 === errors;
          } else {
            var valid0 = true;
          }
          if (valid0) {
            if (data.bridge !== void 0) {
              const _errs4 = errors;
              if (!validate21(data.bridge, { instancePath: instancePath + "/bridge", parentData: data, parentDataProperty: "bridge", rootData, dynamicAnchors })) {
                vErrors = vErrors === null ? validate21.errors : vErrors.concat(validate21.errors);
                errors = vErrors.length;
              }
              var valid0 = _errs4 === errors;
            } else {
              var valid0 = true;
            }
          }
        }
      }
    } else {
      validate20.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
      return false;
    }
  }
  validate20.errors = vErrors;
  return errors === 0;
}
validate20.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
var bridgeSchema = { "$schema": "https://json-schema.org/draft/2020-12/schema", "$id": "https://poliklot.github.io/bridge-design-methodology/schema/bridge.schema.json", "title": "DFC Bridge structured transfer contract", "description": "Versioned, target-independent DFC Bridge metadata. Layer-name tags remain compact anchors; rich contracts live under the bridge namespace.", "type": "object", "additionalProperties": false, "required": ["bridge"], "properties": { "$schema": { "type": "string" }, "bridge": { "$ref": "#/$defs/bridge" } }, "$defs": { "id": { "type": "string", "pattern": "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$" }, "nonEmpty": { "type": "string", "minLength": 1 }, "semver": { "type": "string", "pattern": "^(?:0|[1-9][0-9]*)\\.(?:0|[1-9][0-9]*)\\.(?:0|[1-9][0-9]*)$" }, "uriReference": { "type": "string", "minLength": 1 }, "ref": { "$ref": "#/$defs/id" }, "refList": { "type": "array", "uniqueItems": true, "items": { "$ref": "#/$defs/ref" } }, "extensionObject": { "type": "object", "additionalProperties": true }, "bridge": { "type": "object", "additionalProperties": true, "required": ["contractVersion", "methodologyVersion", "rulesVersion", "source", "context", "identity"], "properties": { "contractVersion": { "$ref": "#/$defs/semver", "const": "0.2.0" }, "methodologyVersion": { "$ref": "#/$defs/semver" }, "rulesVersion": { "$ref": "#/$defs/semver" }, "source": { "$ref": "#/$defs/source" }, "context": { "$ref": "#/$defs/context" }, "identity": { "$ref": "#/$defs/identity" }, "structure": { "$ref": "#/$defs/structure" }, "data": { "$ref": "#/$defs/data" }, "responsive": { "$ref": "#/$defs/responsive" }, "interaction": { "$ref": "#/$defs/interaction" }, "motion": { "$ref": "#/$defs/motion" }, "accessibility": { "$ref": "#/$defs/accessibility" }, "lifecycle": { "$ref": "#/$defs/lifecycle" }, "exceptions": { "type": "array", "items": { "$ref": "#/$defs/exception" } }, "openQuestions": { "type": "array", "items": { "$ref": "#/$defs/openQuestion" } }, "capabilities": { "$ref": "#/$defs/capabilities" } } }, "source": { "type": "object", "additionalProperties": true, "minProperties": 1, "properties": { "tool": { "$ref": "#/$defs/nonEmpty" }, "documentId": { "$ref": "#/$defs/nonEmpty" }, "revision": { "$ref": "#/$defs/nonEmpty" }, "exportedAt": { "type": "string", "format": "date-time" } } }, "context": { "type": "object", "additionalProperties": true, "minProperties": 1, "properties": { "project": { "$ref": "#/$defs/nonEmpty" }, "product": { "$ref": "#/$defs/nonEmpty" }, "page": { "$ref": "#/$defs/id" }, "route": { "$ref": "#/$defs/nonEmpty" }, "targets": { "type": "array", "items": { "$ref": "#/$defs/nonEmpty" }, "uniqueItems": true }, "scope": { "$ref": "#/$defs/sectionScope" }, "externalDependencies": { "type": "array", "uniqueItems": true, "items": { "$ref": "#/$defs/externalDependency" } } } }, "sectionScope": { "type": "object", "additionalProperties": true, "required": ["kind", "rootIdentity", "boundary", "assetBoundary", "hostCompliance", "selectionMode", "contextIds", "readinessClaim"], "properties": { "kind": { "const": "section" }, "rootIdentity": { "$ref": "#/$defs/ref" }, "boundary": { "const": "selected-subtree" }, "assetBoundary": { "enum": ["none", "selected-root-opaque"] }, "hostCompliance": { "enum": ["legacy-out-of-scope", "bridge-out-of-scope", "unknown-out-of-scope"] }, "selectionMode": { "enum": ["single-root", "explicit-variants"] }, "contextIds": { "type": "array", "minItems": 1, "uniqueItems": true, "items": { "$ref": "#/$defs/ref" } }, "readinessClaim": { "const": "section-source-only" } }, "allOf": [{ "if": { "properties": { "selectionMode": { "const": "single-root" } }, "required": ["selectionMode"] }, "then": { "properties": { "contextIds": { "type": "array", "maxItems": 1 } } } }, { "if": { "properties": { "selectionMode": { "const": "explicit-variants" } }, "required": ["selectionMode"] }, "then": { "properties": { "contextIds": { "type": "array", "minItems": 2 } } } }] }, "externalDependency": { "type": "object", "additionalProperties": true, "required": ["id", "kind", "reference", "status", "owner"], "properties": { "id": { "$ref": "#/$defs/id" }, "kind": { "enum": ["route", "anchor", "modal", "state", "form", "reset", "component", "data", "host-layout", "other"] }, "reference": { "$ref": "#/$defs/nonEmpty" }, "status": { "enum": ["resolved", "deferred", "unverified"] }, "owner": { "$ref": "#/$defs/owner" }, "contractUri": { "$ref": "#/$defs/uriReference" }, "reviewAt": { "$ref": "#/$defs/nonEmpty" }, "evidence": { "$ref": "#/$defs/refList" } }, "allOf": [{ "if": { "properties": { "status": { "const": "resolved" } }, "required": ["status"] }, "then": { "required": ["contractUri"] } }, { "if": { "properties": { "status": { "enum": ["deferred", "unverified"] } }, "required": ["status"] }, "then": { "required": ["reviewAt"] } }] }, "identity": { "type": "object", "additionalProperties": true, "required": ["elements"], "properties": { "elements": { "type": "array", "minItems": 1, "items": { "$ref": "#/$defs/identityElement" } } } }, "identityElement": { "type": "object", "additionalProperties": true, "required": ["bridgeKey", "role", "designInstance"], "properties": { "bridgeKey": { "$ref": "#/$defs/id" }, "role": { "$ref": "#/$defs/role" }, "template": { "$ref": "#/$defs/templateIdentity" }, "designInstance": { "$ref": "#/$defs/designInstance" }, "runtimeData": { "$ref": "#/$defs/runtimeIdentity" }, "target": { "$ref": "#/$defs/targetIdentity" } } }, "role": { "type": "object", "additionalProperties": true, "required": ["kind"], "properties": { "kind": { "$ref": "#/$defs/id" }, "semantics": { "$ref": "#/$defs/nonEmpty" } } }, "templateIdentity": { "type": "object", "additionalProperties": true, "required": ["templateKey"], "properties": { "templateKey": { "$ref": "#/$defs/id" }, "sourceComponentId": { "$ref": "#/$defs/nonEmpty" }, "sourceComponentName": { "$ref": "#/$defs/nonEmpty" } } }, "designInstance": { "type": "object", "additionalProperties": true, "required": ["designInstanceKey", "sourceNodes"], "properties": { "designInstanceKey": { "$ref": "#/$defs/id" }, "sourceNodes": { "type": "array", "minItems": 1, "items": { "$ref": "#/$defs/sourceNode" } } } }, "sourceNode": { "type": "object", "additionalProperties": true, "required": ["contextId", "nodeId", "layerPath"], "properties": { "contextId": { "$ref": "#/$defs/ref" }, "nodeId": { "$ref": "#/$defs/nonEmpty" }, "layerPath": { "oneOf": [{ "$ref": "#/$defs/nonEmpty" }, { "type": "array", "minItems": 1, "items": { "$ref": "#/$defs/nonEmpty" } }] } } }, "runtimeIdentity": { "type": "object", "additionalProperties": true, "required": ["collection", "keyField"], "properties": { "collection": { "$ref": "#/$defs/id" }, "keyField": { "$ref": "#/$defs/id" }, "fixtureKey": { "$ref": "#/$defs/id" }, "runtimeDataKey": { "$ref": "#/$defs/nonEmpty" } } }, "targetIdentity": { "type": "object", "additionalProperties": true, "required": ["platform", "kind", "targetKey"], "properties": { "platform": { "$ref": "#/$defs/id" }, "kind": { "$ref": "#/$defs/id" }, "targetKey": { "$ref": "#/$defs/nonEmpty" }, "locator": { "$ref": "#/$defs/nonEmpty" } } }, "structure": { "type": "object", "additionalProperties": true, "required": ["contexts"], "properties": { "contexts": { "type": "array", "minItems": 1, "items": { "$ref": "#/$defs/structureContext" } } } }, "structureContext": { "type": "object", "additionalProperties": true, "required": ["id", "rootIdentity", "tree"], "properties": { "id": { "$ref": "#/$defs/id" }, "rootIdentity": { "$ref": "#/$defs/ref" }, "tree": { "$ref": "#/$defs/treeNode" } } }, "treeNode": { "oneOf": [{ "$ref": "#/$defs/ref" }, { "type": "object", "additionalProperties": true, "required": ["identity"], "properties": { "identity": { "$ref": "#/$defs/ref" }, "children": { "type": "array", "items": { "$ref": "#/$defs/treeNode" } } } }, { "$ref": "#/$defs/treeMap" }] }, "data": { "type": "object", "additionalProperties": true, "required": ["displays"], "properties": { "displays": { "type": "array", "items": { "$ref": "#/$defs/dataDisplay" } } } }, "dataDisplay": { "type": "object", "additionalProperties": true, "required": ["displayId", "purpose", "source", "states"], "properties": { "displayId": { "$ref": "#/$defs/ref" }, "purpose": { "$ref": "#/$defs/nonEmpty" }, "source": { "$ref": "#/$defs/extensionObject" }, "dimensions": { "type": "array", "items": { "$ref": "#/$defs/extensionObject" } }, "measures": { "type": "array", "items": { "$ref": "#/$defs/extensionObject" } }, "format": { "$ref": "#/$defs/extensionObject" }, "states": { "type": "array", "minItems": 1, "uniqueItems": true, "items": { "$ref": "#/$defs/id" } }, "accessibleEquivalent": { "$ref": "#/$defs/ref" } } }, "responsive": { "type": "object", "additionalProperties": true, "required": ["defaultPolicy", "contexts"], "properties": { "defaultPolicy": { "const": "same-tree" }, "contexts": { "type": "array", "minItems": 1, "items": { "$ref": "#/$defs/responsiveContext" } }, "transformations": { "type": "array", "items": { "$ref": "#/$defs/responsiveTransformation" } } } }, "responsiveContext": { "type": "object", "additionalProperties": true, "required": ["id", "driver"], "properties": { "id": { "$ref": "#/$defs/id" }, "driver": { "enum": ["viewport", "container"] }, "width": { "type": "number", "exclusiveMinimum": 0 }, "label": { "$ref": "#/$defs/nonEmpty" }, "labelSource": { "enum": ["declared", "inferred-from-selected-root-width"] } } }, "responsiveTransformation": { "type": "object", "additionalProperties": true, "required": ["id", "fromContext", "toContext", "when", "mappings", "preserves"], "properties": { "id": { "$ref": "#/$defs/id" }, "fromContext": { "$ref": "#/$defs/ref" }, "toContext": { "$ref": "#/$defs/ref" }, "when": { "type": "object", "additionalProperties": true, "required": ["driver", "condition"], "properties": { "driver": { "enum": ["viewport", "container"] }, "container": { "$ref": "#/$defs/ref" }, "condition": { "$ref": "#/$defs/nonEmpty" } } }, "mappings": { "type": "array", "minItems": 1, "items": { "type": "object", "additionalProperties": true, "required": ["source", "target", "semantics"], "properties": { "source": { "$ref": "#/$defs/refList" }, "target": { "$ref": "#/$defs/refList" }, "semantics": { "$ref": "#/$defs/nonEmpty" } } } }, "preserves": { "type": "array", "minItems": 1, "uniqueItems": true, "items": { "$ref": "#/$defs/id" } }, "focusOrder": { "$ref": "#/$defs/refList" }, "readingOrder": { "$ref": "#/$defs/refList" }, "stateTransfer": { "oneOf": [{ "$ref": "#/$defs/nonEmpty" }, { "$ref": "#/$defs/extensionObject" }] }, "history": { "oneOf": [{ "$ref": "#/$defs/nonEmpty" }, { "$ref": "#/$defs/extensionObject" }] } } }, "interaction": { "type": "object", "additionalProperties": true, "required": ["stateMachines"], "properties": { "stateMachines": { "type": "array", "items": { "$ref": "#/$defs/stateMachine" } } } }, "stateMachine": { "type": "object", "additionalProperties": true, "required": ["id", "initial", "states", "transitions"], "properties": { "id": { "$ref": "#/$defs/id" }, "scope": { "$ref": "#/$defs/ref" }, "initial": { "$ref": "#/$defs/id" }, "states": { "type": "array", "minItems": 1, "uniqueItems": true, "items": { "$ref": "#/$defs/id" } }, "transitions": { "type": "array", "items": { "$ref": "#/$defs/transition" } } } }, "transition": { "type": "object", "additionalProperties": true, "required": ["id", "from", "event"], "anyOf": [{ "required": ["to"] }, { "required": ["outcomes"] }, { "required": ["effects"] }], "properties": { "id": { "$ref": "#/$defs/id" }, "from": { "oneOf": [{ "$ref": "#/$defs/id" }, { "type": "array", "items": { "$ref": "#/$defs/id" } }] }, "event": { "oneOf": [{ "$ref": "#/$defs/id" }, { "type": "object", "additionalProperties": true, "required": ["type", "source"], "properties": { "type": { "$ref": "#/$defs/id" }, "source": { "$ref": "#/$defs/ref" } } }] }, "guard": { "oneOf": [{ "$ref": "#/$defs/nonEmpty" }, { "$ref": "#/$defs/extensionObject" }] }, "pending": { "$ref": "#/$defs/extensionObject" }, "outcomes": { "oneOf": [{ "type": "array", "minItems": 1, "items": { "$ref": "#/$defs/extensionObject" } }, { "type": "object", "minProperties": 1, "additionalProperties": { "$ref": "#/$defs/extensionObject" } }] }, "to": { "$ref": "#/$defs/id" }, "effects": { "type": "array", "items": { "$ref": "#/$defs/extensionObject" } }, "feedback": { "$ref": "#/$defs/extensionObject" }, "focus": { "$ref": "#/$defs/extensionObject" }, "history": { "oneOf": [{ "$ref": "#/$defs/nonEmpty" }, { "$ref": "#/$defs/extensionObject" }] }, "concurrency": { "$ref": "#/$defs/extensionObject" }, "persistence": { "$ref": "#/$defs/extensionObject" } } }, "motion": { "type": "object", "additionalProperties": true, "required": ["sequences"], "properties": { "sequences": { "type": "array", "items": { "$ref": "#/$defs/motionSequence" } } } }, "motionSequence": { "type": "object", "additionalProperties": true, "required": ["sequenceId", "purpose", "driver", "scenes", "reducedMotion"], "properties": { "sequenceId": { "$ref": "#/$defs/id" }, "purpose": { "$ref": "#/$defs/nonEmpty" }, "driver": { "type": "object", "additionalProperties": true, "required": ["type"], "properties": { "type": { "enum": ["time", "user-event", "scroll-progress", "scroll-threshold", "view", "media", "data", "system"] }, "source": { "$ref": "#/$defs/nonEmpty" }, "range": { "$ref": "#/$defs/extensionObject" } } }, "scenes": { "type": "array", "minItems": 1, "items": { "$ref": "#/$defs/extensionObject" } }, "tracks": { "type": "array", "items": { "$ref": "#/$defs/extensionObject" } }, "pin": { "$ref": "#/$defs/extensionObject" }, "reentry": { "$ref": "#/$defs/nonEmpty" }, "reverse": { "$ref": "#/$defs/nonEmpty" }, "interruption": { "$ref": "#/$defs/nonEmpty" }, "reducedMotion": { "oneOf": [{ "$ref": "#/$defs/nonEmpty" }, { "$ref": "#/$defs/extensionObject" }] }, "fallback": { "oneOf": [{ "$ref": "#/$defs/nonEmpty" }, { "$ref": "#/$defs/extensionObject" }] } } }, "accessibility": { "type": "object", "additionalProperties": true, "required": ["profile", "elements"], "properties": { "profile": { "type": "object", "additionalProperties": true, "required": ["standard", "version", "level"], "properties": { "standard": { "const": "WCAG" }, "version": { "enum": ["2.1", "2.2"] }, "level": { "enum": ["A", "AA", "AAA"] }, "scope": { "$ref": "#/$defs/nonEmpty" } } }, "elements": { "type": "array", "items": { "$ref": "#/$defs/accessibilityElement" } }, "tests": { "type": "array", "items": { "$ref": "#/$defs/extensionObject" } } } }, "accessibilityElement": { "type": "object", "additionalProperties": true, "required": ["element"], "properties": { "element": { "$ref": "#/$defs/ref" }, "name": { "$ref": "#/$defs/nonEmpty" }, "description": { "$ref": "#/$defs/nonEmpty" }, "details": { "oneOf": [{ "$ref": "#/$defs/nonEmpty" }, { "$ref": "#/$defs/extensionObject" }] }, "readingOrder": { "oneOf": [{ "type": "integer", "minimum": 1 }, { "$ref": "#/$defs/refList" }] }, "reducedMotion": { "$ref": "#/$defs/nonEmpty" }, "testIds": { "$ref": "#/$defs/refList" } } }, "lifecycle": { "type": "object", "additionalProperties": true, "required": ["transferId", "contractRevision", "sourceRevision", "status", "owners", "requirements", "evidence", "deviations"], "properties": { "transferId": { "$ref": "#/$defs/id" }, "contractRevision": { "$ref": "#/$defs/nonEmpty" }, "sourceRevision": { "$ref": "#/$defs/nonEmpty" }, "targetRevision": { "$ref": "#/$defs/nonEmpty" }, "status": { "enum": ["draft", "review", "accepted", "implementing", "verified", "released", "superseded", "withdrawn", "handoff", "qa"] }, "owners": { "oneOf": [{ "type": "array", "minItems": 1, "items": { "$ref": "#/$defs/owner" } }, { "type": "object", "minProperties": 1, "additionalProperties": { "$ref": "#/$defs/nonEmpty" } }] }, "requirements": { "oneOf": [{ "type": "array", "minItems": 1, "items": { "$ref": "#/$defs/requirement" } }, { "$ref": "#/$defs/refList" }] }, "evidence": { "oneOf": [{ "type": "array", "items": { "$ref": "#/$defs/evidence" } }, { "type": "object", "minProperties": 1, "additionalProperties": { "type": "array", "items": { "$ref": "#/$defs/nonEmpty" } } }] }, "deviations": { "type": "array", "items": { "$ref": "#/$defs/deviation" } } } }, "owner": { "oneOf": [{ "$ref": "#/$defs/nonEmpty" }, { "type": "object", "additionalProperties": true, "required": ["id", "role"], "properties": { "id": { "$ref": "#/$defs/id" }, "role": { "$ref": "#/$defs/nonEmpty" } } }] }, "requirement": { "type": "object", "additionalProperties": true, "required": ["id", "statement", "status"], "properties": { "id": { "$ref": "#/$defs/id" }, "statement": { "$ref": "#/$defs/nonEmpty" }, "status": { "enum": ["draft", "accepted", "verified", "failed", "waived"] }, "evidence": { "$ref": "#/$defs/refList" } } }, "evidence": { "type": "object", "additionalProperties": true, "required": ["id", "kind", "uri"], "properties": { "id": { "$ref": "#/$defs/id" }, "kind": { "$ref": "#/$defs/id" }, "uri": { "$ref": "#/$defs/uriReference" }, "createdAt": { "type": "string", "format": "date-time" } } }, "deviation": { "type": "object", "additionalProperties": true, "required": ["id", "requirement", "scope", "reason", "impact", "mitigation", "owner", "status"], "properties": { "id": { "$ref": "#/$defs/id" }, "requirement": { "$ref": "#/$defs/ref" }, "scope": { "$ref": "#/$defs/refList" }, "reason": { "$ref": "#/$defs/nonEmpty" }, "impact": { "$ref": "#/$defs/nonEmpty" }, "mitigation": { "$ref": "#/$defs/nonEmpty" }, "owner": { "$ref": "#/$defs/owner" }, "status": { "enum": ["proposed", "accepted", "rejected", "resolved", "expired"] }, "reviewDate": { "type": "string", "format": "date" }, "evidence": { "$ref": "#/$defs/refList" } } }, "exception": { "type": "object", "additionalProperties": true, "required": ["id", "requirement", "scope", "reason", "impact", "mitigation", "owner", "status"], "properties": { "id": { "$ref": "#/$defs/id" }, "requirement": { "$ref": "#/$defs/ref" }, "scope": { "$ref": "#/$defs/refList" }, "reason": { "$ref": "#/$defs/nonEmpty" }, "impact": { "$ref": "#/$defs/nonEmpty" }, "mitigation": { "$ref": "#/$defs/nonEmpty" }, "owner": { "$ref": "#/$defs/owner" }, "status": { "enum": ["proposed", "accepted", "rejected", "resolved", "expired"] }, "reviewDate": { "type": "string", "format": "date" }, "evidence": { "$ref": "#/$defs/refList" } } }, "openQuestion": { "type": "object", "additionalProperties": true, "required": ["id", "question", "owner", "blocking", "status", "fallback"], "properties": { "id": { "$ref": "#/$defs/id" }, "scopeRef": { "$ref": "#/$defs/ref" }, "question": { "$ref": "#/$defs/nonEmpty" }, "owner": { "$ref": "#/$defs/owner" }, "blocking": { "type": "boolean" }, "status": { "enum": ["open", "investigating", "answered", "deferred", "closed"] }, "due": { "type": "string", "format": "date" }, "reviewAt": { "$ref": "#/$defs/nonEmpty" }, "fallback": { "$ref": "#/$defs/nonEmpty" }, "decisionLink": { "$ref": "#/$defs/uriReference" }, "scope": { "$ref": "#/$defs/refList" } }, "allOf": [{ "if": { "properties": { "status": { "enum": ["open", "investigating", "deferred"] } }, "required": ["status"] }, "then": { "anyOf": [{ "required": ["due"] }, { "required": ["reviewAt"] }] } }, { "if": { "properties": { "status": { "enum": ["answered", "closed"] } }, "required": ["status"] }, "then": { "required": ["decisionLink"] } }], "anyOf": [{ "required": ["scopeRef"] }, { "required": ["scope"] }] }, "capabilities": { "type": "object", "additionalProperties": true, "required": ["profiles"], "properties": { "profiles": { "type": "array", "minItems": 1, "items": { "$ref": "#/$defs/capabilityProfile" } } } }, "capabilityProfile": { "type": "object", "additionalProperties": true, "required": ["id", "target"], "properties": { "id": { "$ref": "#/$defs/id" }, "target": { "type": "object", "additionalProperties": true, "required": ["platform"], "properties": { "platform": { "$ref": "#/$defs/id" }, "runtime": { "$ref": "#/$defs/nonEmpty" } } }, "essentialExperience": { "type": "array", "uniqueItems": true, "items": { "$ref": "#/$defs/ref" } }, "supports": { "type": "array", "uniqueItems": true, "items": { "$ref": "#/$defs/id" } }, "unsupported": { "type": "array", "items": { "type": "object", "additionalProperties": true, "required": ["capability", "fallback"], "properties": { "capability": { "$ref": "#/$defs/id" }, "fallback": { "$ref": "#/$defs/nonEmpty" }, "owner": { "$ref": "#/$defs/owner" } } } }, "assets": { "type": "array", "items": { "type": "object", "additionalProperties": true, "required": ["element"], "properties": { "element": { "$ref": "#/$defs/ref" }, "width": { "type": "number", "exclusiveMinimum": 0 }, "height": { "type": "number", "exclusiveMinimum": 0 }, "formats": { "type": "array", "uniqueItems": true, "items": { "$ref": "#/$defs/id" } }, "quality": { "oneOf": [{ "type": "number", "minimum": 0, "maximum": 100 }, { "$ref": "#/$defs/nonEmpty" }] }, "artDirection": { "$ref": "#/$defs/nonEmpty" }, "loading": { "type": "object", "additionalProperties": true, "properties": { "priority": { "$ref": "#/$defs/id" }, "poster": { "oneOf": [{ "$ref": "#/$defs/uriReference" }, { "type": "null" }] }, "strategy": { "$ref": "#/$defs/nonEmpty" } } } } } }, "data": { "type": "object", "additionalProperties": true, "properties": { "expectedItems": { "type": "integer", "minimum": 0 }, "maximumItems": { "type": "integer", "minimum": 0 }, "virtualizeAfter": { "type": "integer", "minimum": 1 }, "strategy": { "$ref": "#/$defs/nonEmpty" } } }, "conditions": { "type": "array", "uniqueItems": true, "items": { "enum": ["low-bandwidth", "offline", "data-saver", "low-power"] } }, "budgets": { "type": "array", "items": { "type": "object", "additionalProperties": true, "required": ["metric", "limit", "owner", "measureAt"], "properties": { "metric": { "$ref": "#/$defs/id" }, "limit": { "type": "number", "exclusiveMinimum": 0 }, "unit": { "$ref": "#/$defs/nonEmpty" }, "owner": { "$ref": "#/$defs/owner" }, "measureAt": { "$ref": "#/$defs/nonEmpty" } } } } } }, "treeMap": { "type": "object", "minProperties": 1, "additionalProperties": { "type": "array", "items": { "$ref": "#/$defs/ref" } } } } };
var supportedVersions = { "contractVersion": "0.2.0", "methodologyVersion": "0.15.0", "rulesVersion": "0.5.1" };
export {
  bridgeSchema,
  bridge_standalone_default as default,
  supportedVersions,
  validate
};
