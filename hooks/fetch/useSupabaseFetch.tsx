import { useState, useEffect, useCallback } from "react";
import { useAtom } from "jotai";
import {
  deleteEntryAtom,
  deleteEntryTypeAtom,
  compiledDataAtom,
} from "@budget/store/state";
import { useSnackbar } from "notistack";
import { updateBalance } from "@budget/supabaseTables";
import { useSubscribe } from "@budget/hooks/subscribe/useSubscribe";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useBalance } from "@budget/hooks/balance/useBalance";
import { useExpenses } from "@budget/hooks/expense/useExpense";
import { useIncome } from "@budget/hooks/income/useIncome";
import useSession from "../auth/useSession";
import dayjs from "dayjs";
import { GridComparatorFn } from "@mui/x-data-grid";

export default function useSupabaseFetch() {
  const supabaseClient = createClientComponentClient();
  const [user, setUser] = useState<any>(null);
  const { balance, fetchedBalance } = useBalance();
  const { expenses, fetchedExpenses, updateExpenses } = useExpenses();
  const { income, fetchedIncome, updateIncomeEntry } = useIncome();
  const [openDeleteDialog, setOpenDeleteDialog] = useState<any>(false);
  const [openImportDialog, setOpenImportDialog] = useState<any>(false);
  const [loading, setLoading] = useState<any>(true);
  const [balanceData, setBalanceData] = useState<any>(null);
  const [expenseData, setExpenseData] = useState<any>(null);
  const [incomeData, setIncomeData] = useState<any>(null);
  const [data, setData] = useState<any>(null);
  const [rowUpdating, setRowUpdating] = useState<boolean>(false);
  const [, setDeleteEntry] = useAtom(deleteEntryAtom);
  const [, setDeleteEntryType] = useAtom(deleteEntryTypeAtom);
  const [, setCompiledData] = useAtom(compiledDataAtom);
  const { updatedBalance, updatedIncome, updatedExpense } = useSubscribe(
    balance,
    income,
    expenses
  );
  const { getSession } = useSession();

  useEffect(() => {
    if (getSession()) {
      console.log(getSession());
      setUser(getSession().then((res) => res?.data?.user?.id));
    }
  }, [getSession]);

  if (user === "842f7daf-6d49-425a-a6d8-09484a1b9457") {
    console.log("demo");
  }
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (updatedBalance) {
      enqueueSnackbar("Balance Updated", { variant: "success" });
      setBalanceData(parseData(updatedBalance, "balance"));
    }
    if (updatedIncome) {
      enqueueSnackbar("Income Updated", { variant: "success" });
      setIncomeData(parseData(updatedIncome, "income"));
    }
    if (updatedExpense) {
      enqueueSnackbar("Expense Updated", { variant: "success" });
      setExpenseData(parseData(updatedExpense, "expenses"));
    }

    function parseData(data: any, type: string) {
      let parsedData = data?.map((item: any) => {
        return {
          id: item.uuid,
          name: item.name,
          [type]: `$${item.amount}`,
          date: formatDate(new Date(item.date)),
          repeated: item.repeated ? item.repeated : null,
          type: type,
        };
      });
      return parsedData;
    }
  }, [updatedBalance, updatedIncome, updatedExpense, enqueueSnackbar]);

  useEffect(() => {
    setBalanceData(parseData(balance, "balance"));
    setExpenseData(parseData(expenses, "expenses"));
    setIncomeData(parseData(income, "income"));

    function parseData(data: any, type: string) {
      let parsedData = data?.map((item: any) => {
        return {
          id: item.uuid,
          name: item.name,
          amount: item.amount,
          date: formatDate(new Date(item.date)),
          repeated: item.repeated,
          type: type,
        };
      });

      return parsedData;
    }
  }, [
    balance,
    expenses,
    income,
    fetchedBalance,
    fetchedExpenses,
    fetchedIncome,
  ]);

  useEffect(() => {
    if (balanceData && expenseData && incomeData) {
      if (rowUpdating) {
        return;
      }
      setTableData(balanceData, expenseData, incomeData);
      setLoading(false);
    }

    function setTableData(balanceData: any, expenseData: any, incomeData: any) {
      let combined = [...balanceData, ...expenseData, ...incomeData];
      let sorted = combined.sort((a: any, b: any) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
      setData(sorted);
      setCompiledData(sorted as any);
      // localStorage.setItem("compiledData", JSON.stringify(sorted));
      enqueueSnackbar("Data loaded", { variant: "success" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [balanceData, expenseData, incomeData, setCompiledData, enqueueSnackbar]);

  function prepDelete(id: string, type: string) {
    setDeleteEntry(id);
    setDeleteEntryType(type);
    setOpenDeleteDialog(true);
  }

  function formatDate(date: any) {
    return `${dayjs(date).add(1, "day").format("MM/DD/YYYY")}`;
  }

  const processRowUpdate = useCallback(
    (newRow: any) =>
      new Promise((resolve, reject) => {
        switch (newRow.type) {
          case "balance":
            try {
              updateBalance({ newRow, supabaseClient }).then((res) => {
                setRowUpdating(true);
                console.log(res);
                resolve(res.newRow);
              });
            } catch (error) {
              console.error(error);
              reject(error);
            }
            break;
          case "expenses":
            try {
              updateExpenses(newRow).then((res) => {
                setRowUpdating(true);
                resolve(res.data);
              });
            } catch (error) {
              console.error(error);
              reject(error);
            }

            break;
          case "income":
            try {
              updateIncomeEntry(newRow).then((res) => {
                setRowUpdating(true);
                resolve(res.data);
              });
            } catch (error) {
              console.error(error);
              reject(error);
            }
            break;
          default:
            break;
        }
        setRowUpdating(false);
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleRowUpdateError = useCallback(async (error) => {
    enqueueSnackbar(`${error}`, { variant: "error" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleDeleteSelectedRows() {}

  const dayInMonthComparator: GridComparatorFn<Date> = (v1, v2) =>
    v1.getDate() - v2.getDate();
  return {
    data,
    handleRowUpdateError,
    dayInMonthComparator,
    handleDeleteSelectedRows,
    processRowUpdate,
    prepDelete,
    setOpenImportDialog,
    openImportDialog,
    setOpenDeleteDialog,
    openDeleteDialog,
  };
}
