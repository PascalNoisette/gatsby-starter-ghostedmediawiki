import React from 'react'
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import Layout  from '../components/common/Layout'
import MetaData from '../../node_modules/gatsby-starter-ghost/src/components/common/meta/MetaData'

import {postcolor} from "../utils/Helper"
/**
* Single post view (/:slug)
*
* This file renders a single post and loads all the content.
*
*/
const Post = ({ data, location }) => {
    const post = data.ghostPost

    const [postContentDiv, setPostContentDiv] = useState(null);
    useEffect(() => {
        const jsconfigvars = JSON.parse(post.codeinjection_head).jsconfigvars;
        Object.getOwnPropertyNames(jsconfigvars.wgGraphSpecs??{}).map(id => {
            //vegaEmbed(`#${id}`, jsconfigvars.wgGraphSpecs[id]);
        })
    }, [postContentDiv]);

    post.codeinjection_styles = `${post.codeinjection_styles??""} 
        :root {
            --color-base: ${postcolor(post)};
        }
        `;
    return (
        <>
            <MetaData
                data={data}
                location={location}
                type="article"
            />
            <Helmet>
                <style type="text/css">{`${post.codeinjection_styles}`}</style>
                <script>
                {
                `
                    MathJax = {
                    loader: {load: ['[tex]/mhchem']},
                    tex: {
                        packages: {'[+]': ['mhchem']},
                        inlineMath: [["[math]","[/math]"]]
                    }
                    };
                `
                }
                </script>
                <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3.0.0/es5/tex-mml-chtml.js"></script>

                <script src="https://cdn.jsdelivr.net/npm/vega@5.20.2"></script>
                <script src="https://cdn.jsdelivr.net/npm/vega-lite@5.1.1"></script>
                <script src="https://cdn.jsdelivr.net/npm/vega-embed@6.18.2"></script>
            </Helmet>
            <Layout>
                <div className="container">
                    <article className="content">
                        { post.feature_image ?
                            <figure className="post-feature-image">
                                <img src={ post.feature_image } alt={ post.title } />
                            </figure> : null }
                        <section className="post-full-content">
                            <h1 className="content-title">{post.title}</h1>

                            {/* The main post content */ }
                            <section
                                className="content-body load-external-scripts"
                                dangerouslySetInnerHTML={{ __html: post.html }}
                                ref={setPostContentDiv}
                            />
                        </section>
                    </article>
                </div>
            </Layout>
        </>
    )
}

Post.propTypes = {
    data: PropTypes.shape({
        ghostPost: PropTypes.shape({
            codeinjection_styles: PropTypes.object,
            title: PropTypes.string.isRequired,
            html: PropTypes.string.isRequired,
            feature_image: PropTypes.string,
        }).isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
}

export default Post

export const postQuery = graphql`
    query($slug: String!) {
        ghostPost(slug: { eq: $slug }) {
            ...GhostPostFields
        }
    }
`
