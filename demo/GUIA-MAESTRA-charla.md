# Guía maestra — Managed Agents with Claude

**Charla:** Managed Agents with Claude: Code, Ship, and Learn Across Your Dev Workflow
**Eventos:** Playas on Tech · F13 Code Summit (Lima, septiembre 2026)
**Duración:** 25 min + Q&A · 9 slides · demo grabada

---

# PARTE 1 — Cómo llevar la charla

## El arco narrativo en una frase

El título promete tres verbos y cada bloque cumple uno: **Code** (bloques 1-3), **Ship** (bloque 4, la demo), **Learn** (bloque 5, Dreaming). Si te pierdes en algún momento, vuelve a ese arco.

## Distribución del tiempo

| Slide | Bloque | Tiempo | Rol |
| ----- | ------ | ------ | --- |
| 1 | Título | 0:30 | Presentación |
| 2 | El cambio | 1:30 | Gancho emocional |
| 3 | El loop | 5:00 | Modelo mental |
| 4 | Tu ciclo de dev | 8:00 | **El corazón** |
| 5 | Demo (video) | 6:00 | La prueba |
| 6 | El resultado 30× | 1:30 | El remate |
| 7 | Managed Agents | 2:00 | Escala |
| 8 | Dreaming | 2:30 | **La estrella** |
| 9 | Cierre / CTA | 1:00 | Acción |

Total: ~28 min. Si vas justo de tiempo, recorta el bloque 7 (Managed Agents) — es el único prescindible.

## Slide por slide

### Slide 1 — Título (30 seg)
**No la leas.** Una frase de presentación: quién eres, que eres Claude Community Ambassador, y que esto va de agentes que ejecutan trabajo, no de chatbots.
**Puente:** "Empecemos por el cambio que hace esto posible."

### Slide 2 — El cambio (1:30)
Tu apertura emocional. La frase **"de Claude que responde a Claude que hace"** es el corazón — dila y **pausa**.
Un ejemplo de una línea: "antes le preguntabas cómo arreglar un bug; ahora le pides que lo arregle, y lo hace."
No te alargues. Es un gancho, no una explicación.

### Slide 3 — El loop (5:00)
Aquí instalas el modelo mental que sostiene TODO lo demás. Si no entienden esto, el resto no aterriza.

**La analogía que funciona:** un humano depurando. Miras el error (observar) → decides qué probar (pensar) → editas y corres (actuar) → repites. El agente hace exactamente eso, en loop, con herramientas.

**Remate:** el contraste de la barra inferior — el chatbot da un turno y se detiene; el agente repite hasta cumplir el objetivo.

### Slide 4 — Agentes en tu ciclo (8:00) ← EL CORAZÓN
Aquí inviertes tu credibilidad. **No recorras las 6 celdas como lista.**

Elige 2 o 3 y cuéntalas como historias desde tu experiencia real:
- Tu skill `dynatrace-consultant-expert`
- Los subagents de Platzi Conf
- Algún caso de tu trabajo diario

La celda **"Tu propio material"** es tu momento de autoridad: *"esto no es teoría, yo construí estas skills."*

Este bloque es el que justifica que te inviten. La gente recuerda historias, no bullets.

### Slide 5 — Demo (1:00 setup + 5:00 video)
Presenta los 6 pasos rápido, luego corre el video.

**Narra encima del video.** Nunca lo dejes en silencio. Guion de narración en `demo/DEMO-SCRIPT.md`.

**El momento a señalar con énfasis:** cuando el agente conecta la traza de Dynatrace con la línea exacta del código. Ahí la audiencia dice "ah, de verdad entiende mi stack."

**La frase clave:** "No le dije cuál era el bug. Lo descubrió desde la telemetría."

### Slide 6 — El resultado 30× (1:30)
Tu remate. Di "30×" y **pausa**.

**El punto NO es la velocidad.** Es que el agente entregó una mejora medible **sin romper el comportamiento** — los 3 tests siguen verdes. Eso separa un juguete de una herramienta.

### Slide 7 — Managed Agents + sandboxes (2:00)
Mención de titular. **No profundices.**

El ángulo que pega: el mismo loop, pero desatendido, corriendo donde tú controlas los datos. Conecta con tu contexto de banca/entornos regulados.

**La frase:** "Anthropic maneja el cerebro; tú manejas las manos y los datos."

### Slide 8 — Dreaming (2:30) ← LA ESTRELLA
Tu cierre aspiracional. **Conecta directo con la demo:**

> "Lo que vieron corrió una vez. Con Dreaming, el agente relee esa sesión, aprende que 'latencia en /checkout suele ser un N+1 downstream', y la próxima vez llega más rápido a la causa."

**Tu tagline memorable:** "aprende mientras duermes."

### Slide 9 — Cierre / CTA (1:00)
Accionable. Que se vayan con algo concreto: **instala Claude Code esta noche, dale una tarea pequeña de tu proyecto.**

Repite Code/Ship/Learn para cerrar el arco del título. Abre Q&A.

---

# PARTE 2 — Qué estudiar

**Prioridad en orden:** 1) la demo, 2) Dreaming, 3) Managed Agents.

## 2.1 La demo (domínala — es lo que más puede fallarte)

Menos estudiar, más practicar. **Corre la demo 3-4 veces antes de grabar.**

Debes poder explicar cada comando que el agente ejecuta y por qué.

**Pregunta probable:** *"¿Y si no uso Dynatrace?"*
**Respuesta:** el patrón es agnóstico — cualquier fuente de observabilidad con CLI o API sirve. Dynatrace + dtctl es solo la implementación concreta.

## 2.2 Dreaming (estúdialo a fondo — es tu slide estrella)

**Qué es:** un proceso de consolidación de memoria que corre en segundo plano mientras el agente no está trabajando activamente. Revisa experiencias pasadas, identifica patrones, consolida memoria y descarta lo que ya no es útil. La analogía con el sueño (consolidación tipo REM) es deliberada y es tu mejor recurso pedagógico.

**El punto técnico que te da autoridad:**
> Dreaming opera sobre el **almacén de memoria externo** del agente, **no sobre los pesos del modelo**. El modelo base de Claude no cambia; lo que mejora es el conocimiento contextual disponible en un deployment específico.

Si preguntan *"¿entonces reentrena el modelo?"* → **No.** Cura la memoria, no toca los pesos.

**Estado (sé honesto):** research preview, lanzado el 6 de mayo de 2026.
En Claude Code aparece como **"Auto Dream"**; se invoca manualmente con `/dream` y también corre como consolidación en segundo plano que reorganiza los archivos de memoria estilo CLAUDE.md.

**Verifica si lo tienes activo:** corre `/memory` en una sesión de Claude Code y busca "Auto-dream: on" en el selector.

**Cómo conecta con tu charla:** es el "Learn" de tu título.

## 2.3 Managed Agents + self-hosted sandboxes (nivel intermedio)

**Qué es:** infraestructura hospedada para correr sesiones agénticas largas e intensivas en herramientas. Maneja el sandboxing, la gestión de estado, credenciales y recuperación de errores. Lanzó el 8 de abril de 2026.

**El concepto clave (lo que pega con audiencia de banca):**
> El loop del agente —gestión de contexto, manejo de errores— se queda en la infraestructura de Anthropic, mientras que **la ejecución de herramientas se mueve a tu infraestructura**.

**El matiz honesto si preguntan:** un deployment 100% on-premise **no es posible**. La orquestación se queda en Anthropic. No prometas de más.

**Estado:** anunciados en Code with Claude London el 19 de mayo de 2026 — self-hosted sandboxes en public beta, MCP tunnels en research preview. Algunas fuentes reportan GA en mayo-junio. **Hay tensión entre fuentes**, así que di "beta / GA reciente, verifiquen el estado actual" y confírmalo en tu cuenta el día del evento.

**MCP tunnels (por si preguntan):** conectan agentes a servidores MCP en red privada sin exponerlos a internet. Un gateway ligero abre una única conexión saliente cifrada extremo a extremo, sin reglas de firewall entrantes.

## 2.4 Antes de Perú (crítico)

La semana antes del evento, **vuelve a verificar** el estado de Dreaming y sandboxes en platform.claude.com/docs y en tu propia cuenta.

Nada mata credibilidad más rápido que decir "está en beta" cuando ya salió a GA, o al revés.

---

# PARTE 3 — Setup del proyecto (para grabar HOY)

Ruta elegida: **UTM en tu MacBook Pro (24 GB) con Ubuntu Server ARM64.**

## 3.0 Checklist previa

- [ ] MacBook con UTM instalado
- [ ] Tenant de Dynatrace **personal o playground** (⚠️ NO el de BofA — riesgo NDA en pantalla)
- [ ] Claude Code instalado en tu Mac
- [ ] dtctl instalado en tu Mac
- [ ] El repo `checkout-service` descomprimido en tu Mac
- [ ] OBS o QuickTime para grabar

## 3.1 Descarga la ISO correcta

Ubuntu Server **ARM64** (no x86 — no arranca en Apple Silicon):
→ ubuntu.com/download/server/arm
→ archivo `ubuntu-24.04...-live-server-arm64.iso`

## 3.2 Crea la VM en UTM

**Create a New Virtual Machine → Virtualize** (NO Emulate — Virtualize usa el chip nativo y es rápido).

- Operating System: **Linux**
- Boot ISO Image: la ISO ARM64
- Memory: **4096 MB**
- CPU Cores: **2**
- Storage: **25 GB**
- Nombre: `checkout-demo`

**Red:** en settings de la VM → Network → Network Mode → **Shared Network** (default de UTM). La VM obtiene su propia IP y tu Mac la alcanza directo.

Instala Ubuntu Server normal. **⚠️ Marca "Install OpenSSH server"** cuando lo ofrezca.

## 3.3 Conéctate desde tu Mac

Dentro de la VM:
```bash
ip addr show | grep "inet "
```
Anota la IP (con Shared suele ser `192.168.64.x`).

Desde la Terminal de tu Mac:
```bash
ssh tu_usuario@192.168.64.x
```
De aquí en adelante trabajas por SSH — más cómodo que la ventana de UTM.

## 3.4 Prepara el sistema y Bun

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl unzip git

curl -fsSL https://bun.sh/install | bash
source ~/.bashrc
bun --version
```

## 3.5 Sube el repo

Desde la **Terminal de tu Mac** (no en la VM):
```bash
scp -r /ruta/local/checkout-service tu_usuario@192.168.64.x:~/
```

De vuelta en la VM:
```bash
cd checkout-service
bun install
bun test        # deben pasar 3 tests
```

## 3.6 Servicio systemd

```bash
sudo tee /etc/systemd/system/checkout.service > /dev/null << EOF
[Unit]
Description=checkout-service demo
After=network.target

[Service]
Type=simple
WorkingDirectory=/home/$USER/checkout-service
ExecStart=$HOME/.bun/bin/bun run src/index.ts
Environment=PORT=3000
Restart=always
User=$USER

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable checkout
sudo systemctl start checkout
systemctl status checkout
curl http://localhost:3000/health
```
Debe responder `{"status":"ok"}`.

## 3.7 Instala OneAgent (¡ARM!)

En tu Dynatrace: **Hub / Deploy Dynatrace → OneAgent → Linux → arquitectura ARM** (no x86).

Copia el comando `wget` que te da (lleva tu URL, token y `arch=arm`). Luego:

```bash
sudo /bin/sh Dynatrace-OneAgent-Linux.sh \
  --set-monitoring-mode=fullstack \
  --set-app-log-content-access=true \
  --set-host-name=checkout-demo-local
```

⚠️ Si instalas el de x86 por error, no arranca en la VM ARM. Errores raros de ejecución = casi siempre esto.

## 3.8 Reinicia el servicio (CRÍTICO — no lo olvides)

OneAgent no instrumenta procesos que ya estaban corriendo:
```bash
sudo systemctl restart checkout
```

Verifica en Dynatrace → **Infrastructure & Operations → Hosts**. En unos minutos aparece `checkout-demo-local` con el proceso Bun.

## 3.9 Genera baseline y luego la degradación

Desde la **Terminal de tu Mac**:
```bash
cd /ruta/local/checkout-service
./scripts/generate-load.sh http://192.168.64.x:3000 1800
```

**⚠️ La estrategia de tiempos es lo más importante de todo el setup:**
Deja correr **45-60 minutos** para que Davis construya un baseline sano. Los carts de 30 items empujan el promedio hasta que Davis abre el problema.

**Si disparas la carga pesada de inmediato, Davis la toma como normal y NUNCA abre problema.**

## 3.10 Confirma el problema

```bash
dtctl doctor
dtctl query "fetch dt.davis.problems | filter event.status == \"ACTIVE\"" --agent
```

Cuando veas un **response time degradation** sobre el servicio checkout → listo para grabar.

## 3.11 Snapshot antes de grabar (truco que vale oro)

Con el problema ya activo: apaga la VM y en UTM haz **clic derecho → Clone**.

Si una toma sale mal, restauras el estado con el problema ya presente y regrabas en segundos, **sin volver a esperar 45 min de carga**.

---

# PARTE 4 — La grabación

## 4.1 Preparación

- Claude Code corre en **tu Mac** (no en la VM), apuntando al repo local
- dtctl autenticado en tu Mac (`dtctl doctor` verde)
- Skills instaladas:
  ```bash
  dtctl skills install --for claude
  npx skills add dynatrace/dynatrace-for-ai
  ```
- Terminal con **fuente 18pt+** (debe leerse en proyector)
- Pantalla limpia: cierra Slack, correo, notificaciones
- La ventana de UTM **no aparece** en la grabación — solo tu terminal y Claude Code

## 4.2 El prompt (esto escribes en cámara)

```
Tenemos una alerta activa en Dynatrace sobre el servicio de checkout.
Usa dtctl para:
1. Traer el problema activo y las trazas del endpoint /checkout.
2. Localizar en qué parte del código se está yendo el tiempo.
3. Proponer y aplicar el fix en este repo.
4. Correr `bun test` para confirmar que el comportamiento no cambia.
5. Abrir un PR con una descripción clara del root cause.
```

**No le digas cuál es el bug.** Todo el impacto está en que lo descubre solo.

## 4.3 Qué debe pasar

| Paso | Acción del agente | Qué señalar al narrar |
| ---- | ----------------- | --------------------- |
| Detecta | `dtctl query "fetch dt.davis.problems..." --agent` | "No le di el problema, lo consultó él" |
| Investiga | `dtctl query "fetch spans \| filter request.path == '/checkout'..."` | El tiempo está en las llamadas a inventory |
| Correlaciona | Abre `src/routes/checkout.ts` | **El momento clave** — telemetría → código |
| Arregla | `for await` → `Promise.all` | El diff en vivo |
| Valida | `bun test` → 3 verdes | "No rompió el contrato" |
| Entrega | `gh pr create` | El PR con root cause |

**Verifica contra `demo/expected-fix.ts`** que el PR del agente es correcto.

## 4.4 Edición

- Recorta tiempos muertos (esperas largas del agente)
- **Deja visible el razonamiento** — es lo que impresiona
- Resalta los 3 momentos clave: trae el problema / abre checkout.ts / corre los tests
- **Duración final: 5-6 min máximo**

## 4.5 Fallbacks

| Problema | Solución |
| -------- | -------- |
| El agente no encuentra el problema | Falta baseline. Corre generate-load.sh más tiempo |
| dtctl auth expira | `dtctl auth refresh` |
| Toma sale mal | Restaura el snapshot de UTM |
| Algo falla el día del evento | **Ya tienes el video** — esa es la razón de grabarlo |

---

# PARTE 5 — Q&A: preguntas probables

**"¿Y si no uso Dynatrace?"**
El patrón es agnóstico. Cualquier observabilidad con CLI/API sirve.

**"¿Esto corre solo, desatendido?"**
Ahí conectas con Managed Agents (slide 7): el mismo loop disparado por el webhook del problema.

**"¿Dreaming reentrena el modelo?"**
No. Opera sobre el almacén de memoria externo, no sobre los pesos.

**"¿Puedo correr todo on-premise?"**
No del todo. La ejecución de herramientas sí va en tu infra; la orquestación se queda en Anthropic.

**"¿Está disponible ya?"**
Dreaming: research preview. Sandboxes: beta/GA reciente. **Verifica antes del evento.**

**"¿Cuánto cuesta?"**
No inventes cifras. "Depende del plan y del uso — revisen la página de pricing."

**"¿Qué pasa si el agente rompe algo?"**
Por eso los tests son parte del loop. El agente valida antes de entregar, y el PR requiere revisión humana.

---

# PARTE 6 — Checklist final

## Hoy (antes de grabar)
- [ ] VM creada en UTM con Ubuntu ARM64
- [ ] Servicio corriendo (`curl localhost:3000/health` → ok)
- [ ] OneAgent ARM instalado en fullstack
- [ ] Servicio reiniciado después de OneAgent
- [ ] Host visible en Dynatrace
- [ ] Carga corriendo (45-60 min de baseline)
- [ ] Problema activo confirmado con dtctl
- [ ] Snapshot de la VM hecho
- [ ] Demo ensayada 3-4 veces
- [ ] Video grabado y editado (5-6 min)

## Antes de Perú
- [ ] Estado de Dreaming verificado
- [ ] Estado de sandboxes verificado
- [ ] Slides revisadas con el video insertado
- [ ] Ensayo completo cronometrado (25 min)
- [ ] Video exportado y copiado al laptop de presentación
- [ ] Adaptador HDMI/USB-C en la maleta
