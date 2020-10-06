import { useState, useEffect } from 'react'
import sanity from '../lib/sanity'
import styled from 'styled-components'

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-items: center;
`
const query = `*[ _type == "social_media" ] {
    _id,
    name,
    info,
    "logoUrl": logo.asset->url
}`
// TODO: figure out why icons flicker when changing pages. Is sanity call being run each time?
export default function SocialMedia() {
    const [socialMediaData, setSocialMediaData] = useState([])
    useEffect(() => {
        async function fetchData() {
            const response = sanity.fetch(query) 
            const data = await response
            // console.log('data: ', data)
            setSocialMediaData(data)
        }
        fetchData()
    }, [])

    return (
        <GridContainer>
            {/* TODO: remove this when actual business urls are in Sanity CMS */}
            {socialMediaData.map(socialEntity => {
                let socialEntityUrl
                if (socialEntity.name[0] === 'I') {
                    socialEntityUrl = 'https://instagram.com'
                } else if (socialEntity.name[0] === 'F') {
                    socialEntityUrl = 'https://facebook.com'
                } else {
                    socialEntityUrl = 'https://twitter.com'
                }

                return (
                    <div key={socialEntity._id}>
                        <ul> 
                            <li>
                                {/* <a href={`https://${socialEntity.name}`}> */}
                                {/* TODO: replace this <a> with commented out <a> above 
                                when actual business urls are in Sanity CMS */}
                                <a href={socialEntityUrl} target="_blank">
                                    <img 
                                        src={socialEntity.logoUrl} 
                                        alt={`${socialEntity.name} logo`} 
                                        height="25px"
                                    />
                                </a>
                            </li>                               
                        </ul>
                    </div>
                )
            })}
        </GridContainer>
    )
}