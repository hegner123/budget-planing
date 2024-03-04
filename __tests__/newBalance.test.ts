import { newBalance } from "../hooks/forecast/lib";
import { describe, expect, test } from "@jest/globals";

describe("balance result test", () => {
  const test1balance = 75;
  const test1income = 25;
  const test1expense = 0;
  const test2balance = 75;
  const test2income = 0;
  const test2expense = 25;
  test("Test balance + income", () => {
    expect(newBalance(test1balance, test1income, test1expense)).toBe(100);
  });
  test("Test balance + income - expenses", () => {
    expect(newBalance(test2balance, test2income, test2expense)).toBe(50);
  });
});
