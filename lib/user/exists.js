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
  if (opts.usernames.length === 0) {
    res = false;
  } else {
    let passwd = new File("/etc/passwd").text.split("\n");

    res = true;

    for (let usr of opts.usernames) {
      let exists = false;

      for (let ln of passwd) {
        if (ln.startsWith(usr + ":")) {
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
