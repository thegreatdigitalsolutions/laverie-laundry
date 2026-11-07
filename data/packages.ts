export interface PackageItem {
  id: string;
  name: string;
  badge?: string;
  price: string;
  unit: string;
  turnaround: string;
  description: string;
  features: string[];
  popular?: boolean;
  whatsappMessage: string;
}

export const packages: PackageItem[] = [
  {
    id: "regular",
    name: "Regular Care",
    price: "Rp 15.000",
    unit: "/ KG",
    turnaround: "24 - 48 Hours",
    description: "Comprehensive care for your everyday garments and essentials.",
    features: [
      "Gentle temperature-controlled wash",
      "Soft tumble dry cycle",
      "Neat hotel-grade fold & packaging",
      "Eco-certified fabric softener",
      "Complimentary standard bag",
    ],
    popular: false,
    whatsappMessage: "Hello Laverie! I would like to order the Regular Care package (/KG).",
  },
  {
    id: "express",
    name: "12H Hotel Express",
    badge: "FEATURED",
    price: "Rp 25.000",
    unit: "/ KG",
    turnaround: "Same Day (12 Hours)",
    description: "Tailored for business trips, short getaways, and urgent itineraries.",
    features: [
      "Priority same-day express turnaround",
      "Hotel lobby or doorstep pickup before 10 AM",
      "Evening return before 10 PM",
      "Wrinkle-release steam press",
      "Anti-bacterial ozone sanitization",
      "Sealed travel-ready packaging",
    ],
    popular: true,
    whatsappMessage: "Hello Laverie! I would like to book the 12H Hotel Express package (Same Day).",
  },
  {
    id: "premium",
    name: "Delicate & Premium",
    badge: "BESPOKE CARE",
    price: "Rp 35.000",
    unit: "/ Piece / KG",
    turnaround: "24 - 36 Hours",
    description: "Specialized gentle care for suits, silks, designer wear, and fine linen.",
    features: [
      "Individual fabric inspection & spot treatment",
      "Dermatologically tested premium detergent",
      "Hand steam & artisan pressing",
      "Garment hanger & breathable dust cover",
      "Ideal for business blazers, dresses & woolens",
    ],
    popular: false,
    whatsappMessage: "Hello Laverie! I would like to enquire about the Delicate & Premium Care package.",
  },
];
