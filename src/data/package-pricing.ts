// Package Pricing Data for LUM Studios
// All prices in Nigerian Naira (₦)

export interface PricingOption {
  type: 'single' | 'look';
  looks?: number;
  price: number;
  images: {
    edited: number;
    unedited: number;
  };
  description: string;
}

export interface PackageType {
  id: string;
  name: string;
  slug: string;
  category: 'individual' | 'couples' | 'maternity';
  classic: PricingOption[];
  walkin: PricingOption[];
}

export const PACKAGE_DATA: PackageType[] = [
  // INDIVIDUAL & PORTRAIT SHOOTS
  {
    id: 'individual-portrait',
    name: 'Individual & Portrait Shoots',
    slug: 'individual-portrait',
    category: 'individual',
    classic: [
      {
        type: 'single',
        price: 7500,
        images: { edited: 1, unedited: 0 },
        description: 'Per picture'
      },
      {
        type: 'look',
        looks: 1,
        price: 22000,
        images: { edited: 3, unedited: 3 },
        description: '1 Look'
      },
      {
        type: 'look',
        looks: 2,
        price: 42000,
        images: { edited: 6, unedited: 6 },
        description: '2 Looks'
      },
      {
        type: 'look',
        looks: 3,
        price: 64000,
        images: { edited: 9, unedited: 9 },
        description: '3 Looks'
      }
    ],
    walkin: [
      {
        type: 'single',
        price: 4000,
        images: { edited: 1, unedited: 0 },
        description: 'Per picture'
      },
      {
        type: 'look',
        looks: 1,
        price: 12000,
        images: { edited: 3, unedited: 3 },
        description: '1 Look'
      },
      {
        type: 'look',
        looks: 2,
        price: 22000,
        images: { edited: 6, unedited: 6 },
        description: '2 Looks'
      },
      {
        type: 'look',
        looks: 3,
        price: 34000,
        images: { edited: 9, unedited: 9 },
        description: '3 Looks'
      }
    ]
  },
  
  // GRADUATION SHOOT
  {
    id: 'graduation-shoot',
    name: 'Graduation Shoot & Call to Bar',
    slug: 'graduation-shoot',
    category: 'individual',
    classic: [
      {
        type: 'single',
        price: 7500,
        images: { edited: 1, unedited: 0 },
        description: 'Per picture'
      },
      {
        type: 'look',
        looks: 1,
        price: 22000,
        images: { edited: 3, unedited: 3 },
        description: '1 Look'
      },
      {
        type: 'look',
        looks: 2,
        price: 42000,
        images: { edited: 6, unedited: 6 },
        description: '2 Looks'
      },
      {
        type: 'look',
        looks: 3,
        price: 64000,
        images: { edited: 9, unedited: 9 },
        description: '3 Looks'
      }
    ],
    walkin: [
      {
        type: 'single',
        price: 4000,
        images: { edited: 1, unedited: 0 },
        description: 'Per picture'
      },
      {
        type: 'look',
        looks: 1,
        price: 12000,
        images: { edited: 3, unedited: 3 },
        description: '1 Look'
      },
      {
        type: 'look',
        looks: 2,
        price: 22000,
        images: { edited: 6, unedited: 6 },
        description: '2 Looks'
      },
      {
        type: 'look',
        looks: 3,
        price: 34000,
        images: { edited: 9, unedited: 9 },
        description: '3 Looks'
      }
    ]
  },

  // BABY SHOOT
  {
    id: 'baby-shoot',
    name: 'Baby Shoot',
    slug: 'baby-shoot',
    category: 'individual',
    classic: [
      {
        type: 'single',
        price: 7500,
        images: { edited: 1, unedited: 0 },
        description: 'Per picture'
      },
      {
        type: 'look',
        looks: 1,
        price: 22000,
        images: { edited: 3, unedited: 3 },
        description: '1 Look'
      },
      {
        type: 'look',
        looks: 2,
        price: 42000,
        images: { edited: 6, unedited: 6 },
        description: '2 Looks'
      },
      {
        type: 'look',
        looks: 3,
        price: 64000,
        images: { edited: 9, unedited: 9 },
        description: '3 Looks'
      }
    ],
    walkin: [
      {
        type: 'single',
        price: 4000,
        images: { edited: 1, unedited: 0 },
        description: 'Per picture'
      },
      {
        type: 'look',
        looks: 1,
        price: 12000,
        images: { edited: 3, unedited: 3 },
        description: '1 Look'
      },
      {
        type: 'look',
        looks: 2,
        price: 22000,
        images: { edited: 6, unedited: 6 },
        description: '2 Looks'
      },
      {
        type: 'look',
        looks: 3,
        price: 34000,
        images: { edited: 9, unedited: 9 },
        description: '3 Looks'
      }
    ]
  },

  // MATERNITY SHOOT
  {
    id: 'maternity-shoot',
    name: 'Maternity Shoot',
    slug: 'maternity-shoot',
    category: 'maternity',
    classic: [
      {
        type: 'look',
        looks: 1,
        price: 28000,
        images: { edited: 3, unedited: 3 },
        description: '1 Look'
      },
      {
        type: 'look',
        looks: 2,
        price: 48000,
        images: { edited: 6, unedited: 6 },
        description: '2 Looks'
      },
      {
        type: 'look',
        looks: 3,
        price: 73000,
        images: { edited: 9, unedited: 9 },
        description: '3 Looks'
      }
    ],
    walkin: [
      {
        type: 'look',
        looks: 1,
        price: 12000,
        images: { edited: 3, unedited: 3 },
        description: '1 Look'
      },
      {
        type: 'look',
        looks: 2,
        price: 24000,
        images: { edited: 6, unedited: 6 },
        description: '2 Looks'
      },
      {
        type: 'look',
        looks: 3,
        price: 35000,
        images: { edited: 9, unedited: 9 },
        description: '3 Looks'
      }
    ]
  },

  // COUPLE SHOOT
  {
    id: 'couple-shoot',
    name: 'Couple Shoot',
    slug: 'couple-shoot',
    category: 'couples',
    classic: [
      {
        type: 'single',
        price: 8500,
        images: { edited: 1, unedited: 0 },
        description: 'Per picture'
      },
      {
        type: 'look',
        looks: 1,
        price: 26000,
        images: { edited: 3, unedited: 3 },
        description: '1 Look'
      },
      {
        type: 'look',
        looks: 2,
        price: 46000,
        images: { edited: 6, unedited: 6 },
        description: '2 Looks'
      },
      {
        type: 'look',
        looks: 3,
        price: 70000,
        images: { edited: 9, unedited: 9 },
        description: '3 Looks'
      }
    ],
    walkin: [
      {
        type: 'single',
        price: 5500,
        images: { edited: 1, unedited: 0 },
        description: 'Per picture'
      },
      {
        type: 'look',
        looks: 1,
        price: 13000,
        images: { edited: 3, unedited: 3 },
        description: '1 Look'
      },
      {
        type: 'look',
        looks: 2,
        price: 24000,
        images: { edited: 6, unedited: 6 },
        description: '2 Looks'
      },
      {
        type: 'look',
        looks: 3,
        price: 47000,
        images: { edited: 9, unedited: 9 },
        description: '3 Looks'
      }
    ]
  },

  // PRE-WEDDING SHOOT
  {
    id: 'pre-wedding-shoot',
    name: 'Pre-Wedding Shoot',
    slug: 'pre-wedding-shoot',
    category: 'couples',
    classic: [
      {
        type: 'single',
        price: 12000,
        images: { edited: 1, unedited: 0 },
        description: 'Per picture'
      },
      {
        type: 'look',
        looks: 1,
        price: 35000,
        images: { edited: 3, unedited: 3 },
        description: '1 Look'
      },
      {
        type: 'look',
        looks: 2,
        price: 68000,
        images: { edited: 6, unedited: 6 },
        description: '2 Looks'
      },
      {
        type: 'look',
        looks: 3,
        price: 105000,
        images: { edited: 9, unedited: 9 },
        description: '3 Looks'
      }
    ],
    walkin: [
      {
        type: 'single',
        price: 8500,
        images: { edited: 1, unedited: 0 },
        description: 'Per picture'
      },
      {
        type: 'look',
        looks: 1,
        price: 25000,
        images: { edited: 3, unedited: 3 },
        description: '1 Look'
      },
      {
        type: 'look',
        looks: 2,
        price: 48000,
        images: { edited: 6, unedited: 6 },
        description: '2 Looks'
      },
      {
        type: 'look',
        looks: 3,
        price: 72000,
        images: { edited: 9, unedited: 9 },
        description: '3 Looks'
      }
    ]
  },

  // FAMILY SHOOT
  {
    id: 'family-shoot',
    name: 'Family Shoot',
    slug: 'family-shoot',
    category: 'couples',
    classic: [
      {
        type: 'single',
        price: 10000,
        images: { edited: 1, unedited: 0 },
        description: 'Per picture'
      },
      {
        type: 'look',
        looks: 1,
        price: 30000,
        images: { edited: 3, unedited: 3 },
        description: '1 Look'
      },
      {
        type: 'look',
        looks: 2,
        price: 58000,
        images: { edited: 6, unedited: 6 },
        description: '2 Looks'
      },
      {
        type: 'look',
        looks: 3,
        price: 88000,
        images: { edited: 9, unedited: 9 },
        description: '3 Looks'
      }
    ],
    walkin: [
      {
        type: 'single',
        price: 5000,
        images: { edited: 1, unedited: 0 },
        description: 'Per picture'
      },
      {
        type: 'look',
        looks: 1,
        price: 15000,
        images: { edited: 3, unedited: 3 },
        description: '1 Look'
      },
      {
        type: 'look',
        looks: 2,
        price: 28000,
        images: { edited: 6, unedited: 6 },
        description: '2 Looks'
      },
      {
        type: 'look',
        looks: 3,
        price: 43000,
        images: { edited: 9, unedited: 9 },
        description: '3 Looks'
      }
    ]
  }
];

// Package Details
export const CLASSIC_FEATURES = [
  'Shot by the lead photographer',
  'Shoot concept development',
  'Access to premium props',
  'Exclusive lighting gear',
  'High-res edited images',
  'Priority delivery (3 days)',
  'Express delivery at extra cost',
  'BTS (Behind the Scenes) content at extra cost'
];

export const WALKIN_FEATURES = [
  'Shot by associate photographer',
  'Pose assistance',
  'High-res edited images',
  'Limited access to props',
  'Delivery within 3 business days'
];

// Payment Information
export const PAYMENT_INFO = {
  accountNumber: '5646143460',
  bankName: 'Moniepoint',
  accountName: 'LUM Studios'
};

// Helper function to format currency
export const formatPrice = (price: number): string => {
  return `₦${price.toLocaleString('en-NG')}`;
};

// Helper function to get package by slug
export const getPackageBySlug = (slug: string): PackageType | undefined => {
  return PACKAGE_DATA.find(pkg => pkg.slug === slug);
};
