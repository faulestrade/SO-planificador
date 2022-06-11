import React, { useState, useMemo } from "react";
import { toast } from "react-toastify";
import { Form, Formik } from "formik";
import { Button, Grid, Paper, TextField, MenuItem } from "@mui/material";

import useStyles from "./styles";
import validationSchemaProcess from "./validationSchemaProcess";

const AddProcess = () => {
  const classes = useStyles();
  const muliLevelArray = [[], [], [], []];

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

  const handleSubmit = (values) => {
    const process = {
      name: values.name,
      processType: values.processType,
      startTime: values.startTime,
      executionTime: values.executionTime,
      userPriority: values.userPriority,
    };
    saveOnMultiLevel(process);
  };

  const processType = [
    "Interactivo",
    "Batch",
    "Tiempo Real",
    "Sistema Operativo",
  ];

  return (
    <Paper className={classes.container}>
      <Formik
        initialValues={{
          name: "",
          processType: "",
          startTime: 0,
          executionTime: 0,
          userPriority: 0,
        }}
        onSubmit={(values) => handleSubmit(values)}
      >
        {(formik) => {
          return (
            <Form>
              <Grid
                container
                spacing={2}
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Grid item xs={10} md={10}>
                  <TextField
                    id="name"
                    label="Nombre"
                    variant="outlined"
                    name="name"
                    placeholder="Nombre"
                    type="text"
                    fullWidth
                    onChange={formik.handleChange}
                  />
                </Grid>
                <Grid item xs={10} md={10}>
                  <TextField
                    name="processType"
                    id="processType"
                    select
                    fullWidth
                    value={formik.values.processType}
                    label="Tipo de proceso"
                    variant="outlined"
                    onChange={formik.handleChange}
                  >
                    <MenuItem value={processType[0]}>{processType[0]}</MenuItem>
                    <MenuItem value={processType[1]}>{processType[1]}</MenuItem>
                    <MenuItem value={processType[2]}>{processType[2]}</MenuItem>
                    <MenuItem value={processType[3]}>{processType[3]}</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={10} md={10}>
                  <TextField
                    id="startTime"
                    label="Tiempo de entrada"
                    variant="outlined"
                    fullWidth
                    InputProps={{ inputProps: { min: 0, max: 20 } }}
                    name="startTime"
                    onChange={formik.handleChange}
                    placeholder="Tiempo de ejecución"
                    type="number"
                  />
                </Grid>
                <Grid item xs={10} md={10}>
                  <TextField
                    id="executionTime"
                    label="Tiempo de ejecución"
                    variant="outlined"
                    fullWidth
                    InputProps={{ inputProps: { min: 0, max: 20 } }}
                    name="executionTime"
                    onChange={formik.handleChange}
                    placeholder="Tiempo de ejecución"
                    type="number"
                  />
                </Grid>
                <Grid item xs={10} md={10}>
                  <TextField
                    id="userPriority"
                    label="Prioridad"
                    variant="outlined"
                    fullWidth
                    InputProps={{ inputProps: { min: 0, max: 10 } }}
                    name="userPriority"
                    onChange={formik.handleChange}
                    placeholder="Prioridad"
                    type="number"
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <Grid container sx={{ justifyContent: "space-between" }}>
                    <Grid item xs={6} md={6}>
                      <Button
                        sx={{ color: "#041f55", textTransform: "none" }}
                        type="submit"
                      >
                        Agregar proceso
                      </Button>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Button sx={{ color: "#041f55", textTransform: "none" }}>
                        Planificar procesos
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </Paper>
  );
};

export default AddProcess;
