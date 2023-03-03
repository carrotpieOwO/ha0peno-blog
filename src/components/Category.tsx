import React, {Dispatch, SetStateAction} from "react";
import { List } from 'antd';
import { FolderTwoTone } from "@ant-design/icons";


interface CategoryProps {
    categories: string[],
    setCategory: Dispatch<SetStateAction<string>>
}
export default function Category({categories, setCategory} :CategoryProps) {
    return (
        <List>
            {
                categories.map(category => 
                <List.Item style={{borderBlockEnd:'none'}}>
                    <List.Item.Meta
                    avatar={<FolderTwoTone twoToneColor="#eb2f96" style={{marginRight:'10px'}}/>}
                    title={<a onClick={() => setCategory(category)}>{category}</a>}
                    />
                </List.Item> 
                )   
            }
        </List>
    )
}