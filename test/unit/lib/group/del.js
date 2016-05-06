//imports
const child_process = require("child_process");
const path = require("path");
const justo = require("justo");
const suite = justo.suite;
const test = justo.test;
const init = justo.init;
const fin = justo.fin;
const op = require("../../../../dist/es5/nodejs/justo-plugin-linuxuser/lib/group/del").default;

//suite
suite("#op()", function() {
  const DATA = "test/unit/data";
  const GROUPNAME = "testing";

  init({name: "*", title: "Add test group"}, function() {
    child_process.spawnSync("addgroup", [GROUPNAME]).status.must.be.eq(0);
  });

  test("del({name})", function() {
    op([{
      name: GROUPNAME
    }]).must.be.eq(0);

    child_process.spawnSync("grep", ["-q", `^${GROUPNAME}:`, "/etc/group"]).status.must.not.be.eq(0);
  });

  test("del({name, onlyIfEmpty})", function() {
    op([{
      name: [GROUPNAME],
      onlyIfEmpty: true
    }]).must.be.eq(0);

    child_process.spawnSync("grep", ["-q", `^${GROUPNAME}:`, "/etc/group"]).status.must.not.be.eq(0);
  });
})();
