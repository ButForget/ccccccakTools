import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import { md3, md1 } from 'vuetify/blueprints'
// import { aliases, mdi } from 'vuetify/iconsets/mdi'

export default createVuetify({
 blueprint: md3,
 icons: {
    defaultSet: 'mdi',
 }
})