import { useState } from 'react'
import sanity from '../lib/sanity'
import styled from 'styled-components'
import Layout from '../components/Layout'
import MenuItem from '../components/MenuItem'

// const MenusNav = styled.nav`

// `
const MenusUl = styled.ul`
    display: flex;
    justify-content: center;
    /* width:  */
`
const MenuLi = styled.li`
    display: inline-block;
    border: 1px solid black;
    text-align: center;
    padding: 10px 5px;
    /* margin:  */
`
export default function Order(props) {
    const [allMenusAndItems, setAllMenusAndItems] = useState(props.menus)
    const [selectedMenu, setSelectedMenu] = useState(null)
    console.log('props: ', props)
    console.log('allMenusAndItems: ', allMenusAndItems)
    function handleMenuSelection(e) {
        console.log(e.target.id)
        const menuId = e.target.id
        const [ selectedMenu ] = allMenusAndItems.filter(menu => {
            return menu._id === menuId
        })
        console.log(selectedMenu)
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
                                onClick={handleMenuSelection}
                            >
                                {menu.name}
                            </MenuLi>
                        )
                    })}
                </MenusUl>
            </nav>
            
            
            {selectedMenu && selectedMenu.menuItems.map(item => {
                return (
                    <MenuItem 
                        item={item} 
                        id={item._id} 
                        key={item._id}
                    />
                )
            })}
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
}`

export async function getStaticProps() {
    const menus = await sanity.fetch(query)
    // console.log('menus: ', menus)
    return {
        props: { menus }
    }
}

