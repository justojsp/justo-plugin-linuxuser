//imports
const child_process = require("child_process");
const path = require("path");
const justo = require("justo");
const suite = justo.suite;
const test = justo.test;
const init = justo.init;
const fin = justo.fin;
const op = require("../../../../dist/es5/nodejs/justo-plugin-linuxuser/lib/user/del").default;

//suite
suite("#op()", function() {
  const DATA = "test/unit/data";
  const USERNAME = "testing";

  init({name: "*", title: "Create user to remove"}, function() {
    var res = child_process.spawnSync("adduser", [USERNAME]);
    if (res.status) throw new Error(res.stderr.toString());
  });

  test("del({username})", function() {
    op([{
      username: USERNAME
    }]).must.be.eq(0);
  });

  test("del({username, remove})", function() {
    op([{
      username: USERNAME,
      remove: {home: true, files: true}
    }]).must.be.eq(0);
  });

  test("del({username, remove, backup})", function() {
    op([{
      username: USERNAME,
      remove: {home: true, files: true, backup: true}
    }]).must.be.eq(0);
  });

  test("del({username, force})", function() {
    op([{
      username: USERNAME,
      force: true
    }]).must.be.eq(0);
  });
})();
