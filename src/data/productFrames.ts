export interface FrameImage {
  id: string;
  src: string;
  title: string;
  category: 'ms_flats' | 'ms_rounds' | 'ms_squares' | 'rolling_mill';
  tag: string;
  description: string;
}

export const PRODUCT_FRAMES: FrameImage[] = [
  {
    id: 'frame-flat-01',
    src: '/assets/frames/balaji_01.png',
    title: 'Hot Rolled MS Flats (Patti) Mill Output',
    category: 'ms_flats',
    tag: 'IS 2062 Grade E250',
    description: 'Precision hot-rolled rectangular flat steel strips fresh from rolling line stand.',
  },
  {
    id: 'frame-flat-02',
    src: '/assets/frames/balaji_02.png',
    title: 'Flats Cooling Bed & Dimensional Alignment',
    category: 'ms_flats',
    tag: 'Uniform Gauge',
    description: 'Uniform gauge cooling bed inspection ensuring crisp square 90-degree edges.',
  },
  {
    id: 'frame-round-01',
    src: '/assets/frames/balaji_03.png',
    title: 'MS Round Bars (Gol) Precision Rolling',
    category: 'ms_rounds',
    tag: 'Circular Solid Bars',
    description: 'High-tensile cylindrical round bars engineered for anchor bolts, sag rods and shafts.',
  },
  {
    id: 'frame-square-01',
    src: '/assets/frames/balaji_04.png',
    title: 'MS Square Bars (Chakor) Cross Section',
    category: 'ms_squares',
    tag: 'Sharp Corners',
    description: 'Solid cuboidal square steel bar profiles for crane tracks, grilles, and machine tooling.',
  },
  {
    id: 'frame-mill-01',
    src: '/assets/frames/balaji_05.png',
    title: 'Continuous High-Speed Roll Stand Pass',
    category: 'rolling_mill',
    tag: 'Bhiwadi Plant',
    description: 'Continuous rolling mill stands shaping hot steel billeting with tight tolerances.',
  },
  {
    id: 'frame-round-02',
    src: '/assets/frames/balaji_06.png',
    title: 'Solid Round Rods Surface Finish Verification',
    category: 'ms_rounds',
    tag: 'IS 2062 Tested',
    description: 'Cylindrical bar finish inspectable for thread-cutting and structural bracing.',
  },
  {
    id: 'frame-flat-03',
    src: '/assets/frames/balaji_07.png',
    title: 'Heavy Substation Earthing Flats (50x6 / 75x10)',
    category: 'ms_flats',
    tag: 'Substation Earthing',
    description: 'High ductility MS Flats ready for electrical grounding grids and base plates.',
  },
  {
    id: 'frame-square-02',
    src: '/assets/frames/balaji_08.png',
    title: 'Industrial Heavy Chakor Square Stacks',
    category: 'ms_squares',
    tag: 'Crane Rail & Tooling',
    description: 'Heavy duty square bars stacked with BIS institutional certification tags.',
  },
  {
    id: 'frame-mill-02',
    src: '/assets/frames/balaji_09.png',
    title: 'Direct Rolling Line & Automated Shear Cut',
    category: 'rolling_mill',
    tag: '36,000 TPA Capacity',
    description: 'In-line flying shear cutting rolled sections to precise 6M and 12M standards.',
  },
  {
    id: 'frame-bundle-01',
    src: '/assets/frames/balaji_10.png',
    title: 'Institutional Bundle Packaging & Dispatch Bay',
    category: 'rolling_mill',
    tag: 'Ready Dispatch',
    description: 'Strapped and weighed commercial steel bundles ready for delivery across Delhi NCR.',
  },
  {
    id: 'frame-mill-03',
    src: '/assets/frames/balaji_11.png',
    title: 'Quality Lab Verification & Physical Bend Testing',
    category: 'rolling_mill',
    tag: '180° Bend Tested',
    description: 'Certified metallurgical verification matching BIS IS 2062 Grade E250 specifications.',
  },
  {
    id: 'frame-video2-01',
    src: '/assets/frames/video2_frame_01.jpg',
    title: 'Reheating Furnace Discharge to Roughing Stand',
    category: 'rolling_mill',
    tag: 'Thermal Control',
    description: 'Continuous thermal furnace output maintaining precise rolling temperatures.',
  },
];
