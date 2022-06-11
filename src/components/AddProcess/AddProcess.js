import React, {useState} from "react";
import { Formik } from "formik";
import {
  Button,
  Input,
  Grid,
  Paper,
  Autocomplete,
  TextField,
  FormHelperText,
} from "@mui/material";

import useStyles from "./styles";
import validationSchemaProcess from "./validationSchemaProcess";

const AddProcess = () => {
  const classes = useStyles();

  const handleSubmit = (values) => {
    console.log("name", values.name);
    console.log("processType", values.processType);
  };

  const processType = [
    "Interactivo",
    "Batch",
    "Tiempo Real",
    "Sistema Operativo",
  ];

  //const [processList, setProcessList] = useState([{process: ""}])

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
                  <TextField
                    id="outlined-basic"
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
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={processType}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Tipo de proceso" />
                    )}
                  />
                </Grid>
                <Grid item xs={10} md={10}>
                  <TextField
                    id="outlined-basic"
                    label="Tiempo de entrada"
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
                    id="outlined-basic"
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
                    id="outlined-basic"
                    label="Prioridad"
                    variant="outlined"
                    fullWidth
                    InputProps={{ inputProps: { min: 0, max: 10 } }}
                    //helperText = 'HOLA'
                    name="userPriority"
                    onChange={formik.handleChange}
                    placeholder="Prioridad"
                    type="number"
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <Grid container
                  sx={{justifyContent: 'space-between'}}>
                    <Grid item xs={6} md={6}>
                      <Button
                        sx={{ color: "#041f55", textTransform: "none" }}
                        type="submit"
                        //onClick = {}
                      >
                        Agregar proceso
                      </Button>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Button
                        sx={{ color: "#041f55", textTransform: "none" }}
                        type="submit"
                      >
                        Planificar procesos
                      </Button>
                    </Grid>
                  </Grid>
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
