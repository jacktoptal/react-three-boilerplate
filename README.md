# React Three Boilerplate

A Vite + React starter focused on Three.js model viewing with physically based lighting, HDR environments, Draco-ready glTF loading, and a Zustand-driven scene control layer.

## Tech Stack

- React 18 + Vite 3
- Three.js + `postprocessing`
- Zustand (app and scene state)
- Styled Components + PrimeReact UI primitives
- React Router + React Query (core app scaffolding)

## What Is Included

- A full-screen `ThreeViewer` mounted in `Main` page
- `ThreeEngine` class for scene/camera/renderer/composer lifecycle
- HDR environment presets in `src/dataset/environments.js`
- Lighting controls wired through global state in `src/state/store.js`
- Draco decoder files preconfigured in `public/draco`
- Basic app shell (theme provider, router setup, page transition, navbar components)

## Requirements

- Node.js `>=20.0.0`
- Yarn classic (`1.x`) or npm (Yarn is used in scripts/examples below)

## Getting Started

```bash
npm install --global yarn
yarn install
yarn start
```

Dev server defaults to port `4000` (see `vite.config.js`) and binds with `--host` so it is reachable on your network.

## Available Scripts

- `yarn start` - start Vite dev server
- `yarn build` - create production build
- `yarn lint` - run ESLint with auto-fix
- `yarn format` - run Prettier on JS/JSX/JSON/MD files

## Project Structure

```text
src/
  App.jsx                         # Providers + routes + toast + query devtools
  index.js                        # React root bootstrap
  api/                            # API layer placeholder (currently empty)
  assets/
    textures/                     # HDR/JPG environment assets
  components/
    ThreeViewer/
      ThreeViewer.jsx             # React bridge to ThreeEngine
      libs/
        ThreeEngine.js            # Scene lifecycle + loading + render orchestration
        Composer.js               # Post-processing stack
        Lights.js                 # Light rig
        Helpers.js                # ShadowPlane + camera fit helper
  dataset/
    environments.js               # Env preset metadata and asset refs
    routes.js                     # Route definitions
  pages/Main/Main.jsx             # Viewer page
  state/store.js                  # Zustand scene/app state
  theme/                          # Global styling + responsive container
public/
  draco/                          # Draco decoders used by GLTFLoader
```

## Rendering Architecture

`ThreeViewer` is the React-facing component. It:

1. Instantiates `ThreeEngine` once on mount.
2. Subscribes to Zustand slices (lights/env/model/loader).
3. Pushes state changes into engine methods (`updateEnvmap`, `updateSunLight`, etc.).
4. Disposes engine resources on unmount.

`ThreeEngine` owns:

- Scene primitives (axes helper, shadow plane)
- Camera + `OrbitControls`
- WebGL renderer setup (ACES tone mapping, shadows, sRGB output)
- Asset loaders (`GLTFLoader`, `DRACOLoader`, `RGBELoader`, OBJ/MTL/FBX prepared)
- Effect composer pipeline (SMAA, SSAO, bloom, vignette, brightness/contrast)
- Loading manager that updates UI loader visibility through store callbacks

## Customization Guide

### 1) Load your own model

The default store points to:

```js
currentPhysics: 'models/house.glb'
```

Place your model under `public/models` (or any public path), then update `currentPhysics` in `src/state/store.js` or set it dynamically from UI/state actions.

### 2) Add/modify environment presets

Edit `src/dataset/environments.js`:

- Add new `hdr`/`jpg` imports from `src/assets/textures`
- Append a preset object with `name`, `azimuth`, `zenith`, and `exposure`

These values drive:

- Environment map/background texture
- Sun orientation (`azimuth` + `zenith`)
- Tone mapping exposure

### 3) Tune default lights

Update initial values in `src/state/store.js`:

- `sunInfo`
- `firstEmbientInfo`
- `secondEmbientInfo`

Then, at runtime, `ThreeViewer` forwards updates to `ThreeEngine` light methods.

### 4) Adjust post-processing

Open `src/components/ThreeViewer/libs/Composer.js` and tweak:

- `BloomEffect` (`intensity`, threshold, smoothing)
- `SSAOEffect` (`radius`, `intensity`, thresholds)
- `VignetteEffect` / `BrightnessContrastEffect`

## Notes and Caveats

- `src/api/index.js` exists as a placeholder and is currently empty.
- Router scaffolding supports multiple pages, but only `/` (`Main`) is registered by default.
- Several loaders are initialized (OBJ/MTL/FBX), while `loadModel` currently loads GLTF/GLB.
- If `yarn build` fails with "`vite` is not recognized", dependencies are not installed yet. Run `yarn install` first.

## License

[MIT](./LICENSE)
