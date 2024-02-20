# maybe-random-string

Returns a random or pseudorandom string.

```bash
npm i --save maybe-random-string
```

## Usage

Generate a cryptographically random string:

```ts
import { maybeRandomString } from "maybe-random-string";

console.log(maybeRandomString()); // Prints e.g. "FPT2KAOyy19aVihGghr5m".
```

Generate a pseudorandom string in the same format, using package [seedrandom](https://www.npmjs.com/package/seedrandom):

```ts
import { maybeRandomString } from "maybe-random-string";
import seedrandom from "seedrandom";

const prng = seedrandom("42");
console.log(maybeRandomString({ prng })); // Prints "1hzgoFbbyPobjILzNNxbd" every time.
```

You can change the string's length and character set with the options object:

```ts
console.log(maybeRandomString({ length: 8, chars: "abcd" })); // Prints e.g. "cdabdbdc".
```

The defaults are similar to [nanoid](https://www.npmjs.com/package/nanoid): length 21, alphanumeric chars, as much entropy as a UUIDv4.

## Environments

This package is designed to work in both the browser and Node.js, including Node.js versions that predate Node's Web Crypto support. If you run into environment- or bundler-specific errors, please file an [issue](https://github.com/mweidner037/maybe-random-string/issues).

- Node.js build ("main" in package.json) uses `require("crypto")` and a CommonJS module.
- Browser build ("browser" and "module" in package.json) uses `globalThis.crypto` and an ESM module.
- Node.js ESM build? Sorry, use the CommonJS build. You should still be able to write `import { maybeRandomString } from "maybe-random-string";` in a Node ESM project with Node v14.13+.
  (TypeScript and Node ESM fight over `.js` vs `.mjs` extensions; I'm not qualified to mediate.)
