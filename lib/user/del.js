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

  //(2) get deluser options
  args = [];
  if (opts.force) args.push("--force");
  if (opts.backup) args.push("--backup");
  if (opts.remove) {
    if (opts.remove.home) args.push("--remove-home");
    if (opts.remove.files) args.push("--remove-all-files");
  }
  args.push(opts.username);

  //(3) add user
  res = child_process.spawnSync("deluser", args);

  if (opts.output) console.log(res.stdout.toString());
  if (res.status) throw new Error(res.stderr.toString());

  //(4) return
  return res.status;
}
