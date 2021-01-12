import { useEffect } from 'react'
import styled from 'styled-components'
import formatCost from '../utils/formatCost'
import ModalContainer from './ModalContainer'

const ModalContent = styled.div`
    padding: 0 30px 10px 30px;
    font-size: 2.4em;   
    text-align: center;
`
const Button = styled.button`
    margin: 10px 10px 0 0;
    font-size: .6em;
`
const H3 = styled.h3`
    margin-top: 10px;
`
const P = styled.p`
    margin-top: 25px;
`
const ItemDescription = styled(P)`
    margin: 5px 15px;
    font-size: .75em; 
`
const ItemName = styled(P)`
    font-family: 'Bebas Neue', sans-serif;
    color: rgb(255, 112, 110);
`
const OriginalItemCost = styled(P)`
    text-decoration: line-through;
    font-size: .75em; 
    margin-top: 5px;
`
const ItemCost = styled.p`
    /* font-family: 'Contrail One', sans-serif; */
    text-decoration: none;
    margin: 0 0 15px;
`

// TODO:
// - add image/placeholder?
// - setup so that it only calculates once per day and store the date that the item of the day was calculated last and only recalculate random if it's a new day 
export default function MenuItemOfDayModal({ 
    isOpen,
    itemOfDay, 
    discount,
    handleModalBtnClick
}) {

    useEffect(() => {
        function escKeyListener(e) {
          if (e.keyCode === 27) {
            handleModalBtnClick()
          }
        }
        document.addEventListener('keydown', escKeyListener)
        return () => document.removeEventListener('keydown', escKeyListener)
    })

    return (
        <ModalContainer mediaQueryFontSize='.8em'> 
            {isOpen && (
                // TODO: add role and aria to other modals but is it OK to use same id?
                <ModalContent role='dialog' aria-labelledby='dialog-title'>
                    <H3 id='dialog-title' className='h3-no-global-style item-of-day-title'>
                        Burger of the Day
                    </H3>

                    <ItemName>
                        {itemOfDay.name}
                    </ItemName>

                    <ItemDescription>
                        {itemOfDay.description}
                    </ItemDescription>

                    <OriginalItemCost>
                        {formatCost(itemOfDay.cost)}
                    </OriginalItemCost>

                    <ItemCost className='cost'>
                        {formatCost(itemOfDay.cost - discount)}
                    </ItemCost>

                    <Button onClick={() => handleModalBtnClick(itemOfDay)}>
                        Order
                    </Button>

                    <Button onClick={() => handleModalBtnClick(null)}>
                        Close
                    </Button>
                </ModalContent>
            )}
        </ModalContainer>
    )
}
