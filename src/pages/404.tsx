import * as React from "react"
import { Link, HeadFC, PageProps } from "gatsby"
import ILayout from "../components/ILayout"
import Seo from "../components/Seo"
import { Center, Heading, Text } from "@chakra-ui/react"

const NotFoundPage: React.FC<PageProps> = () => {
  return (
    <ILayout>
      <Center height='calc(100vh - 330px)' flexDirection='column'>
        <Heading>Page not found</Heading>
        <br/>
        <Link to="/">Go home</Link>.
      </Center>
    </ILayout>
  )
}

export default NotFoundPage

export const Head: HeadFC = () => <Seo title="ha0peno | 404 ❤️"/>
