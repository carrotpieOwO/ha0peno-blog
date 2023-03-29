import React from "react";
import { navigate } from "gatsby"
import styled from "styled-components";
import { motion } from "framer-motion";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import defaultImage from '../images/defaultImage.png';
import { BlogType } from "../pages";
import { Card, Badge, CardBody, CardFooter, SimpleGrid } from '@chakra-ui/react'

const ICard = styled(motion(Card))`
  cursor: pointer;
  height: fit-content;
`
const Footer = styled(CardFooter)`
    display: block !important;
`
export default function Gallery(props: {viewData:BlogType}) {
    return (
        <SimpleGrid spacing={5} templateColumns='repeat(auto-fill, minmax(400px, 1fr))'>
            {
                props.viewData.map( blog => 
                    <ICard
                        key={blog.href}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => navigate(`${blog.href}`)}
                    >
                        <CardBody>
                            {
                                blog.thumbnail ?
                                <GatsbyImage 
                                    image={getImage(blog.thumbnail)!} 
                                    alt='test' 
                                    style={{height:'270px'}}/>
                                :
                                    <img src={defaultImage} alt="defaultImage"  style={{height:'270px'}}
                                />
                            }
                        </CardBody>
                        <Footer style={{diplay: 'block'}}>
                            <Badge colorScheme='pink' style={{marginBottom: '1em'}}>{blog.category}</Badge>
                            <div style={{minHeight: '60px', fontSize: '14px'}}>{blog.description}</div>
                            <div style={{marginTop: '1.5em', display: 'flex', justifyContent: 'end', fontSize: '14px'}}>{blog.date}</div>
                        </Footer>
                    </ICard>        
                )
            }
        </SimpleGrid>

    )
}