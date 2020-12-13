import { useState } from 'react'
import styled from 'styled-components'
import formatCost from '../utils/formatCost'
import OrderItem from '../components/OrderItem'

const ItemContainer = styled.div`
    padding: 12px;
    border: 1px solid rgb(255, 205, 41);
    border-radius: 3px;
    font-size: 16px;
    margin: 10px 0;
    background-color: white;
`
const ItemInfoContainer = styled.div`
    display: grid;
    grid-template-columns: 200px 3fr;
    column-gap: 12px;   
    @media (max-width: 500px) {
        grid-template-columns: 1fr;    
    }
`
const ItemImage = styled.img`
    width: 100%;
`
const ItemTextContainer = styled.div`
    position: relative;
`
const ItemTitle = styled.p`
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.5em;
    color: rgb(255, 112, 110);
    display: inline-block;
    border-radius: 5px;
    margin: 0 0 5px 0;
`
const AddToOrderButton = styled.button`
    display: block;
    position: absolute;
    bottom: 0;
    right: 0;
    @media (max-width: 500px) {
        margin-top: 1em;   
        position: relative;
    }
`
const ItemOfTheDayPreDiscount = styled.p`
    text-decoration: line-through;
`
// const ItemOption = styled.p`
//     font-size: .9em;
//     &::before {
//         content: '🍔 ';
//     }
// `

export default function MenuItem({ 
    item, 
    index, 
    isItemOfTheDay,
    itemOfDayDiscount 
}) {
    console.log('item: ', item)
    console.log('isItemOfTheDay: ', isItemOfTheDay)
    const [itemEditorIsOpen, setItemEditorIsOpen] = useState(false)

    function handleEditorToggleClick() {
        setItemEditorIsOpen(itemEditorIsOpen ? false : true)
    }
    
    const cost = isItemOfTheDay 
        ? item.cost - itemOfDayDiscount
        : item.cost

    return (
        <ItemContainer>
            <ItemInfoContainer>
                <ItemImage 
                    // TODO: remove this when actual images are used
                    src={(index % 2) ? '/burger_angels_1.jpg' : '/burger_angels_2.jpg'}
                    alt={`placeholder image for ${item.name}`}
                    width="200"
                />

                <ItemTextContainer>
                    <ItemTitle>
                        {/* TODO: styled Burger of the Day text differently */}
                        {item.name} {isItemOfTheDay ? '(Burger of the Day)' : ''}
                    </ItemTitle>
                    <p>{item.description}</p>
                    {isItemOfTheDay && (
                        <ItemOfTheDayPreDiscount>
                            {formatCost(cost + itemOfDayDiscount)}
                        </ItemOfTheDayPreDiscount>
                    )}
                    <p>{formatCost(cost)}</p>

                    {item.options && 
                        item.options.map((option, i) => {
                            return (
                                <ItemOption key={i}>
                                    {option}
                                </ItemOption>
                            )
                        })
                    }
                    {!itemEditorIsOpen && (
                        <AddToOrderButton onClick={handleEditorToggleClick}>
                            Order
                        </AddToOrderButton>
                    )}
                </ItemTextContainer>
            </ItemInfoContainer>       

            {itemEditorIsOpen && (
                <OrderItem 
                    item={item}
                    costIncludingDiscount={cost}
                    itemEditorIsOpen={itemEditorIsOpen}
                    handleEditorToggleClick={handleEditorToggleClick}
                />
            )}
            
            
        </ItemContainer>
    )
}