import Hero from '../components/HomePage/Hero';
import FeaturedPosts from '../components/HomePage/FeaturedPosts';

import { getFeaturedPosts } from '../helpers/PostsUtil';

export async function getStaticProps() {
    const featuredPosts = getFeaturedPosts();

    return {
        props: {
            posts: featuredPosts
        }
    };
}

function HomePage({ posts }) {
    return (
        <>
            <Hero />
            <FeaturedPosts posts={posts} />
        </>
    )
}

HomePage.title = 'Welcome to my blog!';
HomePage.description = 'I post about programming and web development';

export default HomePage;