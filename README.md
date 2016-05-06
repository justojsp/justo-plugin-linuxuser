[![NPM version](http://img.shields.io/npm/v/justo-plugin-linuxuser.svg)](https://www.npmjs.org/package/justo-plugin-linuxuser)
[![Build Status](https://travis-ci.org/justojsp/justo-plugin-linuxuser.svg?branch=master)](https://travis-ci.org/justojsp/justo-plugin-linuxuser)
[![Dependency Status](https://david-dm.org/justojsp/justo-plugin-linuxuser.svg)](https://david-dm.org/justojsp/justo-plugin-linuxuser)
[![devDependency Status](https://david-dm.org/justojsp/justo-plugin-linuxuser/dev-status.svg)](https://david-dm.org/justojsp/justo-plugin-linuxuser#info=devDependencies)

Plugin to create users and groups on **Linux**.

*Proudly made with ♥ in Valencia, Spain, EU.*

- [Install](#installl)
- [Use](#use)
- [Dependencies](#dependencies)
- [User tasks](#user-tasks)
- [Group tasks](#group-tasks)

# Install

```
npm install justo-plugin-linuxuser
```

# Use

```
const user = require("justo-plugin-linuxuser").user;
const group = require("justo-plugin-linuxuser").group;
```

# Dependencies

This plugin uses the following commands:

- `adduser`
- `deluser`
- `usermod`
- `addgroup`
- `delgroup`

# User tasks

## user.add task

Create a user:

```
user.add(justoOpts, opts : object) : number
```

The `opts` parameter:

- `name` (string). The username.
- `password` (false). If `false`, the password is disabled.
- `system` (boolean). The user is a superuser. Default: `false`.
- `home` (false or string). The home directory. If `false`, the home dir is not created.
- `shell` (string). The default shell.
- `uid` (number). The UID to set.
- `group` (string or number). If string, the group name.
- `login` (boolean). Can the user log in? Default: `true`.

Example:

```
user.add("Create postgres user", {
  name: "postgres",
  home: false,
  login: false,
  group: "postgres"
});
```

## user.mod task

Modify a user:

```
user.mod(justoOpts, opts : object)
```

The `opts` parameter:

- `name` (string). Username.
- `password` (string). User password.
- `groups` (string[]). Supplementary groups to be member.
- `home` (string). Home directory.
- `shell` (string). Default shell.
- `lock` (boolean). Lock the user? Default: `false`.
- `unlock` (boolean). Unlock the user? Default: `false`.

Example:

```
user.mod("Change postgres password", {
  name: "postgres",
  password: "newpwd"
});
```

## user.lock task

Lock a user:

```
user.lock(justoOpts, opts : object)
```

The `opts` parameter:

- `name` (string). The username.

Example:

```
user.lock("Lock bunnyman user", {name: "bunnyman"});
```

## user.unlock task

Unlock a user:

```
user.unlock(justoOpts, opts : object)
```

The `opts` parameter:

- `name` (string). The username.

Example:

```
user.unlock("Unlock bunnyman user", {name: "bunnyman"});
```

## user.del task

Delete a user:

```
user.del(justoOpts, opts : object) : number
```

The `opts` parameter:

- `name` (string). The username.
- `force` (boolean). Force? Default: `false`.
- `remove` (object). Remove options:
  - `home` (boolean). Remove home directory? Default: `false`.
  - `files` (boolean). Remove all files? Default: `false`.
- `backup` (boolean). Perform backup? Default: `false`.

Alias: `user.remove`.

Example:

```
user.remove("Remove postgres user", {name: "postgres", remove: {home: true, files: true}});
```

## user.exists task

Check whether users exist:

```
user.exists(justoOpts, opts : object) : boolean
```

The `opts` parameter:

- `name` (string). The username to check.
- `names` (string[]). The usernames to check.

Example:

```
if (!user.exists("Check whether postgres exists", {name: "postgres"})) {
  user.add("Create postgres user", {
    name: "postgres",
    password: "pg1234"
  });
}
```

## user.info task

Get user info:

```
user.info(justoOpts, opts : object) : object[]
```

The `opts` parameter:

- `name` (string). Username.
- `names` (string). Usernames.

# Group tasks

## group.add task

Create a group:

```
group.add(justoOpts, opts : object)
```

The `opts` parameter:

- `name` (string). Group name.
- `gid` (number). GID.
- `system` (boolean). System group? Default: `false`.

Example:

```
group.add("Create database group", {name: "dbs"})
```

## group.del task

Delete a group:

```
group.del(justoOpts, opts : object)
```

The `opts` parameter:

- `name` (string). Group name.
- `onlyIfEmpty` (boolean). Only if empty? Default: `false`.

Alias: `group.remove`.

Example:

```
group.remove("Remove dbs group", {name: "dbs"});
```

## group.exists task

Check whether groups exist:

```
user.exists(justoOpts, opts : object) : boolean
```

The `opts` parameter:

- `name` (string). The group name to check.
- `names` (string[]). The group names to check.

Example:

```
if (!group.exists("Check whether dbs exists", {name: "dbs"})) {
  group.add("Create dbs group", {name: "dbs"});
}
```

## group.info task

Get group info:

```
group.info(justoOpts, opts : object) : object[]
```

The `opts` parameter:

- `name` (string). Group name.
- `names` (string). Group names.

Example:

```
var grps = group.info("Get group info", {name: "dbs"});
```
