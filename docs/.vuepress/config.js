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
            { text: '首页', link: '/' },
            { text: 'Github', link: 'https://github.com/qingzhou729/blog' },
        ],
        sidebar: {
            '/pages/react/':[
                {
                    title: 'react',
                    collapsable: false,
                    sidebarDepth: 1,
                    children: [
                        ['test1.md', '子菜单1'],
                    ]
                },
                {
                    title: '测试菜单2',
                    collapsable: false,
                    children: [
                        ['test2.md', '子菜单1']
                    ]
                }
            ],
            '/pages/vue/':[
                {
                    title: 'vue',
                    collapsable: false,
                    sidebarDepth: 1,
                    children: [
                        ['test1.md', '子菜单1'],
                    ]
                },
                {
                    title: '测试菜单2',
                    collapsable: false,
                    children: [
                        ['test2.md', '子菜单1']
                    ]
                }
            ],
        }
    }
}