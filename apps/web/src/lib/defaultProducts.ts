import type { Product } from "../../../../packages/shared/src/types";

export const DEFAULT_PRODUCTS: Product[] = [
  {
    "id": "MAT-TMT-001",
    "sku": "TATA-TIS-550D-12MM",
    "name": "Tata Tiscon 550D Super Ductile TMT Rebar",
    "brand": "Tata Tiscon",
    "category": "Steel & Structural",
    "unit": "Tonne",
    "price": 6450000,
    "gst": 18,
    "specs": {
      "grade": "Fe 550D (Super Ductile)",
      "diameter": "12 mm",
      "length": "12 Meters standard",
      "isStandard": "IS: 1786 (Grade Fe 550D)",
      "yieldStress": "550 N/mm\u00b2 (Min)",
      "ultimateTensileStrength": "600 N/mm\u00b2 (Min)",
      "elongationPercent": "16.0% (Superior Energy Absorption)",
      "corrosionResistance": "High - Low Carbon & Controlled Chemistry",
      "weightPerPiece": "10.66 kg / bar",
      "piecesPerBundle": "8 bars",
      "bundleWeight": "85.28 kg"
    },
    "discount": 0,
    "active": 1
  },
  {
    "id": "MAT-TMT-002",
    "sku": "JIN-PAN-550D-12MM",
    "name": "Jindal Panther Fe 550D TMT Rebars",
    "brand": "Jindal Panther",
    "category": "Steel & Structural",
    "unit": "Tonne",
    "price": 6280000,
    "gst": 18,
    "specs": {
      "grade": "Fe 550D",
      "diameter": "12 mm",
      "length": "12 Meters",
      "isStandard": "IS: 1786 (Fe 550D)",
      "yieldStress": "550 N/mm\u00b2 (Min)",
      "ultimateTensileStrength": "585 N/mm\u00b2",
      "elongationPercent": "15.0%",
      "corrosionResistance": "TMT Quenched & Self-Tempered",
      "weightPerPiece": "10.65 kg / bar",
      "piecesPerBundle": "8 bars",
      "bundleWeight": "85.20 kg"
    },
    "discount": 0,
    "active": 1
  },
  {
    "id": "MAT-TMT-003",
    "sku": "JSW-NEO-550D-12MM",
    "name": "JSW Neosteel 550D High Strength Rebar",
    "brand": "JSW Neosteel",
    "category": "Steel & Structural",
    "unit": "Tonne",
    "price": 6320000,
    "gst": 18,
    "specs": {
      "grade": "Fe 550D",
      "diameter": "12 mm",
      "length": "12 Meters",
      "isStandard": "IS: 1786",
      "yieldStress": "550 N/mm\u00b2",
      "ultimateTensileStrength": "595 N/mm\u00b2",
      "elongationPercent": "15.5%",
      "corrosionResistance": "Low P & S impurities (<0.075%)",
      "weightPerPiece": "10.66 kg / bar",
      "piecesPerBundle": "8 bars",
      "bundleWeight": "85.28 kg"
    },
    "discount": 0,
    "active": 1
  },
  {
    "id": "MAT-CEM-001",
    "sku": "UTC-SUPER-PPC-50KG",
    "name": "UltraTech Super Premium Weather Pro Cement",
    "brand": "UltraTech",
    "category": "Cement & Concrete",
    "unit": "50kg Bag",
    "price": 41500,
    "gst": 28,
    "specs": {
      "grade": "Engineered PPC (IS 1489 Part 1)",
      "fineness": "360 m\u00b2/kg (Blaine's)",
      "initialSettingTime": "120 Minutes",
      "finalSettingTime": "240 Minutes",
      "compressive28Day": "54.5 MPa (Exceeds 53 Grade specs)",
      "packaging": "Laminated Tamper-Proof Polypropylene (HDPE)",
      "waterRepellency": "Damp-lock micro silicone polymers",
      "shelfLife": "90 days from packing in sealed bag"
    },
    "discount": 0,
    "active": 1
  },
  {
    "id": "MAT-CEM-002",
    "sku": "ACC-GOLD-WATER-50KG",
    "name": "ACC Gold Water Shield Premium Cement",
    "brand": "ACC Limited",
    "category": "Cement & Concrete",
    "unit": "50kg Bag",
    "price": 40500,
    "gst": 28,
    "specs": {
      "grade": "Special Waterproof PPC (IS 1489)",
      "fineness": "350 m\u00b2/kg",
      "initialSettingTime": "115 Minutes",
      "finalSettingTime": "230 Minutes",
      "compressive28Day": "52.0 MPa",
      "packaging": "Moisture-resistant Poly-lined bag",
      "waterRepellency": "Hydrophobic shield protection",
      "shelfLife": "90 days from packing"
    },
    "discount": 0,
    "active": 1
  },
  {
    "id": "MAT-CEM-003",
    "sku": "DAL-PRO-OPC53-50KG",
    "name": "Dalmia DSP HardCem High Early Strength OPC 53",
    "brand": "Dalmia Bharat",
    "category": "Cement & Concrete",
    "unit": "50kg Bag",
    "price": 42500,
    "gst": 28,
    "specs": {
      "grade": "OPC 53 Grade (IS 269:2015)",
      "fineness": "340 m\u00b2/kg",
      "initialSettingTime": "85 Minutes",
      "finalSettingTime": "190 Minutes",
      "compressive28Day": "62.0 MPa (Ultra-High Load)",
      "packaging": "Laminated Poly-bag",
      "waterRepellency": "Standard OPC requirement",
      "shelfLife": "90 days from packing"
    },
    "discount": 0,
    "active": 1
  },
  {
    "id": "MAT-PLB-001",
    "sku": "AST-CPVC-PRO-1INCH",
    "name": "Astral CPVC Pro High Pressure Pipe (SDR 11)",
    "brand": "Astral Pipes",
    "category": "Plumbing & Piping",
    "unit": "3 Meter Length",
    "price": 54000,
    "gst": 18,
    "specs": {
      "standard": "ASTM D2846 & IS: 15778",
      "pressureRating": "Class 1 (SDR 11 - 28.1 kg/cm\u00b2 @ 23\u00b0C)",
      "size": "25 mm (1 Inch)",
      "temperatureRange": "Up to 93\u00b0C (200\u00b0F)",
      "corrosionResistance": "100% Non-corrosive & Chlorine resistant",
      "jointType": "Solvent weld joint"
    },
    "discount": 0,
    "active": 1
  },
  {
    "id": "MAT-PLB-002",
    "sku": "ASH-CPVC-FLOW-1INCH",
    "name": "Ashirvad FlowGuard Plus CPVC Pipe",
    "brand": "Ashirvad",
    "category": "Plumbing & Piping",
    "unit": "3 Meter Length",
    "price": 52500,
    "gst": 18,
    "specs": {
      "standard": "IS: 15778 & ASTM D2846",
      "pressureRating": "SDR 11 (27.6 kg/cm\u00b2)",
      "size": "25 mm (1 Inch)",
      "temperatureRange": "Up to 93\u00b0C",
      "corrosionResistance": "Zero calcification & bacteriological safety",
      "jointType": "FlowGuard solvent cement"
    },
    "discount": 0,
    "active": 1
  }
];
