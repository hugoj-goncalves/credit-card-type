import { expect } from "chai";
import { isValidInputType } from "../lib/is-valid-input-type";

describe("isValidInputType", () => {
  it("returns true if value is a string", () => {
    expect(isValidInputType("string")).equal(true);
  });

  it("returns true if value is a string object", () => {
    expect(isValidInputType(String("string"))).equal(true);
  });

  it("returns false for non-string values", () => {
    expect(isValidInputType(12)).equal(false);
    expect(isValidInputType({ foo: "bar" })).equal(false);
    expect(isValidInputType([])).equal(false);
    expect(isValidInputType(false)).equal(false);
    expect(isValidInputType(true)).equal(false);
  });
});
