//imports
import {File} from "justo-fs";
import child_process from "child_process";

/**
 * Task operation.
 */
export default function op(params) {
  var opts, res;

  //(1) arguments
  if (params.length >= 1) opts = Object.assign({}, params[0]);
  if (!opts) opts = {};
  if (!opts.hasOwnProperty("groupnames")) opts.groupnames = [];
  if (typeof(opts.groupnames) == "string") opts.groupnames = [opts.groupnames];
  if(opts.hasOwnProperty("groupname")) opts.groupnames.push(opts.groupname);

  //(2) get info
  if (opts.groupnames.length === 0) {
    res = false;
  } else {
    let group = new File("/etc/group").text.split("\n");

    res = true;

    for (let grp of opts.groupnames) {
      let exists = false;

      for (let ln of group) {
        if (ln.startsWith(grp + ":")) {
          exists = true;
          break;
        }
      }

      if (!exists) {
        res = false;
        break;
      }
    }
  }

  //(3) return
  return res;
}
