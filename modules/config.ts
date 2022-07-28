export const config = {
  env: process.env.NODE_ENV,
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || 'TAVI',
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
  SMART_CONTRACT: '0x77c2f2303ce1f3355ca822fe468b8c9e5d89a6dd',
  NETWORK: {
    NAME: 'Ethereum',
    SYMBOL: 'ETH',
    ID: 1,
  },
  WEI_COST: 90000000000000000,
  MAX_SUPPLY: 5000,
  COST_IN_ETH: 0.09,
}

export default config
