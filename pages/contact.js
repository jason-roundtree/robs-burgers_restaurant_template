import Layout from '../components/Layout'
import sanity from '../lib/sanity'

const query = `*[ _type == "contact" ] {
    _id,
    type,
    info
}`

export default function Contact(props) {
    const { contacts } = props
    return (
        <Layout>
            <h1><span className="sign_font">Contact</span></h1>
            <div>
                {contacts.map(contact => {
                    return (
                        <div key={contact._id}>
                            <h2>{contact.type}</h2>
                            <p>{contact.info}</p>
                        </div>
                    )
                })}

                <style jsx>{`
                    div div {
                        text-align: center;
                    }
                    h2 {
                        margin-top: 25px;
                        font-family: 'Bebas Neue', cursive;
                        font-size: 1.5em;
                        color: rgb(255, 112, 110);
                    }
                `}</style>
            </div>
        </Layout>
    )
}
  
Contact.getInitialProps = async () => {
    return {
      contacts: await sanity.fetch(query)
    }
}