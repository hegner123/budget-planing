"use client";
import { useAtom } from "jotai";
import {
  showDebugModalAtom,
  compiledDataAtom,
  notificationMessageAtom,
  deleteEntryAtom,
  deleteEntryTypeAtom,
  configForecastAtom,
  configForecastDurationAtom,
  forecastListAtom,
  loggedInUserAtom,
} from "@budget/store/state";
import Fab from "@mui/material/Fab";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import { useSession } from "@budget/hooks/auth/useSession";

export default function DebugDialog() {
  const [showDebugModal, setShowDebugModal] = useAtom(showDebugModalAtom);
  const [compiledData] = useAtom(compiledDataAtom);
  const [notificationMessage] = useAtom(notificationMessageAtom);
  const [deleteEntry] = useAtom(deleteEntryAtom);
  const [deleteEntryType] = useAtom(deleteEntryTypeAtom);
  const [configForecast] = useAtom(configForecastAtom);
  const [configForecastDuration] = useAtom(configForecastDurationAtom);
  const [forecastList] = useAtom(forecastListAtom);
  const [user, setUser] = useAtom(loggedInUserAtom);

  return (
    <div className="absolute min-w-full min-h-screen col-span-full">
      <Fab
        variant="extended"
        size="large"
        color="info"
        aria-label="debug"
        className="fixed right-5 bottom-5 text-black bg-[#1976d2] border-[#1976d2] hover:text-white hover:bg-black hover:border-white border-solid border-2"
        onClick={() => setShowDebugModal(true)}>
        Debug
      </Fab>
      <DebugModalDialog />
    </div>
  );
}

const DebugModalDialog = () => {
  const [showDebugModal, setShowDebugModal] = useAtom(showDebugModalAtom);
  const [compiledData] = useAtom(compiledDataAtom);
  const [notificationMessage] = useAtom(notificationMessageAtom);
  const [deleteEntry] = useAtom(deleteEntryAtom);
  const [deleteEntryType] = useAtom(deleteEntryTypeAtom);
  const [configForecast] = useAtom(configForecastAtom);
  const [configForecastDuration] = useAtom(configForecastDurationAtom);
  const [forecastList] = useAtom(forecastListAtom);
  const [user, setUser] = useAtom(loggedInUserAtom);

  return (
    <Dialog onClose={() => setShowDebugModal(false)} open={showDebugModal}>
      <DialogTitle className="flex items-center justify-between px-4">
        <h3>Debug Modal</h3>
        <IconButton aria-label="close" onClick={() => setShowDebugModal(false)}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Accordion className="px-4 ">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header">
          <h2>User</h2>
        </AccordionSummary>
        <AccordionDetails>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </AccordionDetails>
      </Accordion>
      <Accordion className="px-4 ">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header">
          <h2>Compiled Data</h2>
        </AccordionSummary>
        <AccordionDetails>
          <pre>{JSON.stringify(compiledData, null, 2)}</pre>
        </AccordionDetails>
      </Accordion>
      <Accordion className="px-4 ">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header">
          <h2>Notification Message</h2>
        </AccordionSummary>
        <AccordionDetails>
          <pre>{JSON.stringify(notificationMessage, null, 2)}</pre>
        </AccordionDetails>
      </Accordion>
      <Accordion className="px-4 ">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header">
          <h2>Delete Entry</h2>
        </AccordionSummary>
        <AccordionDetails>
          <pre>{JSON.stringify(deleteEntry, null, 2)}</pre>
        </AccordionDetails>
      </Accordion>
      <Accordion className="px-4 ">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header">
          <h2>Delete Entry Type</h2>
        </AccordionSummary>
        <AccordionDetails>
          <pre>{JSON.stringify(deleteEntryType, null, 2)}</pre>
        </AccordionDetails>
      </Accordion>
      <Accordion className="px-4 ">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header">
          <h2>Forecast</h2>
        </AccordionSummary>
        <AccordionDetails>
          <pre>{JSON.stringify(forecastList, null, 2)}</pre>
        </AccordionDetails>
      </Accordion>
      <Accordion className="px-4 ">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header">
          <h2>Config Forecast Duration</h2>
        </AccordionSummary>
        <AccordionDetails>
          <pre>{JSON.stringify(configForecastDuration, null, 2)}</pre>
        </AccordionDetails>
      </Accordion>
    </Dialog>
  );
};