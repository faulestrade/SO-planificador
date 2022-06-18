import React from "react";
import { useState } from "react";
import {
  Grid,
  TextField,
  MenuItem,
  Paper,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

import useStyles from "./styles";

const AddProcess = ({ value, setValues }) => {
  const classes = useStyles();
  const processType = [
    "Interactivo",
    "Batch",
    "Tiempo Real",
    "Sistema Operativo",
  ];

  const [isChecked, setisChecked] = useState(false);

  const handleCheck = (event) => {
    setValues({ ...value, isBlocked: !isChecked });
    setisChecked((current) => !current);
  };

  return (
    <Paper className={classes.container}>
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
            value={value.name}
            onChange={(e) => setValues({ ...value, name: e.target.value })}
          />
        </Grid>
        <Grid item xs={10} md={10}>
          <TextField
            name="processType"
            id="processType"
            select
            fullWidth
            value={value.processType}
            label="Tipo de proceso"
            variant="outlined"
            onChange={(e) =>
              setValues({ ...value, processType: e.target.value })
            }
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
            value={value.startTime}
            InputProps={{ inputProps: { min: 0, max: 20 } }}
            name="startTime"
            onChange={(e) =>
              setValues({ ...value, startTime: +e.target.value })
            }
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
            value={value.executionTime}
            InputProps={{ inputProps: { min: 0, max: 20 } }}
            name="executionTime"
            onChange={(e) =>
              setValues({ ...value, executionTime: +e.target.value })
            }
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
            value={value.userPriority}
            InputProps={{ inputProps: { min: 0, max: 10 } }}
            name="userPriority"
            onChange={(e) =>
              setValues({ ...value, userPriority: +e.target.value })
            }
            placeholder="Prioridad"
            type="number"
          />
        </Grid>
        <Grid item xs={10} md={10}>
          <FormGroup>
            <FormControlLabel
              id="isBlocked"
              name="isBlocked"
              value={isChecked}
              onChange={handleCheck}
              control={<Checkbox />}
              label="¿El proceso se bloquea?"
            />
          </FormGroup>
        </Grid>
        {isChecked ? (
          <>
            <Grid item xs={10} md={10}>
              <TextField
                id="whereIsBlocked"
                label="Se bloquea cada"
                variant="outlined"
                fullWidth
                value={value.whereIsBlocked}
                InputProps={{ inputProps: { min: 0, max: 10 } }}
                name="whereIsBlocked"
                onChange={(e) =>
                  setValues({ ...value, whereIsBlocked: +e.target.value })
                }
                placeholder="Se bloquea cada"
                type="number"
              />
            </Grid>
            <Grid item xs={10} md={10}>
              <TextField
                id="blockedTime"
                label="Tiempo de bloqueo"
                variant="outlined"
                fullWidth
                value={value.blockedTime}
                InputProps={{ inputProps: { min: 0, max: 10 } }}
                name="blockedTime"
                onChange={(e) =>
                  setValues({ ...value, blockedTime: +e.target.value })
                }
                placeholder="Tiempo de bloqueo"
                type="number"
              />
            </Grid>
          </>
        ) : null}
      </Grid>
    </Paper>
  );
};

export default AddProcess;
