//imports
const child_process = require("child_process");
const path = require("path");
const justo = require("justo");
const suite = justo.suite;
const test = justo.test;
const init = justo.init;
const fin = justo.fin;
const op = require("../../../../dist/es5/nodejs/justo-plugin-linuxuser/lib/group/info").default;

//suite
suite("#op()", function() {
  const DATA = "test/unit/data";
  const GROUPNAME = "testing";

  test("info({name})", function() {
    var res = op([{name: "users"}]);
    res.must.be.instanceOf(Array);
    res.length.must.be.eq(1);
    res[0].name.must.be.eq("users");
    res[0].gid.must.be.eq(100);
    res[0].members.must.be.instanceOf(Array);
  });

  test("info({names:string})", function() {
    var res = op([{names: ["users"]}]);
    res.must.be.instanceOf(Array);
    res.length.must.be.eq(1);
    res[0].name.must.be.eq("users");
    res[0].gid.must.be.eq(100);
    res[0].members.must.be.instanceOf(Array);
  });

  init({name: "info({names:string[]})", title: "Add test group"}, function() {
    child_process.spawnSync("addgroup", ["--gid", 1234321, GROUPNAME]).status.must.be.eq(0);
  });

  fin({name: "info({names:string[]})", title: "Remove test group"}, function() {
    child_process.spawnSync("delgroup", [GROUPNAME]).status.must.be.eq(0);
  });

  test("info({names:string[]})", function() {
    var res = op([{names: ["users", GROUPNAME]}]);
    res.must.be.instanceOf(Array);
    res.length.must.be.eq(2);
  });
})();
