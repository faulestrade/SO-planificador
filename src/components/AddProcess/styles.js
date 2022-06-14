import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    display: "flex",
    flexDirection: "column",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: "50%",
    margin: "3%",
    paddingTop: "1rem",
    paddingBottom: "1rem",
  },
}));
export default useStyles;
