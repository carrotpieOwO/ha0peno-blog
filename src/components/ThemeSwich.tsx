import React from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { moon, sun } from '../utils/paths'
import { ThemeType } from "./ILayout";

const MoonPath = styled(motion.path)``
const SunPath = styled(motion.path)``

interface ThemeSwitchProps {
    themeMode: ThemeType,
    themeToggle: () => void
}

export default function ThemeSwitch({themeMode, themeToggle}: ThemeSwitchProps) {
    return (
    <motion.svg width={25} height={25} viewBox="0 0 496 512" 
        onClick={() => themeToggle()} 
        style={{cursor:'pointer'}}
        whileHover={{scale: 1.2}}
    >
            <AnimatePresence>
                {
                    themeMode === 'light' ? 
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
        </motion.svg>
    )
}