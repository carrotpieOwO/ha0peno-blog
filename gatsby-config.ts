import type { GatsbyConfig } from "gatsby"
require("dotenv").config({ path: `.env` });

const config: GatsbyConfig = {
  siteMetadata: {
    title: `ha0peno blog`,
    siteUrl: `https://ha0peno-blog.netlify.app/`,
    description: `ha0peno 기술블로그`,
    author: `ha0peno`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    'gatsby-plugin-mdx',
    'gatsby-plugin-react-helmet',
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/blog-posts`,
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/favicon.png',
      },
    },
    {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        trackingIds: [process.env.GATSBY_TRACKING_ID],
        pluginconfig: {
          head: true,
          respectDNT: true,
        }
      }
    },
  ],
}

export default config
