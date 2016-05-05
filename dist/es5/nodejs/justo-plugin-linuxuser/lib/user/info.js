"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = 






op;var _justoFs = require("justo-fs");var _child_process = require("child_process");var _child_process2 = _interopRequireDefault(_child_process);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function op(params) {
  var opts, res;


  if (params.length >= 1) opts = Object.assign({}, params[0]);
  if (!opts) opts = {};
  if (!opts.hasOwnProperty("usernames")) opts.usernames = [];
  if (typeof opts.usernames == "string") opts.usernames = [opts.usernames];
  if (opts.hasOwnProperty("username")) opts.usernames.push(opts.username);


  res = [];

  if (opts.usernames.length > 0) {
    var passwd = new _justoFs.File("/etc/passwd").text.split("\n");var _iteratorNormalCompletion = true;var _didIteratorError = false;var _iteratorError = undefined;try {

      for (var _iterator = opts.usernames[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {var usr = _step.value;var _iteratorNormalCompletion2 = true;var _didIteratorError2 = false;var _iteratorError2 = undefined;try {
          for (var _iterator2 = passwd[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {var ln = _step2.value;
            if (ln.startsWith(usr + ":")) {
              var info = /^.+:.*:(.+):(.+):(.*):(.*):(.*)/.exec(ln).slice(1, 6);

              res.push({ 
                username: usr, 
                uid: parseInt(info[0]), 
                gid: parseInt(info[1]), 
                home: info[3], 
                shell: info[4] });


              break;}}} catch (err) {_didIteratorError2 = true;_iteratorError2 = err;} finally {try {if (!_iteratorNormalCompletion2 && _iterator2.return) {_iterator2.return();}} finally {if (_didIteratorError2) {throw _iteratorError2;}}}}} catch (err) {_didIteratorError = true;_iteratorError = err;} finally {try {if (!_iteratorNormalCompletion && _iterator.return) {_iterator.return();}} finally {if (_didIteratorError) {throw _iteratorError;}}}}






  return res;}