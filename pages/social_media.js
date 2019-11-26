import Layout from '../components/Layout'
import sanity from '../lib/sanity'

// TODO: does this need to be linked to a route to query or can I move this to the component folder and query from there?
const query = `*[ _type == "social_media" ] {
    _id,
    name,
    info,
    logo
}`

export default function SocialMedia(props) {
    const { social_media } = props
    console.log('social_media: ', social_media)
    return (
        <Layout>
            
        </Layout>
    )
}


SocialMedia.getInitialProps = async () => {
    return {
      social_media: await sanity.fetch(query)
    }
}