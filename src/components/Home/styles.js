import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    height: "100vh",
    overflow: "auto",
    justifyContent: "center",
    alignContent: "center",
    textAlign: "-webkit-center",
  },
  footBar: {
    bottom: 20,
    position: "absolute",
    width: "100%",
    height: "64px",
    maxHeight: "64px",
    display: "flex",
    flexDirection: "row",
  },
  title: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#041f55",
  },
  text: {
    fontSize: "24px",
    fontWeight: "500",
    color: "#041f55",
  },
  textContainer: {
    display: "flex",
    alignSelf: "center",
    paddingRight: "5%",
  },
  namesContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  logoContainer: {
    display: "flex",
    flexDirection: "row",
    paddingRight: "2%",
    alignContent: "center",
  },
}));
export default useStyles;
