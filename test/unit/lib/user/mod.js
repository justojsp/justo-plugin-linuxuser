//imports
const child_process = require("child_process");
const path = require("path");
const justo = require("justo");
const suite = justo.suite;
const test = justo.test;
const init = justo.init;
const fin = justo.fin;
const op = require("../../../../dist/es5/nodejs/justo-plugin-linuxuser/lib/user/mod").default;

//suite
suite("#op()", function() {
  const DATA = "test/unit/data";
  const USERNAME = "testing";

  init({name: "*", title: "Create test user"}, function() {
    child_process.spawnSync("adduser", [USERNAME]).status.must.be.eq(0);
  });

  fin({name: "*", title: "Remove test user"}, function() {
    child_process.spawnSync("deluser", ["--remove-home", "--remove-all-files", USERNAME]).status.must.be.eq(0);
  });

  test("mod({name, lock})", function() {
    op([{
      name: USERNAME,
      lock: true
    }]).must.be.eq(0);

    child_process.spawnSync("grep", ["-q", `^${USERNAME}:!:`, "/etc/shadow"]).status.must.be.eq(0);
  });

  init({name: "mod({name, unlock})", title: "Lock user"}, function() {
    child_process.spawnSync("usermod", ["--lock", USERNAME]).status.must.be.eq(0);
  });

  test("mod({name, unlock})", function() {
    op([{
      name: USERNAME,
      unlock: true
    }]).must.be.eq(0);

    child_process.spawnSync("grep", ["-q", `^${USERNAME}:\*:`, "/etc/shadow"]).status.must.be.eq(0);
  });

  test("mod({name, home, shell})", function() {
    op([{
      name: USERNAME,
      home: "/home/anotherhome",
      shell: "/bin/sh"
    }]).must.be.eq(0);

    child_process.spawnSync("grep", ["-q", `^${USERNAME}:.*:/home/anotherhome:/bin/sh$`, "/etc/passwd"]).status.must.be.eq(0);
  });

  test("mod({name, password})", function() {
    op([{
      name: USERNAME,
      password: "newpwd"
    }]).must.be.eq(0);
  });

  test("mod({name, groups:string})", function() {
    op([{
      name: USERNAME,
      groups: "users"
    }]).must.be.eq(0);

    child_process.spawnSync("id", [USERNAME]).stdout.toString().must.match(/groups=.*\(users\)/);
  });

  test("mod({name, groups:string[]})", function() {
    op([{
      name: USERNAME,
      groups: ["users", "daemon"]
    }]).must.be.eq(0);

    var res = child_process.spawnSync("id", [USERNAME]).stdout.toString();
    res.must.match(/groups=.*\(users\)/);
    res.must.match(/groups=.*\(daemon\)/);
  });
})();
