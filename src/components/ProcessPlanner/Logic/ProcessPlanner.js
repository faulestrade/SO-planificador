import React, { useState, useEffect } from "react";

const ProcessPlanner = (processArray1) => {
  const [time, setTime] = useState(-1);
  const [running, setRunning] = useState(false);
  const [sortedArrayProcess, setsortedArrayProcess] = useState([]);

  const processArray = [
    {
      name: "Proceso",
      processType: "Tiempo real",
      startTime: 0,
      executionTime: 2,
      userPriority: 3,
    },
    {
      name: "Proceso2",
      processType: "Batch",
      startTime: 0,
      executionTime: 4,
      userPriority: 0,
    },
    {
      name: "Proceso3",
      processType: "Itercativo",
      startTime: 2,
      executionTime: 3,
      userPriority: 4,
    },
  ];

  //setInterval = Esta funcion tiene dos argumentos, el primero es lo que queres que ejecute y en el segundo el tiempo que tiene que esperar para hacerlo.
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (running) {
        setTime((oldTime) => {
          const newTime = oldTime + 1;
          return newTime;
        });
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [running]);

  useEffect(() => {
    sortProcess();
  }, [processArray[0].userPriority]);

  const sortProcess = () => {
    setsortedArrayProcess(
      processArray.sort((a, b) => b.userPriority - a.userPriority)
    );
  };

  processArray.map((process) => {
    if (time % 3 === 0) {
      process.userPriority++;
    }
  });

  return <></>;
};

export default ProcessPlanner;
