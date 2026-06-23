export type InfoSection = { heading?: string; body: string[] };
export type InfoPage = {
  eyebrow: string;
  title: string;
  intro?: string;
  sections: InfoSection[];
};

export const infoPages: Record<string, InfoPage> = {
  "our-story": {
    eyebrow: "The House",
    title: "Our Story",
    intro:
      "SK Abaya was founded on a single belief — that modesty and luxury are not opposites, but partners.",
    sections: [
      {
        body: [
          "Since 1998, our ateliers have dressed women who refuse to choose between their faith and their love of beautiful things. What began as a single boutique has grown into a house known across the GCC, Pakistan, the UK, and beyond.",
          "Every SK Abaya piece is a quiet statement of elegance, grace, faith, and luxury — designed in-house and crafted by hand.",
        ],
      },
    ],
  },
  craftsmanship: {
    eyebrow: "The House",
    title: "Craftsmanship",
    intro: "The difference is in the details you feel before you ever see them.",
    sections: [
      {
        heading: "Premium Nida fabrics",
        body: [
          "Sourced from the finest mills, our signature Nida falls like liquid and breathes like silk.",
        ],
      },
      {
        heading: "Handcrafted embroidery",
        body: [
          "Each motif is set by hand in real gold thread by master artisans — a craft passed through generations.",
        ],
      },
      {
        heading: "Luxury finishing",
        body: ["French seams, weighted hems, and silk linings, on every piece."],
      },
    ],
  },
  "custom-tailoring": {
    eyebrow: "Service",
    title: "Custom Tailoring",
    intro: "Made-to-measure, by appointment.",
    sections: [
      {
        body: [
          "Our bespoke service cuts each abaya to you and you alone. Share your measurements and inspiration, and our atelier will craft a one-of-one piece.",
          "To begin, reach us on WhatsApp at +92 300 4031131 or via the contact page.",
        ],
      },
    ],
  },
  boutiques: {
    eyebrow: "Visit",
    title: "Boutiques",
    sections: [
      {
        body: [
          "SK Abaya ships worldwide and welcomes private appointments in Dubai, Lahore, and London.",
          "For a personal styling session, contact us to arrange a visit.",
        ],
      },
    ],
  },
  "shipping-returns": {
    eyebrow: "Client Care",
    title: "Shipping & Returns",
    sections: [
      {
        heading: "Shipping",
        body: [
          "Complimentary worldwide shipping on all orders. Pieces are dispatched within 2–5 working days; bespoke orders within 2–3 weeks.",
        ],
      },
      {
        heading: "Returns",
        body: [
          "Ready-to-wear pieces may be returned within 14 days in original condition. Bespoke and custom-tailored pieces are final sale.",
        ],
      },
    ],
  },
  "size-guide": {
    eyebrow: "Client Care",
    title: "Size Guide",
    intro: "Abayas are measured by length (shoulder to hem) and bust.",
    sections: [
      {
        body: [
          "52″ — petite (5'0″–5'3″)",
          "54″ — standard (5'3″–5'6″)",
          "56″ — tall (5'6″–5'9″)",
          "58″ — extra tall (5'9″+)",
          "For a perfect fit, choose custom tailoring and share your exact measurements.",
        ],
      },
    ],
  },
  faq: {
    eyebrow: "Client Care",
    title: "Frequently Asked",
    sections: [
      {
        heading: "How do I order?",
        body: [
          "Add pieces to your bag, proceed to checkout, and confirm your order on WhatsApp. You'll receive an order reference to track or cancel anytime.",
        ],
      },
      {
        heading: "Can I cancel my order?",
        body: [
          "Yes — visit Track Order, enter your reference, and cancel while the order is still pending or confirmed.",
        ],
      },
      {
        heading: "Which currencies do you accept?",
        body: ["USD, AED, SAR, PKR, and GBP, with worldwide delivery."],
      },
    ],
  },
  contact: {
    eyebrow: "Get in touch",
    title: "Contact Us",
    intro: "We would love to hear from you.",
    sections: [
      {
        body: [
          "WhatsApp: +92 300 4031131",
          "Email: care@skabaya.com",
          "Hours: Saturday–Thursday, 10am–8pm (GST)",
        ],
      },
    ],
  },
  privacy: {
    eyebrow: "Legal",
    title: "Privacy Policy",
    sections: [
      {
        body: [
          "We collect only the information needed to fulfil your order — name, contact details, and delivery address — and never sell your data.",
          "Newsletter subscribers may unsubscribe at any time.",
        ],
      },
    ],
  },
  terms: {
    eyebrow: "Legal",
    title: "Terms & Conditions",
    sections: [
      {
        body: [
          "All prices are listed in the selected currency and confirmed at the time of order on WhatsApp.",
          "Bespoke and custom-tailored pieces are final sale. By placing an order you agree to these terms.",
        ],
      },
    ],
  },
};
