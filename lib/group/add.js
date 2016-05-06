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
  if (opts.system) args.push("--system");
  if (opts.hasOwnProperty("gid")) args.push("--gid"), args.push(opts.gid);
  args.push(opts.name);

  //(3) add user
  res = child_process.spawnSync("addgroup", args);

  if (opts.output) console.log(res.stdout.toString());
  if (res.status) throw new Error(res.stderr.toString());

  //(4) return
  return res.status;
}
