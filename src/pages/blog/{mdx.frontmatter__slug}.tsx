import { graphql, navigate } from "gatsby";
import React from "react";
import { Anchor, Card, Col, Divider, Row, Typography, Tag } from 'antd';
import styled from "styled-components";
import { motion } from "framer-motion";
import ILayout from "../../components/ILayout";
import MDXLayout from "../../components/MDXLayout";
import { LeftCircleTwoTone, RightCircleTwoTone } from "@ant-design/icons";
import Seo from "../../components/SEO";
const { Title, Text } = Typography;


const ContentCard = styled(Card)`
    margin-left: auto;
    margin-right: auto;
    width: 70%;
    padding: 3em;
`
const NaviCard = styled(Card)`
    width: 40%;
    cursor: pointer;
`
interface IBlogPostProps {
    data: Queries.BlogDetailQuery;
    children: any;   
}

export default function Detail({data, children}:IBlogPostProps) {
    const headings = Array.from(data.mdx?.tableOfContents?.items).map(item => (
        {
            key: item.url,
            title: item.title,
            href: `#${item.title.replace(/\W/g,'-')}`,
            children: item.items ? Array.from(item.items).map( child => (
                {
                    key: child.url,
                    href: `#${child.title.replace(/\W/g,'-')}`,
                    title: child.title,
                }
            )): []
        }
    ))
    const frontMatter = data.mdx?.frontmatter;
    const naviData = data.allMdx.edges.find(mdx => mdx.node.frontmatter?.slug === data.mdx?.frontmatter?.slug);

    return (
        <ILayout>
            <ContentCard>
                <Tag color="magenta" style={{marginBottom: '20px'}}>{frontMatter?.category}</Tag>
                <Title>{frontMatter?.title}</Title>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Text type="secondary">{frontMatter?.date}</Text>
                    <Text type="secondary">{frontMatter?.author} 👩🏻‍💻</Text>
                </div>
                <Divider/>
                <MDXLayout>{children}</MDXLayout>
            </ContentCard>
            {
                headings &&
                <Anchor items={headings} targetOffset={300} style={{position: 'fixed', top: 320, right: '10%'}}/>
            }
            <Row style={{padding: '5em 0', width: '70%', marginLeft:'auto', marginRight:'auto'}}>
                {
                    naviData?.previous && 
                        <NaviCard 
                            style={{marginRight:'auto'}}
                            onClick={() => navigate(`/blog/${naviData.previous?.frontmatter?.slug}`)}
                        >
                            <motion.div
                                whileHover={{x: [0, -10, 0], transition: {duration: .7}}}
                            >
                                <LeftCircleTwoTone twoToneColor="#eb2f96" style={{margin: '10px'}}/>
                                <Text strong>{naviData.previous.frontmatter?.title}</Text>
                            </motion.div>
                        </NaviCard>
                }
                {
                    naviData?.next && 
                        <NaviCard
                            style={{marginLeft:'auto'}}
                            onClick={() => navigate(`/blog/${naviData.next?.frontmatter?.slug}`)}
                        >
                            <motion.div style={{textAlign: 'end'}} 
                                whileHover={{x: [0, 10, 0], transition: {duration: .7}}}
                            >
                                <Text strong>{naviData.next.frontmatter?.title}</Text>
                                <RightCircleTwoTone twoToneColor="#eb2f96" style={{margin: '10px'}}/>
                            </motion.div>
                        </NaviCard>
                }
            </Row>
        </ILayout>
    )
}

export const query = graphql`
    query BlogDetail($frontmatter__slug:String) {
        mdx(frontmatter: {
            slug: {
                eq: $frontmatter__slug
            }
        }) {
            body
            frontmatter {
                author
                category
                date
                title
                slug
            }
            tableOfContents
        }
        allMdx(sort: {frontmatter: {date: ASC}}) {
            edges {
                previous {
                    frontmatter {
                        title
                        slug
                    }
                }
                node {
                    frontmatter {
                        slug
                    }
                }
                next {
                    frontmatter {
                        title
                        slug
                    }
                }
            }
        }
    }
`

export const Head = ({data} :IBlogPostProps) => <Seo title={data.mdx?.frontmatter?.title as string}/>