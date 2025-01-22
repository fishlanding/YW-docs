// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import '@theojs/lumen/theme'
import { HomeUnderline } from '@theojs/lumen'
import { DocVideoLink } from '@theojs/lumen'
import { DocBox, DocLinks, DocBoxCube } from '@theojs/lumen'
import mediumZoom from 'medium-zoom';
import { onMounted, watch, nextTick } from 'vue';
import { loadEnv, useData, useRoute } from 'vitepress';
import './style/index.css'
import ywcomponents from "./components/ywcomponents.vue"
import Linkcard from './components/Linkcard.vue'
import DataPanel from "./components/DataPanel.vue"
import { inBrowser } from 'vitepress'
import busuanzi from 'busuanzi.pure.js'
import ArticleMetadata from "./components/ArticleMetadata.vue"
import giscusTalk from 'vitepress-plugin-comment-with-giscus';
import theme from 'vitepress/theme'
import { NProgress } from 'nprogress-v2/dist/index.js'
import 'nprogress-v2/dist/index.css'
import MyLayout from './components/MyLayout.vue'
import backtotop from "./components/backtotop.vue"


export default {
  extends: DefaultTheme,
  Layout: MyLayout,
  enhanceApp: ({ app, router }) => {
    app.component('Home', HomeUnderline)
    app.component('Vid', DocVideoLink)
    app.component('Box', DocBox)
    app.component('Links', DocLinks)
    app.component('BoxCube', DocBoxCube)
    app.component('ywcomponents', ywcomponents)
    app.component('Linkcard', Linkcard)
    app.component('Datapanel', DataPanel)
    app.component('ArticleMetadata', ArticleMetadata)
    if (inBrowser) {
      router.onAfterRouteChange = () => {
        busuanzi.fetch()
      },
        NProgress.configure({ showSpinner: false })
      router.onBeforeRouteChange = () => {
        NProgress.start()
      }
      router.onAfterRouteChange = () => {
        busuanzi.fetch()
        NProgress.done()
      }
    }
  },
  setup() {
    const route = useRoute();
    const initZoom = () => {
      mediumZoom('.main img', { background: 'var(--vp-c-bg)' });
    };
    onMounted(() => {
      initZoom();
    });
    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    );
    const { frontmatter } = useData();
    giscusTalk({
      repo: 'YW-Chinese-Team/yw-docs-comment-section', //仓库
      repoId: 'R_kgDONf0EWg', //仓库ID
      category: 'Announcements', // 讨论分类
      categoryId: 'DIC_kwDONf0EWs4ClXWL', //讨论分类ID
      mapping: 'pathname',
      inputPosition: 'top',
      theme: 'preferred_color_scheme',
      loadEnv: "lazy",
      lang: 'zh-CN',
    },
      {
        frontmatter, route
      },
      true)
  }
} satisfies Theme
