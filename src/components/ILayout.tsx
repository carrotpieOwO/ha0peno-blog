import { navigate } from "gatsby";
import React, { useEffect } from "react";
import { ConfigProvider, Layout, theme, Row, Button } from 'antd';
import styled, { ThemeProvider } from "styled-components";
import { motion, useScroll, useAnimation } from "framer-motion";
import { createGlobalStyle } from "styled-components"
import dayticon from '../images/dayticon.png';
import nightticon from '../images/nightticon.png';
import ThemeSwitch from "./ThemeSwich";
import useTheme from "../hooks/useTheme";


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
    justify-content: end;
    align-items: center;
    position: fixed;
    width: 100vw;
    height: 60px;
    padding-right: 30px;
    gap: 15px;
    z-index: 99;
`
const GitBtn = styled(motion.a)`
    border-radius: 15px;
    padding: 8px 20px;
    border: 1px solid black;
    color: #000;
`
const Cover = styled(motion.div)`
    height: 250px;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: calc(100vw/10);
    color: #fff;
    position: relative;
    border-bottom: 1px solid black;
    overflow: hidden;
`
const HomeImg = styled(motion.img)`
    position: absolute;
    bottom: 0;
    width: 250px;
    cursor: pointer;
`
const IFooter = styled(Footer)`
    display: flex;
    justify-content: space-between;
`
const footerVariants = {
    animate: {
        rotate: [-15, 15], 
        transition: {
            repeat: Infinity, 
            repeatType: "reverse", 
            duration: 1
        }
    }
}
interface LayoutProps {
    children: any;
}

export type ThemeType = 'light' | 'dark';

export default function ILayout({children} :LayoutProps) {
    const { scrollY } = useScroll();
    const navAnimation = useAnimation();

    const { themeMode, themeToggler } = useTheme();

    const themeConfig = {
        algorithm: themeMode === 'light' ? theme.defaultAlgorithm : theme.darkAlgorithm,
        token: {colorPrimary: '#eb2f96', colorLinkHover: '#ffd6e7' }
    }

    useEffect(() => {
        scrollY.on('change', () => {
            if(scrollY.get() > 225) {
                navAnimation.start({
                    backgroundColor: 'rgba(255, 255, 255, .5)',
                    boxShadow: '0 2px 4px 0 rgba(0,0,0,.2)'
                })
            } else{
                navAnimation.start({
                    backgroundColor: 'rgba(255, 255, 255, 0)',
                    boxShadow: 'none'
                })
            }
        })
    }, [scrollY]);

    return (
        <ConfigProvider theme={themeConfig}>
            <GlobalStyle/>
            <Layout>
                <Nav animate = {navAnimation}>
                    <ThemeSwitch themeMode={themeMode} themeToggle={themeToggler}/>
                    <GitBtn 
                        href="https://github.com/carrotpieOwO" 
                        target="_blank"
                        whileHover={{backgroundColor: 'rgb(255, 255, 255)', color: '#000',}}
                    >
                        Git
                    </GitBtn>
                </Nav>
                <Cover animate={{backgroundColor: themeMode === 'light' ? 'rgb(245, 102, 135)' : 'rgb(91, 94, 118)'}}>
                    ha0peno
                    <HomeImg
                        src={themeMode === 'light' ? dayticon : nightticon} 
                        alt="ha0peno" 
                        whileHover={{scale: 1.2}}
                        onClick={() => navigate('/')}
                    />
                </Cover>
                <ThemeProvider theme={{themeMode}}>
                    <Content style={{ padding: '5% 10%', minHeight: '100vh'}}>
                        {children}
                    </Content>
                </ThemeProvider>
                <IFooter>
                    <div style={{display: 'flex', gap: '20px'}}>
                        <a href="https://github.com/carrotpieOwO" target="_blank">gitHub</a>
                        <a href="https://ha0peno.vercel.app" target="_blank">portfolio</a>
                    </div>
                    <div style={{display: 'flex', gap: '5px', alignItems:'center'}}>
                        © 2023 ha0peno 
                        <motion.div 
                            style={{fontSize: '20px'}}
                            variants={footerVariants}
                            animate="animate">
                                👋🏻
                        </motion.div> 
                        Thanks for visiting!
                    </div>
                    🔮 Built with Gatsby
                </IFooter>
            </Layout>
        </ConfigProvider>
    )
}