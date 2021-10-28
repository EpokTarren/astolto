# Astolto

Astolto is an open source Discord bot that will gladly rate how uwu your messages are~

[Invite](https://discord.com/oauth2/authorize?client_id=825845697790214164&permissions=84032&scope=bot%20applications.commands)

[Commands](https://astolto.tarren.moe)

[Changelog](./CHANGELOG.md)

Astolto is more specifically a Discord bot written in TypeScript using [discord.js](https://discord.js.org/#/) and [MashuJS](https://mashu.tarren.moe/)(a smallish command handler built for Astolto).

Bugs in [GitHub issues](https://github.com/EpokTarren/Astolto/issues) or @Tarren#9722 on Discord, [codebase](https://github.com/EpokTarren/astolto) if you want to contribute or poke around.

# Installation

```sh
git clone https://github.com/EpokTarren/astolto.git
# Checking out a specific version, in this example 1.1.0
# git checkout tags/v1.1.0
cd astolto
npm install
npm run build
```

Create a .env with your desired settings, example:

```
TOKEN="YOUR_TOKEN_HERE"
PREFIX="a;"
OWNERS="EACH ID SEPARATED BY A SPACE"
COLOUR="0xff80cc"
ERRORCOLOUR="0xff2020"
```

Starting

```sh
npm run start
```
