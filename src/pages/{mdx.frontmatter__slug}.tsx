import { graphql, navigate } from "gatsby";
import React, { useEffect, useState } from "react";
import { Card, Badge, Divider, Text, Flex, Heading, useColorMode, Tooltip, Center } from '@chakra-ui/react'
import styled from "styled-components";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import ILayout from "../components/ILayout";
import MDXLayout from "../components/MDXLayout";
import Comment from "../components/Comment";
import Seo from "../components/Seo";
import dayticon from '../images/dayticon.png';
import nightticon from '../images/nightticon.png';
import { ArrowRightIcon, ArrowLeftIcon } from '@chakra-ui/icons'
import Toc from "../components/Toc";
import useToc from "../hooks/useToc";

const Container = styled.div`
    padding: 5% 5% 5% 15%;
`
const ContentCard = styled(Card)`
    padding: 2em;
    display: block !important;
`
const NaviCard = styled(motion(Card))`
    width: 40%;
    padding: 20px 15px;
    display: grid !important;
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
    background-color: ${(props) => props.color === 'light' ? 'rgb(245, 102, 135)' : 'rgb(91, 94, 118)'};
    overflow: hidden;
    cursor: pointer;
`
const HomeIcon = styled(motion.div)`
    position: absolute;
    bottom: 0;
    width: 70px;
    height: 70px;
    background-image: ${(props) => props.color === 'light' ? `url(${dayticon})` : `url(${nightticon})`};
    background-size: cover;
`
const ITag = styled(Badge)`
    margin-bottom: 20px;
    cursor: pointer;
`
const NavButton = styled(motion.div)`
    max-height: 30px;
    display: flex;
    align-items: center;
    text-align: ${props => props.custom ? props.custom : 'left'};
    justify-content: ${props => props.custom ? 'right ': 'left'};
`

interface IBlogPostProps {
    data: Queries.BlogDetailQuery;
    children: any;   
}
const isBrowser = () => typeof document !== "undefined"

export default function Detail({data, children}:IBlogPostProps) {    
    const { scrollY } = useScroll();
    const [ floatBtn, setFloatBtn ] = useState(false);
    const { colorMode } = useColorMode()
    const { toc, tocItems } = useToc(data);

    useEffect(() => {
        scrollY.on('change', () => {
            if (scrollY.get() > 300) {
                setFloatBtn(true)
            } else {
                setFloatBtn(false);
            }
        })
    }, [scrollY]);

    const isComment = isBrowser() && document.querySelector('iframe.utterances-frame');
    if (isComment) {
        const utterancesTheme = colorMode === 'light' ? "github-light" : "photon-dark" ;
   
        (
            isBrowser() && document?.querySelector("iframe.utterances-frame")?.contentWindow.postMessage(
            { type: "set-theme", theme: utterancesTheme },
            "https://utteranc.es/"
          )
        )
    }

    const frontMatter = data.mdx?.frontmatter;
    const naviData = data.allMdx.edges.find(mdx => mdx.node.frontmatter?.slug === data.mdx?.frontmatter?.slug);

    return (
        <ILayout>
            <Container>
                <Center alignItems='normal'>
                    <div style={{ maxWidth: '1250px'}}>
                    <ContentCard>
                        <ITag colorScheme='pink'
                            onClick={()=> navigate(`/?category=${frontMatter?.category}`)}
                        >
                            {frontMatter?.category}
                        </ITag>
                        <Heading size='lg' marginBottom={5}>{frontMatter?.title}</Heading>
                        <Flex justify='space-between'>
                            <Text color='gray.500'>{frontMatter?.date}</Text>
                            <Text color='gray.500'>{frontMatter?.author} 👩🏻‍💻</Text>
                        </Flex>
                        <Divider marginY={7} color='gray.300' />
                        <MDXLayout>{children}</MDXLayout>
                        <Divider marginY={7} color='gray.300' />
                        <Comment/>
                    </ContentCard>
                    <Flex marginTop={10}>
                    {
                        naviData?.previous && 
                            <NaviCard
                                style={{marginRight:'auto'}}
                                onClick={() => navigate(`/${naviData.previous?.frontmatter?.slug}`)}
                            >
                                <NavButton whileHover={{x: [0, -10, 0], transition: {duration: .7}}}
                                >
                                    <ArrowLeftIcon color='pink.500' w='.5' marginRight={2}/>
                                    <Text maxWidth='60%' overflow='hidden' whiteSpace='nowrap' textOverflow='ellipsis' fontSize='sm'>{naviData.previous.frontmatter?.title}</Text>
                                </NavButton>
                            </NaviCard>
                    }
                    {
                        naviData?.next && 
                            <NaviCard
                                style={{marginLeft:'auto', textAlign:'end'}}
                                onClick={() => navigate(`/${naviData.next?.frontmatter?.slug}`)}
                            >
                                <NavButton custom='end' whileHover={{x: [0, 10, 0], transition: {duration: .7}}}>
                                    <Text maxWidth='60%' overflow='hidden' whiteSpace='nowrap' textOverflow='ellipsis' fontSize='sm'>{naviData.next.frontmatter?.title}</Text>
                                    <ArrowRightIcon color='pink.500' w='.5' marginLeft={2}/>
                                </NavButton>
                            </NaviCard>
                    }
                    </Flex>
                    </div>
                    {
                        tocItems && toc &&
                        <div style={{marginLeft: '30px', maxWidth: '200px', position: 'relative'}}>
                            <Toc items={tocItems} />
                        </div>
                    }
                </Center>
                <AnimatePresence>
                    {
                        floatBtn &&
                        <Tooltip hasArrow label='go home🤍' bg='pink.500'>
                             <IFloatButton
                                initial={{opacity:0}}
                                animate={{opacity:1, transition: {duration: .5}}}
                                exit = {{opacity:0,  transition: {duration: .5}}}
                                color={colorMode}
                                onClick={() => navigate('/')}
                            >
                                <HomeIcon color={colorMode} whileHover={{scale:1.2, transition: {duration: .5}}} />
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