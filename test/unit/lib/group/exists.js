//imports
const child_process = require("child_process");
const path = require("path");
const justo = require("justo");
const suite = justo.suite;
const test = justo.test;
const init = justo.init;
const fin = justo.fin;
const op = require("../../../../dist/es5/nodejs/justo-plugin-linuxuser/lib/group/exists").default;

//suite
suite("#op()", function() {
  const DATA = "test/unit/data";
  const GROUPNAME = "teting";

  init({name: "*", title: "Add test group"}, function() {
    child_process.spawnSync("addgroup", [GROUPNAME]).status.must.be.eq(0);
  });

  fin({name: "*", title: "Remove test group"}, function() {
    child_process.spawnSync("delgroup", [GROUPNAME]).status.must.be.eq(0);
  });

  test("exists({groupname}) : true", function() {
    op([{
      groupname: GROUPNAME
    }]).must.be.eq(true);
  });

  test("exists({groupname}) : false", function() {
    op([{
      groupname: "unknown"
    }]).must.be.eq(false);
  });

  test("exists({groupnames})", function() {
    op([{
      groupnames: [GROUPNAME, "users"]
    }]).must.be.eq(true);
  });

  test("exists({groupnames}) : some existing", function() {
    op([{
      groupnames: [GROUPNAME, "unknown"]
    }]).must.be.eq(false);
  });

  test("exists({groupnames}) : none existing", function() {
    op([{
      groupnames: ["unknown1", "unknown2"]
    }]).must.be.eq(false);
  });
})();
