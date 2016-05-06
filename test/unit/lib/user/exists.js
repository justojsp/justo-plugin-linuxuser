//imports
const path = require("path");
const justo = require("justo");
const suite = justo.suite;
const test = justo.test;
const init = justo.init;
const fin = justo.fin;
const op = require("../../../../dist/es5/nodejs/justo-plugin-linuxuser/lib/user/exists").default;

//suite
suite("#op()", function() {
  const DATA = "test/unit/data";

  test("exists({}) : true", function() {
    op([{}]).must.be.eq(false);
  });

  test("exists({name}) : true", function() {
    op([{name: "daemon"}]).must.be.eq(true);
  });

  test("exists({names}) : true", function() {
    op([{names: ["root", "daemon"]}]).must.be.eq(true);
  });

  test("exists({names}) : false - someone existing", function() {
    op([{names: ["daemon", "unknown"]}]).must.be.eq(false);
  });

  test("exists({names}) : false - none existing", function() {
    op([{names: ["unknown1", "unknown2"]}]).must.be.eq(false);
  });
})();
