import sanityClient from "@sanity/client"

export default sanityClient({
    projectId: '9fpahex0',
    dataset: 'production',
    // leave blank to be anonymous user:
    // token: 'sanity-auth-token'
    // `false` if you want to ensure fresh data:
    useCdn: true 
})