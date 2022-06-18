import React, { useState } from "react";
import { toast } from "react-toastify";

import useStyles from "./styles";
import AddProcess from "../AddProcess/AddProcess";
import ucuLogo from "../../assets/UCU_name.png";
import { Button, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useFormik } from "formik";
import ProcessPlanner from "../ProcessPlanner/Logic/ProcessPlanner";
import { ProcessStatus } from "../../Utils";

const Home = () => {
  const classes = useStyles();
  const [showPlanner, setshowPlanner] = useState(false);
  const [multiLevelArray, setMultiLevelArray] = useState([[], [], [], []]);

  const saveOnMultiLevel = (processes) => {
    const multiLevelArrayClone = [...multiLevelArray];
    processes.map((process) => {
      switch (process.processType) {
        case "Sistema Operativo":
          multiLevelArrayClone[0].push(process);
          break;
        case "Tiempo Real":
          multiLevelArrayClone[1].push(process);
          break;
        case "Interactivo":
          multiLevelArrayClone[2].push(process);
          break;
        case "Batch":
          multiLevelArrayClone[3].push(process);
          break;
        default:
          toast.error("Tipo de proceso incorrecto");
          break;
      }
    });
    setMultiLevelArray(multiLevelArrayClone);
    setshowPlanner(true);
  };

  const { values, setValues, handleSubmit } = useFormik({
    initialValues: [
      {
        id: "0",
        name: "",
        processType: "",
        startTime: 0,
        executionTime: 0,
        timeAlreadyExecuted: 0,
        userPriority: 0,
        blockedTime: 0,
        whereIsBlocked: 0,
        isBlocked: false,
        status: ProcessStatus.OPEN,
        timeExecuted: 0,
      },
    ],
    onSubmit: saveOnMultiLevel,
  });

  return !showPlanner ? (
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
                timeAlreadyExecuted: 0,
                userPriority: 0,
                blockedTime: 0,
                whereIsBlocked: 0,
                isBlocked: false,
                status: ProcessStatus.OPEN,
                timeExecuted: 0,
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
  ) : (
    <ProcessPlanner processArray={multiLevelArray} />
  );
};

export default Home;
