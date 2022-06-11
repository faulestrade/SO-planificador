import React from "react";

import useStyles from "./styles";
import AddProcess from "../AddProcess/AddProcess";
import ucuLogo from "../../assets/UCU_name.png";
import { Typography } from "@mui/material";
import { Container } from "@mui/system";

const Home = () => {
  const classes = useStyles();

  return (
    <>
      <Container className={classes.container}>
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: "500",
            color: "#041f55",
            paddingBottom: "2%",
          }}
        >
          Agregar procesos:
        </Typography>
        <AddProcess />
      </Container>
      <div className={classes.footBar}>
        <div className={classes.namesContainer}>
          <Typography className={classes.text}>Carol Glass</Typography>
          <Typography className={classes.text}>Faustina Lestrade</Typography>
          <Typography className={classes.text}>Antonia Mescia</Typography>
        </div>
        <div className={classes.logoContainer}>
          <div className={classes.textContainer}>
            <Typography noWrap className={classes.text}>
              Sistemas operativos
            </Typography>
          </div>
          <img src={ucuLogo} alt="ucuLogo" style={{ maxHeight: "90%" }} />
        </div>
      </div>
    </>
  );
};

export default Home;
