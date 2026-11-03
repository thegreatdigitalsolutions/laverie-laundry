export interface TestimonialItem {
  name: string;
  role: string;
  hotel: string;
  rating: number;
  content: string;
}

export const defaultTestimonials: TestimonialItem[] = [
  {
    name: "Marcus Vance",
    role: "Business Traveler & Hotel Guest",
    hotel: "The Seminyak Suite Hotel",
    rating: 5,
    content:
      "Handed my suit and shirts to the front desk at 9:30 AM before my meetings. By 7 PM when I returned to the hotel, everything was neatly hung in dust bags, steamed to perfection, and smelled wonderful. Exceptional service!",
  },
  {
    name: "Sophia Chen",
    role: "Digital Nomad & Villa Resident",
    hotel: "Canggu Eco Villas",
    rating: 5,
    content:
      "Finding a laundry service that genuinely respects delicate fabrics and silks is rare. Laverie’s packaging and detergent quality blew me away. Best laundry experience in Bali by far.",
  },
  {
    name: "David & Claire Miller",
    role: "Holiday Getaway Travelers",
    hotel: "Alila Resort & Villas",
    rating: 5,
    content:
      "We didn't want to fly back with a suitcase full of dirty holiday clothes. Laverie picked up our luggage bags directly from our resort reception and delivered everything fresh and compact. Worth every Rupiah!",
  },
];

