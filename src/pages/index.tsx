import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import ILayout from "../components/ILayout"
import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
   * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  #___gatsby,
  #gatsby-focus-wrapper,
  html,
  body {
    height: 100%;
  }
`

const IndexPage: React.FC<PageProps> = () => {
  return (
    <ILayout title="welcome to ha0peno's Blog💓">
      <div></div>
    </ILayout>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
