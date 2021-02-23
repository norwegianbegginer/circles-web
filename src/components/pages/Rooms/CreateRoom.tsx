import React from 'react'
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Typography } from '@material-ui/core';
import AccountPicker from 'components/common/AccountPicker';
import { useHistory } from 'react-router-dom';
import { useStore, useDispatch } from 'store/hooks';
import { useDispatchCommand } from 'api/hooks';
import { RoomCreate } from 'api/commands';
import Flex from 'components/utils/Flex';
import { Alert } from '@material-ui/lab';
import { updateCurrentAccount } from 'store/actions';
import { useLittera } from "react-littera";
import translations from "./trans";
import useStyles from "./styles";

const CreateRoom = () => {
    const [error, setError] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [selected, setSelected] = React.useState<string[]>([]);
    const [label, setLabel] = React.useState("");
    const classes = useStyles();
  
    const history = useHistory();
    const currentAccount = useStore(state => state.currentAccount);
    const dispatchCommand = useDispatchCommand();
    const dispatchStore = useDispatch();
    const [translated] = useLittera(translations);

    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    const handleSubmit = async () => {
      setLoading(true);
      const newRoom = await dispatchCommand(RoomCreate, currentAccount?.id ?? "", label, selected);

      if (newRoom.status === 200) {
        // Refetch current account to display updated rooms list.
        dispatchStore(await updateCurrentAccount(currentAccount?.id ?? ""));

        const room_id = newRoom!.data!.room_id;
        history.push(`/home/room/${room_id}`)
      } else if(newRoom.status === 404) {
        // @ts-ignore
        setError(newRoom?.message ?? "Unexpected error occurred")
      }

      setLoading(false);
    }

    const handleLabelChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      // @ts-ignore
      const value = event?.target?.value ?? "";

      setLabel(value);
    }

    const isSubmitDisabled = label.length === 0 || selected.length === 0 || loading;

    return <div>
      <Button variant="contained" disableElevation onClick={handleClickOpen} className={classes.roomsButton}>{translated.conversation}</Button>
        
        <Dialog fullWidth onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
          <DialogTitle id="customized-dialog-title">
            {translated.createRoom}
          </DialogTitle>
          
          <DialogContent dividers>
            {error && <Alert severity="error">{error}</Alert>}

            <TextField disabled={loading} fullWidth id="outlined-basic" label="Room name" value={label} onChange={handleLabelChange} variant="outlined" />

            <Typography style={{marginTop: "35px"}} variant="h5" >{translated.invite}</Typography>
            
            <AccountPicker disabled={loading} style={{margin: "20px 0"}} multiple value={selected} onChange={setSelected} />
          </DialogContent>
          
          <DialogActions>
            <Flex width="100%" justifyContent="space-between" alignItems="center">
              
              {selected.length > 0 ? <Typography>Selected {selected.length} {selected.length > 1 ? "friends" : "friend"}</Typography>
              : <Typography>Select a friend</Typography>}

              <div>
                <Button autoFocus onClick={handleClose} color="primary">
                  Close
                </Button>
                <Button disabled={isSubmitDisabled} autoFocus onClick={handleSubmit} color="primary">
                  Create
                </Button>
              </div>
            </Flex>
          </DialogActions>
        </Dialog>
    </div>


}



export default CreateRoom;
