import { describe, expect, test } from "@jest/globals";
import { readXlsxFile } from "read-excel-file";

//

// readExcelFile(file);

//

function fetchExcelFile() {
  fetch("", {
    method: "GET", // or 'POST'
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.blob())
    .then((blob) => {
      console.log(blob);
      return blob;
    })
    .catch((error) => console.error("Error:", error));
}

describe("import_excell", () => {
  test("file_parsed", async () => {
    expect(true).toBe(true);
  });
});
