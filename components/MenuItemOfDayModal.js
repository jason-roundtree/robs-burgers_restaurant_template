import styled from 'styled-components'
import formatCost from '../utils/formatCost'
import ModalContainer from './ModalContainer'

const ItemOfDay = styled.div`
    padding: 0 30px 10px 30px;
    font-size: 2.4em;   
    text-align: center;
`
const ModalContent = styled.div`
    width: 90%;
    max-width: 900px;
    max-height: 90vh;
    background: white;
    border-radius: 3px;
    @media (max-width: 700px) {
        font-size: .8em;   
    }
`
const Button = styled.button`
    margin: 10px 10px 0 0;
    font-size: .6em;
`
const H3 = styled.h3`
    margin-top: 10px;
`
const P = styled.p`
    margin-top: 10px;
`
const ItemDescription = styled(P)`
    margin: 15px;
    font-size: .75em; 
`
const ItemName = styled(P)`
    font-family: 'Bebas Neue', sans-serif;
    color: rgb(255, 112, 110);
`
const OriginalItemCost = styled(P)`
    text-decoration: line-through;
    font-size: .75em; 
`
const ItemCost = styled.p`
    font-family: 'Contrail One', sans-serif;
    text-decoration: none;
    margin-top: 0;
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
    return (
        <ModalContainer id='modal-container'>
            <ModalContent id='item-modal-content'>
                {isOpen && (
                    <ItemOfDay>
                        <H3 className='h3-no-global-style item-of-day-title'>
                            {/* 🍔 🎉 &nbsp; */}
                            Burger of the Day
                            {/* &nbsp; 🎉 🍔 */}
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
                    </ItemOfDay>
                )}
            </ModalContent>
        </ModalContainer>
    )
}
