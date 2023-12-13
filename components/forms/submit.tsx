import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
const SubmitButtons = ({ cancel, add, addMore }) => {
  return (
    <DialogActions>
      <Button onClick={cancel}>Cancel</Button>
      <Button
        onClick={add}
        variant="contained"
        className="text-white bg-brand-dark-blue">
        Add
      </Button>
      <Button
        onClick={addMore}
        variant="contained"
        className="text-white bg-brand-dark-blue">
        Add Another
      </Button>
    </DialogActions>
  );
};

export default SubmitButtons;
