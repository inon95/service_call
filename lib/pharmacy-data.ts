export interface PharmacyProduct {
  id: string;
  image: string;
  name: string;
  strainType: string;
  manufacturer: string;
  genetics: string;
  growingMethod: string;
  servingType: string;
  thc: number;
  cbd: number;
  cbg?: number;
  cbn?: number;
  terpenes: {
    name: string;
    percentage: number;
  }[];
  batchNumber: string;
  productionDate: string;
  expiryDate: string;
  packPrice: number;
  packGrams: number;
  wholesalePrice?: number;
  wholesaleMinUnits?: number;
  inStock: boolean;
  gmpCertified: boolean;
}

export const pharmacyProducts: PharmacyProduct[] = [
  {
    id: 'alaska-a5',
    image: '/products/prod1.png',
    name: 'Alaska A5',
    strainType: 'אינדיקה דומיננטי',
    manufacturer: 'IMC פארמה',
    genetics: 'Northern Lights x Haze',
    growingMethod: 'אורגני מקורה',
    servingType: 'תפרחת',
    thc: 22,
    cbd: 1,
    cbg: 0.8,
    cbn: 0.3,
    terpenes: [
      { name: 'Myrcene', percentage: 1.2 },
      { name: 'Caryophyllene', percentage: 0.8 },
      { name: 'Limonene', percentage: 0.5 },
    ],
    batchNumber: 'AL-2024-1287',
    productionDate: '15/11/2024',
    expiryDate: '15/11/2025',
    packPrice: 299,
    packGrams: 10,
    wholesalePrice: 265,
    wholesaleMinUnits: 10,
    inStock: true,
    gmpCertified: true,
  },
  {
    id: 'blue-dream-b3',
    image: '/products/prod2.png',
    name: 'Blue Dream B3',
    strainType: 'סאטיבה דומיננטי',
    manufacturer: 'Tikun Olam',
    genetics: 'Blueberry x Haze',
    growingMethod: 'הידרופוני',
    servingType: 'שמן',
    thc: 18,
    cbd: 2,
    cbg: 0.5,
    cbn: 0.2,
    terpenes: [
      { name: 'Pinene', percentage: 1.0 },
      { name: 'Myrcene', percentage: 0.7 },
      { name: 'Caryophyllene', percentage: 0.4 },
    ],
    batchNumber: 'BD-2024-0892',
    productionDate: '20/11/2024',
    expiryDate: '20/11/2025',
    packPrice: 280,
    packGrams: 10,
    wholesalePrice: 245,
    wholesaleMinUnits: 10,
    inStock: true,
    gmpCertified: true,
  },
  {
    id: 'og-kush-k1',
    image: '/products/prod3.png',
    name: 'OG Kush K1',
    strainType: 'היברידי',
    manufacturer: 'Cannbit',
    genetics: 'Chemdawg x Hindu Kush',
    growingMethod: 'אורגני מקורה',
    servingType: 'תפרחת',
    thc: 24,
    cbd: 0.5,
    cbg: 1.0,
    cbn: 0.4,
    terpenes: [
      { name: 'Limonene', percentage: 1.5 },
      { name: 'Myrcene', percentage: 0.9 },
      { name: 'Linalool', percentage: 0.3 },
    ],
    batchNumber: 'OG-2024-0456',
    productionDate: '10/11/2024',
    expiryDate: '10/11/2025',
    packPrice: 320,
    packGrams: 10,
    wholesalePrice: 285,
    wholesaleMinUnits: 10,
    inStock: true,
    gmpCertified: true,
  },
  {
    id: 'eran-almog',
    image: '/products/prod4.jpg',
    name: 'Eran Almog',
    strainType: 'אינדיקה דומיננטי',
    manufacturer: 'Tikun Olam',
    genetics: 'Proprietary Indica',
    growingMethod: 'אורגני מקורה',
    servingType: 'תפרחת',
    thc: 28,
    cbd: 0.3,
    cbg: 0.6,
    cbn: 0.5,
    terpenes: [
      { name: 'Myrcene', percentage: 1.8 },
      { name: 'Caryophyllene', percentage: 1.1 },
      { name: 'Humulene', percentage: 0.4 },
    ],
    batchNumber: 'EA-2024-0721',
    productionDate: '05/12/2024',
    expiryDate: '05/12/2025',
    packPrice: 350,
    packGrams: 10,
    wholesalePrice: 310,
    wholesaleMinUnits: 10,
    inStock: false,
    gmpCertified: true,
  },
];
