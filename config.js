const config = {
  gatsby: {
    pathPrefix: '/',
    siteUrl: 'https://kind-clarke-92e677.netlify.app/',
    gaTrackingId: null,
    trailingSlash: false,
  },
  header: {
    logo:
      'https://res.cloudinary.com/cloudinary-training/image/upload/book/cloudinary_vertical_logo_for_black_bg.png',
    logoLink: 'https://kind-clarke-92e677.netlify.app/',
    title:
      "<a href='https://kind-clarke-92e677.netlify.app/'><img class='img-responsive' src='https://res.cloudinary.com/cloudinary-training/image/upload/book/learn.svg' alt='Learn logo' /></a>",
    githubUrl: 'https://github.com/rebeccapeltz/gatsby-book-test',
    helpUrl: '',
    tweetText: '',
    twitterLink: 'https://twitter.com/rebeccapeltz',
    linkedInLink: 'https://www.linkedin.com/in/rebeccapeltz/',
    linkedinImg: 'https://res.cloudinary.com/cloudinary-training/image/upload/book/linkedin.svg',
    twitterImg:
      'https://res.cloudinary.com/cloudinary-training/image/upload/book/twitter-brands-block.svg',
    social: null,

    links: [{ text: '', link: '' }],
    search: {
      enabled: false,
      indexName: '',
      algoliaAppId: process.env.GATSBY_ALGOLIA_APP_ID,
      algoliaSearchKey: process.env.GATSBY_ALGOLIA_SEARCH_KEY,
      algoliaAdminKey: process.env.ALGOLIA_ADMIN_KEY,
    },
  },
  sidebar: {
    forcedNavOrder: [
      '/introduction', // add trailing slash if enabled above
      '/setup',
      '/accesscontrol',
      '/generatingsignatures',
      '/autouploadfetch',
      '/overlay-underlay',
      '/variables',
      '/conditionals',
      '/videoplayer',
      '/adaptive-streaming',
      '/user-workflow',
      '/codeblock',
      '/videoplayertest',
      '/fund-transformations',
      '/fund-overlays-chained-transformations'
    ],
    collapsedNav: [
      '/codeblock', // add trailing slash if enabled above
      '/generatingsignatures',
      '/accesscontrol',
      '/autouploadfetch',
      '/overlay-underlay',
      '/variables',
      '/conditionals',
      '/user-workflow',
      '/videoplayer',
      '/setup',
      '/adaptive-streaming',
      '/fund-transformations',
      '/fund-overlays-chained-transformations'
    ],
    links: [
      {
        text: 'Cloudinary Advanced Concepts',
        link: 'https://cloudinary-training.github.io/cld-advanced-concepts',
      },
    ],
    frontline: false,
    ignoreIndex: true,
    title:
      "<a href='https://training.cloudinary.com/'>Cloudinary</a><div class='greenCircle'></div><a href='https://cloudinary-training.github.io/cld-advanced-concepts/'>Advanced Concepts</a>",
  },
  siteMetadata: {
    title: 'Gatsby Gitbook Cloudinary | Advanvced Concepts Fro Developers',
    description: 'Documentation built with mdx. ',
    ogImage: null,
    docsLocation: 'https://github.com/rebeccapeltz/gatsby-book-test/tree/master/content',
    favicon: 'https://res.cloudinary.com/cloudinary-training/image/upload/book/book-icon.jpg',
  },
  pwa: {
    enabled: false, // disabling this will also remove the existing service worker.
    manifest: {
      name: 'Gatsby Gitbook Starter',
      short_name: 'GitbookStarter',
      start_url: '/',
      background_color: '#6b37bf',
      theme_color: '#6b37bf',
      display: 'standalone',
      crossOrigin: 'use-credentials',
      icons: [
        {
          src: 'src/pwa-512.png',
          sizes: `512x512`,
          type: `image/png`,
        },
      ],
    },
  },
};

module.exports = config;
