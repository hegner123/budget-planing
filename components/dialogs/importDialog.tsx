import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogProps,
  Tabs,
  Tab,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Input from "@mui/material/Input";
import { useImportExcell } from "@budget/hooks/import/useImport";
import ImportCommitDialog from "./importCommitDialog";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  url?: string;
  file?: any;
  cancelDialog?: () => void;
  readFile?: (file) => void;
}

function ImportTabPanel(props: TabPanelProps) {
  const { children, value, index, cancelDialog, readFile, file } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      className="col-span-full"
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ImportDialog({ open, close }) {
  const [activeTab, setActiveTab] = useState(0);
  const [hasFile, setHasFile] = useState(null);
  const [importUrl, setImportUrl] = useState("");
  const { readFile, readUrl, cancelImport, confirmImport } = useImportExcell();
  const [parsedData, setParsedData] = useState(null); // [ { id: 1, label: "test", amount: 100, date: "2021-10-10" }
  const [showPreview, setShowPreview] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState<DialogProps["maxWidth"]>("lg");

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleCloseAndCancel = () => {
    close();
    cancelImport();
  };

  const handleFileUpload = async (e) => {
    if (!e.target.files[0]) return;
    setHasFile(e.target.files[0]);
    const parsed = await readFile(e.target.files[0]);

    setParsedData(parsed);
    setShowPreview(true);
  };

  return (
    <Dialog fullWidth={fullWidth} maxWidth={maxWidth} open={open}>
      <Box
        sx={{ p: 3 }}
        className="grid w-full max-w-full grid-flow-row grid-cols-1">
        <h3 className="col-start-1 row-start-1">Import Dialog</h3>
        <IconButton
          onClick={() => handleCloseAndCancel()}
          className="self-end col-start-[-1] row-start-1">
          <CloseIcon fontSize="small" />
        </IconButton>
        <Tabs
          value={activeTab}
          onChange={handleChange}
          aria-label="import tabs "
          className="col-span-full">
          <Tab label="Import File" {...a11yProps(0)} />
          <Tab label="Import URL" {...a11yProps(1)} />
        </Tabs>
        <ImportTabPanel
          value={activeTab}
          index={0}
          cancelDialog={cancelImport}
          readFile={() => readFile(hasFile)}>
          <input type="file" onChange={(e) => handleFileUpload(e)} />
        </ImportTabPanel>
        <ImportTabPanel value={activeTab} url={importUrl} index={1}>
          <TextField
            placeholder="URL"
            onChange={(e) => setImportUrl(e.target.value)}
            fullWidth
          />
        </ImportTabPanel>

        {showPreview && (
          <Box className="col-start-1 col-end-[-1] w-full">
            <ImportCommitDialog data={parsedData} />
          </Box>
        )}
        {showPreview && (
          <Box className="flex col-start-[-1] gap-5 mt-5">
            <Button variant="contained" className="bg-slate-300">
              Cancel
            </Button>
            <Button
              variant="contained"
              className="bg-blue-500"
              onClick={() => confirmImport()}>
              Apply
            </Button>
          </Box>
        )}
      </Box>
    </Dialog>
  );
}
