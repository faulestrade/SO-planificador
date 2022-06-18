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
    let boolean = false;
    const result = [...sortedArray].map((processArray) =>
      processArray.map((process) => {
        const processUpdated = { ...process };
        processUpdated.status =
          process.timeExecuted === process.executionTime
            ? ProcessStatus.ENDED
            : processUpdated.status;
        if (processUpdated.status !== ProcessStatus.ENDED) {
          if (!aProcessIsRunning && process.startTime <= time) {
            processUpdated.status = ProcessStatus.RUNNING;
            aProcessIsRunning = true;
          } else {
            processUpdated.status =
              process.startTime <= time ? ProcessStatus.READY : process.status;
          }
        }
        if (processUpdated.status !== ProcessStatus.ENDED && !boolean) {
          boolean = true;
        }
        const isProcessRunning =
          processUpdated.status === ProcessStatus.RUNNING;
        processUpdated.timeExecuted =
          process.timeExecuted + (isProcessRunning ? 1 : 0);

        return processUpdated;
      })
    );
    if (!boolean) {
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
