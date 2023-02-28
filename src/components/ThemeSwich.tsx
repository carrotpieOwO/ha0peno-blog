import React from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { moon, sun } from '../utils/paths'

const MoonPath = styled(motion.path)``
const SunPath = styled(motion.path)``

interface ThemeSwitchProps {
    themeMode: boolean,
    setThemeMode: (b:boolean) => void
}

export default function ThemeSwitch({themeMode, setThemeMode}: ThemeSwitchProps) {
    return (
    <svg width={25} height={25} viewBox="0 0 496 512" onClick={() => setThemeMode(!themeMode)} style={{cursor:'pointer'}}>
            <AnimatePresence>
                {
                    themeMode ? 
                    <MoonPath 
                        initial={{ opacity: .5 }}
                        animate={{ opacity: 1, rotate: [ 30, 0 ], transition: {duration: 1}}}
                        exit={{ opacity: 0, rotate: 0,}}
                        fill="#8800FF
                        "
                        d={moon}/>
                :
                    <SunPath 
                        initial={{ opacity: .5 }}
                        animate={{ opacity: 1, rotate: 30, transition: {duration: 1}}}
                        exit={{ opacity: 0 }}
                        fill="#FDD963"
                        d={sun}/>
                }
            </AnimatePresence>
        </svg>
    )
}