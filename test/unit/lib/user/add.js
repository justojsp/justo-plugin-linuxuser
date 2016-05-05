//imports
const child_process = require("child_process");
const dir = require("justo-assert-fs").dir;
const path = require("path");
const justo = require("justo");
const suite = justo.suite;
const test = justo.test;
const init = justo.init;
const fin = justo.fin;
const op = require("../../../../dist/es5/nodejs/justo-plugin-linuxuser/lib/user/add").default;

//suite
suite("#op()", function() {
  const DATA = "test/unit/data";
  const USERNAME = "testing";

  fin({name: "*", title: "Remove test user"}, function() {
    child_process.spawnSync("deluser", ["--remove-home", "--remove-all-files", USERNAME]).status.must.be.eq(0);
  });

  test("add({username})", function() {
    op([{username: USERNAME}]).must.be.eq(0);
    dir("/home", USERNAME).must.exist();
    child_process.spawnSync("grep", [`^${USERNAME}:`, "/etc/passwd"]).stdout.toString().must.match(
      /^testing:x:.+:.+:,,,:\/home\/testing:\/bin\/bash/
    );
  });

  test("add({username, uid})", function() {
    op([{username: USERNAME, uid: 1234321}]).must.be.eq(0);
    dir("/home", USERNAME).must.exist();
    child_process.spawnSync("grep", [`^${USERNAME}:x:1234321:`, "/etc/passwd"]).stdout.toString().must.match(
      /^testing:x:.+:.+:,,,:\/home\/testing:\/bin\/bash/
    );
  });

  test("add({username, shell, home, login})", function() {
    op([{username: USERNAME, home: "/home/anotherHome", shell: "/bin/sh"}]).must.be.eq(0);
    dir("/home/anotherHome").must.exist();
    child_process.spawnSync("grep", [`^${USERNAME}:`, "/etc/passwd"]).stdout.toString().must.match(
      /^testing:x:.+:.+:,,,:\/home\/anotherHome:\/bin\/sh/
    );
  });

  test("add({username, home:false})", function() {
    op([{username: USERNAME, home: false}]).must.be.eq(0);
    dir("/home", USERNAME).must.not.exist();
    child_process.spawnSync("grep", [`^${USERNAME}:`, "/etc/passwd"]).stdout.toString().must.match(
      /^testing:x:.+:.+:,,,:\/home\/testing:\/bin\/bash/
    );
  });

  test("add({username, login:false})", function() {
    op([{username: USERNAME, login: false}]).must.be.eq(0);
    dir("/home", USERNAME).must.exist();
    child_process.spawnSync("grep", [`^${USERNAME}:`, "/etc/passwd"]).stdout.toString().must.match(
      /^testing:x:.+:.+:,,,:\/home\/testing:\/bin\/bash/
    );
  });

  test("add({username, group:string})", function() {
    op([{username: USERNAME, group: "users"}]).must.be.eq(0);
    dir("/home", USERNAME).must.exist();
    child_process.spawnSync("grep", [`^${USERNAME}:`, "/etc/passwd"]).stdout.toString().must.match(
      /^testing:x:.+:100:,,,:\/home\/testing:\/bin\/bash/
    );
  });

  test("add({username, group:number})", function() {
    op([{username: USERNAME, group: 100}]).must.be.eq(0);
    dir("/home", USERNAME).must.exist();
    child_process.spawnSync("grep", [`^${USERNAME}:`, "/etc/passwd"]).stdout.toString().must.match(
      /^testing:x:.+:100:,,,:\/home\/testing:\/bin\/bash/
    );
  });

  test("add({username, uid:number, group:number})", function() {
    op([{username: USERNAME, uid:111222, group: 100}]).must.be.eq(0);
    dir("/home", USERNAME).must.exist();
    child_process.spawnSync("grep", [`^${USERNAME}:`, "/etc/passwd"]).stdout.toString().must.match(
      /^testing:x:111222:100:,,,:\/home\/testing:\/bin\/bash/
    );
  });
})();
