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
  res = [];

  if (opts.groupnames.length > 0) {
    let group = new File("/etc/group").text.split("\n");

    for (let grp of opts.groupnames) {
      for (let ln of group) {
        if (ln.startsWith(grp + ":")) {
          let info = /^.+:.*:(.+):(.*)/.exec(ln).slice(1, 3);

          res.push({
            groupname: grp,
            gid: parseInt(info[0]),
            members: info[1].split(",")
          });

          break;
        }
      }
    }
  }

  //(3) return
  return res;
}
