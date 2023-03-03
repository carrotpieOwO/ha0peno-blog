import React, { useEffect } from "react"

const COMMENTS_ID = 'comments-container';
const isBrowser = () => typeof window !== "undefined"
const localTheme =  isBrowser() && window.localStorage.getItem('theme');
const theme = localTheme === 'dark' ? 'photon-dark' : 'github-light';

export default function Comment() {
  useEffect(() => {
      const script = document.createElement('script');
      script.src = 'https://utteranc.es/client.js';
      script.setAttribute('repo', "carrotpieOwO/ha0peno-comment");
      script.setAttribute('issue-term', 'pathname');
      script.setAttribute('theme', theme);
      script.setAttribute('crossorigin', 'anonymous');
      script.async = true;

      const comments = document.getElementById(COMMENTS_ID);
      if (comments) comments.appendChild(script);

      return () => {
          const comments = document.getElementById(COMMENTS_ID);
          if (comments) comments.innerHTML = '';
      };
  }, []);

  return (
      <div id={COMMENTS_ID} />
  );
};