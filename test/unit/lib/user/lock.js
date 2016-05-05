//imports
const child_process = require("child_process");
const path = require("path");
const justo = require("justo");
const suite = justo.suite;
const test = justo.test;
const init = justo.init;
const fin = justo.fin;
const op = require("../../../../dist/es5/nodejs/justo-plugin-linuxuser/lib/user/lock").default;

//suite
suite("#op()", function() {
  const DATA = "test/unit/data";
  const USERNAME = "testing";

  init({name: "*", title: "Create test user"}, function() {
    child_process.spawnSync("adduser", [USERNAME]).status.must.be.eq(0);
  });

  fin({name: "*", title: "Delete test user"}, function() {
    child_process.spawnSync("deluser", ["--remove-home", "--remove-all-files", USERNAME]).status.must.be.eq(0);
  });

  test("lock({username})", function() {
    op([{
      username: USERNAME
    }]).must.be.eq(0);

    child_process.spawnSync("grep", ["-q", `^${USERNAME}:!:`, "/etc/shadow"]).status.must.be.eq(0);
  });
})();
