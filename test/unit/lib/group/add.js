//imports
const child_process = require("child_process");
const path = require("path");
const justo = require("justo");
const suite = justo.suite;
const test = justo.test;
const init = justo.init;
const fin = justo.fin;
const op = require("../../../../dist/es5/nodejs/justo-plugin-linuxuser/lib/group/add").default;

//suite
suite("#op()", function() {
  const DATA = "test/unit/data";
  const GROUPNAME = "testing";

  fin({name: "*", title: "Remove test group"}, function() {
    child_process.spawnSync("delgroup", [GROUPNAME]).status.must.be.eq(0);
  });

  test("add({name})", function() {
    op([{
      name: GROUPNAME
    }]).must.be.eq(0);

    child_process.spawnSync("grep", ["-q", `^${GROUPNAME}:`, "/etc/group"]).status.must.be.eq(0);
  });

  test("add({name, gid})", function() {
    op([{
      name: GROUPNAME,
      gid: 1234321
    }]).must.be.eq(0);

    child_process.spawnSync("grep", ["-q", `^${GROUPNAME}:x:1234321:`, "/etc/group"]).status.must.be.eq(0);
  });
})();
