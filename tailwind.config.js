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
    }
  },
  variants: {},
  plugins: [
    require('tailwindcss-dark-mode')()
  ]
}
