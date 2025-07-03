import create from 'zustand';

export const useStore = create((set, get) => ({
  // Loader
  loaderVisible: false,
  setLoaderVisible: v => set({loaderVisible: v}),
  // Menu
  menuVisible: false,
  setMenuVisible: v => set({menuVisible: v}),
  // Lights
  sunInfo: {
    enabled: true,
    color: '#FFFDEC',
    intensity: 1.2,
  },
  setSunInfo: v => set({sunInfo: v}),
  firstEmbientInfo: {
    enabled: true,
    color: '#b1dbff',
    intensity: 1,
  },
  setFirstEmbientInfo: v => set({firstEmbientInfo: v}),
  secondEmbientInfo: {
    enabled: true,
    color: '#4cadff',
    intensity: 0.6,
  },
  setSecondEmbientInfo: v => set({secondEmbientInfo: v}),
  // Env
  activeEnvironmentIndex: 0,
  setActiveEnvironmentIndex: v => set({activeEnvironmentIndex: v}),
  envBackgroundEnabled: false,
  setEnvBackgroundEnabled: v => set({envBackgroundEnabled: v}),
  currentOrientation: 0,
  setCurrentOrientation: v => set({currentOrientation: v}),
  currentExposure: 1,
  setCurrentExposure: v => set({currentExposure: v}),
  // Physics selector
  currentPhysics: 'models/house.glb',
  setCurrentPhysics: v => set({currentPhysics: v}),
}));
