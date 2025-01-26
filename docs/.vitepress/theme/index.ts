// https://vitepress.dev/guide/custom-theme
import { h } from 'vue';
import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import mediumZoom from 'medium-zoom';
import { onMounted, watch, nextTick } from 'vue';
import { useData, useRoute } from 'vitepress';

// giscus评论
import giscusTalk from 'vitepress-plugin-comment-with-giscus';
// 进度条
import { NProgress } from 'nprogress-v2/dist/index.js';
import 'nprogress-v2/dist/index.css';

import './style.css';
import './style/index.css';


// 自定义全局组件
import ywcomponents from './components/ywcomponents.vue';
import Linkcard from './components/Linkcard.vue';
import ArticleMetadata from './components/ArticleMetadata.vue';
import HomeUnderline from './components/HomeUnderline.vue';
import xgplayer from './components/xgplayer.vue';
import MyLayout from './components/MyLayout.vue';
import backtotop from './components/backtotop.vue';
import confetti from "./components/confetti.vue"


// 不蒜子
import { inBrowser } from 'vitepress'
import busuanzi from 'busuanzi.pure.js'

// 评论区
const GISCUS_CONFIG = {
  repo: 'YW-Chinese-Team/yw-docs-comment-section', // Repository
  repoId: 'R_kgDONf0EWg', // Repository ID
  category: 'Announcements', // Discussion category
  categoryId: 'DIC_kwDONf0EWs4ClXWL', // Discussion category ID
  mapping: 'pathname',
  inputPosition: 'top',
  theme: 'preferred_color_scheme',
  loadEnv: 'lazy',
  lang: 'zh-CN',
};
const setupGiscus = (frontmatter, route) => {
  giscusTalk(GISCUS_CONFIG, { frontmatter, route }, true);
};

// 图片放大
const initZoom = () => {
  mediumZoom('.main img', { background: 'var(--vp-c-bg)' });
};


export default {
  extends: DefaultTheme,
  Layout: MyLayout,
  enhanceApp: ({ app, router }) => {
    // Register global components
    app.component('ywcomponents', ywcomponents);
    app.component('Linkcard', Linkcard);
    app.component('ArticleMetadata', ArticleMetadata);
    app.component('HomeUnderline', HomeUnderline);
    app.component('xgplayer', xgplayer);
    app.component('confetti' , confetti);

    // 不蒜子
    if (inBrowser) {
      NProgress.configure({ showSpinner: false })
      router.onBeforeRouteChange = () => {
        NProgress.start() // 开始进度条
      }
      router.onAfterRouteChange = () => {
         busuanzi.fetch()
         NProgress.done() // 停止进度条
       }
    }
  },
  setup() {
    const route = useRoute();
    const { frontmatter } = useData();

    // Initialize medium-zoom on mount and route change
    onMounted(() => {
      initZoom();
    });

    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    );

    // giscus评论区
    setupGiscus(frontmatter, route);
  },
} satisfies Theme;