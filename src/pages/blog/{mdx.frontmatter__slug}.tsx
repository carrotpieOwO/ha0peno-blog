import { graphql } from "gatsby";
import React from "react";
import { Anchor, Card, Row } from 'antd';
import styled from "styled-components";
import ILayout from "../../components/ILayout";
import MDXLayout from "../../components/MDXLayout";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";


const ICard = styled(Card)`
    margin-left: auto;
    margin-right: auto;
    width: 70%;
    padding: 3em;
`

interface IBlogPostProps {
    data: Queries.BlogDetailQuery;
    children: any;   
}

export default function Detail({data, children}:IBlogPostProps) {
    // const anchor = data.mdx?.tableOfContents as any;
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
            <ICard>
                <h1>{frontMatter?.title}</h1>
                <h2>{frontMatter?.date}</h2>
                <MDXLayout>{children}</MDXLayout>
            </ICard>
            {
                headings &&
                <Anchor items={headings} targetOffset={300} style={{position: 'fixed', top: 320, right: '10%'}}/>
            }
            <Row style={{padding: '5em 0', width: '70%', marginLeft:'auto', marginRight:'auto'}}>
                {
                    naviData?.previous && 
                        <Card style={{marginRight:'auto'}}>
                            <LeftCircleOutlined />
                            {naviData.previous.frontmatter?.title}
                        </Card>
                }
                {
                    naviData?.next && 
                        <Card style={{marginLeft:'auto', textAlign:'end'}}>
                            {naviData.next.frontmatter?.title}
                            <RightCircleOutlined />
                        </Card>
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