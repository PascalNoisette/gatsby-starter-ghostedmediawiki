import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { readingTime as readingTimeHelper } from '@tryghost/helpers'
import { Buffer } from "buffer"
import Bloby from "./Bloby"

const PostCard = ({ post }) => {
    const url = `/${post.slug}/`
    const readingTime = readingTimeHelper(post)
    const rand = (min, max) => min+Math.floor(Math.random() * max);
    const postcolor = `#${Buffer.from(post.title, 'utf8').toString('hex').substr(1,6)}`;
    return (
        <Link to={url} className="post-card">
            <header className="post-card-header">
                {post.feature_image &&
                    <div className="post-card-image" style={{
                        backgroundImage: `url(${post.feature_image})` ,
                    }}></div>}
                {!post.feature_image &&
                    <div className="post-card-image-replacement" style={{
                    backgroundColor: postcolor,
                    }}>
                        <Bloby parentColor={postcolor} width={320} height={200} blobRadius={rand(50, 100)} lineWidth={rand(20, 200)}/>
                    </div>}
                
                {post.featured && <span>Featured</span>}
                <h2 className="post-card-title">{post.title}</h2>
            </header>
            <section className="post-card-excerpt">{post.excerpt}</section>
            <footer className="post-card-footer">
                <div className="post-card-footer-left">
                    
                </div>
                <div className="post-card-footer-right">
                    <div>{readingTime}</div>
                </div>
            </footer>
        </Link>
    )
}

PostCard.propTypes = {
    post: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        feature_image: PropTypes.string,
        featured: PropTypes.bool,
        tags: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
            })
        ),
        excerpt: PropTypes.string.isRequired
    }).isRequired,
}

export default PostCard
