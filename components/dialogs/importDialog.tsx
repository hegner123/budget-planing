import React, { useEffect, useState } from "react";
import {
  Dialog,
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
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
          <Box>
            {index === 0 && <Button onClick={readFile}>Preview</Button>}
            {index === 1 && <Button>Import</Button>}
            <Button>Cancel</Button>
          </Box>
        </Box>
      )}
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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleCloseAndCancel = () => {
    close();
    cancelImport();
  };

  return (
    <Dialog open={open}>
      <Box sx={{ p: 3 }} className="grid grid-cols-3">
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
          <input type="file" onChange={(e) => setHasFile(e.target.files[0])} />
        </ImportTabPanel>
        <ImportTabPanel value={activeTab} url={importUrl} index={1}>
          <TextField
            placeholder="URL"
            onChange={(e) => setImportUrl(e.target.value)}
            fullWidth
          />
        </ImportTabPanel>
        {showPreview && <ImportCommitDialog data={parsedData} />}
      </Box>
    </Dialog>
  );
}
