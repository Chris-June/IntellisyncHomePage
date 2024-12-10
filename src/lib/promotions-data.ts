export interface Promotion {
  id: string;
  title: string;
  description: string;
  type: 'discount' | 'upgrade' | 'special';
  badge?: string;
  startDate: string;
  endDate: string;
  imageUrl?: string;
  features?: string[];
  ctaText: string;
  ctaLink: string;
  terms?: string[];
  highlight?: boolean;
}

export const promotions: Promotion[] = [
  {
    id: 'new-year-2025',
    title: 'New Year AI Innovation Bundle',
    description: 'Start 2025 with a competitive edge. Get our  AI Catalyst package FREE for 1 year. A $240.00 Gift to you and your Business.',
    type: 'special',
    badge: 'Early Bird',
    startDate: '2024-12-10',
    endDate: '2025-01-31',
    imageUrl: 'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?q=80&w=2969&auto=format&fit=crop',
    features: [
      '$500.00 - Custom Built Single Page Application WebSite with the following:',
      'Navigation Header',
      'Hero Section',
      'CTA Section',
      'Features Section',
      'Footer Section',
    ],
    ctaText: 'Claim Early Access',
    ctaLink: '/contact',
    terms: [
      'Valid for new subscriptions only',
      'Account must be activated by January 31, 2025',
      'Strategy consultation must be scheduled by March 2025'
    ],
    highlight: true
  },
  {
    id: 'spring-2025',
    title: 'Spring Digital Transformation Package',
    description: 'Revitalize your business operations with our comprehensive AI transformation package. Perfect timing to implement new intelligent solutions.',
    type: 'upgrade',
    badge: 'Limited Spots',
    startDate: '2025-03-01',
    endDate: '2025-05-31',
    imageUrl: 'https://images.unsplash.com/photo-1507878866276-a947ef722fee?q=80&w=2971&auto=format&fit=crop',
    features: [
      'Full AI infrastructure assessment',
      'Custom implementation roadmap',
      'Team training workshops',
      '3 months of premium support'
    ],
    ctaText: 'Reserve Your Spot',
    ctaLink: '/contact',
    terms: [
      'Limited to first 50 companies',
      'Implementation must start by May 31, 2025',
      'Training workshops must be scheduled in advance'
    ],
    highlight: false
  },
  {
    id: 'summer-2025',
    title: 'Summer AI Scale-Up Special',
    description: 'Scale your AI capabilities with our summer special package. Ideal for businesses looking to expand their AI infrastructure during the quieter summer months.',
    type: 'discount',
    badge: 'Summer Special',
    startDate: '2025-06-01',
    endDate: '2025-08-31',
    imageUrl: 'https://images.unsplash.com/photo-1507908708918-778587c9e563?q=80&w=2971&auto=format&fit=crop',
    features: [
      '25% off scale-up packages',
      'Free performance optimization',
      'Extended support hours',
      'Bonus API credits'
    ],
    ctaText: 'Scale Up Now',
    ctaLink: '/contact',
    terms: [
      'Available for existing customers',
      'Scale-up must be completed by August 31, 2025',
      'API credits valid for 12 months'
    ],
    highlight: false
  },
  {
    id: 'holiday-2025',
    title: 'Holiday Innovation Bundle 2025',
    description: 'End the year strong with our most comprehensive AI package. Get ready for 2026 with cutting-edge AI capabilities and exclusive bonuses.',
    type: 'special',
    badge: 'Premium Bundle',
    startDate: '2025-11-15',
    endDate: '2025-12-31',
    imageUrl: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?q=80&w=2970&auto=format&fit=crop',
    features: [
      '40% off enterprise bundles',
      'Free migration from any platform',
      'Exclusive 2026 feature preview access',
      'Dedicated success manager'
    ],
    ctaText: 'Secure Your Bundle',
    ctaLink: '/contact',
    terms: [
      'Bundle must be activated by December 31, 2025',
      'Feature preview access starts January 2026',
      'Migration support valid for 60 days'
    ],
    highlight: true
  }
];
