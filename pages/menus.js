import { useState } from 'react'
import sanity from '../lib/sanity'
import styled from 'styled-components'
import Layout from '../components/Layout'
import MenuItem from '../components/MenuItem'

const MenuItemsContainer = styled.div`
    background-color: rgb(255, 205, 41);
    padding: 10px;
`
const MenusUl = styled.ul`
    display: flex;
    justify-content: center;
`
const MenuLi = styled.li`
    font-size: 1em;
    font-weight: 400;
    text-align: center;
    padding: 10px;
    border-radius: 3px 3px 0 0;
    background: linear-gradient(rgb(255, 147, 145), rgb(255, 112, 110));
    ${({ active }) => active && `
        background: linear-gradient(
            rgb(255, 233, 161), 
            rgb(255, 225, 125), 
            rgb(255, 222, 115), 
            rgb(255, 205, 41)
        );
        font-weight: 500;
    `}
    &:hover {
        color: rgb(255, 205, 41);
        cursor: pointer;
    }
`
const MenuTitle = styled.span`
    font-family: 'Bebas Neue', sans-serif;
    display: inline-block;
    padding: 5px;
    background-color: rgb(219, 21, 18);
    color: white;
    border-radius: 3px;
    &:hover {
        color: rgb(255, 205, 41);
        cursor: pointer;
    }
    ${({ active }) => active && `
        color: rgb(255, 225, 125);
    `}
`

export default function Order(props) {
     const [allMenusAndItems, setAllMenusAndItems] = useState(props.menus)
    // TODO: add `default` menu boolean setting in sanity? 
    const [selectedMenu, setSelectedMenu] = useState(function() {
        const [ defaultMenu ] = allMenusAndItems.filter(menu => {
            return menu.name === 'Basic Burgers'
        })
        return defaultMenu
    })
    
    function handleMenuSelection(e) {
        const menuId = e.target.id
        const [ selectedMenu ] = allMenusAndItems.filter(menu => {
            return menu._id === menuId
        })
        setSelectedMenu(selectedMenu)
    }

    return (
        <Layout>
            <nav>
                <MenusUl>
                    {props.menus.map(menu => {
                        return (
                            <MenuLi
                                id={menu._id}
                                key={menu._id}
                                onClick={handleMenuSelection}
                                active={selectedMenu && (selectedMenu._id === menu._id)}
                            >
                                <MenuTitle 
                                    // className="sign_font" 
                                    active={selectedMenu && (selectedMenu._id === menu._id)}
                                    id={menu._id}
                                >
                                    {menu.name}
                                </MenuTitle>
                            </MenuLi>
                        )
                    })}
                </MenusUl>
            </nav>
            
            {selectedMenu && (
                <MenuItemsContainer>
                    {selectedMenu.menuItems.map((item, i) => {
                        return (
                            <MenuItem 
                                item={item} 
                                id={item._id} 
                                key={item._id}
                                index={i}
                                // TODO: remove this isOrderItem prop if you don't do a separate component for non-ordering menu
                                // isOrderItem={true}
                            />
                        )
                    })}
                </MenuItemsContainer>
            )}
        </Layout>
    )
}

const query = `*[ _type == "menu" ] {
    _id,
    name,
    active,
    comments,
    "menuItems": menu_items[]-> {
        ...,
        add_ons[]->,
        options[]->
    }
} | order(menu_order asc)`

export async function getStaticProps() {
    const menus = await sanity.fetch(query)
    return {
        props: { menus }
    }
}