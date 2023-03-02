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
            </Helmet>
            <title>{title}</title>
        </>
    )
}