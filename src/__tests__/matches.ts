import { expect } from "chai";
import { matches } from "../lib/matches";

describe("matches", () => {
  describe("Array", () => {
    it("returns true if value is within range", () => {
      const range = ["123", "410"];

      expect(matches("123", range)).equal(true);
      expect(matches("125", range)).equal(true);
      expect(matches("309", range)).equal(true);
      expect(matches("409", range)).equal(true);
      expect(matches("410", range)).equal(true);

      expect(matches("122", range)).equal(false);
      expect(matches("010", range)).equal(false);
      expect(matches("411", range)).equal(false);
      expect(matches("999", range)).equal(false);
    });

    it("returns true if value is within range for partial match", () => {
      const range = ["123", "410"];

      expect(matches("1", range)).equal(true);
      expect(matches("12", range)).equal(true);
      expect(matches("12", range)).equal(true);
      expect(matches("30", range)).equal(true);
      expect(matches("40", range)).equal(true);
      expect(matches("41", range)).equal(true);

      expect(matches("0", range)).equal(false);
      expect(matches("01", range)).equal(false);
      expect(matches("42", range)).equal(false);
      expect(matches("99", range)).equal(false);
      expect(matches("5", range)).equal(false);
    });

    it("returns true if value is within range for value with more digits", () => {
      const range = ["123", "410"];

      expect(matches("1230", range)).equal(true);
      expect(matches("1258", range)).equal(true);
      expect(matches("309312123", range)).equal(true);
      expect(matches("409112333", range)).equal(true);
      expect(matches("41056789", range)).equal(true);

      expect(matches("1220", range)).equal(false);
      expect(matches("0100", range)).equal(false);
      expect(matches("41134567", range)).equal(false);
      expect(matches("99999999", range)).equal(false);
    });
  });

  describe("Pattern", () => {
    it("returns true if value matches the pattern", () => {
      const pattern = "123";

      expect(matches("123", pattern)).equal(true);

      expect(matches("122", pattern)).equal(false);
      expect(matches("010", pattern)).equal(false);
      expect(matches("411", pattern)).equal(false);
      expect(matches("999", pattern)).equal(false);
    });

    it("returns true if partial value matches the pattern", () => {
      const pattern = "123";

      expect(matches("", pattern)).equal(true);
      expect(matches("1", pattern)).equal(true);
      expect(matches("12", pattern)).equal(true);
      expect(matches("123", pattern)).equal(true);

      expect(matches("0", pattern)).equal(false);
      expect(matches("01", pattern)).equal(false);
      expect(matches("124", pattern)).equal(false);
      expect(matches("13", pattern)).equal(false);
    });

    it("returns true if value matches the pattern when of greater length", () => {
      const pattern = "123";

      expect(matches("1234", pattern)).equal(true);
      expect(matches("1235", pattern)).equal(true);
      expect(matches("1236", pattern)).equal(true);
      expect(matches("1237123", pattern)).equal(true);

      expect(matches("01234", pattern)).equal(false);
    });
  });
});
