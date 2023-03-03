import React, { useEffect, useRef, useState } from "react"
import { Input, Button, InputRef } from 'antd';
import { SearchOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { motion } from "framer-motion";

const InputWrap = styled(motion.div)`
    transform-origin: right center;
    position: relative;
    right: 10px;
    width: calc(100% - 160px);
`

export default function Search() {
    const [ searchOpen, setSearchOpen ] = useState(false);
    const toggleSearch = () => {
        setSearchOpen(!searchOpen);
    }
    const searchRef = useRef<InputRef>(null);

    useEffect(() => {
        searchRef.current?.focus({
            cursor: 'start',
        });
    })

    return (
        <>
            <InputWrap animate={{ scaleX: searchOpen ? 1 : 0}}>
                <Input size="large" placeholder="내가 찾는게 있을까? 🤔" ref={searchRef}/>
            </InputWrap>
            <motion.div>
                <Button shape="circle" icon={<SearchOutlined />} onClick={toggleSearch}/>
            </motion.div>
        </>
    )
}