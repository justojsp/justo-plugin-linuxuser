//imports
import child_process from "child_process";

/**
 * Task operation.
 */
export default function op(params) {
  var opts, args, res;

  //(1) arguments
  if (params.length >= 1) opts = params[0];
  if (!opts) opts = {};
  if (!opts.username) throw new Error("username expected.");
  if (typeof(opts.groups) == "string") opts.groups = [opts.groups];

  //(2) get deluser options
  args = [];
  if (opts.password) args.push("--password"), args.push(opts.password);
  if (opts.groups) args.push("-G"), args.push(opts.groups.join(","));
  if (opts.home) args.push("--home"), args.push(opts.home);
  if (opts.shell) args.push("--shell"), args.push(opts.shell);
  if (opts.lock) args.push("--lock");
  if (opts.unlock) args.push("--unlock");
  args.push(opts.username);

  //(3) add user
  res = child_process.spawnSync("usermod", args);

  if (opts.output) console.log(res.stdout.toString());
  if (res.status) throw new Error(res.stderr.toString());

  //(4) return
  return res.status;
}
