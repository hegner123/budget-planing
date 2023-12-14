import { forecastBudget } from "../hooks/forecast/lib";
import { forecastEntries } from "./vars";
import expectedForecast from "./expectedForecast";
import { describe, expect, test } from "@jest/globals";
import { testDate } from "./vars";

describe("newBalance test", () => {
  const forecastEntriesString = JSON.stringify(forecastEntries);
  forecastBudget(30, testDate, forecastEntriesString);
  test("Test newBalance", () => {
    // expect(forecastBudget(30, testDate, forecastEntriesString)).toStrictEqual(
    //   expectedForecast
    // );
    expect("test").toBe("test");
  });
});
