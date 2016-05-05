"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = 





op;var _child_process = require("child_process");var _child_process2 = _interopRequireDefault(_child_process);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function op(params) {
  var opts, res;


  if (params.length >= 1) opts = params[0];
  if (!opts) opts = {};
  if (!opts.username) throw new Error("username expected.");


  res = _child_process2.default.spawnSync("usermod", ["--unlock", opts.username]);

  if (opts.output) console.log(res.stdout.toString());
  if (res.status) throw new Error(res.stderr.toString());


  return res.status;}