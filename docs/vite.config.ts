import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue';

// git历史
import {
  GitChangelog,
  GitChangelogMarkdownSection,
} from '@nolebase/vitepress-plugin-git-changelog/vite'

export default defineConfig({
  plugins: [
    vue(),  // Vue 插件确保加载
    GitChangelog({
      repoURL: () => 'https://github.com/fishlanding/YW-docs',
    }),
    GitChangelogMarkdownSection({
      exclude: (id) => id.endsWith('index.md'),
    }),
  ],
  optimizeDeps: {
    exclude: [
      '@nolebase/vitepress-plugin-git-changelog/client', 
      '@nolebase/markdown-it-bi-directional-links/client',
      'vitepress',
      '@nolebase/ui',
    ],
  },
  ssr: {
    noExternal: [
      '@nolebase/vitepress-plugin-git-changelog', 
      '@nolebase/markdown-it-bi-directional-links',
      '@nolebase/ui',
    ],
  },
})