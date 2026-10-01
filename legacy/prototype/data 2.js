/**
 * Construction Materials E-Commerce & Management Platform (CMEMP)
 * Master Domain Data: Materials, Brands, Specifications, Suppliers & Directory
 */

export const MATERIALS_DATA = [
  {
    id: "MAT-TMT-001",
    sku: "TATA-TIS-550D-12MM",
    erpCode: "ERP-STL-7701",
    name: "Tata Tiscon 550D Super Ductile TMT Rebar",
    category: "Steel & Structural",
    subCategory: "TMT Rebars",
    brand: "Tata Tiscon",
    manufacturer: "Tata Steel Ltd.",
    badge: "Primary Steel",
    tagline: "Superior seismic resistance & high elongation",
    rating: 4.9,
    reviewsCount: 342,
    images: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80"
    ],
    basePricePerTonne: 64500,
    unit: "Tonne",
    hsnCode: "72142090",
    gstRate: 18,
    specs: {
      grade: "Fe 550D (Super Ductile)",
      diameter: "12 mm",
      length: "12 Meters standard",
      isStandard: "IS: 1786 (Grade Fe 550D)",
      yieldStress: "550 N/mm² (Min)",
      ultimateTensileStrength: "600 N/mm² (Min)",
      elongationPercent: "16.0% (Superior Energy Absorption)",
      corrosionResistance: "High - Low Carbon & Controlled Chemistry",
      weightPerPiece: "10.66 kg / bar",
      piecesPerBundle: "8 bars",
      bundleWeight: "85.28 kg"
    },
    tierDiscounts: [
      { minTonnage: 1, discountPct: 0 },
      { minTonnage: 5, discountPct: 2.5 },
      { minTonnage: 15, discountPct: 4.0 }
    ],
    recommendedFor: ["High-rise columns", "Heavy foundation footings", "Seismic zones IV & V"]
  },
  {
    id: "MAT-TMT-002",
    sku: "JIN-PAN-550D-12MM",
    erpCode: "ERP-STL-7702",
    name: "Jindal Panther Fe 550D TMT Rebars",
    category: "Steel & Structural",
    subCategory: "TMT Rebars",
    brand: "Jindal Panther",
    manufacturer: "Jindal Steel & Power Ltd.",
    badge: "Primary Steel",
    tagline: "Consistent rib pattern for ultra-high concrete bond",
    rating: 4.8,
    reviewsCount: 219,
    images: [
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
    ],
    basePricePerTonne: 62800,
    unit: "Tonne",
    hsnCode: "72142090",
    gstRate: 18,
    specs: {
      grade: "Fe 550D",
      diameter: "12 mm",
      length: "12 Meters",
      isStandard: "IS: 1786 (Fe 550D)",
      yieldStress: "550 N/mm² (Min)",
      ultimateTensileStrength: "585 N/mm²",
      elongationPercent: "15.0%",
      corrosionResistance: "TMT Quenched & Self-Tempered",
      weightPerPiece: "10.65 kg / bar",
      piecesPerBundle: "8 bars",
      bundleWeight: "85.20 kg"
    },
    tierDiscounts: [
      { minTonnage: 1, discountPct: 0 },
      { minTonnage: 5, discountPct: 3.0 },
      { minTonnage: 15, discountPct: 4.5 }
    ],
    recommendedFor: ["Slabs & Beams", "Bridge piers", "Industrial warehouses"]
  },
  {
    id: "MAT-TMT-003",
    sku: "JSW-NEO-550D-12MM",
    erpCode: "ERP-STL-7703",
    name: "JSW Neosteel 550D High Strength Rebar",
    category: "Steel & Structural",
    subCategory: "TMT Rebars",
    brand: "JSW Neosteel",
    manufacturer: "JSW Steel Ltd.",
    badge: "Primary Steel",
    tagline: "Clean steel technology with pure virgin iron ore",
    rating: 4.8,
    reviewsCount: 195,
    images: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
    ],
    basePricePerTonne: 63200,
    unit: "Tonne",
    hsnCode: "72142090",
    gstRate: 18,
    specs: {
      grade: "Fe 550D",
      diameter: "12 mm",
      length: "12 Meters",
      isStandard: "IS: 1786",
      yieldStress: "550 N/mm²",
      ultimateTensileStrength: "595 N/mm²",
      elongationPercent: "15.5%",
      corrosionResistance: "Low P & S impurities (<0.075%)",
      weightPerPiece: "10.66 kg / bar",
      piecesPerBundle: "8 bars",
      bundleWeight: "85.28 kg"
    },
    tierDiscounts: [
      { minTonnage: 1, discountPct: 0 },
      { minTonnage: 5, discountPct: 2.8 },
      { minTonnage: 15, discountPct: 4.2 }
    ],
    recommendedFor: ["Flyovers", "Residential Basements", "Commercial towers"]
  },
  {
    id: "MAT-CEM-001",
    sku: "UTC-SUPER-PPC-50KG",
    erpCode: "ERP-CEM-1010",
    name: "UltraTech Super Premium Weather Pro Cement",
    category: "Cement & Concrete",
    subCategory: "Portland Pozzolana (PPC)",
    brand: "UltraTech",
    manufacturer: "UltraTech Cement (Aditya Birla Group)",
    badge: "India's No. 1",
    tagline: "Water-repellent active micro-fillers for dense concrete",
    rating: 4.9,
    reviewsCount: 512,
    images: [
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80"
    ],
    basePricePerBag: 415,
    basePricePerTonne: 8300,
    unit: "50kg Bag",
    hsnCode: "252329",
    gstRate: 28,
    specs: {
      grade: "Engineered PPC (IS 1489 Part 1)",
      fineness: "360 m²/kg (Blaine's)",
      initialSettingTime: "120 Minutes",
      finalSettingTime: "240 Minutes",
      compressive28Day: "54.5 MPa (Exceeds 53 Grade specs)",
      packaging: "Laminated Tamper-Proof Polypropylene (HDPE)",
      waterRepellency: "Damp-lock micro silicone polymers",
      shelfLife: "90 days from packing in sealed bag"
    },
    tierDiscounts: [
      { minBags: 50, discountPct: 0 },
      { minBags: 200, discountPct: 3.5 },
      { minBags: 500, discountPct: 5.5 }
    ],
    recommendedFor: ["Roof slab casting", "Sub-structure basement", "External plastering"]
  },
  {
    id: "MAT-CEM-002",
    sku: "ACC-GOLD-WATER-50KG",
    erpCode: "ERP-CEM-1020",
    name: "ACC Gold Water Shield Premium Cement",
    category: "Cement & Concrete",
    subCategory: "Portland Pozzolana (PPC)",
    brand: "ACC Limited",
    manufacturer: "Adani Cement / ACC Ltd.",
    badge: "Water Shield Tech",
    tagline: "Built-in anti-seepage formula protecting against dampness",
    rating: 4.8,
    reviewsCount: 388,
    images: [
      "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80"
    ],
    basePricePerBag: 405,
    basePricePerTonne: 8100,
    unit: "50kg Bag",
    hsnCode: "252329",
    gstRate: 28,
    specs: {
      grade: "Special Waterproof PPC (IS 1489)",
      fineness: "350 m²/kg",
      initialSettingTime: "115 Minutes",
      finalSettingTime: "230 Minutes",
      compressive28Day: "52.0 MPa",
      packaging: "Moisture-resistant Poly-lined bag",
      waterRepellency: "Hydrophobic shield protection",
      shelfLife: "90 days from packing"
    },
    tierDiscounts: [
      { minBags: 50, discountPct: 0 },
      { minBags: 200, discountPct: 3.0 },
      { minBags: 500, discountPct: 5.0 }
    ],
    recommendedFor: ["Bathrooms & Kitchens", "Retaining walls", "Terrace waterproofing"]
  },
  {
    id: "MAT-CEM-003",
    sku: "DAL-PRO-OPC53-50KG",
    erpCode: "ERP-CEM-1030",
    name: "Dalmia DSP HardCem High Early Strength OPC 53",
    category: "Cement & Concrete",
    subCategory: "Ordinary Portland (OPC 53)",
    brand: "Dalmia Bharat",
    manufacturer: "Dalmia Cement Ltd.",
    badge: "Rapid De-Shuttering",
    tagline: "Engineered for high early 3-day and 7-day strength",
    rating: 4.7,
    reviewsCount: 174,
    images: [
      "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80"
    ],
    basePricePerBag: 425,
    basePricePerTonne: 8500,
    unit: "50kg Bag",
    hsnCode: "252329",
    gstRate: 28,
    specs: {
      grade: "OPC 53 Grade (IS 269:2015)",
      fineness: "340 m²/kg",
      initialSettingTime: "85 Minutes",
      finalSettingTime: "190 Minutes",
      compressive28Day: "62.0 MPa (Ultra-High Load)",
      packaging: "Laminated Poly-bag",
      waterRepellency: "Standard OPC requirement",
      shelfLife: "90 days from packing"
    },
    tierDiscounts: [
      { minBags: 50, discountPct: 0 },
      { minBags: 200, discountPct: 3.0 },
      { minBags: 500, discountPct: 5.2 }
    ],
    recommendedFor: ["Pre-cast members", "High-stress columns", "Commercial pavements"]
  },
  {
    id: "MAT-PLB-001",
    sku: "AST-CPVC-PRO-1INCH",
    erpCode: "ERP-PLB-3011",
    name: "Astral CPVC Pro High Pressure Pipe (SDR 11)",
    category: "Plumbing & Piping",
    subCategory: "CPVC Hot & Cold",
    brand: "Astral Pipes",
    manufacturer: "Astral Ltd.",
    badge: "Lead Free NSF-61",
    tagline: "Tested up to 93°C hot water with zero thermal sag",
    rating: 4.9,
    reviewsCount: 260,
    images: [
      "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80"
    ],
    basePricePerPipe: 540,
    unit: "3 Meter Length",
    hsnCode: "391723",
    gstRate: 18,
    specs: {
      standard: "ASTM D2846 & IS: 15778",
      pressureRating: "Class 1 (SDR 11 - 28.1 kg/cm² @ 23°C)",
      size: "25 mm (1 Inch)",
      temperatureRange: "Up to 93°C (200°F)",
      corrosionResistance: "100% Non-corrosive & Chlorine resistant",
      jointType: "Solvent weld joint"
    },
    recommendedFor: ["Internal hot & cold water plumbing", "Solar water lines"]
  },
  {
    id: "MAT-PLB-002",
    sku: "ASH-CPVC-FLOW-1INCH",
    erpCode: "ERP-PLB-3022",
    name: "Ashirvad FlowGuard Plus CPVC Pipe",
    category: "Plumbing & Piping",
    subCategory: "CPVC Hot & Cold",
    brand: "Ashirvad",
    manufacturer: "Ashirvad Pipes (Aliaxis Group)",
    badge: "Lubrizol Certified",
    tagline: "Pioneering technology with antimicrobial inner lining",
    rating: 4.8,
    reviewsCount: 198,
    images: [
      "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=800&q=80"
    ],
    basePricePerPipe: 525,
    unit: "3 Meter Length",
    hsnCode: "391723",
    gstRate: 18,
    specs: {
      standard: "IS: 15778 & ASTM D2846",
      pressureRating: "SDR 11 (27.6 kg/cm²)",
      size: "25 mm (1 Inch)",
      temperatureRange: "Up to 93°C",
      corrosionResistance: "Zero calcification & bacteriological safety",
      jointType: "FlowGuard solvent cement"
    },
    recommendedFor: ["Concealed wall plumbing", "Apartment riser mains"]
  }
];

export const SUPPLIERS_DATA = [
  {
    id: "SUP-01",
    name: "Kalinga Steel & Infrastructure Hub",
    owner: "Ashok Jena",
    phone: "+91 94370 12890",
    email: "orders@kalingasteelhub.in",
    pincode: "751024",
    location: "Rasulgarh Industrial Estate, Bhubaneswar",
    coordinates: { lat: 20.3012, lng: 85.8643 },
    rating: 4.9,
    authorizedBrands: ["Tata Tiscon", "Jindal Panther", "JSW Neosteel"],
    creditDays: 30,
    yardCapacityTonnage: 450,
    deliveryFleet: ["1.5T Pickup (3 Nos)", "9T 6-Wheeler (4 Nos)", "25T Multi-axle (2 Nos)"],
    paymentTerms: "30% Advance, 70% against site weighbridge challan"
  },
  {
    id: "SUP-02",
    name: "Utkal Super Cement Stockists & Mill Depo",
    owner: "Manas Ranjan Sahu",
    phone: "+91 98611 44520",
    email: "dispatch@utkalcementdepo.com",
    pincode: "751010",
    location: "Mancheswar Industrial Area, Bhubaneswar",
    coordinates: { lat: 20.3289, lng: 85.8378 },
    rating: 4.8,
    authorizedBrands: ["UltraTech", "ACC Limited", "Dalmia Bharat"],
    creditDays: 15,
    yardCapacityBags: 12000,
    deliveryFleet: ["9T Covered Truck (5 Nos)", "16T 10-Wheeler (3 Nos)"],
    paymentTerms: "100% CAD (Cash Against Delivery) or 15-day Credit Line"
  },
  {
    id: "SUP-03",
    name: "Coastal Flow Plumbing & Sanitary Depo",
    owner: "Debashis Mohanty",
    phone: "+91 99371 88204",
    email: "sales@coastalflow.in",
    pincode: "751003",
    location: "Barmunda Commercial Yard, Bhubaneswar",
    coordinates: { lat: 20.2784, lng: 85.7981 },
    rating: 4.9,
    authorizedBrands: ["Astral Pipes", "Ashirvad", "Supreme"],
    creditDays: 21,
    yardCapacityTonnage: 120,
    deliveryFleet: ["1.5T Small Commercial (4 Nos)"],
    paymentTerms: "14-day cycle with verified GST invoice"
  }
];

export const WORKMEN_DIRECTORY = [
  {
    id: "WRK-001",
    name: "Bikram K. Behera",
    trade: "Master Mason / Concrete Specialist",
    experienceYears: 16,
    phone: "+91 88950 11234",
    pincodesServed: ["751024", "751010", "751003", "751031"],
    crewSize: "18 skilled workers",
    rateCard: "₹950 / day (Mason) | ₹650 / day (Helper)",
    rating: 4.9,
    completedSites: 48,
    speciality: "Crack-free slab casting, vibrator compaction, high-precision brickwork",
    photo: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "WRK-002",
    name: "Ramesh Chandra Das",
    trade: "Certified Rebar & Barbending Contractor",
    experienceYears: 14,
    phone: "+91 94381 77290",
    pincodesServed: ["751024", "751017", "751031"],
    crewSize: "12 barbenders",
    rateCard: "₹4,200 per Tonne of cut & bend structural steel",
    rating: 4.8,
    completedSites: 62,
    speciality: "BBS (Bar Bending Schedule) execution per structural CAD drawings",
    photo: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "WRK-003",
    name: "Sanjay Kumar Nayak",
    trade: "Licensed High-Pressure Plumbing Contractor",
    experienceYears: 12,
    phone: "+91 97760 33812",
    pincodesServed: ["751001", "751003", "751010", "751024"],
    crewSize: "8 plumbers",
    rateCard: "₹14,000 per toilet duct complete loop piping",
    rating: 4.9,
    completedSites: 75,
    speciality: "Hydrostatic pressure testing up to 10 Bar, concealed wall diverters",
    photo: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80"
  }
];

export const EXPERT_ADVISORS = [
  {
    id: "EXP-001",
    name: "Er. Subrat Mohapatra, M.Tech (Structures)",
    designation: "Chartered Structural Engineer & Vetting Consultant",
    qualification: "IIT Kharagpur Alumnus, Fellow of Inst. of Engineers",
    experienceYears: 22,
    services: ["Structural Drawing Vetting", "Foundation Soil Test Review", "Earthquake Resistance Audit"],
    consultationFee: "₹4,500 / site visit & report",
    phone: "+91 94372 90112",
    rating: 4.95,
    verifiedBadge: "Chartered Engineer (India)"
  },
  {
    id: "EXP-002",
    name: "Ar. Priya Sengupta, B.Arch, COA",
    designation: "Sustainable Building Architect & Material Estimator",
    qualification: "Registered Architect, Council of Architecture (CA/2012/5891)",
    experienceYears: 15,
    services: ["Complete Bill of Quantities (BOQ)", "Green Building Material Advisory", "3D Elevation & Planning"],
    consultationFee: "₹35 / sq.ft comprehensive BOQ",
    phone: "+91 98612 00984",
    rating: 4.9,
    verifiedBadge: "COA Certified"
  }
];

export const INITIAL_ORDERS = [
  {
    id: "ORD-2026-9041",
    quotationId: "QT-2026-8812",
    date: "2026-09-28",
    customer: {
      name: "Priyanshu Biswal (Site: Green Villa)",
      phone: "+91 89848 09002",
      siteAddress: "Plot 104, Royal Palms, Patia, Bhubaneswar, Odisha - 751024",
      gstin: "21ABCDE1234F1Z5"
    },
    items: [
      { name: "Tata Tiscon 550D TMT Rebar (12mm)", qty: 6.5, unit: "Tonne", rate: 64500, amount: 419250 },
      { name: "UltraTech Super Premium Cement", qty: 250, unit: "Bags", rate: 415, amount: 103750 }
    ],
    subTotal: 523000,
    taxGst: 104515,
    freightUnloading: 6500,
    totalPayable: 634015,
    paymentStatus: "Payment Confirmed (Advance Received)",
    orderStatus: "In Transit to Site",
    lifecycleStep: 4, // 1: PO Issued, 2: Sourced, 3: Yard Loading, 4: In Transit, 5: Delivered
    supplier: {
      id: "SUP-01",
      name: "Kalinga Steel & Infrastructure Hub",
      poNumber: "PO-2026-4410",
      poStatus: "Dispatched",
      paymentTerms: "30% Advance, 70% against challan",
      paymentState: "Advance Paid (₹1,50,000)"
    },
    dispatch: {
      vehicleType: "9T 6-Wheeler Commercial Truck",
      vehicleNo: "OD-02-AK-7789",
      driverName: "Santosh Munda",
      driverPhone: "+91 91780 44321",
      challanNo: "DC-2026-10492",
      weighbridgeSlipNo: "WB-RAS-88102",
      departureTime: "08:15 AM",
      estimatedArrival: "11:30 AM",
      ewayBillNo: "771092837411"
    },
    internalOpsNotes: "Site road is narrow near Royal Palms Gate 2; driver instructed to enter via North approach lane. Unloading crane confirmed at site."
  }
];

export const COMPANY_CONFIG = {
  name: "CMEMP",
  legalName: "Construction Materials E-Commerce & Management Platform",
  tagline: "Direct Mill & Stockist Procurement Engine",
  phone: "+91 89848 09002",
  whatsappNumber: "918984809002",
  whatsappUrl: "https://wa.me/918984809002?text=Hello%20CMEMP%20Procurement%20Desk%2C%20I%20need%20a%20material%20quotation.",
  email: "procurement@cmemp.com",
  officeAddress: "209, DLF Cybercity, Infocity, Bhubaneswar, Odisha 751031",
  currency: "₹"
};

export const BLOG_POSTS = [
  {
    id: "BLOG-01",
    title: "How to Verify Genuine Fe 550D TMT Rebars on Construction Sites",
    category: "Structural Engineering",
    readTime: "5 min read",
    date: "2026-09-20",
    excerpt: "Learn how to inspect manufacturer rolling marks, BIS ISI stamps, and understand yield stress vs elongation test certificates.",
    content: "When steel arrives on site, checking only the bundle tag is insufficient. Always inspect the hot-rolled manufacturer logo at every meter interval..."
  },
  {
    id: "BLOG-02",
    title: "OPC 53 vs PPC Cement: Which One Should You Pour for Roof Slabs?",
    category: "Material Advisory",
    readTime: "7 min read",
    date: "2026-09-15",
    excerpt: "Understanding heat of hydration, micro-pore capillary shrinkage, and 28-day curing strengths for coastal and tropical climates.",
    content: "While OPC 53 attains early 7-day de-shuttering strength, PPC develops lower heat of hydration and tighter micro-pore structures preventing water seepage..."
  },
  {
    id: "BLOG-03",
    title: "CPVC vs UPVC vs Composite Pipes: High-Pressure Plumbing Guide",
    category: "Plumbing Guides",
    readTime: "4 min read",
    date: "2026-09-10",
    excerpt: "Why SDR 11 CPVC rated up to 93°C is critical for solar geyser lines and concealed wall mixers.",
    content: "Using standard UPVC for hot water lines causes thermal degradation and joint rupture within 24 months..."
  }
];

export const FAQS_DATA = [
  {
    category: "Quotation & Pricing",
    question: "Why do steel prices vary daily and how long is a quotation valid?",
    answer: "TMT rebar prices fluctuate based on secondary billet and primary iron ore index rates. CMEMP provides guaranteed 24 to 48-hour price lock timers on confirmed quotes."
  },
  {
    category: "Delivery & Logistics",
    question: "How is the delivery vehicle determined for my site?",
    answer: "Our automated logistics engine calculates total metric tonnage and volume. Loads under 2.5T dispatch via 1.5T pickup, 2.5T–9T via 6-wheelers, and large consignments up to 25T via multi-axle trailers. Site road restrictions are flagged during address input."
  },
  {
    category: "Quality & Testing",
    question: "Do you supply original manufacturer Test Certificates (MTC)?",
    answer: "Yes, 100% of consignments include original manufacturer heat-batch test certificates verifying chemical composition (Carbon, Sulphur, Phosphorus) and mechanical strength (IS 1786 / IS 1489)."
  },
  {
    category: "Payments & Invoicing",
    question: "What payment terms are available for contractors and corporates?",
    answer: "We support Advance UPI/NEFT, Cash Against Delivery (CAD), and 15 to 30-day revolving credit limits for GST-verified contractors."
  }
];

export const ALL_120_RFP_CHECKLIST_ITEMS = [
  // 1. Customer-Facing Website - Homepage (7 items)
  { id: "1.1", module: "1. Customer-Facing Website", section: "Homepage", feature: "Hero/banner section", status: "Included", cost: "₹0 / In Scope", notes: "3D isometric canvas with cursor crosshair tracking, banners, and stats" },
  { id: "1.2", module: "1. Customer-Facing Website", section: "Homepage", feature: "Product categories and featured materials", status: "Included", cost: "₹0 / In Scope", notes: "Category grid for Steel, Cement, Plumbing with responsive thumbnails" },
  { id: "1.3", module: "1. Customer-Facing Website", section: "Homepage", feature: "Product highlights and customer benefits", status: "Included", cost: "₹0 / In Scope", notes: "Direct mill dispatch, BIS certified, <4hr local yard dispatch" },
  { id: "1.4", module: "1. Customer-Facing Website", section: "Homepage", feature: "Quotation request call-to-action", status: "Included", cost: "₹0 / In Scope", notes: "Integrated Bill of Materials quick quote builder and submission modal" },
  { id: "1.5", module: "1. Customer-Facing Website", section: "Homepage", feature: "Service provider / expert sections", status: "Included", cost: "₹0 / In Scope", notes: "Preview cards for verified masons, barbenders, and structural advisors" },
  { id: "1.6", module: "1. Customer-Facing Website", section: "Homepage", feature: "FAQs and contact/enquiry options", status: "Included", cost: "₹0 / In Scope", notes: "Searchable category-wise accordion FAQs and direct contact forms" },
  { id: "1.7", module: "1. Customer-Facing Website", section: "Homepage", feature: "WhatsApp enquiry integration", status: "Included", cost: "₹0 / In Scope", notes: "Floating WhatsApp button and automated pre-formatted quote text" },

  // 1. Customer-Facing Website - Product Catalogue & Search (8 items)
  { id: "1.8", module: "1. Customer-Facing Website", section: "Catalogue & Search", feature: "Category and sub-category management", status: "Included", cost: "₹0 / In Scope", notes: "Hierarchical taxonomy (Structural > Steel > TMT Fe 550D)" },
  { id: "1.9", module: "1. Customer-Facing Website", section: "Catalogue & Search", feature: "Product images and descriptions", status: "Included", cost: "₹0 / In Scope", notes: "High-res media, application galleries, and technical descriptions" },
  { id: "1.10", module: "1. Customer-Facing Website", section: "Catalogue & Search", feature: "Brand/company information", status: "Included", cost: "₹0 / In Scope", notes: "Brand credentials, manufacturer details, authorized distributor logos" },
  { id: "1.11", module: "1. Customer-Facing Website", section: "Catalogue & Search", feature: "Unique SKU management", status: "Included", cost: "₹0 / In Scope", notes: "Unique SKUs for each diameter, length, and packaging unit" },
  { id: "1.12", module: "1. Customer-Facing Website", section: "Catalogue & Search", feature: "Product/company codes", status: "Included", cost: "₹0 / In Scope", notes: "Cross-referenced ERP/accounting codes (e.g. ERP-STL-7701)" },
  { id: "1.13", module: "1. Customer-Facing Website", section: "Catalogue & Search", feature: "Material/specification details", status: "Included", cost: "₹0 / In Scope", notes: "Detailed technical tables: Yield Stress, Elongation %, Compressive MPa" },
  { id: "1.14", module: "1. Customer-Facing Website", section: "Catalogue & Search", feature: "Search and filtering", status: "Included", cost: "₹0 / In Scope", notes: "Instant typeahead search across brands, grades, and applications" },
  { id: "1.15", module: "1. Customer-Facing Website", section: "Catalogue & Search", feature: "Structured product categorisation", status: "Included", cost: "₹0 / In Scope", notes: "Dynamic attribute tags per category (dia, grade, setting time)" },

  // 1. Customer-Facing Website - Customer Registration & Login (7 items)
  { id: "1.16", module: "1. Customer-Facing Website", section: "Registration & Login", feature: "Customer registration and login", status: "Included", cost: "₹0 / In Scope", notes: "Dual onboarding for Home Builders (IHB) and GST-registered contractors" },
  { id: "1.17", module: "1. Customer-Facing Website", section: "Registration & Login", feature: "Mobile number authentication", status: "Included", cost: "₹0 / In Scope", notes: "Primary phone number verification with 10-digit validation" },
  { id: "1.18", module: "1. Customer-Facing Website", section: "Registration & Login", feature: "OTP-based login", status: "Included", cost: "₹0 / In Scope", notes: "Passwordless 4-digit OTP modal flow with auto-verification" },
  { id: "1.19", module: "1. Customer-Facing Website", section: "Registration & Login", feature: "Customer profile management", status: "Included", cost: "₹0 / In Scope", notes: "Manage multiple site delivery locations, unloading access, and GSTIN" },
  { id: "1.20", module: "1. Customer-Facing Website", section: "Registration & Login", feature: "Order history", status: "Included", cost: "₹0 / In Scope", notes: "Historical archive of past delivered and in-progress orders" },
  { id: "1.21", module: "1. Customer-Facing Website", section: "Registration & Login", feature: "Quotation history", status: "Included", cost: "₹0 / In Scope", notes: "List of requested, accepted, and expired material quotations" },
  { id: "1.22", module: "1. Customer-Facing Website", section: "Registration & Login", feature: "Customer dashboard", status: "Included", cost: "₹0 / In Scope", notes: "Unified portal hub for orders, live tracking, rewards, and quotes" },

  // 1. Customer-Facing Website - Customer Dashboard (8 items)
  { id: "1.23", module: "1. Customer-Facing Website", section: "Dashboard", feature: "Profile management", status: "Included", cost: "₹0 / In Scope", notes: "Site access details, road width restrictions, and contact person" },
  { id: "1.24", module: "1. Customer-Facing Website", section: "Dashboard", feature: "Quotation status", status: "Included", cost: "₹0 / In Scope", notes: "Real-time state tracking: Sourcing > Comparison Ready > Price Locked" },
  { id: "1.25", module: "1. Customer-Facing Website", section: "Dashboard", feature: "Comparative quotations", status: "Included", cost: "₹0 / In Scope", notes: "Side-by-side brand pricing matrix directly inside customer dashboard" },
  { id: "1.26", module: "1. Customer-Facing Website", section: "Dashboard", feature: "Order information", status: "Included", cost: "₹0 / In Scope", notes: "Itemized breakdown, tax invoice download, and site coordinates" },
  { id: "1.27", module: "1. Customer-Facing Website", section: "Dashboard", feature: "Order tracking", status: "Included", cost: "₹0 / In Scope", notes: "5-step dispatch lifecycle with assigned truck number and driver phone" },
  { id: "1.28", module: "1. Customer-Facing Website", section: "Dashboard", feature: "Customer points/rewards visibility", status: "Included", cost: "₹0 / In Scope", notes: "Wallet ledger displaying accumulated reward points (1 point = ₹1)" },
  { id: "1.29", module: "1. Customer-Facing Website", section: "Dashboard", feature: "Previous orders", status: "Included", cost: "₹0 / In Scope", notes: "1-click reorder capability from historical delivered orders" },
  { id: "1.30", module: "1. Customer-Facing Website", section: "Dashboard", feature: "Communication updates", status: "Included", cost: "₹0 / In Scope", notes: "In-app feed of order and quote alerts and price expiration warnings" },

  // 2. Quotation & Comparison - Quotation Management (10 items)
  { id: "2.1", module: "2. Quotation & Comparison", section: "Quotation Management", feature: "Customer quotation request", status: "Included", cost: "₹0 / In Scope", notes: "Multi-material BOM builder with tonnage and bag unit steppers" },
  { id: "2.2", module: "2. Quotation & Comparison", section: "Quotation Management", feature: "Material requirement submission", status: "Included", cost: "₹0 / In Scope", notes: "Upload structural drawings, bar bending schedules (BBS), or BOQs" },
  { id: "2.3", module: "2. Quotation & Comparison", section: "Quotation Management", feature: "WhatsApp quotation enquiry", status: "Included", cost: "₹0 / In Scope", notes: "Instant WhatsApp transmission of material requirements to ops desk" },
  { id: "2.4", module: "2. Quotation & Comparison", section: "Quotation Management", feature: "Backend quotation management", status: "Included", cost: "₹0 / In Scope", notes: "Admin workbench to review RFQs, assign suppliers, and set margin %" },
  { id: "2.5", module: "2. Quotation & Comparison", section: "Quotation Management", feature: "Supplier quotation collection", status: "Included", cost: "₹0 / In Scope", notes: "Solicits rates from multiple authorized stockist yards simultaneously" },
  { id: "2.6", module: "2. Quotation & Comparison", section: "Quotation Management", feature: "Comparative quotation generation", status: "Included", cost: "₹0 / In Scope", notes: "Automated generation of multi-brand quote comparison sheets" },
  { id: "2.7", module: "2. Quotation & Comparison", section: "Quotation Management", feature: "Comparison of 2–3 brands or multiple brands", status: "Included", cost: "₹0 / In Scope", notes: "Tata Tiscon vs Jindal Panther vs JSW / UltraTech vs ACC vs Dalmia" },
  { id: "2.8", module: "2. Quotation & Comparison", section: "Quotation Management", feature: "Technical comparison support", status: "Included", cost: "₹0 / In Scope", notes: "Auto-populates IS:1786 yield stress, MPa strength, and test criteria" },
  { id: "2.9", module: "2. Quotation & Comparison", section: "Quotation Management", feature: "Quotation confirmation", status: "Included", cost: "₹0 / In Scope", notes: "Accept quotation action with 24-hour commodity price-lock timer" },
  { id: "2.10", module: "2. Quotation & Comparison", section: "Quotation Management", feature: "Convert confirmed quotation into an order", status: "Included", cost: "₹0 / In Scope", notes: "1-click conversion from accepted quote to live Sales Order and PO" },

  // 2. Quotation & Comparison - Product & Brand Comparison (6 items)
  { id: "2.11", module: "2. Quotation & Comparison", section: "Product & Brand Comparison", feature: "Compare multiple brands", status: "Included", cost: "₹0 / In Scope", notes: "Side-by-side selector for up to 4 competing brand materials" },
  { id: "2.12", module: "2. Quotation & Comparison", section: "Product & Brand Comparison", feature: "Compare pricing", status: "Included", cost: "₹0 / In Scope", notes: "Transparent breakdown of Ex-Yard Rate, Freight, GST, and Net Landing" },
  { id: "2.13", module: "2. Quotation & Comparison", section: "Product & Brand Comparison", feature: "Technical parameter comparison", status: "Included", cost: "₹0 / In Scope", notes: "Yield stress, tensile ratio, elongation %, and setting times" },
  { id: "2.14", module: "2. Quotation & Comparison", section: "Product & Brand Comparison", feature: "Material specification comparison", status: "Included", cost: "₹0 / In Scope", notes: "Weight tolerances, rib pattern bond index, and packaging standards" },
  { id: "2.15", module: "2. Quotation & Comparison", section: "Product & Brand Comparison", feature: "Brand-wise comparison", status: "Included", cost: "₹0 / In Scope", notes: "Executive summary cards highlighting brand pros, cons, and warranties" },
  { id: "2.16", module: "2. Quotation & Comparison", section: "Product & Brand Comparison", feature: "Customer-friendly comparison/quotation presentation", status: "Included", cost: "₹0 / In Scope", notes: "High-contrast responsive matrix optimized for mobile and desktop" },

  // 3. Communication & Follow-Up - Automated Follow-Up (6 items)
  { id: "3.1", module: "3. Communication & Follow-Up", section: "Automated Follow-Up", feature: "Customer enquiry follow-ups", status: "Included", cost: "₹0 / In Scope", notes: "Automated follow-up reminders triggered when RFQs are pending" },
  { id: "3.2", module: "3. Communication & Follow-Up", section: "Automated Follow-Up", feature: "Quotation follow-ups", status: "Included", cost: "₹0 / In Scope", notes: "Timed alerts sent 6 hours before steel price lock expiration" },
  { id: "3.3", module: "3. Communication & Follow-Up", section: "Automated Follow-Up", feature: "Order update notifications", status: "Included", cost: "₹0 / In Scope", notes: "Real-time alerts at PO issue, yard loading, and vehicle dispatch" },
  { id: "3.4", module: "3. Communication & Follow-Up", section: "Automated Follow-Up", feature: "Customer notifications", status: "Included", cost: "₹0 / In Scope", notes: "Multi-channel in-app, SMS, and WhatsApp push notifications" },
  { id: "3.5", module: "3. Communication & Follow-Up", section: "Automated Follow-Up", feature: "Email notifications", status: "Included", cost: "₹0 / In Scope", notes: "Automated transactional emails with PDF POs and tax invoices" },
  { id: "3.6", module: "3. Communication & Follow-Up", section: "Automated Follow-Up", feature: "WhatsApp notifications", status: "Included", cost: "₹0 / In Scope", notes: "WhatsApp Cloud API integration with driver phone and live updates" },

  // 3. Communication & Follow-Up - Communication (5 items)
  { id: "3.7", module: "3. Communication & Follow-Up", section: "Communication", feature: "Quotation notifications", status: "Included", cost: "₹0 / In Scope", notes: "Immediate notification upon comparative quote completion" },
  { id: "3.8", module: "3. Communication & Follow-Up", section: "Communication", feature: "Customer enquiry communication", status: "Included", cost: "₹0 / In Scope", notes: "Integrated message thread linking buyer and procurement coordinator" },
  { id: "3.9", module: "3. Communication & Follow-Up", section: "Communication", feature: "Order-related updates", status: "Included", cost: "₹0 / In Scope", notes: "Gate pass verification, weighbridge slip uploads, arrival notices" },
  { id: "3.10", module: "3. Communication & Follow-Up", section: "Communication", feature: "Follow-up notifications", status: "Included", cost: "₹0 / In Scope", notes: "Drip triggers ensuring no customer quote goes unattended" },
  { id: "3.11", module: "3. Communication & Follow-Up", section: "Communication", feature: "Email communication", status: "Included", cost: "₹0 / In Scope", notes: "Standardized HTML email templates for procurement milestones" },

  // 4. Order & Operations - Order Management (8 items)
  { id: "4.1", module: "4. Order & Operations", section: "Order Management", feature: "Confirm quotation and convert to order", status: "Included", cost: "₹0 / In Scope", notes: "Validates payment/advance and transitions RFQ into active Sales Order" },
  { id: "4.2", module: "4. Order & Operations", section: "Order Management", feature: "Order status management", status: "Included", cost: "₹0 / In Scope", notes: "Configurable state machine: Confirmed > Sourced > Dispatched > Delivered" },
  { id: "4.3", module: "4. Order & Operations", section: "Order Management", feature: "Order information", status: "Included", cost: "₹0 / In Scope", notes: "Full line items, weights, rates, HSN codes, and tax breakdown" },
  { id: "4.4", module: "4. Order & Operations", section: "Order Management", feature: "Customer information", status: "Included", cost: "₹0 / In Scope", notes: "Customer site contact, alternate supervisor phone, and billing details" },
  { id: "4.5", module: "4. Order & Operations", section: "Order Management", feature: "Supplier assignment", status: "Included", cost: "₹0 / In Scope", notes: "Auto-routes order lines to authorized distributors nearest to site" },
  { id: "4.6", module: "4. Order & Operations", section: "Order Management", feature: "Material details", status: "Included", cost: "₹0 / In Scope", notes: "Logs brand, diameter, piece counts, and manufacturer heat numbers" },
  { id: "4.7", module: "4. Order & Operations", section: "Order Management", feature: "Purchase order workflow", status: "Included", cost: "₹0 / In Scope", notes: "Automated generation and transmission of Purchase Orders to stockists" },
  { id: "4.8", module: "4. Order & Operations", section: "Order Management", feature: "Order tracking updates", status: "Included", cost: "₹0 / In Scope", notes: "Step-by-step progress tracking with timestamps and driver details" },

  // 4. Order & Operations - Supplier Management (8 items)
  { id: "4.9", module: "4. Order & Operations", section: "Supplier Management", feature: "Supplier onboarding", status: "Included", cost: "₹0 / In Scope", notes: "KYC collection, GSTIN verification, and authorized brand certificates" },
  { id: "4.10", module: "4. Order & Operations", section: "Supplier Management", feature: "Supplier profile management", status: "Included", cost: "₹0 / In Scope", notes: "Warehouse locations, storage capacities, and operational contact rosters" },
  { id: "4.11", module: "4. Order & Operations", section: "Supplier Management", feature: "Supplier contact information", status: "Included", cost: "₹0 / In Scope", notes: "Direct dispatch manager, accounts desk, and logistics phone numbers" },
  { id: "4.12", module: "4. Order & Operations", section: "Supplier Management", feature: "Supplier location details", status: "Included", cost: "₹0 / In Scope", notes: "Geo-coordinates and yard addresses for accurate freight estimation" },
  { id: "4.13", module: "4. Order & Operations", section: "Supplier Management", feature: "Supplier lookup", status: "Included", cost: "₹0 / In Scope", notes: "Search directory by authorized brand (Tata, UltraTech, Astral, etc.)" },
  { id: "4.14", module: "4. Order & Operations", section: "Supplier Management", feature: "Supplier rating", status: "Included", cost: "₹0 / In Scope", notes: "Track supplier score based on dispatch turnaround and product quality" },
  { id: "4.15", module: "4. Order & Operations", section: "Supplier Management", feature: "Supplier selection based on order requirements", status: "Included", cost: "₹0 / In Scope", notes: "Selects supplier based on ready stock tonnage and best commercial margin" },
  { id: "4.16", module: "4. Order & Operations", section: "Supplier Management", feature: "Supplier lookup by customer order location/pincode where applicable", status: "Included", cost: "₹0 / In Scope", notes: "Pincode proximity matching engine minimizing transit time and freight" },

  // 4. Order & Operations - Supplier Payment Management (5 items)
  { id: "4.17", module: "4. Order & Operations", section: "Supplier Payment Management", feature: "Supplier payment details", status: "Included", cost: "₹0 / In Scope", notes: "Supplier bank account, IFSC, and NEFT/RTGS transaction records" },
  { id: "4.18", module: "4. Order & Operations", section: "Supplier Payment Management", feature: "Agreed payment terms", status: "Included", cost: "₹0 / In Scope", notes: "Supports Advance, CAD (Cash Against Delivery), and 15/30-day credit cycles" },
  { id: "4.19", module: "4. Order & Operations", section: "Supplier Payment Management", feature: "Payment status", status: "Included", cost: "₹0 / In Scope", notes: "Tracks Unpaid, Partially Paid, and Fully Cleared payments per PO" },
  { id: "4.20", module: "4. Order & Operations", section: "Supplier Payment Management", feature: "Payment confirmation workflow", status: "Included", cost: "₹0 / In Scope", notes: "Accounts department sign-off before releasing supplier payouts" },
  { id: "4.21", module: "4. Order & Operations", section: "Supplier Payment Management", feature: "Payment record management", status: "Included", cost: "₹0 / In Scope", notes: "Historical ledger mapping payments to delivered weighbridge challans" },

  // 4. Order & Operations - Purchase Order Management (6 items)
  { id: "4.22", module: "4. Order & Operations", section: "Purchase Order Management", feature: "Purchase order generation", status: "Included", cost: "₹0 / In Scope", notes: "Automated branded PO PDF with itemized rates, taxes, and yard notes" },
  { id: "4.23", module: "4. Order & Operations", section: "Purchase Order Management", feature: "Supplier order communication", status: "Included", cost: "₹0 / In Scope", notes: "Direct PO transmission to supplier via email and WhatsApp" },
  { id: "4.24", module: "4. Order & Operations", section: "Purchase Order Management", feature: "Material information", status: "Included", cost: "₹0 / In Scope", notes: "Detailed specifications, diameter, bundling, and delivery schedule" },
  { id: "4.25", module: "4. Order & Operations", section: "Purchase Order Management", feature: "Customer order details", status: "Included", cost: "₹0 / In Scope", notes: "Links purchase order directly to customer Sales Order for auditing" },
  { id: "4.26", module: "4. Order & Operations", section: "Purchase Order Management", feature: "Supplier assignment", status: "Included", cost: "₹0 / In Scope", notes: "Assigns PO to primary and backup fulfillment partners" },
  { id: "4.27", module: "4. Order & Operations", section: "Purchase Order Management", feature: "Order status tracking", status: "Included", cost: "₹0 / In Scope", notes: "Supplier acceptance, yard loading, and dispatch confirmation logs" },

  // 4. Order & Operations - Packing List & Delivery Challan (5 items)
  { id: "4.28", module: "4. Order & Operations", section: "Packing List & Challan", feature: "Packing list details", status: "Included", cost: "₹0 / In Scope", notes: "Itemized piece count, bundle numbers, and theoretical vs actual weights" },
  { id: "4.29", module: "4. Order & Operations", section: "Packing List & Challan", feature: "Delivery challan information", status: "Included", cost: "₹0 / In Scope", notes: "Triplicate challan format (Customer copy, Transporter copy, Accounts copy)" },
  { id: "4.30", module: "4. Order & Operations", section: "Packing List & Challan", feature: "Supplier-related documentation", status: "Included", cost: "₹0 / In Scope", notes: "Mill test certificates, gate pass, and e-way bill reference" },
  { id: "4.31", module: "4. Order & Operations", section: "Packing List & Challan", feature: "Customer order information", status: "Included", cost: "₹0 / In Scope", notes: "Includes site address, customer name, and contact on delivery challan" },
  { id: "4.32", module: "4. Order & Operations", section: "Packing List & Challan", feature: "Order-wise documentation", status: "Included", cost: "₹0 / In Scope", notes: "Consolidated digital document folder per order for accounting reconciliation" },

  // 4. Order & Operations - Transportation Management (7 items)
  { id: "4.33", module: "4. Order & Operations", section: "Transportation Management", feature: "View confirmed orders", status: "Included", cost: "₹0 / In Scope", notes: "Dedicated logistics board showing all orders pending transport" },
  { id: "4.34", module: "4. Order & Operations", section: "Transportation Management", feature: "Material and quantity details", status: "Included", cost: "₹0 / In Scope", notes: "Aggregates total tonnage and volume to prevent overloading" },
  { id: "4.35", module: "4. Order & Operations", section: "Transportation Management", feature: "Transportation requirements", status: "Included", cost: "₹0 / In Scope", notes: "Identifies whether open-body truck, covered truck, or trailer is required" },
  { id: "4.36", module: "4. Order & Operations", section: "Transportation Management", feature: "Vehicle requirement details", status: "Included", cost: "₹0 / In Scope", notes: "Fleet sizing: 1.5T Pickup, 9T 6-Wheeler, 16T 10-Wheeler, 25T Trailer" },
  { id: "4.37", module: "4. Order & Operations", section: "Transportation Management", feature: "Material type", status: "Included", cost: "₹0 / In Scope", notes: "Flags special handling (e.g. moisture protection for cement, crane for steel)" },
  { id: "4.38", module: "4. Order & Operations", section: "Transportation Management", feature: "Transportation operational information", status: "Included", cost: "₹0 / In Scope", notes: "Driver name, contact number, vehicle registration number, gate timing" },
  { id: "4.39", module: "4. Order & Operations", section: "Transportation Management", feature: "Identify transportation requirements from material/order details", status: "Included", cost: "₹0 / In Scope", notes: "Algorithmic computation converting line items into vehicle recommendations" },

  // 5. Service & Advisory Directory - Service Providers / Workmen (4 items)
  { id: "5.1", module: "5. Service & Advisory Directory", section: "Service Providers / Workmen", feature: "Workmen directory", status: "Included", cost: "₹0 / In Scope", notes: "Verified directory of skilled tradesmen with ratings and portfolio" },
  { id: "5.2", module: "5. Service & Advisory Directory", section: "Service Providers / Workmen", feature: "Skilled professional directory", status: "Included", cost: "₹0 / In Scope", notes: "Categorized by trade: Masons, Barbenders, Plumbers, Waterproofing" },
  { id: "5.3", module: "5. Service & Advisory Directory", section: "Service Providers / Workmen", feature: "Category-wise service providers", status: "Included", cost: "₹0 / In Scope", notes: "Filter contractors by trade specialization and pincode service areas" },
  { id: "5.4", module: "5. Service & Advisory Directory", section: "Service Providers / Workmen", feature: "Relevant service information", status: "Included", cost: "₹0 / In Scope", notes: "Crew size, daily/project rate cards, experience, and past site photos" },

  // 5. Service & Advisory Directory - Expert Advisors (4 items)
  { id: "5.5", module: "5. Service & Advisory Directory", section: "Expert Advisors", feature: "Expert listing", status: "Included", cost: "₹0 / In Scope", notes: "Chartered structural engineers, certified architects, material estimators" },
  { id: "5.6", module: "5. Service & Advisory Directory", section: "Expert Advisors", feature: "Basic profile information", status: "Included", cost: "₹0 / In Scope", notes: "Qualifications (IIT, COA, Inst of Engineers), experience, and credentials" },
  { id: "5.7", module: "5. Service & Advisory Directory", section: "Expert Advisors", feature: "Category/specialisation", status: "Included", cost: "₹0 / In Scope", notes: "Structural vetting, BOQ estimation, foundation soil report reviews" },
  { id: "5.8", module: "5. Service & Advisory Directory", section: "Expert Advisors", feature: "Contact or enquiry option", status: "Included", cost: "₹0 / In Scope", notes: "One-click site visit booking and technical vetting consultation form" },

  // 6. Commercial & Customer Engagement - Customer Points / Rewards (4 items)
  { id: "6.1", module: "6. Commercial & Customer Engagement", section: "Points / Rewards", feature: "Customer points tracking", status: "Included", cost: "₹0 / In Scope", notes: "Automated points accrual based on purchase volume (1 pt per ₹1,000 spend)" },
  { id: "6.2", module: "6. Commercial & Customer Engagement", section: "Points / Rewards", feature: "Points visibility in dashboard", status: "Included", cost: "₹0 / In Scope", notes: "Real-time wallet balance and redemption eligibility in customer portal" },
  { id: "6.3", module: "6. Commercial & Customer Engagement", section: "Points / Rewards", feature: "Basic reward/points management", status: "Included", cost: "₹0 / In Scope", notes: "Redeem points directly for invoice discounts on subsequent orders" },
  { id: "6.4", module: "6. Commercial & Customer Engagement", section: "Points / Rewards", feature: "Configurable earning and redemption rules", status: "Included", cost: "₹0 / In Scope", notes: "Admin rules engine for points multiplier, validity period, and exclusions" },

  // 6. Commercial & Customer Engagement - Category-Wise Discount Management (4 items)
  { id: "6.5", module: "6. Commercial & Customer Engagement", section: "Discount Management", feature: "Category-wise discounts", status: "Included", cost: "₹0 / In Scope", notes: "Set percentage discounts across Steel, Cement, and Plumbing categories" },
  { id: "6.6", module: "6. Commercial & Customer Engagement", section: "Discount Management", feature: "Enable/disable discounts", status: "Included", cost: "₹0 / In Scope", notes: "1-click toggle to activate or deactivate category promotions instantly" },
  { id: "6.7", module: "6. Commercial & Customer Engagement", section: "Discount Management", feature: "Update discount percentage/value", status: "Included", cost: "₹0 / In Scope", notes: "Dynamic pricing sliders and volume slab percentage updates" },
  { id: "6.8", module: "6. Commercial & Customer Engagement", section: "Discount Management", feature: "Centralised discount management", status: "Included", cost: "₹0 / In Scope", notes: "Admin control hub syncing discounts with live catalogue pricing" },

  // 6. Commercial & Customer Engagement - Order Liaisoning (3 items)
  { id: "6.9", module: "6. Commercial & Customer Engagement", section: "Order Liaisoning", feature: "Order-wise liaisoning information", status: "Included", cost: "₹0 / In Scope", notes: "Assign designated sales and dispatch coordinators per order" },
  { id: "6.10", module: "6. Commercial & Customer Engagement", section: "Order Liaisoning", feature: "Internal notes/details", status: "Included", cost: "₹0 / In Scope", notes: "Private coordinator notes (unloading constraints, road entry gate passes)" },
  { id: "6.11", module: "6. Commercial & Customer Engagement", section: "Order Liaisoning", feature: "Operational reference information", status: "Included", cost: "₹0 / In Scope", notes: "Weighbridge calibration records, security checkpoint logs" },

  // 7. Content Management - Blog Management (6 items)
  { id: "7.1", module: "7. Content Management", section: "Blog Management", feature: "Industry content", status: "Included", cost: "₹0 / In Scope", notes: "Construction industry insights, commodity price trends, infrastructure news" },
  { id: "7.2", module: "7. Content Management", section: "Blog Management", feature: "Construction-related information", status: "Included", cost: "₹0 / In Scope", notes: "Practical on-site guides: concrete curing times, bar bending standards" },
  { id: "7.3", module: "7. Content Management", section: "Blog Management", feature: "Product information", status: "Included", cost: "₹0 / In Scope", notes: "Detailed articles explaining Fe 550D vs Fe 500, PPC vs OPC cement" },
  { id: "7.4", module: "7. Content Management", section: "Blog Management", feature: "SEO content", status: "Included", cost: "₹0 / In Scope", notes: "Optimized meta titles, descriptions, canonical tags, and OpenGraph markup" },
  { id: "7.5", module: "7. Content Management", section: "Blog Management", feature: "Company updates", status: "Included", cost: "₹0 / In Scope", notes: "New stockist yard partnerships, distributor network expansion" },
  { id: "7.6", module: "7. Content Management", section: "Blog Management", feature: "Backend blog management", status: "Included", cost: "₹0 / In Scope", notes: "Admin CMS to draft, publish, edit, and organize posts with tags" },

  // 7. Content Management - FAQ Management (3 items)
  { id: "7.7", module: "7. Content Management", section: "FAQ Management", feature: "FAQ listing", status: "Included", cost: "₹0 / In Scope", notes: "Accordion-style interactive question and answer display" },
  { id: "7.8", module: "7. Content Management", section: "FAQ Management", feature: "Question and answer management", status: "Included", cost: "₹0 / In Scope", notes: "Admin CRUD to add, modify, or reorder technical and delivery questions" },
  { id: "7.9", module: "7. Content Management", section: "FAQ Management", feature: "Category-wise FAQs", status: "Included", cost: "₹0 / In Scope", notes: "Categorized under Pricing, Logistics, Quality Testing, and Payments" },

  // 7. Content Management - Static Pages (5 items)
  { id: "7.10", module: "7. Content Management", section: "Static Pages", feature: "About Us", status: "Included", cost: "₹0 / In Scope", notes: "Dedicated company background, leadership, and stockist network mission" },
  { id: "7.11", module: "7. Content Management", section: "Static Pages", feature: "Contact Us", status: "Included", cost: "₹0 / In Scope", notes: "HQ coordinates (DLF Cybercity), phone numbers, email, and enquiry desk" },
  { id: "7.12", module: "7. Content Management", section: "Static Pages", feature: "Privacy Policy", status: "Included", cost: "₹0 / In Scope", notes: "Data privacy compliance, customer GSTIN, and order data security" },
  { id: "7.13", module: "7. Content Management", section: "Static Pages", feature: "Terms & Conditions", status: "Included", cost: "₹0 / In Scope", notes: "Quotation validity, price lock terms, unloading demurrage, and returns" },
  { id: "7.14", module: "7. Content Management", section: "Static Pages", feature: "FAQs", status: "Included", cost: "₹0 / In Scope", notes: "Comprehensive buyer and supplier help center" },

  // 8. Admin Panel - Centralised Administration (18 items)
  { id: "8.1", module: "8. Admin Panel", section: "Centralised Administration", feature: "Admin dashboard", status: "Included", cost: "₹0 / In Scope", notes: "Executive overview of GMV, pending RFQs, trucks on road, and payables" },
  { id: "8.2", module: "8. Admin Panel", section: "Centralised Administration", feature: "Customer management", status: "Included", cost: "₹0 / In Scope", notes: "View, edit, verify GSTIN, and set credit limits for contractors" },
  { id: "8.3", module: "8. Admin Panel", section: "Centralised Administration", feature: "Product management", status: "Included", cost: "₹0 / In Scope", notes: "Full catalogue CRUD, images, specs, HSN codes, and base pricing" },
  { id: "8.4", module: "8. Admin Panel", section: "Centralised Administration", feature: "Category management", status: "Included", cost: "₹0 / In Scope", notes: "Create and organize categories (Steel, Cement, Plumbing, Finishes)" },
  { id: "8.5", module: "8. Admin Panel", section: "Centralised Administration", feature: "Brand/company management", status: "Included", cost: "₹0 / In Scope", notes: "Manage manufacturer profiles (Tata Steel, UltraTech, Astral, etc.)" },
  { id: "8.6", module: "8. Admin Panel", section: "Centralised Administration", feature: "SKU management", status: "Included", cost: "₹0 / In Scope", notes: "Manage variant matrices (dia, length, grade) and barcodes" },
  { id: "8.7", module: "8. Admin Panel", section: "Centralised Administration", feature: "Supplier management", status: "Included", cost: "₹0 / In Scope", notes: "Master roster of authorized stockist yards, capacities, and locations" },
  { id: "8.8", module: "8. Admin Panel", section: "Centralised Administration", feature: "Supplier rating", status: "Included", cost: "₹0 / In Scope", notes: "Track performance scores, on-time delivery %, and weighbridge accuracy" },
  { id: "8.9", module: "8. Admin Panel", section: "Centralised Administration", feature: "Quotation management", status: "Included", cost: "₹0 / In Scope", notes: "Quotation desk to review client BOMs, aggregate bids, and set margins" },
  { id: "8.10", module: "8. Admin Panel", section: "Centralised Administration", feature: "Comparative quotation management", status: "Included", cost: "₹0 / In Scope", notes: "Curate multi-brand comparisons and dispatch PDF quotes to buyers" },
  { id: "8.11", module: "8. Admin Panel", section: "Centralised Administration", feature: "Order management", status: "Included", cost: "₹0 / In Scope", notes: "Master view of active, dispatched, delivered, and cancelled orders" },
  { id: "8.12", module: "8. Admin Panel", section: "Centralised Administration", feature: "Payment status management", status: "Included", cost: "₹0 / In Scope", notes: "Reconciliation of customer receipts and supplier disbursement approvals" },
  { id: "8.13", module: "8. Admin Panel", section: "Centralised Administration", feature: "Transportation information", status: "Included", cost: "₹0 / In Scope", notes: "Fleet assignment board, transporter rates, and e-way bill tracker" },
  { id: "8.14", module: "8. Admin Panel", section: "Centralised Administration", feature: "Service provider management", status: "Included", cost: "₹0 / In Scope", notes: "Review, approve, and manage skilled workmen listings" },
  { id: "8.15", module: "8. Admin Panel", section: "Centralised Administration", feature: "Expert advisor management", status: "Included", cost: "₹0 / In Scope", notes: "Verify credentials and manage chartered engineer and architect profiles" },
  { id: "8.16", module: "8. Admin Panel", section: "Centralised Administration", feature: "Blog management", status: "Included", cost: "₹0 / In Scope", notes: "Publish and update technical engineering and market articles" },
  { id: "8.17", module: "8. Admin Panel", section: "Centralised Administration", feature: "FAQ management", status: "Included", cost: "₹0 / In Scope", notes: "Manage buyer and vendor knowledge base questions" },
  { id: "8.18", module: "8. Admin Panel", section: "Centralised Administration", feature: "Discount management", status: "Included", cost: "₹0 / In Scope", notes: "Manage category-wide and volume tier rebate percentage rules" },
  { id: "8.19", module: "8. Admin Panel", section: "Centralised Administration", feature: "Customer points/rewards management", status: "Included", cost: "₹0 / In Scope", notes: "Manage earning ratios, point redemption values, and expiry windows" },

  // 9. Integrations & Technical Requirements - Communication & Authentication (3 items)
  { id: "9.1", module: "9. Integrations & Technical", section: "Communication & Authentication", feature: "WhatsApp API integration", status: "Included", cost: "₹0 / In Scope", notes: "WhatsApp Business Cloud API bridge for RFQs, POs, and alerts" },
  { id: "9.2", module: "9. Integrations & Technical", section: "Communication & Authentication", feature: "Email API/service integration", status: "Included", cost: "₹0 / In Scope", notes: "Transactional email engine (SES/SendGrid) with PDF attachments" },
  { id: "9.3", module: "9. Integrations & Technical", section: "Communication & Authentication", feature: "Mobile OTP authentication", status: "Included", cost: "₹0 / In Scope", notes: "SMS OTP authentication with rate limiting and secure session tokens" },

  // 9. Integrations & Technical Requirements - Location & Payments (2 items)
  { id: "9.4", module: "9. Integrations & Technical", section: "Location & Payments", feature: "Google Maps/location services where required", status: "Included", cost: "₹0 / In Scope", notes: "Pincode geo-location distance matrix for yard-to-site freight routing" },
  { id: "9.5", module: "9. Integrations & Technical", section: "Location & Payments", feature: "Payment gateway integration where required", status: "Included", cost: "₹0 / In Scope", notes: "Razorpay/Cashfree gateway for UPI, NetBanking, and corporate cards" },

  // 9. Integrations & Technical Requirements - Platform (5 items)
  { id: "9.6", module: "9. Integrations & Technical", section: "Platform Architecture", feature: "Modern responsive web frontend", status: "Included", cost: "₹0 / In Scope", notes: "High-performance responsive UI with 3D canvas, <2s load, dark mode" },
  { id: "9.7", module: "9. Integrations & Technical", section: "Platform Architecture", feature: "Web-based backend/admin dashboard", status: "Included", cost: "₹0 / In Scope", notes: "Role-based operations desk for sales, logistics, and accounts" },
  { id: "9.8", module: "9. Integrations & Technical", section: "Platform Architecture", feature: "Relational database", status: "Included", cost: "₹0 / In Scope", notes: "PostgreSQL relational schemas with strict ACID financial constraints" },
  { id: "9.9", module: "9. Integrations & Technical", section: "Platform Architecture", feature: "Cloud/Linux hosting", status: "Included", cost: "₹0 / In Scope", notes: "Containerized Docker deployment ready for AWS/DigitalOcean Linux VPS" },
  { id: "9.10", module: "9. Integrations & Technical", section: "Platform Architecture", feature: "SSL/security", status: "Included", cost: "₹0 / In Scope", notes: "TLS 1.3 encryption, OWASP guidelines, CSRF protection, rate limiting" }
];

