import React from "react";
import { Formik } from "formik";
import { Button, Input, Grid, Paper } from "@mui/material";

import useStyles from "./styles";
import validationSchemaProcess from "./validationSchemaProcess";

const AddProcess = () => {
  const classes = useStyles();

  const handleSubmit = (values) => {
    console.log("name", values.name);
    console.log("processType", values.processType);
  };

  return (
    <Paper className={classes.container}>
      <Formik
        initialValues={{
          name: "",
          processType: "",
          executionTime: "",
          taskType: "",
          userPriority: 0,
        }}
        validationSchema={validationSchemaProcess}
        onSubmit={handleSubmit}
      >
        {(formik) => {
          return (
            <form onSubmit={formik.handleSubmit}>
              <Grid
                container
                spacing={2}
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Grid item xs={10} md={10}>
                  <Input
                    name="name"
                    placeholder="Nombre"
                    type="text"
                    fullWidth
                    onChange={formik.handleChange}
                  />
                </Grid>
                <Grid item xs={10} md={10}>
                  <Input
                    name="processType"
                    placeholder="Tipo proceso"
                    type="text"
                    fullWidth
                    onChange={formik.handleChange}
                  />
                </Grid>
                <Grid item xs={10} md={10}>
                  <Input
                    fullWidth
                    name="executionTime"
                    onChange={formik.handleChange}
                    placeholder="Tiempo de ejecución"
                    type="text"
                  />
                </Grid>
                <Grid item xs={10} md={10}>
                  <Input
                    fullWidth
                    name="taskType"
                    onChange={formik.handleChange}
                    placeholder="Tipo de tarea"
                    type="text"
                  />
                </Grid>
                <Grid item xs={10} md={10}>
                  <Input
                    fullWidth
                    name="userPriority"
                    onChange={formik.handleChange}
                    placeholder="Prioridad"
                    type="number"
                  />
                </Grid>
                <Grid item xs={10} md={10}>
                  <Button type="submit">Planificar</Button>
                </Grid>
              </Grid>
            </form>
          );
        }}
      </Formik>
    </Paper>
  );
};

export default AddProcess;
