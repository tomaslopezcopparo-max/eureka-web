# Plan de 90 días

Documento que se entrega al cliente en la semana 1, después del diagnóstico. Ordena el trabajo de los primeros 90 días por vertical (marca, anuncios y contenidos), con un hito por mes y tres revisiones.

## Cómo usarlo

1. Copiar `plantilla.html` con el nombre del cliente (por ejemplo `cafe-norte.html`), en esta misma carpeta para que carguen las fuentes.
2. Editar solo el bloque `PLAN` al principio del `<script>`:
   - `ejemplo: false` con clientes reales.
   - `inicio`: el día 1 del plan. Las fechas de fases y revisiones se calculan solas.
   - `hallazgos`: 2 a 4 puntos del diagnóstico, cada uno con el porqué de lo que vamos a hacer.
   - `verticales`: tres fases por vertical, con tareas e hito. Si una vertical no está contratada, se borra.
3. Abrir en el navegador y exportar a PDF con Imprimir (A4).
4. En cada revisión (días 30, 60 y 90), actualizar el estado de tareas (`pendiente`, `curso`, `hecho`) e hitos (`ok`, `warn`) y volver a enviar.

En la revisión del día 90 se presenta el plan de los 90 días siguientes, que es cuando se renueva.

Esta carpeta no se publica: Vercel publica solo `sitio/`.
