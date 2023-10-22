import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { TimeField } from '@mui/x-date-pickers/TimeField';

export default function FormDialog({service}) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(null);
  const [time, setTime] = React.useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    setOpen(false);
    let output = dayjs(date).format('YYYY-MM-DD') + "T" + dayjs(time).format('HH:MM:00Z')
    console.log(output);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            When?
          </DialogContentText>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker 
            value={date}
            onChange={setDate}
            defaultValue={dayjs()} />
          <TimeField 
            value={time}
            onChange={setTime}
            defaultValue={dayjs()} />
        </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}