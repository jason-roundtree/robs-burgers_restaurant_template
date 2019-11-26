import { useState, useEffect } from 'react'
import sanity from '../lib/sanity'

const query = `*[ _type == "social_media" ] {
    _id,
    name,
    info,
    "logoUrl": logo.asset->url
}`

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
        <>
            {socialMediaData.map(socialEntity => {
                return (
                    <div key={socialEntity._id} className="social_grid">
                        <ul>
                            <li>{socialEntity.name}</li>                    
                            <li>
                                <img 
                                    src={socialEntity.logoUrl} 
                                    alt={`${socialEntity.name} logo`} 
                                />
                            </li>                    
                            <li>{socialEntity.info}</li>                    
                        </ul>
                    </div>
                )
            })}
        </>
    )
}