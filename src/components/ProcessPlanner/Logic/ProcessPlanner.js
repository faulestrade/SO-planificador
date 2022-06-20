import { Button } from "@mui/material";
import React, { useState, useEffect, useMemo } from "react";
import { ProcessStatus } from "../../../Utils";

const ProcessPlanner = ({ processArray }) => {
  const [time, setTime] = useState();
  const [running, setRunning] = useState(false);
  const sortProcess = (arrayToSort) =>
    arrayToSort.map((secondArray) =>
      secondArray.sort((a, b) =>
        a.status === ProcessStatus.ENDED || b.status === ProcessStatus.ENDED
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
        <div>
          <div>Tiempo actual: {time}</div>
          {newSortedArray.map((processArray) =>
            processArray.map((process) => (
              <div>
                <div>Nombre: {process.name}</div>
                <div>Estado: {process.status}</div>
                <div>Tiempo ejecutado: {process.timeExecuted}</div>
                <div>Tiempo Bloqueado: {process.timeBlocked}</div>
                <div>Cuando es Bloqueado: {process.whenIsBlocked}</div>
              </div>
            ))
          )}
          ----------------------------------------------------------------------------
        </div>,
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
          return processUpdated;
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
      <Button variant="text" onClick={() => setRunning(true)}>
        True
      </Button>
      <Button variant="text" onClick={() => setRunning(false)}>
        False
      </Button>
      {renderItems}
    </div>
  );
};

export default ProcessPlanner;
