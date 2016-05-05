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
  if (!opts.hasOwnProperty("usernames")) opts.usernames = [];
  if (typeof(opts.usernames) == "string") opts.usernames = [opts.usernames];
  if(opts.hasOwnProperty("username")) opts.usernames.push(opts.username);

  //(2) get info
  res = [];

  if (opts.usernames.length > 0) {
    let passwd = new File("/etc/passwd").text.split("\n");

    for (let usr of opts.usernames) {
      for (let ln of passwd) {
        if (ln.startsWith(usr + ":")) {
          let info = /^.+:.*:(.+):(.+):(.*):(.*):(.*)/.exec(ln).slice(1, 6)

          res.push({
            username: usr,
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
