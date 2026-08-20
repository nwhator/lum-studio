export type PricingType = 'automatic' | 'manual';

export interface AddOn {
  id: string;
  name: string;
  price: number;
}

export interface Package {
  id: string;
  name: string;
  price: number;
  description?: string;
  features: string[];
  addOns?: AddOn[]; // applicable for wedding packages
}

export interface EventTypeConfig {
  id: string; // e.g., 'wedding'
  name: string; // display name
  pricingType: PricingType;
  packages?: Package[]; // only for automatic pricing events
}

export const EVENT_TYPES: EventTypeConfig[] = [
  {
    id: 'wedding',
    name: 'Wedding',
    pricingType: 'automatic',
    packages: [
      {
        id: 'luxury',
        name: 'Luxury',
        price: 850000,
        features: [
          '2 Photographers',
          'Synthetic book (12 × 24)',
          '2 Luxury Frames (16 × 20)',
          'Backdrop for Portrait',
          '1 Videographer',
          'Full wedding video',
          'Highlight',
          'Video light system',
          'Sound recording system',
          'Pen Drive',
          '1 Drone with pilot',
        ],
        addOns: [
          { id: 'afterParty', name: 'After Party', price: 150000 },
          { id: 'extraPhotographer', name: 'Extra Photographer', price: 70000 },
          { id: 'extraVideographer', name: 'Extra Videographer', price: 80000 },
          { id: 'camera360', name: '360 Camera', price: 180000 },
          { id: 'dronePilot', name: 'Drone Pilot', price: 80000 },
        ],
      },
      {
        id: 'classic',
        name: 'Classic',
        price: 550000,
        features: [
          '1 Photographer',
          'Synthetic book (10 × 24)',
          '2 Frames (16 × 20)',
          '1 Videographer',
          'Full wedding video',
          'Highlight',
          'Video light system',
          'Pen Drive',
        ],
        addOns: [
          { id: 'afterParty', name: 'After Party', price: 150000 },
          { id: 'extraPhotographer', name: 'Extra Photographer', price: 70000 },
          { id: 'extraVideographer', name: 'Extra Videographer', price: 80000 },
          { id: 'camera360', name: '360 Camera', price: 180000 },
          { id: 'dronePilot', name: 'Drone Pilot', price: 80000 },
        ],
      },
      {
        id: 'standard',
        name: 'Standard',
        price: 350000,
        features: [
          '1 Photographer',
          'Synthetic book (8 × 20)',
          '2 Frames (12 × 16)',
          '1 Videographer',
          'Highlight of the video',
          'Pen Drive',
        ],
        addOns: [
          { id: 'afterParty', name: 'After Party', price: 150000 },
          { id: 'extraPhotographer', name: 'Extra Photographer', price: 70000 },
          { id: 'extraVideographer', name: 'Extra Videographer', price: 80000 },
          { id: 'camera360', name: '360 Camera', price: 180000 },
          { id: 'dronePilot', name: 'Drone Pilot', price: 80000 },
        ],
      },
    ],
  },
  // Other event types (manual pricing)
  { id: 'burial', name: 'Burial', pricingType: 'manual' },
  { id: 'inauguration', name: 'Inauguration', pricingType: 'manual' },
  { id: 'convocation', name: 'Convocation', pricingType: 'manual' },
  { id: 'namingCeremony', name: 'Naming Ceremony', pricingType: 'manual' },
  { id: 'show', name: 'Show', pricingType: 'manual' },
  { id: 'other', name: 'Other', pricingType: 'manual' },
];
