"use strict";
var _justo = require("justo");


var NS = "org.justojs.plugin.linux";
var useradd, userdel, userexists, userinfo, userlock, usermod, userunlock;
var groupadd, groupdel, groupexists, groupinfo;


module.exports = { 
  user: { 
    get add() {
      if (!useradd) useradd = (0, _justo.simple)({ ns: NS + ".user", name: "add" }, require("./lib/user/add").default);
      return useradd;}, 


    get del() {
      if (!userdel) userdel = (0, _justo.simple)({ ns: NS + ".user", name: "del" }, require("./lib/user/del").default);
      return userdel;}, 


    get exists() {
      if (!userexists) userexists = (0, _justo.simple)({ ns: NS + ".user", name: "exists" }, require("./lib/user/exists").default);
      return userexists;}, 


    get info() {
      if (!userinfo) userinfo = (0, _justo.simple)({ ns: NS + ".user", name: "info" }, require("./lib/user/info").default);
      return userinfo;}, 


    get lock() {
      if (!userlock) userlock = (0, _justo.simple)({ ns: NS + ".user", name: "lock" }, require("./lib/user/lock").default);
      return userlock;}, 


    get mod() {
      if (!usermod) usermod = (0, _justo.simple)({ ns: NS + ".user", name: "mod" }, require("./lib/user/mod").default);
      return usermod;}, 


    get remove() {
      return this.del;}, 


    get unlock() {
      if (!userunlock) userunlock = (0, _justo.simple)({ ns: NS + ".user", name: "unlock" }, require("./lib/user/unlock").default);
      return userunlock;} }, 



  group: { 
    get add() {
      if (!groupadd) groupadd = (0, _justo.simple)({ ns: NS + ".group", name: "add" }, require("./lib/group/add").default);
      return useradd;}, 


    get del() {
      if (!groupdel) groupdel = (0, _justo.simple)({ ns: NS + ".group", name: "del" }, require("./lib/group/del").default);
      return userdel;}, 


    get exists() {
      if (!groupexists) groupexists = (0, _justo.simple)({ ns: NS + ".group", name: "exists" }, require("./lib/group/exists").default);
      return userexists;}, 


    get info() {
      if (!groupinfo) groupinfo = (0, _justo.simple)({ ns: NS + ".group", name: "info" }, require("./lib/group/info").default);
      return userinfo;}, 


    get remove() {
      return this.del;} } };