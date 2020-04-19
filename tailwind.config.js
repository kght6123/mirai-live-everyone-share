/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
module.exports = {
  theme: {
    minHeight: {
     '0': '0',
     '1/4': '25%',
     '1/2': '50%',
     '3/4': '75%',
     'full': '100%',
    },
    // fontSize: {
    //   'xs': '1vw',
    //   'sm': '2vw',
    //   'base': '3vw',
    //   'lg': '4vw',
    //   'xl': '5vw',
    //   '2xl': '6vw',
    //   '3xl': '7vw',
    //   '4xl': '8vw',
    //   '5xl': '9vw',
    //   '6xl': '10vw',
    //   '7xl': '11vw',
    // }
  },
  variants: {},
  plugins: [
    require('tailwindcss-dark-mode')()
  ]
}
