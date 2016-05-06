"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = 





op;var _child_process = require("child_process");var _child_process2 = _interopRequireDefault(_child_process);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function op(params) {
  var opts, args, res;


  if (params.length >= 1) opts = params[0];
  if (!opts) opts = {};
  if (!opts.name) throw new Error("name expected.");


  args = [];
  if (opts.onlyIfEmpty) args.push("--only-if-empty");
  args.push(opts.name);


  res = _child_process2.default.spawnSync("delgroup", args);

  if (opts.output) console.log(res.stdout.toString());
  if (res.status) throw new Error(res.stderr.toString());


  return res.status;}