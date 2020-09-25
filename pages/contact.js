import Layout from '../components/Layout'
import sanity from '../lib/sanity'
import styled from 'styled-components'

const ContactContainer = styled.div`
    text-align: center;
`
const H2 = styled.h2`
    margin-top: 25px;
    font-family: 'Bebas Neue', cursive;
    font-size: 1.5em;
    color: rgb(255, 112, 110);
`

export default function Contact(props) {
    const { contacts } = props
    return (
        <Layout>
            <h1><span className="sign_font">Contact</span></h1>
            <div>
                {contacts.map(contact => {
                    return (
                        <ContactContainer key={contact._id}>
                            <H2>{contact.type}</H2>
                            <p>{contact.info}</p>
                        </ContactContainer>
                    )
                })}
            </div>
        </Layout>
    )
}
  
const query = `*[ _type == "contact" ] {
    _id,
    type,
    info
}`

Contact.getInitialProps = async () => {
    return {
      contacts: await sanity.fetch(query)
    }
}