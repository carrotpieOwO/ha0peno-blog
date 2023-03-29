import { navigate } from "gatsby";
import React, { useEffect } from "react";
import styled  from "styled-components";
import { motion, useScroll, useAnimation } from "framer-motion";
import dayticon from '../images/dayticon.png';
import nightticon from '../images/nightticon.png';
import ThemeSwitch from "./ThemeSwich";
import theme from "../theme/theme"
import { ChakraProvider, ColorModeScript, useColorMode, Button, Flex, Link } from '@chakra-ui/react'

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
    background-color: ${props => props.theme.themeMode === 'light' ? 'rgb(245, 102, 135)' : 'rgb(91, 94, 118)'};
`
const HomeImg = styled(motion.img)`
    position: absolute;
    bottom: 0;
    width: 250px;
    cursor: pointer;
`
const IFooter = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 25px 50px;
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

  
    const { colorMode, toggleColorMode } = useColorMode()

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
        <>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <ChakraProvider theme={theme}>
                <Nav animate = {navAnimation}>
                    <ThemeSwitch themeMode={colorMode} themeToggle={toggleColorMode}/>
                    <Button variant='outline' colorScheme='white' size='sm' onClick={() => navigate("https://github.com/carrotpieOwO" )}>
                        Git
                    </Button>
                </Nav>
                <Cover animate={{backgroundColor: colorMode === 'light' ? 'rgb(245, 102, 135)' : 'rgb(91, 94, 118)'}}>
                    ha0peno
                    <HomeImg
                        src={colorMode === 'light' ? dayticon : nightticon} 
                        alt="home" 
                        whileHover={{scale: 1.2}}
                        onClick={() => navigate('/')}
                    />
                </Cover>
                <motion.div style={{backgroundColor: colorMode === 'light' ? 'rgb(245, 245, 245)' : 'rgb(0, 0, 0)'}}>
                    <div style={{ minHeight: '100vh'}}>
                        {children}
                    </div>
                    <IFooter>
                        <Flex gap={3}>
                            <Link href="https://github.com/carrotpieOwO" target="_blank">gitHub</Link>
                            <Link href="https://ha0peno.netlify.app/" target="_blank">portfolio</Link>
                        </Flex>
                        <Flex>
                            © 2023 ha0peno 
                            <motion.div 
                                style={{fontSize: '20px'}}
                                variants={footerVariants}
                                animate="animate">
                                    👋🏻
                            </motion.div> 
                            Thanks for visiting!
                        </Flex>
                        🔮 Built with Gatsby
                    </IFooter>
                </motion.div>
            </ChakraProvider>
        </>
    )
}