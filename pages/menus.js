import { useEffect, useState, useRef } from 'react'
import sanity from '../lib/sanity'
import styled from 'styled-components'
import Layout from '../components/Layout'
import MenuItem from '../components/MenuItem'
import MenuItemOfTheDay from '../components/MenuItemOfTheDay'
import OrderItemModal from '../components/OrderItemModal'

const MenuItemsContainer = styled.div`
    background-color: rgb(255, 205, 41);
    padding: 10px;
`
const MenusUl = styled.ul`
    display: flex;
    justify-content: center;
`
const MenuLi = styled.li`
    padding: 5px;
    border-radius: 3px 3px 0 0;
    background: linear-gradient(rgb(255, 147, 145), rgb(255, 112, 110));
    /* background: mistyrose; */
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
    font-size: 1.3em;
    font-weight: 400;
    text-align: center;
    display: inline-block;
    padding: 10px;
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
    @media (max-width: 750px) {
        font-size: 1.1em;
    } 
`
const BtnContainer = styled.div`
    text-align: center; 
`
const BurgerOfTheDayBtn = styled.button`
    margin-bottom: 1em;
`

const itemOfTheDayQuery = `*[ 
    _type == "menu_item" && 
    menu_item_of_day_eligible == true 
] {
    _id,
    name,
  	description,
  	cost,
  	add_ons[]->,
    options[]->
}` 

export default function Order(props) {
     const [allMenusAndItems, setAllMenusAndItems] = useState(props.menus)
    // TODO: add `default` menu boolean setting in sanity? 
    const [selectedMenu, setSelectedMenu] = useState(function() {
        const [ defaultMenu ] = allMenusAndItems.filter(menu => {
            return menu.name === 'Basic Burgers'
        })
        return defaultMenu
    })
    const [orderItemModalIsOpen, setOrderItemModalIsOpen] = useState(false)
    const [activeMenuItem, setActiveMenuItem] = useState(null)
    const [itemOfTheDay, setItemOfTheDay] = useState({})
    const [itemOfTheDayIsActive, setItemOfTheDayIsActive] = useState(false)
    const ITEM_OF_DAY_DISCOUNT = 1.5

    useEffect(() => {
        sanity.fetch(itemOfTheDayQuery)
            .then(data =>  {
                setItemOfTheDay(data[Math.floor(Math.random() * data.length)]) 
            })
            .catch(err => console.log('error fetching eligible menu items of the day: ', err))
    }, [])

    // useEffect(() => {
    //     if (orderItemModalIsOpen) {
    //         document.addEventListener('click', handleOutsideModalClick)
    //     } else {
    //         document.removeEventListener('click', handleOutsideModalClick)
    //     }
    //     // return () => {
    //     //     document.removeEventListener('click', handleOutsideModalClick)
    //     // }
    // }, [orderItemModalIsOpen])

    function handleMenuSelection(e) {
        const menuId = e.target.id
        const [ selectedMenu ] = allMenusAndItems.filter(menu => {
            return menu._id === menuId
        })
        setSelectedMenu(selectedMenu)
    }

    function handleModalBtnClick(item) {
        // console.log('handleModalBtnClick item: ', item)
        if (item) {
            setActiveMenuItem(item)
            setOrderItemModalIsOpen(true)
            document.addEventListener('click', handleOutsideModalClick)
        } else {
            setOrderItemModalIsOpen(false)
            document.removeEventListener('click', handleOutsideModalClick)
        }
    }

    function handleOutsideModalClick(e) {
        // console.log('handleOutsideModalClick')
        if (e.target.id === 'modal-container') {
            handleModalBtnClick(null)
        }
    }

    return (
        <Layout>
                <BtnContainer>
                    <BurgerOfTheDayBtn
                        onClick={() => setItemOfTheDayIsActive(
                            itemOfTheDayIsActive ? false : true
                        )}
                    >
                        {itemOfTheDayIsActive
                            ? 'Hide Burger of the Day'
                            : 'Show Burger of the Day'
                        }
                    </BurgerOfTheDayBtn>
                </BtnContainer>
                
                {itemOfTheDayIsActive && (
                    <MenuItemOfTheDay 
                        itemOfTheDay={itemOfTheDay} 
                        discount={ITEM_OF_DAY_DISCOUNT}
                    />
                )}

                <nav>
                    <MenusUl>
                        {props.menus.map(menu => {
                            return (
                                <MenuLi
                                    id={menu._id}
                                    key={menu._id}
                                    onClick={handleMenuSelection}
                                    active={selectedMenu && 
                                        (selectedMenu._id === menu._id)
                                    }
                                >
                                    <MenuTitle 
                                        active={selectedMenu && 
                                            (selectedMenu._id === menu._id)
                                        }
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
                            const isItemOfTheDay = (item._id === itemOfTheDay._id)
                            // TODO: remove or move this to util?
                            // const cost = isItemOfTheDay 
                            //     ? item.cost - ITEM_OF_DAY_DISCOUNT
                            //     : item.cost

                            return (
                                <MenuItem 
                                    item={item} 
                                    id={item._id} 
                                    key={item._id}
                                    index={i}
                                    handleModalBtnClick={handleModalBtnClick}
                                    isItemOfTheDay={isItemOfTheDay}
                                    // TODO: update this here and inside of MenuItem?
                                    itemOfDayDiscount={
                                        isItemOfTheDay
                                            ? ITEM_OF_DAY_DISCOUNT
                                            : 0
                                    }
                                />
                            )
                        })}
                    </MenuItemsContainer>
                )}

                {activeMenuItem && (
                    <OrderItemModal 
                        item={activeMenuItem}
                        isOpen={orderItemModalIsOpen}
                        isItemOfTheDay={activeMenuItem._id === itemOfTheDay._id}
                        itemOfDayDiscount={
                            activeMenuItem._id === itemOfTheDay._id
                                ? ITEM_OF_DAY_DISCOUNT
                                : 0
                        }
                        handleModalBtnClick={handleModalBtnClick}
                    />
                )}
            
        </Layout>
    )
}

const menusQuery = `*[ _type == "menu" ] {
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
    const menus = await sanity.fetch(menusQuery)
    // const itemOfDayEligibleItems = await sanity.fetch(itemOfDayEligibleItemsQuery)
    return {
        props: { menus }
    }
}