import React, { useEffect, useState } from "react";
import { graphql, HeadFC, PageProps } from "gatsby"
import ILayout from "../../components/ILayout"
import { Card, List } from 'antd';
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import styled from "styled-components";

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 9fr;
`

export default function Blog({data}: PageProps<Queries.BlogsQuery>) {
  const blogData = Array.from(data.allMdx.nodes).map(blog => ({
    title: blog.frontmatter?.title,
    thumbnail: blog.frontmatter?.thumbnail?.childImageSharp?.gatsbyImageData,
    description: blog.excerpt,
    href: `/blog/${blog.frontmatter?.slug}`,
    date: blog.frontmatter?.date,
    category: blog.frontmatter?.category
  }))

  const categories = ['all', ...Object.keys(Object.fromEntries(blogData.map(blog => [ blog.category, null])))];

  const [ category, setCategory ] = useState('all');
  const [ viewData, setViewData ] = useState([...blogData]);

  useEffect(() => {
    if(category !== 'all') {
        const filter = blogData.filter(blog => blog.category === category);
        setViewData(filter);
    } else {
        setViewData([...blogData])
    }

  }, [category])

  return (
    <ILayout>
        <Container>
        <ul>
            {
                categories.map(category => 
                    <li onClick={() => setCategory(category!)}>{category}</li>    
                )   
            }
        </ul>
        <Card >
            {category}({viewData.length})
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    align: 'center', 
                    pageSize: 10,
                }}
                dataSource = {viewData}
                renderItem={(item) => (
                    <List.Item
                        key={item.title}
                        extra={
                        <GatsbyImage image={getImage(item.thumbnail!)!} alt='test'/>
                        }
                    >
                        <div>{item.category}</div>
                        <List.Item.Meta
                          title={<a href={item.href}>{item.title}</a>}
                          description={item.description}
                          style={{margin: '30px 0'}}
                        />
                        <div>{item.date}</div>
                    </List.Item>
                    )}
            >
            </List>
        </Card>
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
                gatsbyImageData(width: 272)
            }
          }
        },
        body,
        excerpt(pruneLength:100)
      }
    }
   }
`
export const Head: HeadFC = () => <title>Home Page</title>