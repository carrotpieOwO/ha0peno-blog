import React, { useEffect, useState } from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from 'prism-react-renderer/themes/dracula'; 
import { MDXProvider } from "@mdx-js/react";
import { Heading, Text, Divider, Kbd, Link, useColorMode, Image, ListItem, Code, UnorderedList, OrderedList } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'

import styled from "styled-components";

const Blockquote = styled.blockquote`
    padding-inline: 1em !important;
    padding-block: 1em !important;
    border-inline-start: 5px solid pink !important;
    background: rgba(254, 215, 226, .3);
    margin: 20px;
`
const Circle = styled.div`
    width: 16px;
    height: 16px;
    background-color: ${props => props.color};
    border-radius: 8px;
`
const CodeBlockHeader = () => {
    return (
        <div style={{display: 'flex', gap: '10px', marginBottom: '24px'}}>
            <Circle color={'#FF5F56'}/>
            <Circle color={'#FFBD2E'}/>
            <Circle color={'#27C93F'}/>
        </div>
    )
}
const CodeBlockContainer = styled.div`
    margin: 2em;
    background-color: #2c2c2c;
    border: 1px solid #2a2a2a;
    border-radius: 8px;
    padding: 24px;
    overflow: scroll;
    width: 80%;
    margin-left: auto;
    margin-right: auto;
`
// codeblock 컴포넌트
const CodeBlock = ({ children }:any) => {
    const className = children.props.className || '';
    const matches = className.match(/language-(?<lang>.*)/);
    const language = matches?.groups?.lang ?? '';
    const { props: { children: source } } = children

    console.log('source', source)
    return (
        <Highlight
            {...defaultProps}
            code={source}
            language={language}
            theme={theme}
        >
            {({ className, tokens, getLineProps, getTokenProps }) => (
                <CodeBlockContainer>
                    <CodeBlockHeader/>
                    <pre className={className}>
                        {tokens.map((line, i) => (
                            <Code display='block' {...getLineProps({ line, key: i })}>
                                {line.map((token, key) => (
                                <span {...getTokenProps({ token, key })} />
                                ))}
                            </Code>
                        ))}
                    </pre>
                </CodeBlockContainer>
            )}
        </Highlight>
    );
};

interface HeadingProps {
    children: any
    as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | undefined
}

// 목차생성을 위한 id 부여
const IHeading = ({ children, as }: HeadingProps) => {
    // 문자열에서 알파벳, 숫자, 한글 문자를 제외한 모든 문자를 하이픈('-')으로 대체하여 id값 부여
    return (
        <Heading id={children.replace(/[^\w\uAC00-\uD7AF]/g, '-')} as={as} padding='2em 0 .5em .5em'>
            {children}
        </Heading>
    )
}

export default function MDXLayout({children} :any) {
    return (
        <MDXProvider
            components={{
                h1: (props:any) => IHeading({...props, as: 'h1'}),
                h2: (props:any) => IHeading({...props, as: 'h2'}),
                h3: (props:any) => IHeading({...props, as: 'h3'}),
                h4: (props:any) => <Heading level='h4' {...props}></Heading>,
                h5: (props:any) => <Heading level='h5' {...props}></Heading>,
                h6: (props:any) => <Heading level='h6' {...props}></Heading>,
                hr: (props:any) => <Divider/>,
                blockquote: (props:any) => <Blockquote {...props} />,
                ul: (props:any) => <UnorderedList paddingLeft='5' {...props}></UnorderedList>,
                ol: (props:any) => <OrderedList paddingLeft='5' {...props}></OrderedList>,
                li: (props:any) => <ListItem {...props}></ListItem>,
                code: (props:any) => <Kbd code {...props} />,
                pre:  (props:any) => CodeBlock(props),
                img: (props:any) => <Image boxSize='70%' margin='3em auto' {...props}/>,
                p: (props:any) => <Text marginLeft={5} {...props} />,
                a: (props:any) => <><Link {...props} isExternal color='purple.500' /><ExternalLinkIcon mx='2px' /></>
            }}
        >
            {children}
        </MDXProvider>
    )
}