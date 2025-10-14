// OurPixo Gallery URLs for LUM Studios
// Each category has embedded gallery links from ourpixo.com

export interface GalleryData {
  id: string;
  name: string;
  url: string;
  category: string;
  slug: string;
}

export const OURPIXO_GALLERIES: GalleryData[] = [
  // Baby Shoots
  {
    id: 'baby-1-year',
    name: 'Baby Shoot (1 Year)',
    url: 'https://lumstudios.ourpixo.com/NDV',
    category: 'Baby Shoot',
    slug: 'baby-shoot'
  },
  {
    id: 'baby-2-years',
    name: 'Baby Shoot (2 Years & Above)',
    url: 'https://lumstudios.ourpixo.com/NDW',
    category: 'Baby Shoot',
    slug: 'baby-shoot'
  },
  {
    id: 'baby-below-1',
    name: 'Baby Shoot (Below 1 Year)',
    url: 'https://lumstudios.ourpixo.com/NDX',
    category: 'Baby Shoot',
    slug: 'baby-shoot'
  },
  
  // Special Events
  {
    id: 'burial',
    name: 'Burial',
    url: 'https://lumstudios.ourpixo.com/NDY',
    category: 'Event',
    slug: 'general'
  },
  {
    id: 'naming',
    name: 'Naming Ceremony',
    url: 'https://lumstudios.ourpixo.com/NE4',
    category: 'Event',
    slug: 'general'
  },
  
  // Professional Milestones
  {
    id: 'call-to-bar',
    name: 'Call To Bar',
    url: 'https://lumstudios.ourpixo.com/NDZ',
    category: 'Call to Bar',
    slug: 'call-to-bar'
  },
  {
    id: 'convocation',
    name: 'Convocation',
    url: 'https://lumstudios.ourpixo.com/NE0',
    category: 'Convocation',
    slug: 'convocation'
  },
  
  // Family & Maternity
  {
    id: 'family-portraits',
    name: 'Family Portraits',
    url: 'https://lumstudios.ourpixo.com/NE1',
    category: 'Family Portraits',
    slug: 'family-portraits'
  },
  {
    id: 'maternity',
    name: 'Maternity Portrait',
    url: 'https://lumstudios.ourpixo.com/NE3',
    category: 'Maternity',
    slug: 'maternity'
  },
  
  // Wedding & Pre-Wedding
  {
    id: 'pre-wedding',
    name: 'Pre-Wedding Portrait',
    url: 'https://lumstudios.ourpixo.com/NE5',
    category: 'Wedding',
    slug: 'wedding'
  },
  {
    id: 'wedding',
    name: 'Wedding Portraits',
    url: 'https://lumstudios.ourpixo.com/NED',
    category: 'Wedding',
    slug: 'wedding'
  },
  
  // Product & General Portraits
  {
    id: 'product-shoot',
    name: 'Product Shoot',
    url: 'https://lumstudios.ourpixo.com/NE7',
    category: 'Commercial',
    slug: 'general'
  },
  {
    id: 'portraits',
    name: 'Portraits',
    url: 'https://lumstudios.ourpixo.com/NE9',
    category: 'Portrait',
    slug: 'general'
  },
  {
    id: 'portraits-additional',
    name: 'Portraits (Additional)',
    url: 'https://lumstudios.ourpixo.com/NIT',
    category: 'Portrait',
    slug: 'general'
  }
];

// Helper function to get galleries by slug
export const getGalleriesBySlug = (slug: string): GalleryData[] => {
  return OURPIXO_GALLERIES.filter(gallery => gallery.slug === slug);
};

// Helper function to get gallery by ID
export const getGalleryById = (id: string): GalleryData | undefined => {
  return OURPIXO_GALLERIES.find(gallery => gallery.id === id);
};
