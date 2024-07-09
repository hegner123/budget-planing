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
import { useBalance } from "@budget/hooks/balance/useBalance";
import { useExpenses } from "@budget/hooks/expense/useExpense";
import { useIncome } from "@budget/hooks/income/useIncome";
import useSession from "../auth/useSession";
import dayjs from "dayjs";
import { GridComparatorFn } from "@mui/x-data-grid";
import supabase from "@budget/supabaseTables/client";

export default function useSupabaseFetch() {
    const [user, setUser] = useState<any>(null);
    const { balance } = useBalance();
    const { expenses, fetchedExpenses, updateExpenses } = useExpenses();
    const { income, updateIncomeEntry } = useIncome();
    const [openDeleteDialog, setOpenDeleteDialog] = useState<any>(false);
    const [openImportDialog, setOpenImportDialog] = useState<any>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [balanceData, setBalanceData] = useState<any[] | null>(null);
    const [expenseData, setExpenseData] = useState<any[] | null>(null);
    const [incomeData, setIncomeData] = useState<any[] | null>(null);
    const [data, setData] = useState<any>(null);
    const [rowUpdating, setRowUpdating] = useState<boolean>(false);
    const [, setDeleteEntry] = useAtom(deleteEntryAtom);
    const [, setDeleteEntryType] = useAtom(deleteEntryTypeAtom);
    const [compiledData, setCompiledData] = useAtom(compiledDataAtom);
    const { updatedBalance, updatedIncome, updatedExpense } = useSubscribe(balance, income, expenses);
    const { getSession } = useSession();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        getSession().then((res) => {
            console.log("session", res);
            setUser(res?.data?.session?.user?.id);
        });
    }, [getSession]);

    useEffect(() => {
        if (user === "842f7daf-6d49-425a-a6d8-09484a1b9457") {
            console.log("demo");
        }
    }, [user]);


    useEffect(() => {
        const parseData = (request: any, type: string) => {
            return request?.data?.map((item: any) => ({
                id: item.uuid,
                name: item.name,
                amount: item.amount,
                date: formatDate(new Date(item.date)),
                repeated: item.repeated,
                type,
            }));
        };
        setBalanceData(parseData(balance, "balance"));
        setExpenseData(parseData(expenses, "expenses"));
        setIncomeData(parseData(income, "income"));
    }, [balance, expenses, income, setBalanceData, setIncomeData, setExpenseData]);

    useEffect(() => {
        if (balanceData && expenseData && incomeData) {
            if (!rowUpdating) {
                const setTableData = (balanceData: any, expenseData: any, incomeData: any) => {
                    let combined = [...balanceData, ...expenseData, ...incomeData];
                    let sorted = combined.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());
                    setData(sorted);
                    setCompiledData(sorted as any);
                    enqueueSnackbar("Data loaded", { variant: "success" });
                };
                setTableData(balanceData, expenseData, incomeData);
                setLoading(false);
            }
        }
    }, [balanceData, expenseData, incomeData, setCompiledData, enqueueSnackbar]);

    const prepDelete = (id: string, type: string) => {
        setDeleteEntry(id);
        setDeleteEntryType(type);
        setOpenDeleteDialog(true);
    };

    const formatDate = (date: any) => {
        return `${dayjs(date).add(1, "day").format("MM/DD/YYYY")}`;
    };

    const processRowUpdate = useCallback(async (newRow: any) => {
        setRowUpdating(true);
        try {
            switch (newRow.type) {
                case "balance":
                    await updateBalance({ newRow, supabaseClient: supabase });
                    break;
                case "expenses":
                    await updateExpenses(newRow);
                    break;
                case "income":
                    await updateIncomeEntry(newRow);
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.error(error);
        } finally {
            setRowUpdating(false);
        }
    }, [updateBalance, updateExpenses, updateIncomeEntry]);

    const handleRowUpdateError = useCallback(async (error: Error) => {
        enqueueSnackbar(`${error}`, { variant: "error" });
    }, [enqueueSnackbar]);

    const handleDeleteSelectedRows = () => { };

    const dayInMonthComparator: GridComparatorFn<Date> = (v1, v2) => v1.getDate() - v2.getDate();

    return {
        compiledData,
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

