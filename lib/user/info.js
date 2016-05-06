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
  if (!opts.hasOwnProperty("names")) opts.names = [];
  if (typeof(opts.names) == "string") opts.names = [opts.names];
  if(opts.hasOwnProperty("name")) opts.names.push(opts.name);

  //(2) get info
  res = [];

  if (opts.names.length > 0) {
    let passwd = new File("/etc/passwd").text.split("\n");

    for (let usr of opts.names) {
      for (let ln of passwd) {
        if (ln.startsWith(usr + ":")) {
          let info = /^.+:.*:(.+):(.+):(.*):(.*):(.*)/.exec(ln).slice(1, 6)

          res.push({
            name: usr,
            uid: parseInt(info[0]),
            gid: parseInt(info[1]),
            home: info[3],
            shell: info[4]
          });

          break;
        }
      }
    }
  }

  //(3) return
  return res;
}
