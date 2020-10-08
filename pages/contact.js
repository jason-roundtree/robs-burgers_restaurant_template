import Layout from '../components/Layout'
import sanity from '../lib/sanity'
import styled from 'styled-components'

const PageContainer = styled.div`
    padding-top: 70px;
`
const ContactContainer = styled.div`
    text-align: center;
`
const H3 = styled.h3`
    margin-top: 25px;
    font-family: 'Bebas Neue', cursive;
    font-size: 2em;
    color: rgb(255, 112, 110);
`
const P = styled.p`
    font-size: 1.5em;
`
export default function Contact({ contactInfo }) {
    return (
        <Layout>
            <PageContainer>
                {contactInfo.map(contact => {
                    return (
                        <ContactContainer key={contact._id}>
                            <H3>{contact.type}</H3>
                            <P>{contact.info}</P>
                        </ContactContainer>
                    )
                })}
            </PageContainer>
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