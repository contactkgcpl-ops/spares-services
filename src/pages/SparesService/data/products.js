import pumpImage from '../assets/product-pump.svg';
import valveImage from '../assets/product-valve.svg';
import motorImage from '../assets/product-motor.svg';
import filterImage from '../assets/product-filter.svg';
import bearingImage from '../assets/product-bearing.svg';
import controlImage from '../assets/product-control.svg';

const products = [
  {
    id: 'p1',
    name: 'High-Flow Centrifugal Pump',
    category: 'Pump Systems',
    image: pumpImage,
    description: 'Engineered for maximum throughput with reliable pressure management in industrial fluid systems.',
    technicalDetails: [
      { label: 'Flow Rate', value: '180 L/min' },
      { label: 'Power', value: '4.0 kW' },
      { label: 'Material', value: 'Stainless steel 316' },
      { label: 'Temperature Range', value: '-20°C to 120°C' }
    ]
  },
  {
    id: 'p2',
    name: 'Precision Control Valve',
    category: 'Valves',
    image: valveImage,
    description: 'Responsive valve with fine-tuned flow control for high-precision processing lines.',
    technicalDetails: [
      { label: 'Type', value: 'Globe valve' },
      { label: 'Diameter', value: '1.5 in / 40 mm' },
      { label: 'Pressure Class', value: 'PN16' },
      { label: 'Seal Material', value: 'PTFE' }
    ]
  },
  {
    id: 'p3',
    name: 'Industrial Servo Motor',
    category: 'Motors',
    image: motorImage,
    description: 'Compact servo motor offering peak torque and responsive speed control in automation systems.',
    technicalDetails: [
      { label: 'Power', value: '2.2 kW' },
      { label: 'Speed', value: '3000 RPM' },
      { label: 'Voltage', value: '380 V' },
      { label: 'Ingress Rating', value: 'IP65' }
    ]
  },
  {
    id: 'p4',
    name: 'High-Pressure Filter Cartridge',
    category: 'Filters',
    image: filterImage,
    description: 'Durable filter media built to capture fine particulates while preserving system performance.',
    technicalDetails: [
      { label: 'Filtration', value: '5 µm' },
      { label: 'Flow Capacity', value: '120 L/min' },
      { label: 'Dimensions', value: '320 x 120 mm' },
      { label: 'Max Pressure', value: '10 bar' }
    ]
  },
  {
    id: 'p5',
    name: 'Heavy-Duty Roller Bearing',
    category: 'Bearings',
    image: bearingImage,
    description: 'Robust bearing designed for continuous rotation under heavy radial loads and thermal stress.',
    technicalDetails: [
      { label: 'Bore Size', value: '50 mm' },
      { label: 'Outer Diameter', value: '90 mm' },
      { label: 'Dynamic Load', value: '76 kN' },
      { label: 'Lubrication', value: 'Grease filled' }
    ]
  },
  {
    id: 'p6',
    name: 'Smart Process Controller',
    category: 'Controls',
    image: controlImage,
    description: 'Multichannel controller with intuitive HMI support for predictive maintenance and remote monitoring.',
    technicalDetails: [
      { label: 'Channels', value: '8 Digital / 4 Analog' },
      { label: 'Protocol', value: 'Modbus TCP/IP' },
      { label: 'Display', value: '7-inch TFT' },
      { label: 'Operating Temp.', value: '-10°C to 55°C' }
    ]
  },
  {
    id: 'p7',
    name: 'Submersible Pump Unit',
    category: 'Pump Systems',
    image: pumpImage,
    description: 'Corrosion-resistant pump unit ideal for wastewater and transfer systems in industrial plants.',
    technicalDetails: [
      { label: 'Flow Rate', value: '130 L/min' },
      { label: 'Power', value: '3.5 kW' },
      { label: 'Material', value: 'Cast iron' },
      { label: 'Cable Length', value: '10 m' }
    ]
  },
  {
    id: 'p8',
    name: 'Automated Ball Valve',
    category: 'Valves',
    image: valveImage,
    description: 'Quick-acting valve with low torque actuation for tight shutoff and efficient process control.',
    technicalDetails: [
      { label: 'Size', value: '2 in / 50 mm' },
      { label: 'Actuation', value: 'Pneumatic' },
      { label: 'Seal Type', value: 'PTFE' },
      { label: 'Cycle Life', value: '500,000 cycles' }
    ]
  },
  {
    id: 'p9',
    name: 'Variable Frequency Drive',
    category: 'Controls',
    image: controlImage,
    description: 'Energy-efficient drive for motor speed regulation, soft start, and system diagnostics.',
    technicalDetails: [
      { label: 'Power', value: '5.5 kW' },
      { label: 'Input', value: '3-phase 400 V' },
      { label: 'Connections', value: 'RS485 / Ethernet' },
      { label: 'Cooling', value: 'Forced air' }
    ]
  },
  {
    id: 'p10',
    name: 'Hydraulic Filter Module',
    category: 'Filters',
    image: filterImage,
    description: 'Modular hydraulic filter designed for system integrity and continuous contamination control.',
    technicalDetails: [
      { label: 'Micron Rating', value: '10 µm' },
      { label: 'Max Flow', value: '210 L/min' },
      { label: 'Connection', value: 'DN25' },
      { label: 'Service Interval', value: '2500 hours' }
    ]
  },
  {
    id: 'p11',
    name: 'Sealed Spherical Bearing',
    category: 'Bearings',
    image: bearingImage,
    description: 'Low-friction bearing with sealed enclosure for vibration control and extended uptime.',
    technicalDetails: [
      { label: 'Bore Size', value: '35 mm' },
      { label: 'Outer Diameter', value: '72 mm' },
      { label: 'Static Load', value: '62 kN' },
      { label: 'Sealing', value: 'Lip seal' }
    ]
  },
  {
    id: 'p12',
    name: 'Industrial Servo Drive',
    category: 'Motors',
    image: motorImage,
    description: 'High-precision drive matching advanced motors with real-time feedback and safety functions.',
    technicalDetails: [
      { label: 'Supply', value: '230 V AC' },
      { label: 'Current', value: '12 A' },
      { label: 'Encoder', value: '17-bit incremental' },
      { label: 'Safety', value: 'STO / SS1' }
    ]
  }
];

export default products;
