
import Vue from 'vue'
import Vuetify from 'vuetify/lib'
// import colors from 'vuetify/es5/util/colors'
import 'material-design-icons/iconfont/material-icons.css'


const themes = {
  one: {
    primary: '#2B7ECC',
    accent: '#6D8499',
    info: '#4FFFF7',
    secondary: '#FF9747',
    error: 'CC342B',
  }
}

Vue.use(Vuetify, {
  theme: themes.one,
})

// Vue.use(Vuetify, {
//   theme: {
//     primary: colors.blue.darken2,
//     accent: colors.grey.darken3,
//     secondary: colors.amber.darken3,
//     info: colors.teal.lighten1,
//     warning: colors.amber.base,
//     error: colors.deepOrange.accent4,
//     success: colors.green.accent3
//   }
// })
