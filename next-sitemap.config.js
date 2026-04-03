/** @type {import("next-sitemap").IConfig} */
module.exports = {
  siteUrl: "https://talentflux.ch",
  generateRobotsTxt: true,
  changefreq: "monthly",
  generateIndexSitemap: false,

  exclude: [
    "/admin",
    "/candidature/*",
  ],

  transform: async (config, path) => {
    const priorities = {
      "/":                    1.0,
      "/en":                  0.9,
      // Secteurs FR
      "/it":                  0.9,
      "/finance":             0.9,
      "/ingenierie":          0.9,
      "/paysagisme":          0.9,
      "/telecom":             0.9,
      "/pharma":              0.9,
      // Secteurs EN
      "/en/it":               0.85,
      "/en/finance":          0.85,
      "/en/ingenierie":       0.85,
      "/en/paysagisme":       0.85,
      "/en/telecom":          0.85,
      "/en/pharma":           0.85,
      // Légales
      "/contact":             0.5,
      "/privacy":             0.2,
      "/cgu":                 0.2,
    };

    // hreflang alternates pour les pages bilingues
    const frToEn = {
      "/it":         "/en/it",
      "/finance":    "/en/finance",
      "/ingenierie": "/en/ingenierie",
      "/paysagisme": "/en/paysagisme",
      "/telecom":    "/en/telecom",
      "/pharma":     "/en/pharma",
    };

    return {
      loc: path,
      changefreq: path === "/" ? "weekly" : config.changefreq,
      priority: priorities[path] ?? 0.6,
      lastmod: new Date().toISOString(),
      // Alternates hreflang pour les pages FR
      ...(frToEn[path] && {
        alternateRefs: [
          { href: `https://talentflux.ch${path}`, hreflang: "fr" },
          { href: `https://talentflux.ch${frToEn[path]}`, hreflang: "en" },
          { href: `https://talentflux.ch${path}`, hreflang: "x-default" },
        ],
      }),
    };
  },

  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/", disallow: ["/admin", "/admin/"] },
    ],
  },
};
