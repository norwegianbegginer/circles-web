import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {

  },

  profileContainer: {
    width: "40vw",
    minWidth: '250px',
    height: '55vh',
    display: 'flex',
    flexDirection: 'column',
  },

  head: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: "center",
  },

  imgContainer: {
    position: 'absolute',
    top: 0,
    right: '50%',
    transform: 'translate(50%, -50%)',
  },

  img: {
    borderRadius: '50%',
    width: '150px',
    height: '150px',
    boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',
  },

  topData: {
    textAlign: 'center',
  },

  name: {
    marginTop: theme.spacing(2),
    fontWeight: 500,
  },

  nickName: {
    fontSize: '15px',
    opacity: 0.7,
  },

  detailsContainer: {
    flex: '1',
    padding: '30px 20px 30px 20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  label: {
    marginBottom: '3px',
    opacity: 0.7,
    fontSize: '13px',
    textTransform: 'uppercase',
  },

  detail: {
    marginBottom: '19px',
    paddingBottom: '3px',
    borderBottom: '1px solid #e3e3e3',
    fontWeight: 500,
  },

  verify: {
    fontSize: '14px',
    color: '#fc2626',

  },
}));

export default useStyles;