//imports
import {simple} from "justo";

//internal data
const NS = "org.justojs.plugin.linux";
var useradd, userdel, userexists, userinfo, userlock, usermod, userunlock;
var groupadd, groupdel, groupexists, groupinfo;

//api
module.exports = {
  user: {
    get add() {
      if (!useradd) useradd = simple({ns: NS + ".user", name: "add"}, require("./lib/user/add").default);
      return useradd;
    },

    get del() {
      if (!userdel) userdel = simple({ns: NS + ".user", name: "del"}, require("./lib/user/del").default);
      return userdel;
    },

    get exists() {
      if (!userexists) userexists = simple({ns: NS + ".user", name: "exists"}, require("./lib/user/exists").default);
      return userexists;
    },

    get info() {
      if (!userinfo) userinfo = simple({ns: NS + ".user", name: "info"}, require("./lib/user/info").default);
      return userinfo;
    },

    get lock() {
      if (!userlock) userlock = simple({ns: NS + ".user", name: "lock"}, require("./lib/user/lock").default);
      return userlock;
    },

    get mod() {
      if (!usermod) usermod = simple({ns: NS + ".user", name: "mod"}, require("./lib/user/mod").default);
      return usermod;
    },

    get remove() {
      return this.del;
    },

    get unlock() {
      if (!userunlock) userunlock = simple({ns: NS + ".user", name: "unlock"}, require("./lib/user/unlock").default);
      return userunlock;
    },
  },

  group: {
    get add() {
      if (!groupadd) groupadd = simple({ns: NS + ".group", name: "add"}, require("./lib/group/add").default);
      return useradd;
    },

    get del() {
      if (!groupdel) groupdel = simple({ns: NS + ".group", name: "del"}, require("./lib/group/del").default);
      return userdel;
    },

    get exists() {
      if (!groupexists) groupexists = simple({ns: NS + ".group", name: "exists"}, require("./lib/group/exists").default);
      return userexists;
    },

    get info() {
      if (!groupinfo) groupinfo = simple({ns: NS + ".group", name: "info"}, require("./lib/group/info").default);
      return userinfo;
    },

    get remove() {
      return this.del;
    }
  }
};
