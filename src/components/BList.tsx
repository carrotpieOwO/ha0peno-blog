import React, { useState } from "react";
import { navigate } from "gatsby"
import { BlogType } from "../pages";
import { Card, Badge, CardBody, Stack, Box, Heading, Text, StackDivider } from '@chakra-ui/react'

export default function BList(props: {viewData:BlogType}) {
    const [ hover, setHover ] = useState('');
    
    return (
        <Card >
            <CardBody>
                <Stack divider={<StackDivider />} spacing='15'>
                    {
                        props.viewData.map( blog => 
                            <Box p={4} style={{cursor: 'pointer'}}
                                key={blog.title}
                                onClick={() => navigate(blog.href)}
                                onMouseOver={() => setHover(blog.title as string)}
                                onMouseLeave={() => setHover('')}
                            >
                                <Badge colorScheme='pink' marginBottom={5}>{blog.category}</Badge>
                                <Heading size='md' marginBottom={3}>{blog.title}</Heading>
                                <Text as={hover === blog.title ? 'u' : 'abbr'}>{blog.description}</Text>
                                <Text marginTop={10}>{blog.date}</Text>
                            </Box>
                        )
                    }
                </Stack>
            </CardBody>
        </Card>
    )
}