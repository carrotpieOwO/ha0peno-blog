import * as React from "react"
import { Link, HeadFC, PageProps } from "gatsby"
import ILayout from "../components/ILayout"
import Seo from "../components/Seo"
import { Typography } from 'antd';


const { Title, Text } = Typography;

const NotFoundPage: React.FC<PageProps> = () => {
  return (
    <ILayout>
      <Title>Page not found</Title>
        <Text>
        Sorry 😔, we couldn’t find what you were looking for.
        </Text>
        <br/>  
        <Link to="/">Go home</Link>.
    </ILayout>
  )
}

export default NotFoundPage

export const Head: HeadFC = () => <Seo title="ha0peno | 404 ❤️"/>
