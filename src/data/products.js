import pumpImage from '../pages/SparesService/assets/img2.jpg';
import valveImage from '../pages/SparesService/assets/Valves.jpeg';
import motorImage from '../pages/SparesService/assets/img5.jpeg';
import filterImage from '../pages/SparesService/assets/img3.png';
import bearingImage from '../pages/SparesService/assets/img6.jpeg';
import controlImage from '../pages/SparesService/assets/img4.jpeg';

const products = [
  {
    id: 'p1',
    slug: 'high-flow-centrifugal-pump',
    title: 'High-Flow Centrifugal Pump',
    name: 'High-Flow Centrifugal Pump',
    category: 'Pump Systems',
    image: pumpImage,
    description: 'Engineered for maximum throughput with reliable pressure management in industrial fluid systems.',
    fullDescription: 'Our High-Flow Centrifugal Pump delivers superior performance in demanding industrial environments. Designed with precision engineering and robust materials, it ensures consistent operation under continuous stress.',
    features: [
      'High flow capacity up to 180 L/min',
      'Stainless steel construction for durability',
      'Low vibration and noise operation',
      'Easy maintenance access points',
      'Thermal stable performance across temperature ranges'
    ],
    applications: ['Chemical processing plants', 'Water treatment facilities', 'HVAC cooling systems', 'Industrial circulation loops', 'Hydraulic systems'],
    specifications: [
      { label: 'Flow Rate', value: '180 L/min' },
      { label: 'Power', value: '4.0 kW' },
      { label: 'Material', value: 'Stainless steel 316' },
      { label: 'Temperature Range', value: '-20Â°C to 120Â°C' }
    ],
    technicalDetails: [
      { label: 'Flow Rate', value: '180 L/min' },
      { label: 'Power', value: '4.0 kW' },
      { label: 'Material', value: 'Stainless steel 316' },
      { label: 'Temperature Range', value: '-20Â°C to 120Â°C' }
    ]
  },
  {
    id: 'p2',
    slug: 'precision-control-valve',
    title: 'Precision Control Valve',
    name: 'Precision Control Valve',
    category: 'Valves',
    image: valveImage,
    description: 'Responsive valve with fine-tuned flow control for high-precision processing lines.',
    fullDescription: 'The Precision Control Valve offers exceptional accuracy in flow regulation with minimal pressure drop. Its advanced design ensures responsive control for critical applications requiring tight specifications.',
    features: ['Fine flow control adjustment', 'Low pressure drop across valve', 'PTFE sealing for reliability', 'Compact globe valve design', 'High-pressure rated construction'],
    applications: ['Process control systems', 'Laboratory instrumentation', 'Precision dosing systems', 'Temperature control loops', 'Pilot-operated systems'],
    specifications: [
      { label: 'Type', value: 'Globe valve' },
      { label: 'Diameter', value: '1.5 in / 40 mm' },
      { label: 'Pressure Class', value: 'PN16' },
      { label: 'Seal Material', value: 'PTFE' }
    ],
    technicalDetails: [
      { label: 'Type', value: 'Globe valve' },
      { label: 'Diameter', value: '1.5 in / 40 mm' },
      { label: 'Pressure Class', value: 'PN16' },
      { label: 'Seal Material', value: 'PTFE' }
    ]
  },
  {
    id: 'p3',
    slug: 'industrial-servo-motor',
    title: 'Industrial Servo Motor',
    name: 'Industrial Servo Motor',
    category: 'Motors',
    image: motorImage,
    description: 'Compact servo motor offering peak torque and responsive speed control in automation systems.',
    fullDescription: 'Our Industrial Servo Motor combines compact design with powerful performance. With rapid response times and precise speed control, it excels in automation and positioning applications.',
    features: ['High peak torque delivery', 'Precise speed control capabilities', 'IP65 dust and moisture protection', 'Compact and lightweight design', 'Smooth operation at variable speeds'],
    applications: ['Automated assembly lines', 'Positioning systems', 'Robotics and manipulation', 'CNC machining centers', 'Industrial packaging equipment'],
    specifications: [
      { label: 'Power', value: '2.2 kW' },
      { label: 'Speed', value: '3000 RPM' },
      { label: 'Voltage', value: '380 V' },
      { label: 'Ingress Rating', value: 'IP65' }
    ],
    technicalDetails: [
      { label: 'Power', value: '2.2 kW' },
      { label: 'Speed', value: '3000 RPM' },
      { label: 'Voltage', value: '380 V' },
      { label: 'Ingress Rating', value: 'IP65' }
    ]
  },
  {
    id: 'p4',
    slug: 'high-pressure-filter-cartridge',
    title: 'High-Pressure Filter Cartridge',
    name: 'High-Pressure Filter Cartridge',
    category: 'Filters',
    image: filterImage,
    description: 'Durable filter media built to capture fine particulates while preserving system performance.',
    fullDescription: 'The High-Pressure Filter Cartridge provides superior contamination control with minimal pressure loss. Its advanced media composition ensures extended service life while maintaining system efficiency.',
    features: ['Fine 5 Âµm filtration capability', 'High flow capacity handling', 'Extended service intervals', 'Low pressure drop design', 'Synthetic media for durability'],
    applications: ['Hydraulic systems', 'Industrial cooling circuits', 'Fuel filtration systems', 'Compressed air lines', 'High-temperature applications'],
    specifications: [
      { label: 'Filtration', value: '5 Âµm' },
      { label: 'Flow Capacity', value: '120 L/min' },
      { label: 'Dimensions', value: '320 x 120 mm' },
      { label: 'Max Pressure', value: '10 bar' }
    ],
    technicalDetails: [
      { label: 'Filtration', value: '5 Âµm' },
      { label: 'Flow Capacity', value: '120 L/min' },
      { label: 'Dimensions', value: '320 x 120 mm' },
      { label: 'Max Pressure', value: '10 bar' }
    ]
  },
  {
    id: 'p5',
    slug: 'heavy-duty-roller-bearing',
    title: 'Heavy-Duty Roller Bearing',
    name: 'Heavy-Duty Roller Bearing',
    category: 'Bearings',
    image: bearingImage,
    description: 'Robust bearing designed for continuous rotation under heavy radial loads and thermal stress.',
    fullDescription: 'Our Heavy-Duty Roller Bearing handles extreme conditions with precision engineering. Built for sustained performance under heavy loads, it delivers reliability in the most demanding industrial environments.',
    features: ['High dynamic load capacity', 'Sealed bearing design', 'Low friction operation', 'Long service life', 'Grease-lubricated convenience'],
    applications: ['Large machinery bearings', 'Rotating drum systems', 'Industrial gearboxes', 'Heavy-duty conveyors', 'Mining equipment'],
    specifications: [
      { label: 'Bore Size', value: '50 mm' },
      { label: 'Outer Diameter', value: '90 mm' },
      { label: 'Dynamic Load', value: '76 kN' },
      { label: 'Lubrication', value: 'Grease filled' }
    ],
    technicalDetails: [
      { label: 'Bore Size', value: '50 mm' },
      { label: 'Outer Diameter', value: '90 mm' },
      { label: 'Dynamic Load', value: '76 kN' },
      { label: 'Lubrication', value: 'Grease filled' }
    ]
  },
  {
    id: 'p6',
    slug: 'smart-process-controller',
    title: 'Smart Process Controller',
    name: 'Smart Process Controller',
    category: 'Controls',
    image: controlImage,
    description: 'Multichannel controller with intuitive HMI support for predictive maintenance and remote monitoring.',
    fullDescription: 'The Smart Process Controller provides comprehensive system control and monitoring through its intuitive 7-inch HMI display. Advanced connectivity enables seamless integration with existing industrial networks.',
    features: ['Multichannel control capabilities', 'Intuitive touchscreen interface', 'Network connectivity options', 'Predictive maintenance alerts', 'Remote monitoring capability'],
    applications: ['Manufacturing automation', 'Process optimization systems', 'Remote facility monitoring', 'Energy management systems', 'Building automation'],
    specifications: [
      { label: 'Channels', value: '8 Digital / 4 Analog' },
      { label: 'Protocol', value: 'Modbus TCP/IP' },
      { label: 'Display', value: '7-inch TFT' },
      { label: 'Operating Temp.', value: '-10Â°C to 55Â°C' }
    ],
    technicalDetails: [
      { label: 'Channels', value: '8 Digital / 4 Analog' },
      { label: 'Protocol', value: 'Modbus TCP/IP' },
      { label: 'Display', value: '7-inch TFT' },
      { label: 'Operating Temp.', value: '-10Â°C to 55Â°C' }
    ]
  },
  {
    id: 'p7',
    slug: 'submersible-pump-unit',
    title: 'Submersible Pump Unit',
    name: 'Submersible Pump Unit',
    category: 'Pump Systems',
    image: pumpImage,
    description: 'Corrosion-resistant pump unit ideal for wastewater and transfer systems in industrial plants.',
    fullDescription: 'The Submersible Pump Unit combines robust construction with corrosion-resistant materials, making it ideal for challenging wet environments. Its sealed motor design ensures safe operation in harsh conditions.',
    features: ['Complete submersible design', 'Corrosion-resistant construction', 'Sealed motor protection', 'High efficiency operation', 'Easy installation and deployment'],
    applications: ['Wastewater treatment', 'Sewage pumping systems', 'Industrial slurry handling', 'Water transfer stations', 'Dewatering operations'],
    specifications: [
      { label: 'Flow Rate', value: '130 L/min' },
      { label: 'Power', value: '3.5 kW' },
      { label: 'Material', value: 'Cast iron' },
      { label: 'Cable Length', value: '10 m' }
    ],
    technicalDetails: [
      { label: 'Flow Rate', value: '130 L/min' },
      { label: 'Power', value: '3.5 kW' },
      { label: 'Material', value: 'Cast iron' },
      { label: 'Cable Length', value: '10 m' }
    ]
  },
  {
    id: 'p8',
    slug: 'automated-ball-valve',
    title: 'Automated Ball Valve',
    name: 'Automated Ball Valve',
    category: 'Valves',
    image: valveImage,
    description: 'Quick-acting valve with low torque actuation for tight shutoff and efficient process control.',
    fullDescription: 'The Automated Ball Valve delivers rapid on-off switching with reliable sealing performance. Its pneumatic actuation ensures quick response times and low energy consumption in automated systems.',
    features: ['Quick-acting switching', 'Tight shutoff sealing', 'Low actuation torque', 'Extended cycle life', 'Pneumatic control compatible'],
    applications: ['Automated process lines', 'Emergency shutoff systems', 'Flow distribution networks', 'Batch processing', 'Safety interlocked systems'],
    specifications: [
      { label: 'Size', value: '2 in / 50 mm' },
      { label: 'Actuation', value: 'Pneumatic' },
      { label: 'Seal Type', value: 'PTFE' },
      { label: 'Cycle Life', value: '500,000 cycles' }
    ],
    technicalDetails: [
      { label: 'Size', value: '2 in / 50 mm' },
      { label: 'Actuation', value: 'Pneumatic' },
      { label: 'Seal Type', value: 'PTFE' },
      { label: 'Cycle Life', value: '500,000 cycles' }
    ]
  },
  {
    id: 'p9',
    slug: 'variable-frequency-drive',
    title: 'Variable Frequency Drive',
    name: 'Variable Frequency Drive',
    category: 'Controls',
    image: controlImage,
    description: 'Energy-efficient drive for motor speed regulation, soft start, and system diagnostics.',
    fullDescription: 'The Variable Frequency Drive enables precise motor speed control with significant energy savings. Built-in diagnostics and communication options provide seamless integration into modern automation networks.',
    features: ['Energy efficiency optimization', 'Soft motor starting', 'Speed regulation control', 'Integrated diagnostics', 'Network communication support'],
    applications: ['Motor speed control', 'Pump system optimization', 'Fan speed regulation', 'Compressor control', 'Energy management systems'],
    specifications: [
      { label: 'Power', value: '5.5 kW' },
      { label: 'Input', value: '3-phase 400 V' },
      { label: 'Connections', value: 'RS485 / Ethernet' },
      { label: 'Cooling', value: 'Forced air' }
    ],
    technicalDetails: [
      { label: 'Power', value: '5.5 kW' },
      { label: 'Input', value: '3-phase 400 V' },
      { label: 'Connections', value: 'RS485 / Ethernet' },
      { label: 'Cooling', value: 'Forced air' }
    ]
  },
  {
    id: 'p10',
    slug: 'hydraulic-filter-module',
    title: 'Hydraulic Filter Module',
    name: 'Hydraulic Filter Module',
    category: 'Filters',
    image: filterImage,
    description: 'Modular hydraulic filter designed for system integrity and continuous contamination control.',
    fullDescription: 'The Hydraulic Filter Module maintains optimal fluid cleanliness in hydraulic systems. Its modular design allows easy service and replacement while delivering consistent contamination control.',
    features: ['Modular replacement design', 'High contamination capacity', 'Low pressure drop', 'Extended service intervals', 'Integrated bypass protection'],
    applications: ['Hydraulic systems', 'Mobile equipment', 'Industrial machinery', 'Heavy-duty applications', 'Predictive maintenance systems'],
    specifications: [
      { label: 'Micron Rating', value: '10 Âµm' },
      { label: 'Max Flow', value: '210 L/min' },
      { label: 'Connection', value: 'DN25' },
      { label: 'Service Interval', value: '2500 hours' }
    ],
    technicalDetails: [
      { label: 'Micron Rating', value: '10 Âµm' },
      { label: 'Max Flow', value: '210 L/min' },
      { label: 'Connection', value: 'DN25' },
      { label: 'Service Interval', value: '2500 hours' }
    ]
  },
  {
    id: 'p11',
    slug: 'sealed-spherical-bearing',
    title: 'Sealed Spherical Bearing',
    name: 'Sealed Spherical Bearing',
    category: 'Bearings',
    image: bearingImage,
    description: 'Low-friction bearing with sealed enclosure for vibration control and extended uptime.',
    fullDescription: 'The Sealed Spherical Bearing combines precision engineering with sealed protection against contamination. Its advanced design minimizes vibration while maximizing bearing life in challenging conditions.',
    features: ['Low-friction spherical design', 'Sealed protection from contaminants', 'Vibration dampening', 'Self-aligning capability', 'Extended operational life'],
    applications: ['Conveyor systems', 'Agricultural equipment', 'Textile machinery', 'Food processing', 'Light industrial applications'],
    specifications: [
      { label: 'Bore Size', value: '35 mm' },
      { label: 'Outer Diameter', value: '72 mm' },
      { label: 'Static Load', value: '62 kN' },
      { label: 'Sealing', value: 'Lip seal' }
    ],
    technicalDetails: [
      { label: 'Bore Size', value: '35 mm' },
      { label: 'Outer Diameter', value: '72 mm' },
      { label: 'Static Load', value: '62 kN' },
      { label: 'Sealing', value: 'Lip seal' }
    ]
  },
  {
    id: 'p12',
    slug: 'industrial-servo-drive',
    title: 'Industrial Servo Drive',
    name: 'Industrial Servo Drive',
    category: 'Motors',
    image: motorImage,
    description: 'High-precision drive matching advanced motors with real-time feedback and safety functions.',
    fullDescription: 'The Industrial Servo Drive delivers high-precision motion control with integrated safety features. Real-time feedback and advanced encoder support enable accurate positioning in critical applications.',
    features: ['High-precision control', 'Real-time encoder feedback', 'Integrated safety functions', 'Advanced diagnostics', 'Smooth acceleration profiles'],
    applications: ['Precision assembly', 'Machine tool control', 'Robotic systems', 'Test equipment', 'Positioning systems'],
    specifications: [
      { label: 'Supply', value: '230 V AC' },
      { label: 'Current', value: '12 A' },
      { label: 'Encoder', value: '17-bit incremental' },
      { label: 'Safety', value: 'STO / SS1' }
    ],
    technicalDetails: [
      { label: 'Supply', value: '230 V AC' },
      { label: 'Current', value: '12 A' },
      { label: 'Encoder', value: '17-bit incremental' },
      { label: 'Safety', value: 'STO / SS1' }
    ]
  }
];

export default products;
