//imports
const path = require("path");
const justo = require("justo");
const suite = justo.suite;
const test = justo.test;
const init = justo.init;
const fin = justo.fin;
const op = require("../../../../dist/es5/nodejs/justo-plugin-linuxuser/lib/user/info").default;

//suite
suite("#op()", function() {
  const DATA = "test/unit/data";

  test("info({})", function() {
    op([{}]).must.be.eq([]);
  });

  test("info({name})", function() {
    op([{name: "root"}]).must.be.eq([
      {name: "root", uid: 0, gid: 0, home: "/root", shell: "/bin/bash"}
    ]);
  });

  test("info({names})", function() {
    op([{names: ["root", "daemon"]}]).must.be.eq([
      {name: "root", uid: 0, gid: 0, home: "/root", shell: "/bin/bash"},
      {name: "daemon", uid: 1, gid: 1, home: "/usr/sbin", shell: "/bin/sh"}
    ]);
  });

  test("info({names}) : []", function() {
    op([{names: ["root2", "daemon2"]}]).must.be.eq([]);
  });
})();
