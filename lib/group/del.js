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
  if (!opts.groupname) throw new Error("groupname expected.");

  //(2) get deluser options
  args = [];
  if (opts.onlyIfEmpty) args.push("--only-if-empty");
  args.push(opts.groupname);

  //(3) add user
  res = child_process.spawnSync("delgroup", args);

  if (opts.output) console.log(res.stdout.toString());
  if (res.status) throw new Error(res.stderr.toString());

  //(4) return
  return res.status;
}
