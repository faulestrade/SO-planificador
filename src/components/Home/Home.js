import React from "react";
import { Formik } from "formik";
import { Button, Typography, Input, Container } from "@mui/material";

import useStyles from "./styles";

const Home = () => {
  const classes = useStyles();

  const handleSubmit = () => {
    // console.log("name", name);
    // console.log("processType", processType);
  };

  return (
    <div className={classes.container}>
      <Typography className={classes.title}>Agregar proceso:</Typography>
      <Formik
        initialValues={{ name: "", processType: "" }}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        <Container>
          <Input name="name" placeholder="Nombre" />
          <Input name="processType" placeholder="Tipo proceso" />
          <Button type="submit">Enviar</Button>
        </Container>
      </Formik>
    </div>
  );
};

export default Home;
