//imports
const justo = require("justo");
const suite = justo.suite;
const test = justo.test;
const pkg = require("../../dist/es5/nodejs/justo-plugin-linuxuser");

//suite
suite("API", function() {
  suite("user", function() {
    test("add", function() {
      pkg.user.add.must.be.instanceOf(Function);
    });

    test("del", function() {
      pkg.user.del.must.be.instanceOf(Function);
    });

    test("exists", function() {
      pkg.user.exists.must.be.instanceOf(Function);
    });

    test("info", function() {
      pkg.user.info.must.be.instanceOf(Function);
    });

    test("lock", function() {
      pkg.user.lock.must.be.instanceOf(Function);
    });

    test("mod", function() {
      pkg.user.mod.must.be.instanceOf(Function);
    });

    test("remove", function() {
      pkg.user.remove.must.be.same(pkg.user.del);
    });

    test("unlock", function() {
      pkg.user.unlock.must.be.instanceOf(Function);
    });
  });

  suite("group", function() {
    test("add", function() {
      pkg.group.add.must.be.instanceOf(Function);
    });

    test("del", function() {
      pkg.group.del.must.be.instanceOf(Function);
    });

    test("exists", function() {
      pkg.group.exists.must.be.instanceOf(Function);
    });

    test("info", function() {
      pkg.group.info.must.be.instanceOf(Function);
    });

    test("remove", function() {
      pkg.group.remove.must.be.same(pkg.user.del);
    });
  });
})();
