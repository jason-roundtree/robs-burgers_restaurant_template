import React, { useEffect, useState } from 'react'
import sanity from '../lib/sanity'
import styled from 'styled-components'
import formatCost from '../utils/formatCost'

const Container = styled.div`
    border: 20px solid rgb(191, 63, 0);
    background: rgb(64, 59, 56);
    width: 60%;
    margin: 0 auto 20px;
    padding: 0 50px 50px 50px;
    color: white;
    font-size: 2.4em;   
    text-align: center;
    @media (max-width: 750px) {
        width: 90%;
    } 
    @media (max-width: 600px) {
        width: 100%;
    } 
`
const H3 = styled.h3`
    /* font-family: 'Bebas Neue', sans-serif; */
    font-family: 'Londrina Shadow', sans-serif;
    margin-top: 10px;
    text-decoration: underline;
`
const P = styled.p`
    font-family: 'Annie Use Your Telescope', cursive;
    margin-top: 10px;
`
const ItemDescription = styled(P)`
    margin: 25px;
    font-size: .9em; 
`
const ItemName = styled(P)`
`
const OriginalItemCost = styled(P)`
    font-family: 'Annie Use Your Telescope', cursive;
    text-decoration: line-through;
`
const ItemCost = styled(OriginalItemCost)`
    text-decoration: none;
    margin-top: 0;
    /* padding: ; */
`
const query = `*[ 
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

export default function MenuItemOfTheDay() {
    const [itemOfTheDay, setItemOfTheDay] = useState({})
    const discount = 1.5

    useEffect(() => {
        sanity.fetch(query)
            .then(data =>  {
                setItemOfTheDay(data[Math.floor(Math.random() * data.length)]) 
            })
            .catch(err => console.log('error fetching eligible menu items of the day'))
    }, [])

    return (
        <Container>
            <H3>Burger of the Day</H3>
            <ItemName>
                {itemOfTheDay.name}
            </ItemName>

            <ItemDescription>
                {itemOfTheDay.description}
            </ItemDescription>

            <OriginalItemCost>
                {formatCost(itemOfTheDay.cost)}
            </OriginalItemCost>

            <ItemCost>
                {formatCost(itemOfTheDay.cost - discount)}
            </ItemCost>
        </Container>
    )
}
