module.exports = {
  content: ["./templates/**/*.{html,twig}"],
  theme: {
    extend: {
      colors: {
        "Green8": "#0A5151",
        "Green6": "#14A2A2",
        "Green5": "#19CBCB",
        "Green2": "#A3EAEA",
        "Green1": "#D1F5F4",
        "Green05": "#E8FAFA",
        "Blue1": "#122B61",
        "Blue2": "#2D3047",
        "Blue3": "#5E617C",
        "Yellow1": "#FFB000",
        "offWhite": "#F2F3F6"
      },
      spacing: {
        "0.5": 0.125 * 1.6 + 'rem',
        "1": 0.25 * 1.6 + 'rem',
        "1.5": 0.375 * 1.6 + 'rem',
        "2": 0.5 * 1.6 + 'rem',
        "2.5": 0.625 * 1.6 + 'rem',
        "3": 0.75 * 1.6 + 'rem',
        "3.5": 0.875 * 1.6 + 'rem',
        "4": 1 * 1.6 + 'rem',
        "5": 1.25 * 1.6 + 'rem',
        "6": 1.5 * 1.6 + 'rem',
        "7": 1.75 * 1.6 + 'rem',
        "8": 2 * 1.6 + 'rem',
        "9": 2.25 * 1.6 + 'rem',
        "10": 2.5 * 1.6 + 'rem',
        "11": 2.75 * 1.6 + 'rem',
        "12": 3 * 1.6 + 'rem',
        "13": 3.25 * 1.6 + 'rem',
        "14": 3.5 * 1.6 + 'rem',
        "16": 4 * 1.6 + 'rem',
        "20": 5 * 1.6 + 'rem',
        "24": 6 * 1.6 + 'rem',
        "28": 7 * 1.6 + 'rem',
        "32": 8 * 1.6 + 'rem',
        "36": 9 * 1.6 + 'rem',
        "40": 10 * 1.6 + 'rem',
        "44": 11 * 1.6 + 'rem',
        "48": 12 * 1.6 + 'rem',
        "52": 13 * 1.6 + 'rem',
        "56": 14 * 1.6 + 'rem',
        "60": 15 * 1.6 + 'rem',
        "64": 16 * 1.6 + 'rem',
        "72": 18 * 1.6 + 'rem',
        "80": 20 * 1.6 + 'rem',
        "96": 24 * 1.6 + 'rem',
      },
      fontSize: {
        'xs': .75 * 1.6 + 'rem',
        'sm': .875 * 1.6 + 'rem',
        'tiny': .875 * 1.6 + 'rem',
        'base': 1 * 1.6 + 'rem',
        'lg': 1.125 * 1.6 + 'rem',
        'xl': 1.25 * 1.6 + 'rem',
        '2xl': 1.5 * 1.6 + 'rem',
        '3xl': 1.875 * 1.6 + 'rem',
        '4xl': 2.25 * 1.6 + 'rem',
        '5xl': 3 * 1.6 + 'rem',
        '6xl': 3.75 * 1.6 + 'rem',
        '7xl': 4.5 * 1.6 + 'rem',
      },
      borderRadius: {
        '2xl': 1 * 1.6 + 'rem',
      },
      lineHeight: {
        '5': 1.25 * 1.6 + 'rem',
        '6': 1.5 * 1.6 + 'rem',
        '9': 2.25 * 1.6 + 'rem',
        '11': 2.625 * 1.6 + 'rem',
        '12': 3.25 * 1.6 + 'rem',
        '13': 4.75 * 1.6 + 'rem'
      },
      aspectRatio: {
        '6/4': '6 / 4',
        'newsThumb': '392 / 218'
      },
      screens: {
        'header': '1065px',
        'headermd': '1250px',
      }
    },
    container: {
      center: true,
    },
    minHeight: {
      "72": 18 * 1.6 + 'rem',
      "80": 20 * 1.6 + 'rem',
      '96': 24 * 1.6 + 'rem',
      "cta": 32 * 1.6 + 'rem'
    },
    maxWidth: {
      '3/4': '80%',
    }
  },
  safelist: [
    'tw-grid-cols-2',
    'tw-grid-cols-3',
    'tw-grid-cols-4',
    'lg:tw-grid-cols-2',
    'lg:tw-grid-cols-3',
    'lg:tw-grid-cols-4',
    'tw-min-w-[150px]',
    'lg:tw-min-w-[160px]',
    'tw-w-max',
    'tw-pt-10',
    'tw-max-w-fit',
    'tw-max-w-min'

  ],
  plugins: [],
  prefix: 'tw-',
  corePlugins: {
    preflight: false,
  }
}