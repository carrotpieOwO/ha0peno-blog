import React, { useState } from "react"
import { Input } from 'antd';
import { SearchOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { motion } from "framer-motion";

const InputWrap = styled(motion.div)`
    transform-origin: right center;
    position: relative;
    right: -50px;
`

export default function Search() {
    const [ searchOpen, setSearchOpen ] = useState(false);
    const toggleSearch = () => setSearchOpen(!searchOpen);

    return (
        <>
            <InputWrap animate={{ scaleX: searchOpen ? 1 : 0}}>
                <Input placeholder="input search text"/>
            </InputWrap>
            <motion.div animate={{x: searchOpen ? -190 : 0}}>
                <SearchOutlined onClick={toggleSearch} style={{color:'#fff'}}/>
            </motion.div>
        </>
    )
}