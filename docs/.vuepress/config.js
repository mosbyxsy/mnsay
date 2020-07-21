const createSidebar = require('./lib/createSidebar');

module.exports = {
    title: '码农说道',
    description: '码农说道(mnsay)',
    plugins: [
        '@vuepress/back-to-top'
    ],
    configureWebpack: {
        //webpack配置
    },
    //base: '/blog/', //基础路径，部署在非根路径下使用
    markdown: {
        lineNumbers: true //显示行号
    },
    // theme: '@vuepress/theme-default', //主题
    themeConfig: {
        nav: [ //导航栏
            { text: '首页', link: '/' },
            { text: '目录', link: '/catalog' },
            { text: '基础', link: '/base/' },
            { text: '框架', link: '/framework/' },
            { text: '随笔', link: '/informal/' },
            {
                text: '更多',
                items: [
                    { text: '关于我', link: '/about' },
                    { text: '友情链接', link: '/link' },
                    { text: '知识导航', link: '/bookmark' },
                    { text: 'Github', link: 'https://github.com/mosbyxsy/' }
                ]
            }
        ],
        sidebar: { //侧边栏
            '/base/': createSidebar('base'),
            '/framework/': createSidebar('framework'),
            '/informal/': createSidebar('informal')
        },
        lastUpdated: 'Last Updated',
        nextLinks: true, //下一页
        prevLinks: true, //上一页
        smoothScroll: true, //页面滚动
    },
}