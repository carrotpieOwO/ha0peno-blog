import React, { useEffect, useState } from "react";
import { graphql, HeadFC, PageProps } from "gatsby"
import { Row, Radio, Button } from 'antd';
import { AppstoreTwoTone, ProfileTwoTone } from "@ant-design/icons";
import ILayout from "../components/ILayout"
import Seo from "../components/Seo";
import Gallery from "../components/Gallery";
import BList from "../components/BList";
import Search from "../components/Search";

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
  blogObj['all'] = data.length;

  // 카테고리명(key값)으로 정렬
  const sort =  Object.fromEntries(Object.entries(blogObj).sort(([a], [b]) => a < b ? -1 : 1))
  return sort
}

export default function IndexPage({data}: PageProps<Queries.BlogsQuery>) {
  const blogData:BlogType = Array.from(data.allMdx.nodes).map(blog => ({
    title: blog.frontmatter?.title,
    thumbnail: blog.frontmatter?.thumbnail?.childImageSharp?.gatsbyImageData,
    description: blog.excerpt,
    href: `${blog.frontmatter?.slug}`,
    date: blog.frontmatter?.date,
    category: blog.frontmatter?.category
  }))

  const [ categoryList, setCategoryList ] = useState(createCategory(blogData));
  const [ currentCategory, setCurrentCategory ] = useState('all');
  const [ viewData, setViewData ] = useState([...blogData]);
  const [ mode, setMode ] = useState<'gallery' | 'list'>('gallery')
  const [ search, setSearch ] = useState('');

  useEffect(() => {
    if (search !== '' ) {
      const filterData = blogData.filter(
        blog => blog.title.toUpperCase().includes(search.toUpperCase()) 
        || blog.description?.toUpperCase().includes(search.toUpperCase())
      );
      // 검색결과에 해당하는 카테고리리스트만 보여주기
      setCategoryList(createCategory(filterData))

      // 카테고리가 선택될 경우 해당 카테고리만 보여주기
      if(currentCategory !== 'all') {
        const filter = filterData.filter(blog => blog.category === currentCategory);
        setViewData(filter);
      } else {
        setViewData([...filterData])
      }
      
    } else {
      // search가 빈값일 경우 모든 카테고리 보여주기
      setCategoryList(createCategory(blogData))

      if(currentCategory !== 'all') {
        // 카테고리가 선택될 경우 해당 카테고리만 보여주기
        const filter = blogData.filter(blog => blog.category === currentCategory);
        setViewData(filter);
      } else {
        setViewData([...blogData])
      }
    }
    
  }, [search, currentCategory])

  return (
    <ILayout>
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
        <Search search={search} setSearch={setSearch}/>
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
