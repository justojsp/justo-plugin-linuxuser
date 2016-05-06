//imports
import child_process from "child_process";

/**
 * Task operation.
 */
export default function op(params) {
  var opts, args, res;

  //(1) arguments
  if (params.length >= 1) opts = Object.assign({}, params[0]);
  if (!opts) opts = {};
  if (!opts.name) throw new Error("name expected.");

  //(2) get adduser options
  args = [];

  if (opts.home === false) args.push("--no-create-home");
  else if (typeof(opts.home) == "string") args.push("--home"), args.push(opts.home);

  if (opts.password === false) args.push("--disabled-password");
  if (opts.system) args.push("--system");
  if (opts.shell) args.push("--shell"), args.push(opts.shell);
  if (opts.hasOwnProperty("uid")) args.push("--uid"), args.push(opts.uid);
  if (typeof(opts.group) == "number") args.push("--gid"), args.push(opts.group);
  else if (typeof(opts.group) == "string") args.push("--ingroup"), args.push(opts.group);

  if (opts.login === false) args.push("--disabled-login");
  args.push(opts.name);

  //(3) add user
  res = child_process.spawnSync("adduser", args);

  if (opts.output) console.log(res.stdout.toString());
  if (res.status) throw new Error(res.stderr.toString());

  //(4) return
  return res.status;
}
