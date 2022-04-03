import Head from 'next/head';

import PostContent from '../../components/Posts/PostDetail/PostContent';

import { getPostData, getPostsFiles } from '../../helpers/PostsUtil';

function PostDetailPage({ post }) {
    return (
        <>
            <Head>
                <title>{post.title}</title>
                <meta name='description' content={post.excerpt} />
            </Head>
            <PostContent post={post} />
        </>
    );
}

export default PostDetailPage;

export async function getStaticPaths() {
    const postFileNames = getPostsFiles();

    const slugs = postFileNames.map((fileName) => fileName.replace(/\.md$/, ''));

    return {
        paths: slugs.map((slug) => ({ params: { slug } })),
        fallback: false
    }
}

export async function getStaticProps(context) {
    const { params } = context;
    const { slug } = params;

    const postData =  getPostData(slug);
    
    return {
        props: {
            post: postData
        },
        revalidate: 600
    }
}