import { assert } from "chai";
// Use package import to test NodeJS packaging.
import seedrandom from "seedrandom";
import { maybeRandomString } from "..";

describe("Node CommonJS", () => {
  describe("random", () => {
    it("defaults", () => {
      const all = new Set<string>();
      for (let i = 0; i < 1000; i++) {
        const s = maybeRandomString();
        assert.strictEqual(s.length, 21);
        assert.isFalse(all.has(s));
        all.add(s);
      }
    });

    it("length", () => {
      for (let i = 1; i < 36; i++) {
        assert.strictEqual(maybeRandomString({ length: i }).length, i);
      }
    });

    it("chars", () => {
      for (let i = 0; i < 1000; i++) {
        const s = maybeRandomString({ chars: "123456789", length: 8 });
        assert.strictEqual(s.length, 8);
        assert.strictEqual(Number.parseInt(s).toString(), s);
      }
    });
  });

  describe("pseudorandom", () => {
    let prng!: seedrandom.PRNG;
    beforeEach(() => {
      prng = seedrandom("42");
    });

    it("deterministic", () => {
      assert.strictEqual(maybeRandomString({ prng }), "1hzgoFbbyPobjILzNNxbd");
      assert.strictEqual(maybeRandomString({ prng }), "yxCqalAaoMEIvTlGIQQs1");
      assert.strictEqual(maybeRandomString({ prng }), "rDJ3TdDEQYkam5PhtKq1Y");
    });

    it("defaults", () => {
      const all = new Set<string>();
      for (let i = 0; i < 1000; i++) {
        const s = maybeRandomString({ prng });
        assert.strictEqual(s.length, 21);
        assert.isFalse(all.has(s));
        all.add(s);
      }
    });

    it("length", () => {
      for (let i = 1; i < 36; i++) {
        assert.strictEqual(maybeRandomString({ prng, length: i }).length, i);
      }
    });

    it("chars", () => {
      for (let i = 0; i < 1000; i++) {
        const s = maybeRandomString({ prng, chars: "123456789", length: 8 });
        assert.strictEqual(s.length, 8);
        assert.strictEqual(Number.parseInt(s).toString(), s);
      }
    });
  });
});
