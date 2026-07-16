# Guion de la demo — "Managed Agents with Claude"

Este es el guion end-to-end que vas a **grabar** para el Bloque 4 de la charla.
Objetivo: mostrar el loop completo `alerta en Dynatrace → el agente investiga el
código → abre un PR`, usando `dtctl` como herramienta bash del agente.

---

## 0. Setup previo (una sola vez, antes de grabar)

En tu tenant real (BofA/personal):

1. Instala y autentica dtctl:
   ```bash
   brew install dynatrace-oss/tap/dtctl
   dtctl auth login --context demo --environment "https://<TENANT>.apps.dynatrace.com"
   dtctl doctor          # confirma que todo está verde
   ```
2. Instala las skills (dtctl + dominio Dynatrace) para Claude Code:
   ```bash
   dtctl skills install --for claude
   npx skills add dynatrace/dynatrace-for-ai
   ```
3. Levanta el servicio y genera carga hasta que Davis abra el problema:
   ```bash
   bun install && bun run dev
   ./scripts/generate-load.sh http://localhost:3000 600
   ```
4. Confirma que existe el problema:
   ```bash
   dtctl query "fetch dt.davis.problems | filter event.status == \"ACTIVE\"" --agent
   ```

> ⚠️ Antes de grabar: verifica el estado (GA vs beta) de Dreaming y de los
> self-hosted sandboxes en tu cuenta, por si preguntan en el Q&A.

---

## 1. El prompt de arranque (esto es lo que escribes en cámara)

Abre Claude Code en el repo `checkout-service` y pega:

```
Tenemos una alerta activa en Dynatrace sobre el servicio de checkout.
Usa dtctl para:
1. Traer el problema activo y las trazas del endpoint /checkout.
2. Localizar en qué parte del código se está yendo el tiempo.
3. Proponer y aplicar el fix en este repo.
4. Correr `bun test` para confirmar que el comportamiento no cambia.
5. Abrir un PR con una descripción clara del root cause.
```

No le digas cuál es el bug. El punto de la charla es que el agente lo descubra
desde la telemetría real.

---

## 2. Qué va a hacer el agente (lo que narras encima del video)

| Paso | Acción del agente | Qué señalar en pantalla |
| ---- | ----------------- | ----------------------- |
| Detecta | `dtctl query "fetch dt.davis.problems ..." --agent` | "No le di el problema, lo consultó él" |
| Investiga | `dtctl query "fetch spans \| filter request.path == '/checkout' ..." --agent` | El tiempo está en las llamadas a inventory |
| Correlaciona | Abre `src/routes/checkout.ts`, lee el loop | "Aquí conecta telemetría con código" |
| Arregla | Reescribe el `for await` como `Promise.all` | El diff en vivo |
| Valida | `bun test` → 3 verdes | "No rompió el contrato" |
| Entrega | `gh pr create ...` | El PR con el root cause explicado |

---

## 3. El número que remata (ponlo en slide)

- Cart de 30 items **antes**: ~2710 ms
- Cart de 30 items **después**: ~90 ms
- **~30× más rápido**, mismo comportamiento

---

## 4. Fallbacks (por si algo falla en vivo o al grabar)

- **El agente no encuentra el problema:** puede que no haya suficiente baseline.
  Corre `generate-load.sh` más tiempo, o baja el umbral de detección.
- **dtctl auth expira:** `dtctl auth refresh` y re-graba desde el paso 1.
- **Sin tenant disponible el día del evento:** ya tienes el video grabado — esa
  es justamente la razón de grabarlo y no hacerlo en vivo.
- **Preguntan "¿esto corre solo / desatendido?":** ahí conectas con Managed
  Agents + self-hosted sandboxes (Bloque 5): el mismo loop, pero corriendo en
  tu infra, disparado por el webhook del problema de Dynatrace.

---

## 5. El cierre que conecta con Dreaming (Bloque 5)

"Lo que acaban de ver corrió una vez. Con Dreaming, el agente revisa estas
sesiones pasadas, aprende que 'latencia en /checkout suele ser un N+1 en las
llamadas downstream', y la próxima vez llega más rápido a la causa. Aprende
entre corridas sin que lo reentrenes."
