import Layout from '../components/Layout'
import styled from 'styled-components'

const P = styled.p`
    font-family: 'Contrail One', sans-serif;
    font-weight: 500;
    font-size: 1.5em;
    line-height: 2em;
    @media (max-width: 750px) {
        line-height: 1.75em;  
    }
`
function Home() {
    return (
        <Layout>
            <div className="page_container">
                <P>Rob Relcher opened Rob's Burgers in 2011 to the acclaim of some people. Rob is a third-generation restaurateur and son of the venerated "Big" Rob Relcher Sr., who owns and operates Big Rob's Diner next to The Junk Yard bar and dance hall. While he learned much about the restaurant business from his controlling and uninspired father, Rob Jr. takes his culinary creations to ever-evolving heights that are only limited by his love for quality hamburgers and his inventive, childlike imagination. Rob runs the business with the help of his adoring wife and three children. The restaurant seats up to 50 people and operates on a first-come-first-serve basis. Take-out and catering are also available.</P>
            </div>
        </Layout>
    )
}
  
export default Home