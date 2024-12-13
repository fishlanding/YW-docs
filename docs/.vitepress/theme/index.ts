// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import '@theojs/lumen/theme'
import { HomeUnderline } from '@theojs/lumen'
import { DocVideoLink } from '@theojs/lumen'
import { DocBox, DocLinks, DocBoxCube } from '@theojs/lumen'

export default {
  extends: DefaultTheme,
  enhanceApp: ({ app }) => {
    app.component('Home', HomeUnderline)
    app.component('Vid', DocVideoLink)
    app.component('Box', DocBox)
    app.component('Links', DocLinks)
    app.component('BoxCube', DocBoxCube)
  },
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  // ...

} satisfies Theme
