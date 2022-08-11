export const config = {
  env: process.env.NODE_ENV,
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || 'Not So Quiet',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },
  socials: [
    {
      network: 'twitter',
      link: 'https://twitter.com/tavi_art',
    },
    {
      network: 'instagram',
      link: 'https://www.instagram.com/tavi.art_/',
    },
  ],
  SMART_CONTRACT: '0xc5D2C5A9a585EdB4Abf6557D58aF55a8B6F47e61',
  NETWORK: {
    NAME: 'Ethereum',
    SYMBOL: 'ETH',
    ID: 4,
  },
  WEI_COST: 90000000000000000,
  MAX_SUPPLY_PATRONS: 2500,
  MAX_SUPPLY_BENEFACTORS: 400,
  COST_IN_ETH: 0.09,
}

export default config
