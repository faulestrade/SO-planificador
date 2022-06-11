import React from "react";
import { Grid } from "@mui/material";


const ProcessOutput = () => {
    const jobs = {name: 'Nombre', history: ''};
    const time = 5;
    const quantumSize = 3;
    const timeSpaces = Array.from(Array(time + 1));
    const width = (time + 1) * quantumSize;

    return(
        <Grid className="output" container>
            <aside>
        <header className="title">Planificación</header>
        {jobs.map((item, index) => (
          <div key={index} className="process">
            <label>{item.name}</label>
          </div>
        ))}
      </aside>
      <main>
        <header style={{ width: fullWidth }}>
          {timeSpaces.map((value, index) => (
            <div
              key={index}
              className="step"
              style={{ width: `${quantumSize}px` }}
            >
              {index}
            </div>
          ))}
        </header>

        {jobs.map((job, index) => (
          <div key={index} className="process" style={{ width: fullWidth }}>
            {timeSpaces.map((value, index) => {
              return (
                <div
                  key={index}
                  className="step"
                  title={index}
                  style={{
                    width: `${quantumSize}px`,
                    ...(isEmpty(job.history[index])
                      ? {}
                      : styles[job.history[index]])
                  }}
                />
              );
            })}
          </div>
        ))}
      </main>
        </Grid>
    )

}