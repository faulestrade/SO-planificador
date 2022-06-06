# Obligatorio Parte 2

## Carol Glass, Faustina Lestrade, Antonia Mescia

### Sistemas Operativos 2022

### Universidad Católica del Uruguay

Se nos ha contratado para realizar un ==planificador de corto plazo== para un sistema operativo servidor que se instalará en un servidor de mediano porte. Pero antes de comenzar el desarrollo, se nos pide que generemos una simulación del mismo como para poderla evaluar su comportamiento. Esto es con el objetivo de validar si el diseño es correcto para este servidor. 

Para que la evaluación del planificador sea lo más realista posible, se nos pide que el mismo contemple (entre otras cosas): 

- Poder ingresar la cantidad de procesadores o cores.
- Poder modificar la cantidad de tiempo que los procesos se encuentran en CPU.
- Poder modificar la prioridad de los mismos en tiempo de ejecución (prioridad de 1 a 99).
- Poder bloquear un proceso en cualquier momento.
- Poder cargar (de alguna forma) múltiples procesos de un solo ingreso
- Poder insertar procesos ya sea del S.O. como de usuario indicando:
  - Tiempo total de ejecución
    - Cada qué tiempo realiza una E/S (periódica sin modificación)
    - Tiempo en que espera por la E/S (puede ser diferente para cada proceso).

