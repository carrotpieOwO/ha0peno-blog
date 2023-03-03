import React from "react";
import { navigate } from "gatsby"
import styled from "styled-components";
import { Card, Tag, List } from 'antd';
import { motion } from "framer-motion";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import defaultImage from '../images/defaultImage.png';
import { BlogType } from "../pages";

const { Meta } = Card;

const ICard = styled(motion(Card))`
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 3%), 0 1px 6px -1px rgb(0 0 0 / 2%), 0 2px 4px 0 rgb(0 0 0 / 2%);
  cursor: pointer;
  height: fit-content;
`

export default function Gallery(props: {viewData:BlogType}) {
    return (
        <List 
            grid={{gutter: 24, xs: 1, sm: 2, lg: 2, xl: 3, xxl: 4}}
            dataSource={props.viewData}
            pagination={{
                pageSize: 12,
                position: 'bottom',
                align: 'center'
              }}
            renderItem={(blog) => (
                <List.Item>
                     <ICard 
                        key={blog.href}
                        whileHover={{ scale: 1.1 }}
                        onClick={() => navigate(`${blog.href}`)}
                        cover={
                            blog.thumbnail ?
                            <GatsbyImage 
                                image={getImage(blog.thumbnail)!} 
                                alt='test' 
                                style={{height:'270px'}}/>
                            :
                                <img src={defaultImage} alt="defaultImage"  style={{height:'270px'}}
                            />
                        }
                    >
                        <Tag color="magenta" style={{marginBottom: '1em'}}>{blog.category}</Tag>
                        <Meta title={blog.title} description={blog.description}/>
                        <div style={{marginTop: '2em', display: 'flex', justifyContent: 'end'}}>{blog.date}</div>
                    </ICard>
                </List.Item>
            )}
        >        
        </List>        
    )
}