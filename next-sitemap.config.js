/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://talentflux.ch',
  generateRobotsTxt: true,       // Génère aussi public/robots.txt
  sitemapSize: 50000,
  changefreq: 'monthly',
  priority: 0.7,
  generateIndexSitemap: false,

  // Exclure les pages qu'on ne veut pas indexer
  exclude: [
    '/admin',
    '/admin/*',
    '/candidature/*',            // Les formulaires ne doivent pas être indexés
  ],

  // Priorités personnalisées par page
  transform: async (config, path) => {
    const priorities = {
      '/':             1.0,
      '/it':           0.9,
      '/finance':      0.9,
      '/ingenierie':   0.9,
      '/paysagisme':   0.9,
      '/telecom':      0.9,
      '/pharma':       0.9,
      '/contact':      0.5,
      '/privacy':      0.2,
      '/cgu':          0.2,
    };

    return {
      loc: path,
      changefreq: path === "/" ? "weekly" : config.changefreq,
      priority: priorities[path] ?? config.priority,
      lastmod: new Date().toISOString(),
    };
  },

  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/"],
      },
    ],
    additionalSitemaps: [],
  },
};
