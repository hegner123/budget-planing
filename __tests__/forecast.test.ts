import { forecastBudget } from "../hooks/forecast/lib";
import { forecastEntriesLong, forecastEntriesShort } from "./vars";
import { expectedForecast, expectedForecastLong } from "./expectedForecast";
import { describe, expect, test } from "@jest/globals";
import { testDate } from "./vars";

describe("newBalance test", () => {
  const forecastEntriesLongString = JSON.stringify(forecastEntriesLong);
  const forecastEntriesShortString = JSON.stringify(forecastEntriesShort);
  // forecastBudget(30, testDate, forecastEntriesLongString);
  test("Create Forecast Test Short", () => {
    expect(
      forecastBudget(2, testDate, forecastEntriesShortString)
    ).toStrictEqual(expectedForecast);
  });
  // test("Create Forecast Test Long", () => {
  //   expect(
  //     forecastBudget(30, testDate, forecastEntriesLongString)
  //   ).toStrictEqual(expectedForecast);
  // });
});
/*
Argument of type '({ id: string; name: string; amount: number; date: string; type: string; repeated?: undefined; } | { id: string; name: string; amount: number; date: string; repeated: string; type: string; })[]' is not assignable to parameter of type 'string'.*/
