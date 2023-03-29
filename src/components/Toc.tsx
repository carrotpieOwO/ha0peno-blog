import React, { useEffect, useState } from "react";
import { useMemo } from "react";
import useScrollPosition from "../hooks/useScrollPosition";
import { Box, List, ListItem, Text } from '@chakra-ui/react'
import styled from "styled-components";


const TList = styled(List)`
    position: sticky;
    top: 120px;
`
interface Toc {
    id: string; 
    title: string;
    sub?: boolean;
    children?: Toc[]
}
interface TOCProps {
    items: Toc[]
}

export default function Toc({ items }: TOCProps) {
    const {scrollPosition, scrollToEl} = useScrollPosition();

    // 정적 html파일의 빌드타임에러 방지 (nodejs에서 브라우저전역을 참조할 수 없음)
    const isDocument = typeof document !== 'undefined';

    const activeItemId = useMemo(() => {
        // 전달받은 hearItem의 id값으로 각 헤더의 offsetTop 값을 배열로 저장한다.
        const targetOffsets = items.map((item) => {
            const target = isDocument && document.getElementById(item.id);
            return target?.offsetTop ?? Infinity;
        });
        
        // offset배열에서 현재 스크롤 위치보다 offset이 큰 index를 찾는다. 👉🏻 스크롤 위치보다 아래에 있는 div찾기
        const lastIndex = targetOffsets.findIndex((offset) => offset >= scrollPosition);
      
        // 스크롤위치보다 아래에 있는 div가 없을 경우 마지막 목차를 active로 설정한다.
        if (lastIndex === -1) {
            return items[items.length - 1]?.id ?? null;
        }

        // lastIndex가 있다면, 해당 목차를 active로 설정
        return items[lastIndex - 1]?.id ?? items[0]?.id;

    }, [scrollPosition, items]);

    return (
        <TList >
            {
                items.map((item) => (
                    <ListItem key={item.id} >
                        <Box bg={activeItemId === item.id ? 'rgba(254, 215, 226, .5)' : '-moz-initial'} 
                            maxWidth='90%' paddingY='1' 
                            borderLeft='3px solid'
                            borderLeftColor={activeItemId === item.id ? 'pink.300' : 'pink.100'}
                            paddingX={5}
                            onClick={() => scrollToEl(item.id)}
                            cursor='pointer'
                        >
                            <Text marginLeft={item.sub ? 2 : 0} 
                                fontSize='sm' overflow='hidden' whiteSpace='nowrap' textOverflow='ellipsis'>
                                    { item.title }
                            </Text>
                        </Box>
                    </ListItem>
                ))
            }
        </TList>
    );
}
  
  
  