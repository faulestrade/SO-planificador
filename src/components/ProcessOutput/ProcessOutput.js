import React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import { Grid, Box, Paper, Container, Theme } from "@mui/material";


import useStyles from "./styles";

const ProcessOutput = ({ value, setValues }) => {
  const classes = useStyles();

  return (
    <>
      <Container>
        <Box
          sx={{
            p: 1,
            border: 1,
            borderColor: (theme) => theme.palette.primary.main,
          }}
        ></Box>
      </Container>
    </>
  );
};

export default ProcessOutput;
