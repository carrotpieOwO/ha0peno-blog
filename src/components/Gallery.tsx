import React from "react";
import { navigate } from "gatsby"
import styled from "styled-components";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import defaultImage from '../images/defaultImage.png';
import { BlogType } from "../pages";
import { createStyles, Card, Text, Badge, Grid } from '@mantine/core';
import { motion } from "framer-motion";


const useStyles = createStyles((theme) => ({
    card: {
        height: '450px',
        cursor: 'pointer'
    },
    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        marginBottom: '8px',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },
    badge: {
        background: '#fff0f6',
        color: '#c41d7f',
        borderColor: '#ffadd2',
        borderRadius: '4px',
        textTransform: 'inherit',
        fontWeight: 500
    }
}));

const MotionCard = styled(motion(Card))``

export default function Gallery(props: {viewData:BlogType}) {
    const { classes, theme } = useStyles();

    return (
        <Grid gutter="xl">
            { 
                props.viewData.map(blog => 
                    <Grid.Col sm={6} md={4} lg={4} xl={3} key={blog.title}>
                        <MotionCard withBorder padding="lg" radius="md" className={classes.card}
                          whileHover={{ scale: 1.05 }}
                          onClick={() => navigate(`${blog.href}`)}
                        >
                            <Card.Section mb="sm">
                                {
                                    blog.thumbnail ?
                                        <GatsbyImage 
                                            image={getImage(blog.thumbnail)!} 
                                            alt='test' 
                                            style={{height:'270px'}}/>
                                        :
                                        <img src={defaultImage} alt="defaultImage"  style={{height:'270px'}}/>
                                }                            
                            </Card.Section>
                            <Badge className={classes.badge}>{blog.category}</Badge>
                            <Text fw={700} mt="xs" className={classes.title}>
                                {blog.title}
                            </Text>
                            <Text fz="xs" c="dimmed">
                            {blog.description}
                            </Text>
                        </MotionCard>
                    </Grid.Col>
                )
            }
        </Grid>
    )
}