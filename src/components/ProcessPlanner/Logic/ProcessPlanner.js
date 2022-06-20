import {
  Button,
  Table,
  TableRow,
  TableContainer,
  TableCell,
  TableHead,
  TableBody,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { ProcessStatus } from "../../../Utils";

const ProcessPlanner = ({ processArray }) => {
  const [time, setTime] = useState();
  const [running, setRunning] = useState(false);
  const sortProcess = (arrayToSort) =>
    arrayToSort.map((secondArray) =>
      secondArray.sort((a, b) =>
        a.status === ProcessStatus.ENDED && b.status === ProcessStatus.ENDED
          ? 0
          : a.status === ProcessStatus.ENDED || b.status === ProcessStatus.ENDED
          ? -1
          : b.userPriority - a.userPriority
      )
    );
  const [sortedArrayProcess, setSortedArrayProcess] = useState();
  const [renderItems, setRenderItems] = useState([]);

  //setInterval = Esta funcion tiene dos argumentos, el primero es lo que queres que ejecute y en el segundo el tiempo que tiene que esperar para hacerlo.
  useEffect(() => {
    if (running) {
      setSortedArrayProcess(sortProcess(processArray));
      setTime(0);
      setRenderItems([]);
      const intervalId = setInterval(() => {
        if (running) {
          setTime((oldTime) => {
            const newTime = oldTime + 1;
            return newTime;
          });
        }
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [running]);

  useEffect(() => {
    if (sortedArrayProcess && time !== undefined) {
      let newSortedArray = [...sortedArrayProcess].map((processArray) =>
        processArray.map((process) => {
          const processUpdated = { ...process };
          const isProcessRunning =
            processUpdated.status === ProcessStatus.RUNNING;
          processUpdated.userPriority =
            process.userPriority + (time % 3 === 0 && isProcessRunning ? 1 : 0);
          return processUpdated;
        })
      );
      newSortedArray = sortProcess(newSortedArray);
      newSortedArray = runAProcess(newSortedArray);
      newSortedArray = sortProcess(newSortedArray);
      setSortedArrayProcess(newSortedArray);
      setRenderItems([
        ...renderItems,
        <>
          <TableRow container>
            <TableCell style={{ textAlign: "center" }}>{time}</TableCell>
            <TableCell style={{ textAlign: "center" }}>
              <div
                style={{
                  flexDirection: "row",
                }}
              >
                {newSortedArray.map((processArray) =>
                  processArray
                    .filter((process) => process.status === ProcessStatus.READY)
                    .map((process) => <>Proceso: {process.name}</>)
                )}
              </div>
            </TableCell>
            <TableCell style={{ textAlign: "center" }}>
              <div
                style={{
                  flexDirection: "row",
                }}
              >
                {newSortedArray.map((processArray) =>
                  processArray
                    .filter(
                      (process) => process.status === ProcessStatus.RUNNING
                    )
                    .map((process) => <>Proceso: {process.name}</>)
                )}
              </div>
            </TableCell>
            <TableCell style={{ textAlign: "center" }}>
              <div
                style={{
                  flexDirection: "row",
                }}
              >
                {newSortedArray.map((processArray) =>
                  processArray
                    .filter(
                      (process) => process.status === ProcessStatus.BLOCKED
                    )
                    .map((process) => <>Proceso: {process.name}</>)
                )}
              </div>
            </TableCell>
            <TableCell style={{ textAlign: "center" }}>
              <div
                style={{
                  flexDirection: "row",
                }}
              >
                {newSortedArray.map((processArray) =>
                  processArray
                    .filter((process) => process.status === ProcessStatus.ENDED)
                    .map((process) => <div>Proceso: {process.name}</div>)
                )}
              </div>
            </TableCell>
          </TableRow>
        </>,
      ]);
    }
  }, [time]);

  const runAProcess = (sortedArray) => {
    let aProcessIsRunning = false;
    let thereIsAtLeastOneProcessNotEnded = false;
    const result = [...sortedArray].map((processArray) =>
      processArray.map((process) => {
        const processUpdated = { ...process };

        // Si el tiempo ejecutado es = al tiempo que ya ejecuto el proceso cambia a Finalizado
        if (processUpdated.timeExecuted === processUpdated.executionTime) {
          processUpdated.status = ProcessStatus.ENDED;
          return processUpdated;
        }

        // Si al menos hay un proceso que no esta terminado
        if (
          processUpdated.status !== ProcessStatus.ENDED &&
          !thereIsAtLeastOneProcessNotEnded
        ) {
          thereIsAtLeastOneProcessNotEnded = true;
        }

        // Si estaba ejecutando y tiene que bloquearse
        if (
          processUpdated.status === ProcessStatus.RUNNING &&
          processUpdated.timeExecuted &&
          processUpdated.timeExecuted % processUpdated.whenIsBlocked === 0
        ) {
          processUpdated.status = ProcessStatus.BLOCKED;
        }

        //Si el proceso esta en estado bloqueado se le suma 1 a el tiempo ya bloqueado
        if (
          processUpdated.status === ProcessStatus.BLOCKED &&
          processUpdated.timeBlocked !== processUpdated.blockedTime
        ) {
          processUpdated.timeBlocked = processUpdated.timeBlocked + 1;
          return processUpdated;
        } else {
          processUpdated.timeBlocked = 0;
        }

        // Si no hay un proceso corriendo entra al if y pone al proceso en Ejecutando, sino sigue al else y pone al proceso en listo
        if (!aProcessIsRunning && processUpdated.startTime <= time) {
          processUpdated.status = ProcessStatus.RUNNING;
          aProcessIsRunning = true;
          processUpdated.timeExecuted = processUpdated.timeExecuted + 1;
        } else {
          processUpdated.status =
            processUpdated.startTime <= time
              ? ProcessStatus.READY
              : processUpdated.status;
        }

        return processUpdated;
      })
    );
    if (!thereIsAtLeastOneProcessNotEnded) {
      setRunning(false);
    }
    return result;
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1px",
          margin: "20px",
        }}
      >
        <div
          style={{
            fontSize: "24px",
            fontWeight: "500",
            color: "#041f55",
          }}
        >
          Planificador con colas multi-nivel
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <Button variant="text" onClick={() => setRunning(true)}>
            Empezar a planificar
          </Button>
          <Button variant="text" onClick={() => setRunning(false)}>
            Parar de planificar
          </Button>
        </div>
      </div>
      <TableContainer
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ textAlign: "center" }}>Tiempo</TableCell>
              <TableCell style={{ textAlign: "center" }}>
                Procesos Listos
              </TableCell>
              <TableCell style={{ textAlign: "center" }}>
                Procesos Ejecutando
              </TableCell>
              <TableCell style={{ textAlign: "center" }}>
                Procesos Bloqueados
              </TableCell>
              <TableCell style={{ textAlign: "center" }}>
                Procesos Finalizados
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderItems}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ProcessPlanner;
