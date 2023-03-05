import React, { useEffect, useState } from "react";
import { graphql, HeadFC, PageProps } from "gatsby"
import { Row, Radio, Button } from 'antd';
import { AppstoreTwoTone, ProfileTwoTone } from "@ant-design/icons";
import ILayout from "../components/ILayout"
import Seo from "../components/Seo";
import Gallery from "../components/Gallery";
import BList from "../components/BList";
import Search from "../components/Search";
import { Location } from '@reach/router'
import queryString from 'query-string'
import withLocation from "../components/withLocation";
import PropTypes from "prop-types"
import styled from "styled-components";

export type BlogType = {
  title: string | null | undefined;
  thumbnail: any;
  description: string | null;
  href: string;
  date: string | null | undefined;
  category: string | null | undefined;
}[]

// 카테고리별 총 게시글 개수 구하는 함수
function getCategoryLength (data: BlogType, val: string) {
  const category = data.filter( blog => blog.category === val)
  return category.length;
}

// categoryList 생성
function createCategory (data: BlogType) {
  const blogObj = Object.fromEntries(data.map( blog => [ blog.category]));
  
  // key: 카테고리명, value: 카테고리별 게시글 길이
  for (const key in blogObj) {
    blogObj[key] = getCategoryLength(data, key)
  }
  blogObj['All'] = data.length;

  // 카테고리명(key값)으로 정렬
  const sort =  Object.fromEntries(Object.entries(blogObj).sort(([a], [b]) => a < b ? -1 : 1))
  return sort
}

const Container = styled.div`
  padding: 5% 10%;
`
function IndexPage({data, search}: PageProps<Queries.BlogsQuery> | any) {
  const blogData:BlogType = Array.from(data.allMdx.nodes).map(blog => ({
    title: blog.frontmatter?.title,
    thumbnail: blog.frontmatter?.thumbnail?.childImageSharp?.gatsbyImageData,
    description: blog.excerpt,
    href: `${blog.frontmatter?.slug}`,
    date: blog.frontmatter?.date,
    category: blog.frontmatter?.category,
    body: blog.body
  }))


  const categories = createCategory(blogData);
  const queryStr = Object.keys(categories).includes(search.category) ? search.category : 'All';

  const [ categoryList, setCategoryList ] = useState(categories);
  const [ currentCategory, setCurrentCategory ] = useState(queryStr);
  const [ viewData, setViewData ] = useState([...blogData]);
  const [ mode, setMode ] = useState<'gallery' | 'list'>('gallery')
  const [ searchTxt, setSearchTxt ] = useState('');

  useEffect(() => {
    if (searchTxt !== '' ) {
      const filterData = blogData.filter(
        blog => blog.title.toUpperCase().includes(searchTxt.toUpperCase()) 
        || blog.body?.toUpperCase().includes(searchTxt.toUpperCase())
      );
      // 검색결과에 해당하는 카테고리리스트만 보여주기
      setCategoryList(createCategory(filterData))

      // 카테고리가 선택될 경우 해당 카테고리만 보여주기
      if(currentCategory !== 'All') {
        const filter = filterData.filter(blog => blog.category === currentCategory);
        // 선택된 카테고리에 데이터가 없으면 전체카테고리 보여주기
        if(filter.length === 0) {
          setCurrentCategory('All')
        } 
        setViewData(filter);
      } else {
        setViewData([...filterData])
      }
      
    } else {
      // searchTxt가 빈값일 경우 모든 카테고리 보여주기
      setCategoryList(createCategory(blogData))

      if(currentCategory !== 'All') {
        // 카테고리가 선택될 경우 해당 카테고리만 보여주기
        const filter = blogData.filter(blog => blog.category === currentCategory);
        setViewData(filter);
      } else {
        setViewData([...blogData])
      }
    }
    
  }, [searchTxt, currentCategory])

  return (
    <ILayout>
      <Container>
        <Row justify='center'>
        {
        [...Object.keys(categoryList)].map(category => (
            <Button 
              key={category} color="magenta" 
              style={{marginBottom: '1em', marginRight: '1em'}} 
              type={category === currentCategory ? 'primary' : 'default'}
              onClick={() => setCurrentCategory(category)}
            >
              {category} ({categoryList[category]})
            </Button>    
          ))
        }
        </Row>
        <Row justify="end" align='middle' gutter={20} style={{margin: '20px 0', gap: '10px'}}>
        <Search search={searchTxt} setSearch={setSearchTxt}/>
          <Radio.Group size="large" value={mode} onChange={(e) => setMode(e.target.value)}>
            <Radio.Button value="gallery"><AppstoreTwoTone twoToneColor="#eb2f96"/></Radio.Button>
            <Radio.Button value="list"><ProfileTwoTone twoToneColor="#eb2f96"/></Radio.Button>
          </Radio.Group>
        </Row>    
        {
          mode === 'gallery' ?
          <Gallery viewData={viewData}/>
          :
          <BList viewData={viewData}/>
        }
      </Container>
    </ILayout>
  )
}

IndexPage.propTypes = {
  search: PropTypes.object,
}
export default withLocation(IndexPage)

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
        excerpt(pruneLength:100)
      }
    }
   }
`
export const Head: HeadFC = () => <Seo title="ha0peno | home"/>
