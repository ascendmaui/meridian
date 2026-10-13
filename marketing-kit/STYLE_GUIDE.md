# Meridian style guide

Visual rules for the files in this folder. Colors and the type family come from the globe client checked into this repository. Wording comes from the repository README and that client.

## Name

The product name is **Meridian**.

The browser page title is **Meridian Globe**.

The owner is **Ascend Maui**.

Public material uses the Meridian name. Meridian is a rebrand of an MIT-licensed open-source globe; the earlier project name is not part of this brand.

## Voice

Use the repository’s own description: “Hosted interactive globe experience.”

Say what the repository and the globe client actually contain. Usage counts, rankings, review scores, revenue, and customer quotations are not in the repository, so they are not part of the voice.

## Color

These are the color values in the globe client. The same values appear in `index.html` and `src/index.js` on the development branches `improve-server-robust`, `pr3`, `update-infrastructure-pr-2`, and `cursor/fix-main-ci-03b7`. They are not on `main` at `7316b60`.

| Role in the client | Source literal | Hex | Where |
| --- | --- | --- | --- |
| Scene background | `0x87ceeb` (comment: Sky blue) | `#87CEEB` | `src/index.js`, `THREE.Color` |
| Globe sphere | `0x00bfff` | `#00BFFF` | `src/index.js`, `MeshStandardMaterial.color` |
| Directional light | `0xffffff` | `#FFFFFF` | `src/index.js`, `DirectionalLight` |
| Ambient light | `0x404040` | `#404040` | `src/index.js`, `AmbientLight` |
| Page background behind the canvas | `#f0f0f0` | `#F0F0F0` | `index.html`, `#globe-container` |
| Loading text | `#666` | `#666666` | `index.html`, `#globe-placeholder` |
| Skip-link background | `#000` | `#000000` | `index.html`, `.skip-link` |
| Skip-link text | `white` | `#FFFFFF` | `index.html`, `.skip-link` |

Templates in this folder use only this set. The white highlight on the mark is `#FFFFFF`. The darker shading on the sphere is `#404040`, the ambient-light color, at partial opacity.

## Type

The only font named in the client is in `index.html`:

```css
font-family: Arial, sans-serif;
font-size: 1.2rem;
```

That size is for the loading line “Loading globe visualization…”. The client does not load a webfont.

Templates set `Arial, Liberation Sans, sans-serif`. Liberation Sans is the metric-compatible fallback used to export the PNGs in this folder, because Arial is not installed in the export environment. Product code names Arial only.

| Use in these templates | Weight | Notes |
| --- | --- | --- |
| Wordmark “Meridian” | Bold (700) | Product name |
| Subhead | Regular (400) | “Hosted interactive globe experience.” |
| Browser title in frames | Regular (400) | “Meridian Globe”, the `<title>` text |
| Secondary labels | Regular (400) | Color `#404040` or `#666666` |

There is no separate display face in the repository.

## Logo

| File | Use |
| --- | --- |
| `logo/meridian-mark.svg` | Globe mark, transparent background |
| `logo/meridian-mark.png` | Same mark, 1024×1024 |
| `logo/meridian-lockup.svg` | Mark plus wordmark, transparent background |
| `logo/meridian-lockup.png` | Same lockup, 1040×360 |

The mark is a sphere in `#00BFFF` with a black outline, a black equator, and a black meridian, on the scene colors above. The current in-app favicon is a globe emoji in a data URI in `index.html`. The marketing mark is drawn from the sphere colors, not from that emoji.

Clear space around the mark is one quarter of the mark’s diameter. Keep the black outline intact so the sphere stays readable on `#87CEEB` and on `#F0F0F0`.

## Social sizes

| Asset | Pixels | Source |
| --- | --- | --- |
| X header | 1500×500 | `social/x-header.svg`, `.html`, `.png` |
| LinkedIn banner | 1584×396 | `social/linkedin-banner.svg`, `.html`, `.png` |
| Open Graph image | 1200×630 | `social/og-image.svg`, `.html`, `.png` |

Background for these three is the scene color `#87CEEB`. Type is `#000000`. The subhead is `#404040`.

## Store frames

| Asset | Pixels | What the screen shows |
| --- | --- | --- |
| iPhone frame | 1290×2796 | `store/iphone-1290x2796.svg` and `.html` |
| Mac frame | 2880×1800 | `store/mac-2880x1800.svg` and `.html` |

The canvas outside the device uses the page background `#F0F0F0`. The screen uses the scene background `#87CEEB` and the `#00BFFF` sphere. The Mac title bar reads “Meridian Globe”. These are drawn templates of that scene, not captured screenshots of a running build.

## Claims these templates may carry

- Meridian is a hosted interactive globe experience.
- Ascend Maui owns it.
- The source of truth is https://github.com/ascendmaui/meridian.
- The development-branch page is an interactive 3D visualization titled Meridian Globe.
- That page fills the window, draws a rotating Three.js sphere, and includes a skip link labeled “Skip to globe visualization.”
- The README states that application source and deploy config will land in the repository as the product is recovered and rebuilt.

A production website URL, audience size, and customer quotations are not in the repository.
