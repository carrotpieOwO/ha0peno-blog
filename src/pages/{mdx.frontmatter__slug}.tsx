import { graphql, navigate } from "gatsby";
import React, { FunctionComponent, useEffect, useState } from "react";
import { Anchor, Card, Col, Divider, Row, Typography, Tag, Tooltip } from 'antd';
import styled from "styled-components";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import ILayout from "../components/ILayout";
import MDXLayout from "../components/MDXLayout";
import { LeftCircleTwoTone, RightCircleTwoTone } from "@ant-design/icons";
import Seo from "../components/Seo";
import { AnchorDefaultProps } from "antd/es/anchor/Anchor";
import dayticon from '../images/dayticon.png';
import nightticon from '../images/nightticon.png';
import { theme } from "antd";

const { Title, Text } = Typography;

const ContentCard = styled(Card)`
    margin-left: auto;
    margin-right: auto;
    width: 70%;
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

// antd anchor 컴포넌트 extends
interface AnchorDefaultProps {
    position: 'static' | 'relative' | 'absolute' | 'sticky' | 'fixed',
    top: number
}
const IAnchor: FunctionComponent<AnchorDefaultProps> = (props) => {
    return (
        <Anchor
            style={{position: props.position, top: `${props.top}%`, right: '10%'}}
            {...props}
        />
    )
}
interface IBlogPostProps {
    data: Queries.BlogDetailQuery;
    children: any;   
}

export default function Detail({data, children}:IBlogPostProps) {
    console.log('theme', theme)
    const { scrollY } = useScroll();
    const [ anchorPostion, setAnchorPosition ] = useState<AnchorDefaultProps>({position: 'absolute', top: 35});
    const [ floatBtn, setFloatBtn ] = useState(false);
    useEffect(() => {
        scrollY.on('change', () => {
            if (scrollY.get() > 300) {
                setAnchorPosition({position:'fixed', top: 10})
                setFloatBtn(true)
            } else {
                setAnchorPosition({position: 'absolute', top: 35})
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
            <Row>
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
                    <IAnchor items={headings} targetOffset={300} position={anchorPostion.position} top={anchorPostion.top}/>
                }
            </Row>
            <Row style={{padding: '5em 0', width: '70%', marginLeft:'auto', marginRight:'auto'}}>
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