import Layout from '../components/Layout'
import sanity from '../lib/sanity'
import styled from 'styled-components'

const P = styled.p`
    font-size: 1.25em;
    font-weight: 500;
    margin-bottom: 1em;
`
export default function Contact({ contactInfo }) {
    return (
        <Layout>
            <div className="page_container">
                {contactInfo.map(contact => {
                    return (
                        <div key={contact._id}>
                            <div className='heading_container'>
                                <h3 className='radial_gradient_text'>{contact.type.toUpperCase()}</h3>
                            </div>
                            {contact.type === 'Email' 
                                ? (
                                    <P>
                                        {/* Email is long so on smaller screens it breaks to new line after `@` */}
                                        {contact.info.slice(0, 12)}
                                        <wbr />
                                        {contact.info.slice(12)}
                                    </P>
                                )
                                : <P>{contact.info}</P>
                            }
                        </div>
                    )
                })}

                <div className='heading_container'>
                    <h3 className='radial_gradient_text'>LOCATION</h3>
                </div>
                <P>We're located down by the wharf on Ocean Avenue, across from a cheap "Italian" restaurant that serves substandard food that you should definitely avoid at all costs.</P>
            </div>
        </Layout>
    )
}
  
const query = `*[ _type == "contact" ] {
    _id,
    type,
    info
}`

export async function getStaticProps() {
    const contactInfo = await sanity.fetch(query)
    // console.log('contactInfo: ', contactInfo)
    return {
        props: { contactInfo }
    }
}