import { Link } from "gatsby";
import React, { useEffect, useState } from "react";
import { ConfigProvider, Layout, theme } from 'antd';
import styled from "styled-components";
import { motion, useScroll, useAnimation } from "framer-motion";
import { createGlobalStyle } from "styled-components"
import dayticon from '../images/dayticon.png';
import nightticon from '../images/nightticon.png';
import { git } from '../utils/paths'
import Search from "./Search";
import ThemeSwitch from "./themeSwich";

const GlobalStyle = createGlobalStyle`
   * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Noto Sans KR", "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", "Nanum Gothic", Dotum, "돋움", Helvetica, sans-serif;
  }
  a {
    cursor: pointer;
  }
  
  #___gatsby,
  #gatsby-focus-wrapper,
  html,
  body {
    height: 100%;
  }
`

const { Content, Footer } = Layout;

const Nav = styled(motion.nav)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    width: 100vw;
    padding: 20px calc(100vw / 10);
    color: #fff;
    z-index: 99;
`
const Cover = styled(motion.div)`
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 300px;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: calc(100vw/10);
    color: #fff;
    position: relative;
    border-bottom: 1px solid black;
`
const MenuWrap = styled.div`
    display: flex;
    gap: 30px;
    align-items: center;
    font-weight: 700;
    font-size: 16px;
    color: #2c2828;
`
const ILink = styled(Link)`
    color: #2c2828;
    text-decoration: none;
`
const IFooter = styled(Footer)`
    display: flex;
    justify-content: space-between;
`
interface LayoutProps {
    children: any;
}

const themeCode = { day: true, night: false }

export default function ILayout({children} :LayoutProps) {
    const [ themeMode, setThemeMode ] = useState(themeCode.day);
    const { scrollY } = useScroll();
    const navAnimation = useAnimation();
    const themeConfig = {
        algorithm: themeMode ? theme.defaultAlgorithm : theme.darkAlgorithm,
        token: {colorPrimary: '#eb2f96', colorLinkHover: '#ffd6e7' }
    }

    useEffect(() => {
        scrollY.on('change', () => {
            if(scrollY.get() > 225) {
                navAnimation.start({
                    backgroundColor: 'rgba(245, 102, 135, 1)',
                    borderBottom: '1px solid black',
                })
            } else{
                navAnimation.start({
                    backgroundColor: 'rgba(255, 255, 255, 0)',
                    borderBottom: 'none'
                    
                })
            }
        })
    }, [scrollY]);

    return (
        <ConfigProvider theme={themeConfig}>
            <GlobalStyle/>
            <Layout>
                <Nav animate={navAnimation}>
                    <MenuWrap>
                        <ILink to="/">Home</ILink>
                        <ILink to="/blog">Blog</ILink>
                    </MenuWrap>
                    <MenuWrap>
                        <Search/>
                        <ThemeSwitch themeMode={themeMode} setThemeMode={setThemeMode}/>
                        <a href="https://github.com/carrotpieOwO" target="_blank">
                            <svg width={25} height={25} viewBox="0 0 496 512">
                                <path d={git}/>
                            </svg>
                        </a>
                    </MenuWrap>
                </Nav>
                <Cover animate={{backgroundColor: themeMode ? 'rgb(245, 102, 135)' : 'rgb(91, 94, 118)'}}>
                    ha0peno
                    <img src={themeMode ? dayticon : nightticon} width="250" alt="ha0peno" style={{position: 'absolute', bottom: 0}}/>
                </Cover>
                <Content style={{ padding: '5% 10%', minHeight: '100vh'}}>
                    {children}
                </Content>
                <IFooter>
                    <div style={{display: 'flex', gap: '20px'}}>
                        <a href="https://github.com/carrotpieOwO" target="_blank">gitHub</a>
                        <a href="https://ha0peno.vercel.app" target="_blank">portfolio</a>
                    </div>
                    © 2023 ha0peno 👋 Thanks for visiting!
                    <div></div>
                </IFooter>
            </Layout>
        </ConfigProvider>
    )
}