import { useState, useEffect } from 'react';

const isBrowser = () => typeof window !== "undefined"

// window 사이즈에 따라 toc컴포넌트 생성 여부를 결정하고, toc아이템을 만든다.
export default function useToc(data) {
  const [ toc, setToc ] = useState(true);

  const handleResize = () => {
    setToc(isBrowser() && window.innerWidth >= 1210)
  }

  // 브라우저 크기가 변경될 때, width값이 1210이상일때만 toc컴포넌트 생성
  useEffect(() => {
      isBrowser() && window.addEventListener('resize', handleResize)
      return () => {
          isBrowser() &&  window.removeEventListener('resize', handleResize)
      }
  }, [])


  const flattenItems = (items) => {
    return items.reduce((array, item) => {
      // 문자열에서 알파벳, 숫자, 한글 문자를 제외한 모든 문자를 하이픈('-')으로 대체하여 id값 부여
      array.push({
        id: `${item.title.replace(/[^\w\uAC00-\uD7AF]/g, '-')}`,
        title: item.title
      });
      if (item.items) {
        // 하위아이템은 구분하여 들여쓰기를 해주기 위해 sub설정을 넣어준다.
        array.push(...item.items.map((child) => ({ 
            id: `${child.title.replace(/[^\w\uAC00-\uD7AF]/g, '-')}`,
            title: child.title,
            sub: true,
        })));
      }
      return array;
    }, []);
  };

  const tocItems = flattenItems(data.mdx?.tableOfContents?.items);

  return { toc, tocItems };
}