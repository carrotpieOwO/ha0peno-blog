import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from 'prism-react-renderer/themes/dracula'; // 테마는 github 외에도 많다

import { MDXProvider } from "@mdx-js/react";
import { Divider, Typography, Card } from 'antd';
import styled from "styled-components";

const { Title, Paragraph, Text, Link } = Typography;

const Circle = styled.div`
    width: 20px;
    height: 20px;
    background-color: ${props => props.color};
    border-radius: 10px;
`;

const CodeBlockHeader = () => {
    return (
        <div style={{display: 'flex', gap: '10px'}}>
            <Circle color={'#FF5F56'}/>
            <Circle color={'#FFBD2E'}/>
            <Circle color={'#27C93F'}/>
        </div>
    )
}

// codeblock 컴포넌트
const CodeBlock = ({ children }:any) => {
    const className = children.props.className || '';
    const matches = className.match(/language-(?<lang>.*)/);
    const language = matches?.groups?.lang ?? '';
  
    return (
        <Highlight
            {...defaultProps}
            code={children.props.children.trim()}
            language={language}
            theme={theme}
        >
            {({ className, tokens, getLineProps, getTokenProps }) => (
                <div>
               
                <Card extra={<CodeBlockHeader/>} style={{background:'#1f1f1f'}}>
                    <pre className={className}>
                        {tokens.map((line, i) => (
                            <div {...getLineProps({ line, key: i })}>
                                {line.map((token, key) => (
                                <span {...getTokenProps({ token, key })} />
                                ))}
                            </div>
                        ))}
                    </pre>
                </Card>
                </div>
            )}
        </Highlight>
    );
};

interface HeadingProps {
    children: any
    level: 1 | 2 | 3 | 4 | 5 | undefined
}

// 목차생성을 위한 id 부여
const Heading = ({ children, level }: HeadingProps) => {
    return (
        <Title id={children.replace(/\W/g,'-')} level={level}>{children}</Title>
    )
}

  

export default function MDXLayout({children} :any) {
    return (
        <MDXProvider
            components={{
                h1: (props:any) => Heading({...props, level:1}),
                h2: (props:any) => Heading({...props, level:2}),
                h3: (props:any) => <Title level={3} {...props}></Title>,
                h4: (props:any) => <Title level={4} {...props}></Title>,
                h5: (props:any) => <Title level={5} {...props}></Title>,
                h6: (props:any) => <Title level={6} {...props}></Title>,
                hr: (props:any) => <Divider/>,
                blockquote: (props:any) => <Paragraph><blockquote {...props}></blockquote></Paragraph>,
                ul: (props:any) => <Paragraph><ul {...props}></ul></Paragraph>,
                code: (props:any) => <Text code {...props}></Text>,
                pre:  (props:any) => CodeBlock(props)
            }}
        >
            {children}
        </MDXProvider>
    )
}