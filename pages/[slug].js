import { useRouter } from 'next/router'
import Gallery from '../components/layouts/content/gallery'
import OnePage from '../components/layouts/content/onePage'
import SlugLayout from '../components/layouts/slugLayout'

const Post = ({ data }) => {
    const router = useRouter();
    const { slug, utm_source, page } = router.query
    const onePageChannels = ['facebook', 'twitter', 'tiktok']
    const content = onePageChannels.includes(utm_source) ? OnePage : Gallery;
    const contentProps = { data, pageNumber: page || 0 }
    return (
        <>
            <SlugLayout content={content} contentProps={contentProps}></SlugLayout>
        </>
    )
}

export default Post

export async function getServerSideProps({ params }) {
    // Fetch data from external API
    const res = await fetch(`https://welivelux.com/wp-json/wp/v2/posts?slug=${params.slug}`)
    const data = await res.json()
    const html = data[0]?.content?.rendered;
    const title = data[0]?.title?.rendered;
    if (!html) {
        return {
            notFound: true,
        }
    }
    const items = splitContent(html);

    // Pass data to the page via props
    return { props: { data: { title, ...items } } }
}

function splitContent(content) {
    const splited = content.split('<p><!--nextpage--></p>')
    return {
        content: splited,
        items_count: splited.length
    }
}