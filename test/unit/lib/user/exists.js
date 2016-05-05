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

  test("exists({username}) : true", function() {
    op([{username: "daemon"}]).must.be.eq(true);
  });

  test("exists({usernames}) : true", function() {
    op([{usernames: ["root", "daemon"]}]).must.be.eq(true);
  });

  test("exists({usernames}) : false - someone existing", function() {
    op([{usernames: ["daemon", "unknown"]}]).must.be.eq(false);
  });

  test("exists({usernames}) : false - none existing", function() {
    op([{usernames: ["unknown1", "unknown2"]}]).must.be.eq(false);
  });
})();
