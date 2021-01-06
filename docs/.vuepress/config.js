module.exports = {
    base: '/blog/',
    dest: 'dist',
    title: '青舟', 
    description: '青舟博客',
    head: [
        ['link', { rel: 'icon', href: '/egg.png' }],
    ],
    markdown: {
        lineNumbers: true
    },
    serviceWorker: true,
    themeConfig: {    
        logo: '/egg.png',
        lastUpdated: 'lastUpdate',
        nav: [
            { text: '博客汇总', link: '/study/prepare/' },
            { text: 'Github', link: 'https://github.com/qingzhou729/blog' },
        ],
        sidebar: {
            '/study/': [
                {
                    title: '准备工作',
                    collapsable: false,
                    children: [
                        ['prepare/', 'Introduction']
                    ],
                },
                {
                    title: 'React.js',
                    collapsable: false,
                    children: [
                        ['react/', 'Introduction'],
                        ['react/2', '介绍一下'],
                        
                    ],
                },
                {
                    title: 'Vue.js 2.x版本',
                    collapsable: false,
                    children: [
                        ['vue2/', 'Introduction'],
                        ['vue2/observer', '响应式原理'],
                    ],
                },
                {
                    title: 'webpack',
                    collapsable: false,
                    children: [
                        ['webpack/', 'Introduction'],
                        ['webpack/tapable', 'tapable'],
                        ['webpack/hmr', '热更新'],
                    ],
                },
                {
                    title: 'HTTP',
                    collapsable: false,
                    children: [
                        ['http/', 'Introduction'],
                        ['http/cache', '缓存'],
                    ],
                },
            ]
        }
    }
}