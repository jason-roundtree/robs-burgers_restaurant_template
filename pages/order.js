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
    font-size: .9em;
    font-weight: 400;
    text-align: center;
    padding: 10px;
    border-left: 1px solid rgb(255, 205, 41);
    ${({ active }) => active && `
        background: linear-gradient(rgb(255, 222, 115), rgb(255, 205, 41));
        font-size: 1em;
        font-weight: 500;
    `}
    &:last-child {
        border-right: 1px solid rgb(255, 205, 41);
    }
    &:hover {
        cursor: pointer;
    }
`
export default function Order(props) {
    // TODO: is it ok to derive this state from props? is there a better way?
    const [allMenusAndItems, setAllMenusAndItems] = useState(props.menus)
    const [selectedMenu, setSelectedMenu] = useState(function() {
        const [ defaultMenu ] = allMenusAndItems.filter(menu => {
            return menu.name === 'Basic Burgers'
        })
        return defaultMenu
    })
    // TODO: add `default` menu boolean setting in sanity? 
    // TODO: difference between using useState vs setting directly in useState initializer????
    // useState(() => {
    //     const [ defaultMenu ] = allMenusAndItems.filter(menu => {
    //         return menu.name === 'Basic Burgers'
    //     })
    //     setSelectedMenu(defaultMenu)
    // }, [])

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
                                {menu.name}
                            </MenuLi>
                        )
                    })}
                </MenusUl>
            </nav>
            
            
                {selectedMenu && (
                    <MenuItemsContainer>
                        {selectedMenu.menuItems.map(item => {
                            return (
                                <MenuItem 
                                    item={item} 
                                    id={item._id} 
                                    key={item._id}
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
  	    "options": options[]->
    }
} | order(menu_order asc)`

export async function getStaticProps() {
    const menus = await sanity.fetch(query)
    // console.log('menus: ', menus)
    return {
        props: { menus }
    }
}

