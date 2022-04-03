import PostsGrid from '../../Posts/PostsGrid';
import styles from './FeaturedPosts.module.css';

function FeaturedPosts({ posts }) {
    return (
        <section className={styles.latest}>
            <h2>Featured Posts</h2>
            <PostsGrid posts={posts} />
        </section>
    )
}

export default FeaturedPosts;