import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: "24px",
    fontWeight: "700",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
  },
}));
export default useStyles;
