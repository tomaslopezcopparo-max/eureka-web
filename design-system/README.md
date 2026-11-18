# Eureka — Design system

Sistema visual de la agencia. Sale del [panel](../dashboard/index.html) y del [alcance de Tu Préstamo Genial](../clientes/tu-prestamo-genial/alcance-de-servicio.pptx). Se usa en **todas las piezas propias de Eureka**: propuestas, presentaciones, reportes, panel y documentos para clientes.

> Las piezas que hacemos *para* un cliente (feed, stories, anuncios) usan la marca del cliente, no esta.

- Tokens y componentes: [`tokens.css`](tokens.css)
- Fuentes: [`fonts/`](fonts/) (Open Sauce Sans 300 / 400-500 / 700)

## Color

| Token | Hex | Uso |
|---|---|---|
| `--azul` | `#04298a` | Color principal. Texto, fondos de marca, botones |
| `--azul-600` | `#1f3fa8` | Links, foco, valores interactivos |
| `--violeta` | `#1f0249` | Profundidad, extremo del orbe |
| `--cian` | `#aef6ff` | Acento sobre azul. Cifras destacadas, badges |
| `--cian-brillo` | `#bbfcff` | Centro del orbe |
| `--fondo` | `#eeeeee` | Fondo general. También texto sobre azul |
| `--panel` | `#ffffff` | Tarjetas y paneles |
| `--tinta-2` / `--tinta-3` | `#4a5a8f` / `#7a86ad` | Texto secundario / terciario |
| `--linea` | azul 12% | Bordes y divisores |
| `--suave` | azul 5% | Hover, fondos de tracks |

**Gráficos** (en este orden): `#04298a` → `#3f6be0` → `#8fb4ff` → `#c7d4f5`.
**Estados**: ok `#0f7a4a` sobre `#e1f5ea` · alerta `#8a5a00` sobre `#fff1cc`.

Reglas:
- El texto va siempre en azul, nunca en negro.
- El cian se usa solo sobre azul o violeta. Sobre blanco no tiene contraste.
- Hay dos temas. El **claro** (fondo `#eeeeee` + paneles blancos) es para contenido. El **de marca** (fondo azul + cian) es para portadas, KPIs principales y navegación.

## Tipografía

Familia única: **Open Sauce Sans**.

| Estilo | Peso | Tamaño | Tracking | Uso |
|---|---|---|---|---|
| Logo `eureka` | 400 | libre | -0.085em | Siempre en minúscula |
| Display | 400 (300 en slides) | 34–48px | -0.07em, interlineado .9 | Títulos de página y portadas |
| Título de panel | 700 | 16px | -0.02em | Encabezados de sección |
| Cifra | 700 | 24–32px | -0.04em | KPIs, con números tabulares |
| Cuerpo | 400 | 14px | 0 | Texto general |
| Eyebrow | 500, MAYÚSCULAS | 10–11px | +0.194em | Etiquetas sobre títulos |

Los títulos grandes van en peso **liviano** (300 o 400) y apretados. El peso 700 se reserva para cifras y títulos chicos.

## Forma

- Radios: paneles 16px · cards 12px · inputs/medios 10px · pills 999px.
- Bordes: `1.5px` en `--linea`. No usamos sombras, salvo en drawers y modales.
- Espaciado: grilla de 4px. Lo habitual: 16px entre paneles, 20px de padding interno y 24px entre secciones.

## Motivo: el orbe

Es un círculo con gradiente radial de `--cian-brillo` a `--violeta`, a 22–35% de opacidad. Va cortado contra un borde de una superficie azul (esquina de un KPI, base del sidebar o portada). Usar uno solo por superficie. Token: `--orbe`.

## Componentes base (en `tokens.css`)

`.panel` · `.card` · `.marca` (superficie azul con orbe) · `.display` · `.eyebrow` · `.logo` · `.pill` · `.tag.ok|warn|info` · `.chip` · `.aviso` · `.num`

## En PowerPoint / Google Slides / Canva

- Fondo `#EEEEEE` o `#04298A`. Texto `#04298A` o `#EEEEEE`. Acento `#AEF6FF`.
- Títulos en Open Sauce Sans Light. Cuerpo en Regular o Medium.
- Los `.woff2` de [`fonts/`](fonts/) son para web. En Office o Canva hay que instalar Open Sauce Sans en versión TTF/OTF, que es una fuente libre.
