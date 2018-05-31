module.exports = {
  base: '/',
  title: '微信小程序入门教程',
  description: '一份伪官方文档',
  port: 8080,
  themeConfig: {
    repo: 'lipengzhou/miniprogram-tutorial',
    lastUpdated: '上次更新',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: '在 GitHub 上编辑此页',
    nav: [
      { text: '基础', link: '/guide/' },
      { text: 'Wepy', link: '/wepy/' }
    ],
    sidebar: {
      '/guide/': [
        'introduction',
        'getting-started',
        'structure-config',
        'component',
        'wxss.md',
        'app-service',
        'wxml-syntax',
        'api',
        'framework'
      ]
    },
    sidebarDepth: 2
  }
}
