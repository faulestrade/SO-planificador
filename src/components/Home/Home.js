import React, { useState } from "react";
import { toast } from "react-toastify";

import useStyles from "./styles";
import AddProcess from "../AddProcess/AddProcess";
import ucuLogo from "../../assets/UCU_name.png";
import { Button, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { Formik, useFormik } from "formik";

const Home = () => {
  const classes = useStyles();
  const muliLevelArray = [[], [], [], []];

  const handleProcess = (values) => {
    console.log("values", values);
    // const process = {
    //   name: values.name,
    //   processType: values.processType,
    //   startTime: values.startTime,
    //   executionTime: values.executionTime,
    //   userPriority: values.userPriority,
    // };
    // saveOnMultiLevel(process);
  };

  const { values, setValues, handleSubmit } = useFormik({
    initialValues: [
      {
        id: "0",
        name: "",
        processType: "",
        startTime: 0,
        executionTime: 0,
        userPriority: 0,
      },
    ],
    onSubmit: handleProcess,
  });

  const saveOnMultiLevel = (process) => {
    switch (process.processType) {
      case "Sistema Operativo":
        muliLevelArray[0].push(process);
        break;
      case "Tiempo Real":
        muliLevelArray[1].push(process);
        break;
      case "Interactivo":
        muliLevelArray[2].push(process);
        break;
      case "Batch":
        muliLevelArray[3].push(process);
        break;
      default:
        toast.error("Tipo de proceso incorrecto");
        break;
    }
  };

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
        {values.map((value, index) => (
          <AddProcess
            key={value.id}
            value={value}
            setValues={(newValue) => {
              const oldValues = [...values];
              oldValues[index] = newValue;
              setValues(oldValues);
            }}
          />
        ))}
        <Button
          sx={{ color: "#041f55", textTransform: "none" }}
          onClick={() =>
            setValues([
              ...values,
              {
                id: `${values.length}`,
                name: "",
                processType: "",
                startTime: 0,
                executionTime: 0,
                userPriority: 0,
              },
            ])
          }
        >
          Agregar proceso
        </Button>
        <Button
          type="submit"
          sx={{ color: "#041f55", textTransform: "none" }}
          onClick={handleSubmit}
        >
          Planificar procesos
        </Button>
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
