import React, { useEffect, useState } from "react";
import { graphql, HeadFC, PageProps } from "gatsby"
import { Row, Col, Typography, Radio } from 'antd';
import { AppstoreTwoTone, ProfileTwoTone } from "@ant-design/icons";
import ILayout from "../components/ILayout"
import Seo from "../components/Seo";
import Category from "../components/Category";
import Gallery from "../components/Gallery";
import BList from "../components/BList";
import Search from "../components/Search";

const { Title, Text } = Typography;


export type BlogType = {
  title: string | null | undefined;
  thumbnail: any;
  description: string | null;
  href: string;
  date: string | null | undefined;
  category: string | null | undefined;
}[]

export default function IndexPage({data}: PageProps<Queries.BlogsQuery>) {
  const blogData:BlogType = Array.from(data.allMdx.nodes).map(blog => ({
    title: blog.frontmatter?.title,
    thumbnail: blog.frontmatter?.thumbnail?.childImageSharp?.gatsbyImageData,
    description: blog.excerpt,
    href: `${blog.frontmatter?.slug}`,
    date: blog.frontmatter?.date,
    category: blog.frontmatter?.category
  }))

  const categories = ['all', ...Object.keys(Object.fromEntries(blogData.map(blog => [ blog.category, null])))];

  const [ category, setCategory ] = useState('all');
  const [ viewData, setViewData ] = useState([...blogData]);
  const [ mode, setMode ] = useState<'gallery' | 'list'>('gallery')

  useEffect(() => {
    if(category !== 'all') {
        const filter = blogData.filter(blog => blog.category === category);
        setViewData(filter);
    } else {
        setViewData([...blogData])
    }

  }, [category])

  return (
    <ILayout>
      
      <Row>
        <Col xs={24} md={4} >
          <Category categories={categories} setCategory={setCategory}/>
        </Col>
        <Col xs={24} md={20}>
        <Row justify="end" align='middle' gutter={20} style={{marginBottom: '20px'}}>
          <Search/>
        <Col>
          <Radio.Group size="large" value={mode} onChange={(e) => setMode(e.target.value)}>
            <Radio.Button value="gallery"><AppstoreTwoTone twoToneColor="#eb2f96"/></Radio.Button>
            <Radio.Button value="list"><ProfileTwoTone twoToneColor="#eb2f96"/></Radio.Button>
          </Radio.Group>
        </Col>
      </Row>    
          <Title>{category}({viewData.length})</Title>
            {
              mode === 'gallery' ?
              <Gallery viewData={viewData}/>
              :
              <BList viewData={viewData}/>
            }
        </Col>
      </Row>
    </ILayout>
  )
}

export const query = graphql`
   query Blogs {
    allMdx(sort: {frontmatter: {date: DESC}}) {
      nodes {
        frontmatter {
          category,
          slug,
          date,
          title,
          thumbnail {
            childImageSharp {
                gatsbyImageData(height: 300)
            }
          }
        },
        body,
        excerpt(pruneLength:50)
      }
    }
   }
`
export const Head: HeadFC = () => <Seo title="ha0peno | home"/>
