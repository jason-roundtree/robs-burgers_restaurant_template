import Layout from '../components/Layout'
import Link from 'next/link'
import styled from 'styled-components'
import sanity from '../lib/sanity'

const MenusContainer = styled.div`
    display: flex;
    margin: 0 25px;
    @media (max-width: 640px) {
        flex-direction: column;
        align-items: center;
    }
`
const MenuNameContainer = styled.div`
    background-color: rgb(252, 98, 98);
    margin: 0 10px;
    border-radius: 3px;
    width: 55%;
    &:hover {
        cursor: pointer;
    }
    @media (max-width: 640px) {
        margin-bottom: 20px;
        min-width: 80%;
    }
`
const MenuTitle = styled.span`
    background-color: rgb(0, 0, 0);
    text-align: left;
    vertical-align: text-top;
    font-size: 1.5em;
    display: inline-block;
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

export default function Menus(props) {
    return (
        <Layout>
            <MenusContainer>
                {props.menus.map(menu => {
                    return (
                        <Link 
                            href='/menu/[id]' 
                            // TODO: change this to slug?
                            as={`/menu/${menu._id}`}
                            key={menu._id}
                        >
                            <MenuNameContainer key={menu._id}>
                                <MenuTitle className="sign_font">{menu.name}</MenuTitle>
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
    active
} | order(menu_order asc)`
 
Menus.getInitialProps = async () => {
    return {
      menus: await sanity.fetch(query)
    }
}
