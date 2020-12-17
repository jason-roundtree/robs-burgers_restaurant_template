import styled from 'styled-components'
import Layout from '../components/Layout'

const Container = styled.div`
    text-align: center;
    width: 70%;
    margin: 0 auto;
    @media (max-width: 750px) {
        width: 90%;
    }
`
const H2 = styled.h2`
`
const P = styled.p`
    line-height: 2em;
    font-weight: 500;
    font-size: 1.2em;
    @media (max-width: 750px) {
        line-height: 1.75em;  
    }
`

function Home() {
    return (
        <Layout>
            <Container>
                <div className='heading_container'>
                    <H2>Welcome!</H2>
                </div>
                <P>We warmly invite you stop by to try one of our delectible, handcrafted hamburgers, prepared with love and fresh ingredients by me (Rob), along with the help of my mostly normal and lovely family. We specialize in offering friendly service and crafting unique hamburger recipes that are sure to knock your socks off! Don't forget to ask about the special Burger of the Day!</P>
            </Container>
        </Layout>
    )
}
  
export default Home