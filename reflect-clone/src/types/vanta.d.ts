declare module "vanta/dist/vanta.globe.min" {
  type VantaInstance = {
    destroy?: () => void;
  };

  type VantaGlobe = (options: Record<string, unknown>) => VantaInstance;

  const globe: VantaGlobe;
  export default globe;
}
