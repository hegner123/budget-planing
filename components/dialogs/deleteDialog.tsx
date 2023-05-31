"use client";
import { useState } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";

import { useExpenses } from "@budget/hooks/expenses/useExpenses";
import { useIncome } from "@budget/hooks/income/useIncome";
import { useBalance } from "@budget/hooks/balance/useBalance";
import { deleteEntryAtom, deleteEntryTypeAtom } from "@budget/store/state";
import { showNotificationMessageAtom } from "@budget/store/state";
import { useSession } from "@budget/hooks/auth/useSession";
import { useAtom } from "jotai";
const DeleteDialog = ({ open, close }: { open: any; close: any }) => {
  const [deleteEntry, setDeleteEntry] = useAtom(deleteEntryAtom);
  const [deleteEntryType, setDeleteEntryType] = useAtom(deleteEntryTypeAtom);
  const [, setNotificationMessage] = useAtom(showNotificationMessageAtom);
  const { deleteExpense } = useExpenses();
  const { deleteIncomeEntry } = useIncome();
  const { deleteBalanceEntry } = useBalance();
  const { user } = useSession();

  function confirmDelete() {
    switch (deleteEntryType) {
      case "expenses":
        deleteExpense(deleteEntry);

        setNotificationMessage("Expense deleted");
        break;
      case "income":
        deleteIncomeEntry(deleteEntry);

        setNotificationMessage("Income deleted");
        break;
      case "balance":
        deleteBalanceEntry(deleteEntry);

        setNotificationMessage("Balance deleted");
        break;
      default:
        break;
    }
    setDeleteEntry("");
    setDeleteEntryType("");
    close();
  }
  return (
    <>
      <Dialog onClose={close} open={open}>
        <DialogTitle>Delete</DialogTitle>

        <List sx={{ pt: 0, px: "2rem" }}>
          <ListItem disableGutters>
            <ListItemButton onClick={close}>Cancel</ListItemButton>
            <ListItemButton
              onClick={() => confirmDelete()}
              sx={{ border: "2px solid red" }}>
              Delete
            </ListItemButton>
          </ListItem>
        </List>
      </Dialog>
    </>
  );
};

export default DeleteDialog;
