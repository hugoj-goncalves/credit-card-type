import { expect } from "chai";
import { clone } from "../lib/clone";

describe("clone", () => {
  it("makes a deep copy of an object", () => {
    const obj = { foo: "bar" };
    const clonedObj = clone(obj);

    expect(obj).not.equal(clonedObj);
    expect(obj).deep.equal(clonedObj);
  });
});
