import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: "70%",
  },

  formContainer: {
    display: "flex",
    flexDirection: "column",
  },
}));
export default useStyles;
