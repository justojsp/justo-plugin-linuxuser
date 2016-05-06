"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = 





op;var _child_process = require("child_process");var _child_process2 = _interopRequireDefault(_child_process);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function op(params) {
  var opts, args, res;


  if (params.length >= 1) opts = Object.assign({}, params[0]);
  if (!opts) opts = {};
  if (!opts.name) throw new Error("name expected.");


  args = [];

  if (opts.home === false) args.push("--no-create-home");else 
  if (typeof opts.home == "string") args.push("--home"), args.push(opts.home);

  if (opts.password === false) args.push("--disabled-password");
  if (opts.system) args.push("--system");
  if (opts.shell) args.push("--shell"), args.push(opts.shell);
  if (opts.hasOwnProperty("uid")) args.push("--uid"), args.push(opts.uid);
  if (typeof opts.group == "number") args.push("--gid"), args.push(opts.group);else 
  if (typeof opts.group == "string") args.push("--ingroup"), args.push(opts.group);

  if (opts.login === false) args.push("--disabled-login");
  args.push(opts.name);


  res = _child_process2.default.spawnSync("adduser", args);

  if (opts.output) console.log(res.stdout.toString());
  if (res.status) throw new Error(res.stderr.toString());


  return res.status;}