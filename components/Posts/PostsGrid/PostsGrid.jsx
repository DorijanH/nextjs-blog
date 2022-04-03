import PostItem from '../PostItem';

import styles from './PostsGrid.module.css';

function PostsGrid({ posts }) {
    return (
        <ul className={styles.grid}>
            {posts.map((post) => (
                <PostItem
                    key={post.slug}
                    post={post}
                />
            ))}
        </ul>
    )
}

export default PostsGrid;