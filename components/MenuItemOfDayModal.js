// import { useEffect, useState } from 'react'
// import sanity from '../lib/sanity'
import styled from 'styled-components'
import formatCost from '../utils/formatCost'
import ModalContainer from './ModalContainer'

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
const ModalContent = styled.div`
    text-align: center;
    width: 90%;
    max-width: 900px;
    max-height: 90vh;
    background: white;
    border-radius: 3px;
`
const H3 = styled.h3`
    /* font-family: 'Londrina Shadow', sans-serif; */
    font-family: 'Bebas Neue', sans-serif;
    /* text-decoration: underline; */
    margin-top: 10px;
`
const P = styled.p`
    font-family: 'Annie Use Your Telescope', sans-serif;
    margin-top: 10px;
`
const ItemDescription = styled(P)`
    margin: 25px;
    font-size: .9em; 
`
const ItemName = styled(P)`
`
const OriginalItemCost = styled(P)`
    text-decoration: line-through;
`
const ItemCost = styled(OriginalItemCost)`
    text-decoration: none;
    margin-top: 0;
    /* padding: ; */
`

// TODO:
// - store the date that the item of the day was calculated last and only recalculate random if it's a new day 
// - make into a modal
// - move toggle button under menu names or to menu tabs?
// - allow user to add to order directly from board?
// - setup so that it only calculates once per day

export default function MenuItemOfDayModal({ 
    isOpen,
    itemOfDay, 
    discount,
    handleModalBtnClick
}) {
    return (
        <ModalContainer id='modal-container'>
            <ModalContent>
                {isOpen && (
                    <>
                        <H3 className='h3-no-global-style'>Burger of the Day</H3>
                        <ItemName>
                            "{itemOfDay.name}"
                        </ItemName>

                        <ItemDescription>
                            {itemOfDay.description}
                        </ItemDescription>

                        <OriginalItemCost>
                            {formatCost(itemOfDay.cost)}
                        </OriginalItemCost>

                        <ItemCost>
                            {formatCost(itemOfDay.cost - discount)}
                        </ItemCost>

                        <button
                            onClick={() => handleModalBtnClick(null)}
                        >
                            Close
                        </button>
                    </>
                )}
            </ModalContent>
        </ModalContainer>
    )
}
