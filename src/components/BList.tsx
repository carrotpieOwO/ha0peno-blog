import React, { useState } from "react";
import { navigate } from "gatsby"
import { Card, List, Typography } from 'antd';
import { BlogType } from "../pages";
const { Title, Text } = Typography;

export default function BList(props: {viewData:BlogType}) {
    const [ hover, setHover ] = useState('');
    
    return (
        <Card >
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    align: 'center', 
                    pageSize: 10,
                }}
                dataSource = {props.viewData}
                renderItem={(item) => (
                    <List.Item
                        key={item.title}
                        style={{cursor: 'pointer'}}
                        onClick={() => navigate(item.href)}
                        onMouseOver={() => setHover(item.title as string)}
                        onMouseLeave={() => setHover('')}
                    >
                        <Text style={{color:'#eb2f96'}}>{item.category}</Text>
                        <List.Item.Meta
                            title={<Title level={3}>{item.title}</Title>}
                            description={
                            <Text type="secondary" underline={hover === item.title}>{item.description}</Text>
                            }
                            style={{margin: '30px 0'}}
                        />
                        <Text type="secondary">{item.date}</Text>
                    </List.Item>
                    )}
            >
            </List>
        </Card>
    )
}