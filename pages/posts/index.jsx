import AllPosts from '../../components/Posts/AllPosts';

import { getAllPosts } from '../../helpers/PostsUtil';

export async function getStaticProps() {
    const allPosts = getAllPosts();

    return {
        props: { 
            posts: allPosts
        }
    }
}

function AllPostsPage({ posts }) {
    return (
        <AllPosts posts={posts} />
    )
}

AllPostsPage.title = 'All Posts';
AllPostsPage.description = 'A list of all programming-related tutorials and posts';

export default AllPostsPage;