import { useState, useEffect } from 'react';

// blog detail 페이지에서 toc컴포넌트에 필요한 scroll관련 hook
export default function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  useEffect(() => {
    // scroll 이벤트를 등록하여 현재 스크롤 위치를 업데이트한다. 
    const handleScroll = () => setScrollPosition(window.scrollY);
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToEl = (id:string) => {
    // 전달받은 id값으로 스크롤을 이동시킨다. 
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return { scrollPosition, scrollToEl };
}