import { graphql, navigate } from "gatsby";
import React, { useEffect, useRef, useState } from "react";
import { Anchor, Card, Divider, Row, Typography, Tag, Tooltip } from 'antd';
import styled from "styled-components";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import ILayout from "../components/ILayout";
import MDXLayout from "../components/MDXLayout";
import Comment from "../components/Comment";
import { LeftCircleTwoTone, RightCircleTwoTone } from "@ant-design/icons";
import Seo from "../components/Seo";
import dayticon from '../images/dayticon.png';
import nightticon from '../images/nightticon.png';

const { Title, Text } = Typography;

const Container = styled.div`
    padding: 5% 5% 5% 15%;
`
const ContentCard = styled(Card)`
    width: 80%;
    padding: 2em;
`
const NaviCard = styled(Card)`
    width: 40%;
    cursor: pointer;
`
const IFloatButton = styled(motion.div)`
    box-shadow: 0 6px 16px 0 rgb(0 0 0 / 8%), 0 3px 6px -4px rgb(0 0 0 / 12%), 0 9px 28px 8px rgb(0 0 0 / 5%);
    width: 70px;
    height: 70px;
    border-radius: 50%;
    position: fixed;
    bottom: 5%;
    left: 5%;
    background-color: ${(props) => props.theme.themeMode === 'light' ? 'rgb(245, 102, 135)' : 'rgb(91, 94, 118)'};
    overflow: hidden;
    cursor: pointer;
`
const HomeIcon = styled(motion.div)`
    position: absolute;
    bottom: 0;
    width: 70px;
    height: 70px;
    background-image: ${(props) => props.theme.themeMode === 'light' ? `url(${dayticon})` : `url(${nightticon})`};
    background-size: cover;
`
const ITag = styled(Tag)`
    margin-bottom: 20px;
    cursor: pointer;
`

interface IBlogPostProps {
    data: Queries.BlogDetailQuery;
    children: any;   
}
const isBrowser = () => typeof window !== "undefined"

export default function Detail({data, children}:IBlogPostProps) {    
    const { scrollY } = useScroll();
    const [ floatBtn, setFloatBtn ] = useState(false);
    const [ anchor, setAnchor ] = useState(true);

    const handleResize = () => {
        setAnchor(isBrowser() && window.innerWidth >= 1210)
    }

    useEffect(() => {
        isBrowser() && window.addEventListener('resize', handleResize)
        return () => {
            isBrowser() &&  window.removeEventListener('resize', handleResize)
        }
    }, [])

    useEffect(() => {
        scrollY.on('change', () => {
            if (scrollY.get() > 300) {
                setFloatBtn(true)
            } else {
                setFloatBtn(false);
            }
        })
    }, [scrollY]);

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
            <Container>
                <Row>
                    <ContentCard actions = {[<Comment/>]}>
                        <ITag color="magenta"
                            onClick={()=> navigate(`/?category=${frontMatter?.category}`)}
                        >
                            {frontMatter?.category}
                        </ITag>
                        <Title>{frontMatter?.title}</Title>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <Text type="secondary">{frontMatter?.date}</Text>
                            <Text type="secondary">{frontMatter?.author} 👩🏻‍💻</Text>
                        </div>
                        <Divider/>
                        <MDXLayout>{children}</MDXLayout>
                    </ContentCard>
                    {
                        headings && anchor &&
                        <div style={{marginLeft: 'auto', maxWidth: '200px'}}>
                            <Anchor style={{marginTop: '200px'}} items={headings} targetOffset={300} />
                        </div>
                    }
                </Row>
                <Row style={{padding: '3em 0', width: '80%', margin: 0}}>
                    {
                        naviData?.previous && 
                            <NaviCard 
                                style={{marginRight:'auto'}}
                                onClick={() => navigate(`/${naviData.previous?.frontmatter?.slug}`)}
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
                                onClick={() => navigate(`/${naviData.next?.frontmatter?.slug}`)}
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
                <AnimatePresence>
                    {
                        floatBtn &&
                        <Tooltip title="go home🤍" color='pink'>
                            <IFloatButton
                                initial={{opacity:0}}
                                animate={{opacity:1, transition: {duration: .5}}}
                                exit = {{opacity:0,  transition: {duration: .5}}}
                                onClick={() => navigate('/')}
                            >
                                <HomeIcon whileHover={{scale:1.2, transition: {duration: .5}}} />
                            </IFloatButton>
                    </Tooltip>
                    }
                </AnimatePresence>
            </Container>
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