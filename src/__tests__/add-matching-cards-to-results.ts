import { expect } from "chai";
import { addMatchingCardsToResults } from "../lib/add-matching-cards-to-results";
import { CreditCardType } from "../types";
import { createFakeCreditCardType } from "./helper";

describe("addMatchingCardsToResults", () => {
  it("adds a clone of matching card configurations to results array", () => {
    const a = createFakeCreditCardType();
    const b = createFakeCreditCardType({
      patterns: [1, 2],
    });
    const results = [a];

    addMatchingCardsToResults("1", b, results);

    expect(results.length).equal(2);
    expect(results[0]).equal(a);
    expect(results[1].patterns).deep.equal([1, 2]);
    expect(results[1]).not.equal(b);
  });

  it("does not add a configuration if it does not match", () => {
    const a = createFakeCreditCardType();
    const b = createFakeCreditCardType({
      patterns: [1, 2],
    });
    const results = [a];

    addMatchingCardsToResults("3", b, results);

    expect(results.length).equal(1);
    expect(results[0]).equal(a);
  });

  it("adds a matchStrength property to configuration if card number matches and the length equals or is greater than the pattern length", () => {
    const results: CreditCardType[] = [];

    addMatchingCardsToResults(
      "304",
      createFakeCreditCardType({ patterns: [304] }),
      results,
    );
    addMatchingCardsToResults(
      "304",
      createFakeCreditCardType({ patterns: [30] }),
      results,
    );
    addMatchingCardsToResults(
      "304",
      createFakeCreditCardType({ patterns: [3045] }),
      results,
    );
    addMatchingCardsToResults(
      "304",
      createFakeCreditCardType({ patterns: [3] }),
      results,
    );

    expect(results.length).equal(4);
    expect(results[0].matchStrength).equal(3);
    expect(results[1].matchStrength).equal(2);
    expect(results[2].matchStrength).to.be.undefined;
    expect(results[3].matchStrength).equal(1);
  });

  it("adds a matchStrength property to configuration if card number matches and the length equals or is greater than an entry of the pattern range", () => {
    const results: CreditCardType[] = [];

    addMatchingCardsToResults(
      "304",
      createFakeCreditCardType({ patterns: [[304, 305]] }),
      results,
    );
    addMatchingCardsToResults(
      "304",
      createFakeCreditCardType({ patterns: [[30, 99]] }),
      results,
    );
    addMatchingCardsToResults(
      "304",
      createFakeCreditCardType({ patterns: [[3045, 4500]] }),
      results,
    );
    addMatchingCardsToResults(
      "304",
      createFakeCreditCardType({ patterns: [[3, 5]] }),
      results,
    );

    expect(results.length).equal(4);
    expect(results[0].matchStrength).equal(3);
    expect(results[1].matchStrength).equal(2);
    expect(results[2].matchStrength).to.be.undefined;
    expect(results[3].matchStrength).equal(1);
  });
});
