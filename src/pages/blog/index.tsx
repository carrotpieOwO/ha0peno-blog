import React, { useEffect, useState } from "react";
import { graphql, HeadFC, navigate, PageProps } from "gatsby"
import ILayout from "../../components/ILayout"
import { Card, List, Row, Col, Typography } from 'antd';
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import styled from "styled-components";
import Seo from "../../components/Seo";
import { FolderTwoTone } from "@ant-design/icons";

const { Title, Text } = Typography;

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
  const [ hover, setHover ] = useState('');

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
        <Row>
          <Col span={4}>
            <List>
                {
                  categories.map(category => 
                    <List.Item style={{borderBlockEnd:'none'}}>
                      <List.Item.Meta
                        avatar={<FolderTwoTone twoToneColor="#eb2f96" style={{marginRight:'10px'}}/>}
                        title={<a onClick={() => setCategory(category!)}>{category}</a>}
                      />
                    </List.Item> 
                  )   
                }
            </List>
          </Col>
          <Col span={20}>
            <Title>{category}({viewData.length})</Title>
            <Card >
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
                            style={{cursor: 'pointer'}}
                            onClick={() => navigate(item.href)}
                            onMouseOver={() => setHover(item.title as string)}
                            onMouseLeave={() => setHover('')}
                        >
                            <Text style={{color:'#eb2f96'}}>{item.category}</Text>
                            <List.Item.Meta
                              title={<Title level={3}>{item.title}</Title>}
                              description={
                                <Text type="secondary" underline={hover === item.title}>{item.description}</Text>
                              }
                              style={{margin: '30px 0'}}
                            />
                            <Text type="secondary">{item.date}</Text>
                        </List.Item>
                        )}
                >
                </List>
            </Card>
          </Col>
        </Row>
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
export const Head: HeadFC = () => <Seo title="ha0peno | blog"/>