import React from "react";
import { useLittera } from "react-littera";
import useStyles from "./styles"
import translations from "./trans"
import { Typography, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Box } from "@material-ui/core";
import { useAccount } from "api/hooks";
import CloseIcon from "@material-ui/icons/Close";
import cx from "classnames";


/**
 * Profile page component.
 */

const Profile = (props: ProfileDrawerProps) => {
  const [translated] = useLittera(translations);
  const classes = useStyles();

  const currentAccount = useAccount(undefined, true);

  if (!currentAccount || !currentAccount.isValid) return null;

  const translatedSex = translated[currentAccount?.details?.sex || 'notGiven'];

  return (
    <Box className={cx(classes.root, props.className)} style={props.style}>

      <Dialog open={props.open} onClose={props.onClose} maxWidth='xl' scroll='paper' PaperProps={{ style: { overflowY: 'visible' } }}>
        <DialogTitle id="scroll-dialog-title">
          <Box className={classes.imgContainer}>
            <img alt="profile avatar" src={currentAccount.avatar_url} className={classes.img} />
          </Box>
          <Box className={classes.head}>
            <Button variant='text' >
              {translated.edit}
            </Button>
            <DialogActions><IconButton onClick={props.onClose}><CloseIcon /></IconButton></DialogActions>
          </Box>
          <Box className={classes.topData}>
            <Typography className={classes.name} variant="h4">{currentAccount.name()}</Typography>
            <Typography className={classes.nickName}>{currentAccount.label}</Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box className={classes.profileContainer}>
            <Box className={classes.detailsContainer}>
              <DetailComponent
                label={translated.fullName}
                value={currentAccount.name("first_name", "middle_name", "last_name")} />
              <DetailComponent
                label={translated.birthDate}
                value={currentAccount?.details?.birthdate} />
              <DetailComponent
                label={translated.email}
                value={currentAccount?.contact?.email}
                warning={currentAccount?.flags?.includes('verify_email')} />
              <DetailComponent
                label={translated.sex}
                value={translatedSex} />
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Box >
  )
}

// Props the component accepts.

type ProfileDrawerProps = {
  className?: string;
  style?: React.CSSProperties;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const DetailComponent = ({ label, value, warning }: { label: string, value?: any, warning?: boolean }) => {
  const classes = useStyles();
  const translated = useLittera(translations);
  if (value === undefined) return null;

  return <Box>
    <Typography className={classes.label} variant="h5">
      {label}
    </Typography>
    {warning && <span className={classes.verify} > {translated.warning} </span>}
    <Typography className={classes.detail}>
      {value}
    </Typography>
  </Box>
}


export default Profile;