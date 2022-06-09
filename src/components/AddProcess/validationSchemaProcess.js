import * as Yup from "yup";

const REQUIRED = "Este campo es requerido";

const validationSchemaProcess = Yup.object().shape({
  name: Yup.string().required(REQUIRED),
  processType: Yup.string().required(REQUIRED),
  executionTime: Yup.string().required(REQUIRED),
  taskType: Yup.string().required(REQUIRED),
  userPriority: Yup.number().required(REQUIRED),
});

export default validationSchemaProcess;
