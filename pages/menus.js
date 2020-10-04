import Layout from '../components/Layout'
import Link from 'next/link'
import styled from 'styled-components'
import sanity from '../lib/sanity'
// import { route } from 'next/dist/next-server/server/router'
// import StyledHeading from '../components/StyledHeading'

const MenusContainer = styled.div`
    display: flex;
    margin: 0 25px 10px;
    @media (max-width: 640px) {
        flex-direction: column;
        align-items: center;
    }
`
const MenuNameContainer = styled.div`
    background-color: rgb(255, 112, 110);
    margin: 0 10px;
    border-radius: 3px;
    width: 55%;
    &:hover {
        cursor: pointer;
    }
    &:hover span {
        color: rgb(255, 205, 41);
    }
    @media (max-width: 640px) {
        margin-bottom: 20px;
        min-width: 80%;
    }
`
const MenuTitle = styled.span`
    background-color: rgb(219, 21, 18);
    border-radius: 3px;
    color: white;
    text-align: left;
    vertical-align: text-top;
    font-size: 1.5em;
    margin: 7px 7px 50px;
    padding: 4px 8px;
    &:hover {
        cursor: pointer;
    }
    @media (max-width: 640px) {
        margin: 7px 7px 15px;
        min-width: 60%;
    }
`

export default function Menus({ menus }) {
    return (
        <Layout>
            <MenusContainer>
                {menus.map(menu => {
                    // console.log('menu: ', menu)
                    return (
                        <Link 
                            href='/menu/[id]' 
                            as={`/menu/${menu._id}`}
                            // href='/menu/[slug]' 
                            // as={`/menu/${menu.slug.current}`}
                            key={menu._id}
                        >
                            <MenuNameContainer key={menu._id}>
                                {/* <StyledHeading
                                    hTag=`h3`
                                    hTagText={menu.name}
                                    bgColor=`rgb(255, 112, 110)`
                                    borderRadius=`3px`
                                /> */}
                                <MenuTitle className="sign_font">
                                    {menu.name}
                                </MenuTitle>
                            </MenuNameContainer>
                        </Link>
                    )
                })}
                
            </MenusContainer>
        </Layout>
    )
}

const query = `*[ active == true ] {
    _id, 
    name, 
    slug,
    active
} | order(menu_order asc)`
 
export async function getStaticProps() {
    const menus = await sanity.fetch(query)
    return {
        props: { menus }
    }
}


