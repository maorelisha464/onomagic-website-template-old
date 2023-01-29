import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import useUserParams from '../components/common/userParams'
import Gallery from '../components/layouts/content/gallery'
import OnePage from '../components/layouts/content/onePage'
import Footer1 from '../components/layouts/footers/footer1'
import Header1 from '../components/layouts/headers/header1'
import SlugLayout from '../components/layouts/slugLayout'
import tracking from '../components/tracking/tracking'

const Post = ({ data, uaString }) => {
    const router = useRouter();
    const { utm_campaign, utm_source } = useUserParams(uaString);
    const { articleId } = data;
    const { page } = router.query;
    const onePageChannels = ['facebook', 'twitter', 'tiktok']
    const content = onePageChannels.includes(utm_source) ? OnePage : Gallery;
    const contentProps = { data, pageNumber: page || 0 }

    useEffect(() => {
        tracking.track('vv', 'prepixel', 'FBClick', { utm_campaign, utm_source, article_id: articleId })
    }, []);

    return (
        <>
            <Head>
                <meta name="robots" content="noindex,nofollow" />
                <title>{contentProps.data.title}</title>
            </Head>
            <Header1></Header1>
            <SlugLayout content={content} contentProps={contentProps}></SlugLayout>
            <Footer1 />
        </>
    )
}

export default Post

export async function getServerSideProps({ params, req }) {
    // Fetch data from external API
    try {
        const res = await fetch(`https://${process.env.HOST}/wp-json/wp/v2/posts?slug=${params.slug}`)
        console.log(`https://${process.env.HOST}/wp-json/wp/v2/posts?slug=${params.slug}`)
        const data = await res.json()
        console.log(data);
        const html = data[0]?.content?.rendered;
        const title = data[0]?.title?.rendered;
        const articleId = data[0].id;
        if (!html) {
            throw new Error('No html');
        }
        const items = splitContent(html);
        // Pass data to the page via props
        return { props: { data: { articleId, title, ...items }, uaString: req.headers['user-agent'] } }

    } catch (error) {
        console.log(error)
        return {
            notFound: true,
        }
    }
}

function splitContent(content) {
    const splited = content.split('<p><!--nextpage--></p>')
    return {
        content: splited,
        items_count: splited.length
    }
}