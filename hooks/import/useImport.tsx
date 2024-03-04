import React, { useState, useEffect, useDebugValue } from "react";
import readXlsxFile from "read-excel-file";
import { excellData, excellRow } from "@budget/types/import";
import dayjs from "dayjs";
import { DATE_DISPLAY_FORMAT, DATE_STORAGE_FORMAT } from "@budget/constants";
import { useBalance } from "@budget/hooks/balance/useBalance";
import { useIncome } from "@budget/hooks/income/useIncome";
import { useExpenses } from "@budget/hooks/expense/useExpense";
import useSession from "@budget/hooks/auth/useSession";

type Row = {
  id: cell;
  label: cell;
  amount: cell;
  date: cell;
  repeated: cell;
  type: cell;
};

type cell = {
  value: string;
};

export function useImportExcell() {
  const [pendingImportData, setPendingImportData] = useState(null);
  const [user, setUser] = useState<any>("");
  useDebugValue(
    pendingImportData ? "Has Pending Import Data" : "No Pending Import Data"
  );
  const { addBalance } = useBalance();
  const { addIncome } = useIncome();
  const { addExpense } = useExpenses();
  const { getSession } = useSession();
  useEffect(() => {
    getSession().then((res) => {
      setUser(res?.data?.session?.user?.id);
    });
  }, [getSession]);
  // File.

  async function readFile(file: File) {
    const res = await readXlsxFile(file).then((rows) => {
      // `rows` is an array of rows
      // each row being an array of cells.
      const res = sendToParser(rows);

      return res;
    });
    return res;
  }
  function readUrl(url) {
    // Blob.
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => readXlsxFile(blob))
      .then((rows) => {
        // `rows` is an array of rows
        // each row being an array of cells.
        return sendToParser(rows);
      });
  }
  function sendToParser(rows) {
    try {
      return parseRows(rows);
    } catch (error) {
      console.log(error);
      cancelImport();
    }
  }
  function parseRows(rows) {
    const stripedColumns = rows.filter((cell) => cell[0] !== "Id");
    const parsedRows = stripedColumns
      .map((cell, i) => {
        const dayjsDate = dayjs(cell[2] as string).format(DATE_STORAGE_FORMAT);
        const row = {
          id: i,
          label: cell[1],
          amount: cell[2],
          date: dayjsDate,
          repeated: cell[4],
          type: cell[5],
        };
        console.log(row);
        return row;
      })
      .filter((row, i) => i !== 0);
    // setPendingImportData(parsedRows);
    console.log(parsedRows);

    return parsedRows;
  }

  function cancelImport() {
    setPendingImportData(null);
  }

  function confirmImport() {
    try {
      pendingImportData.forEach((row: excellRow) => {
        const entryData = {
          name: row.label,
          amount: row.amount,
          date: row.date,
          repeated: row.repeated,
          user: user,
        };
        switch (row.type) {
          case "income":
            // If income id exists, update.
            // Add to income.
            try {
              addIncome(entryData);
            } catch (error) {
              console.error(error);
            }
            break;
          case "expense":
            // If expense id exists, update.
            // Add to expenses.
            try {
              addExpense(entryData);
            } catch (error) {
              console.error(error);
            }
            break;
          case "balance":
            // If balance id exists, update.
            // Add balance.
            try {
              addBalance({
                name: entryData.name,
                amount: entryData.amount,
                user: user,
                date: entryData.date,
              });
            } catch (error) {
              console.error(error);
            }

            break;
          default:
            break;
        }
      });
    } catch (error) {}
  }

  return { readFile, readUrl, confirmImport, cancelImport };
}
