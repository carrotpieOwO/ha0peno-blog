import type { GatsbyConfig } from "gatsby"
require("dotenv").config({ path: `.env` });

const config: GatsbyConfig = {
  siteMetadata: {
    title: `ha0peno blog`,
    siteUrl: `https://ha0peno-blog.netlify.app/`,
    description: `ha0peno 기술블로그`,
    author: `ha0peno`,
  },
  graphqlTypegen: true,
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    'gatsby-plugin-mdx',
    'gatsby-plugin-react-helmet',
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-styled-components`,
    {
      resolve: '@chakra-ui/gatsby-plugin',
      options: {
        resetCSS: true,
        isUsingColorMode: true,
        isBaseProvider: false,
      },
    },
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
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.nodes.map(blog => {
                return Object.assign({}, blog.frontmatter, {
                  description: blog.excerpt,
                  date: blog.frontmatter.date,
                  title: blog.frontmatter.title,
                  url: site.siteMetadata.siteUrl + blog.frontmatter.slug,
                  guid: site.siteMetadata.siteUrl + blog.frontmatter.slug,
                  custom_elements: [{ 'content:encoded': blog.body }],
                })
              })
            },
            query: `
              {
                allMdx(
                  sort: { frontmatter: {date: DESC} }
                ) {
                  nodes {
                    excerpt
                    body
                    frontmatter {
                      title
                      date
                      slug
                      category
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: "ha0peno's blog",
          },
        ],
      },
    },
  ],
}

export default config
