import React, { ChangeEvent, ChangeEventHandler, FormEvent, KeyboardEventHandler, useEffect, useRef, useState } from "react"
import { Input, Button, InputRef, Form } from 'antd';
import { SearchOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { motion } from "framer-motion";

const InputWrap = styled(motion.div)`
    transform-origin: right center;
    position: relative;
    right: 10px;
    width: calc(100% - 160px);
`

interface searchProps {
    search: string;
    setSearch: (s:string) => void;
}

export default function Search({search, setSearch}: searchProps) {
    const [ searchOpen, setSearchOpen ] = useState(false);
    const [ searchInput, setSearchInput ] = useState('')
    
    const toggleSearch = () => {
        setSearchOpen(!searchOpen);
    }
    const searchRef = useRef<InputRef>(null);

    useEffect(() => {
        searchRef.current?.focus({
            cursor: 'end',
        });
        setSearchInput('');
        setSearch('');
    }, [searchOpen])

    const onChange = (e: ChangeEvent) => {
        setSearchInput(e.target.value)
        setSearch(e.target.value)
    }

    return (
        <>
            <InputWrap initial={{scaleX: 0}} animate={{ scaleX: searchOpen ? 1 : 0}}>
                
                <Input
                    size="large" 
                    placeholder="내가 찾는게 있을까? 🤔" 
                    ref = {searchRef}
                    onChange={onChange}
                    value={searchInput}
                    allowClear
                />
            </InputWrap>
            <motion.div>
                <Button shape="circle" icon={<SearchOutlined />} onClick={toggleSearch}/>
            </motion.div>
        </>
    )
}