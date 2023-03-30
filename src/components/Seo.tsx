import React from "react";
import { Helmet } from "react-helmet";

interface ISeoProps {
    title: string
}

export default function Seo({title}: ISeoProps) {
    return (
        <>
            <Helmet>
                <meta name="description" content="ha0peno 기술블로그" />
                <meta name="google-site-verification" content="V4Y8kIq_sMSh2nSAFuhSMq5TOfEtj0xIUc-n5Gl3CA8" />
                <meta name="naver-site-verification" content="8da7a8fd92d108358eb08f1b07fcc416ad01b0af" />
            </Helmet>
            <title>{title}</title>
        </>
    )
}