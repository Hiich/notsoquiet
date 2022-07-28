module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        blue: '#1fb6ff',
        purple: '#7e5bef',
        pink: '#ff49db',
        orange: '#ff7849',
        green: '#13ce66',
        yellow: '#ffc82c',
        gray: '#8492a6',
        white: '#fff',
      },
      dropShadow: {
        '2xl': '0 4.9732px 4.9732px rgba(0, 0, 0, 0.25)',
      },
      backgroundImage: {
        hero: "url('/images/BannerTransparent.png')"
      }
    },
  },
  plugins: [],
}
