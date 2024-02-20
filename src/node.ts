// --- NODE ONLY
// Bundling crypto unintentionally? Check maybe-random-string issues.
import { randomBytes } from "crypto";
// --- END NODE ONLY

/**
 * Default maybeRandomString length: 21.
 *
 * This is the same as [nanoid](https://www.npmjs.com/package/nanoid)
 * and gives as much entropy as a UUIDv4 (with the DEFAULT_CHARS).
 */
export const DEFAULT_LENGTH = 21;
/**
 * Default maybeRandomString characters: the alphanumeric chars (0-9A-Za-z).
 */
export const DEFAULT_CHARS =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

/**
 * Returns a random or pseudorandom string.
 *
 * By default, the string is cryptographically random. For a pseudorandom
 * string, supply a PRNG,
 * e.g., from package [seedrandom](https://www.npmjs.com/package/seedrandom):
 * ```ts
 * import { maybeRandomString } from "maybe-random-string";
 * import seedrandom from "seedrandom";
 *
 * const prng = seedrandom("42");
 * console.log(maybeRandomString({ prng })); // Prints "TODO" every time.
 * ```
 *
 * @param options.prng A PRNG that outputs floating-point values in the range [0, 1).
 * If not provided, the string is cryptographically random.
 * @param options.length The length of the returned string.
 * Default: `DEFAULT_LENGTH = 21`.
 * @param options.chars The characters to draw from.
 * Default: `DEFAULT_CHARS =` the alphanumeric chars (0-9A-Za-z).
 *
 * Note: Only the first 256 characters are used. You get about
 * `log2(chars.length)` bits of entropy per output character.
 */
export function maybeRandomString(options?: {
  prng?: () => number;
  length?: number;
  chars?: string;
}) {
  const length = options?.length ?? DEFAULT_LENGTH;
  const chars = options?.chars ?? DEFAULT_CHARS;

  const arr = new Array<string>(length);
  if (options?.prng) {
    for (let i = 0; i < arr.length; i++) {
      // Although we could pick chars without bias, we instead use the
      // same bias as the random case, for consistency.
      arr[i] = chars[Math.floor(options.prng() * 256) % chars.length];
    }
  } else {
    /*
    // --- BROWSER ONLY
    // Use Web crypto.
    const randomValues = new Uint8Array(length);
    // "not defined" bug here? Check maybe-random-string issues.
    globalThis.crypto.getRandomValues(randomValues);
    // --- END BROWSER ONLY
    */

    // --- NODE ONLY
    // Use Node crypto module, for older Node version (< 18) where Web crypto
    // global is unavailable.
    // "not defined" bug here? Check maybe-random-string issues.
    const randomValues = randomBytes(length);
    // --- END NODE ONLY

    for (let i = 0; i < length; i++) {
      // This will be biased if chars.length does not divide 256,
      // but it will still give almost log_2(chars.length)
      // bits of entropy per char.
      arr[i] = chars[randomValues[i] % chars.length];
    }
  }
  return arr.join("");
}

// TODO: If you change this file, also change the other file.
