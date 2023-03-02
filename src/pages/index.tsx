import * as React from "react"
import { graphql, HeadFC, PageProps, navigate } from "gatsby"
import { Card, Space, Skeleton } from 'antd';
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { motion, useScroll, useAnimation } from "framer-motion";
import styled from "styled-components";
import ILayout from "../components/ILayout"
import Seo from "../components/Seo";
import defaultImage from '../images/defaultImage.png';

const { Meta } = Card;
const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 30px;
` 
const ICard = styled(motion(Card))`
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 3%), 0 1px 6px -1px rgb(0 0 0 / 2%), 0 2px 4px 0 rgb(0 0 0 / 2%);
  cursor: pointer;
  height: fit-content;
`
export default function IndexPage({data}: PageProps<Queries.BlogsQuery>) {
  return (
    <ILayout>
      <Container>
        {
          data.allMdx.nodes.map(blog => 
                      
            <ICard 
              key={blog.frontmatter?.slug}
              whileHover={{ scale: 1.1 }}
              onClick={() => navigate(`/blog/${blog.frontmatter?.slug}`)}
              cover={
                blog.frontmatter?.thumbnail ?
                <GatsbyImage 
                  image={getImage(blog.frontmatter?.thumbnail?.childImageSharp?.gatsbyImageData!)!} 
                  alt='test' 
                  style={{height:'270px'}}/>
                :
                <img src={defaultImage} alt="defaultImage"  style={{height:'270px'}}/>
              }
            >
              <div style={{marginBottom: '1em'}}>{blog.frontmatter?.category}</div>
              <Meta title={blog.frontmatter?.title} description={blog.excerpt}/>
              <div style={{marginTop: '2em'}}>{blog.frontmatter?.date}</div>
            </ICard>
          )
        }
      </Container>
    </ILayout>
  )
}

export const query = graphql`
   query Blogs {
    allMdx(sort: {frontmatter: {date: ASC}}) {
      nodes {
        frontmatter {
          category,
          slug,
          date,
          title,
          thumbnail {
            childImageSharp {
                gatsbyImageData(height: 300)
            }
          }
        },
        body,
        excerpt(pruneLength:100)
      }
    }
   }
`
export const Head: HeadFC = () => <Seo title="ha0peno | home"/>
