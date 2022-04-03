import Head from 'next/head'

import Layout from '../components/Layout/Layout'

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const { title, description } = Component;

  return (
    <Layout>
      <Head>
        <title>{title ? title : "Dorijan's blog"}</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        { description && <meta name='description' content={description} /> }
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
