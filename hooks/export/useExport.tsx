import writeXlsxFile from "write-excel-file";

export default function useExport() {
  async function exportToExcel(data: any, fileName?: string) {
    const mappedData = mapExcelRows(data);
    const file = await writeXlsxFile(mappedData, {
      fileName: fileName || "export.xlsx",
    });
    return file;
  }

  function mapExcelRows(data: any) {
    console.log(data);
    const headers = headerGenerator(["Date", "Balance", "Incomes", "Expenses"]);
    const rows = data.map((item) => {
      return [
        item.date,
        item.balance,
        [item.balanceDetails.incomesTotal].join(", "),
        [item.balanceDetails.expensesTotal].join(", "),
      ];
    });
    return [headers, ...rows];
  }

  function headerGenerator(headers: string[]) {
    const headerRow = headers.map((header) => {
      return { value: header, type: "string" };
    });
    return headerRow;
  }

  return { exportToExcel };
}
