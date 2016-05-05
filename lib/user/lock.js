//imports
import child_process from "child_process";

/**
 * Task operation.
 */
export default function op(params) {
  var opts, res;

  //(1) arguments
  if (params.length >= 1) opts = params[0];
  if (!opts) opts = {};
  if (!opts.username) throw new Error("username expected.");

  //(2) lock user
  res = child_process.spawnSync("usermod", ["--lock", opts.username]);

  if (opts.output) console.log(res.stdout.toString());
  if (res.status !== 0) throw new Error(res.error.toString());

  //(4) return
  return res.status;
}
