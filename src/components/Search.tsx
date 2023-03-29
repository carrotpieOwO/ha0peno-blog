import React, { ChangeEvent, useEffect, useRef, useState } from "react"
import styled from "styled-components";
import { motion } from "framer-motion";
import { Input, IconButton } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'

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
    const searchRef = useRef(null);

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
                    size="md" 
                    variant='outline'
                    placeholder="내가 찾는게 있을까? 🤔" 
                    focusBorderColor='pink.500'
                    ref = {searchRef}
                    onChange={onChange}
                    value={searchInput}
                />
            </InputWrap>
            <motion.div>
                <IconButton aria-label='Search database' icon={<SearchIcon />} onClick={toggleSearch} 
                    colorScheme='pink' size='sm'
                />
            </motion.div>
        </>
    )
}