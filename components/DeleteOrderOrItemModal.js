import { useEffect } from 'react'
import styled from 'styled-components'
import ModalContainer from './ModalContainer'

const ModalContent = styled.div`
    display: grid;
    align-content: center;
`
const Button = styled.button`
    margin: 10px 10px 0 0;
    font-size: .95em;
`
const OrderItemDetails = styled.div`
    margin: 10px 0 20px;
    font-size: .85em;
`
const ItemName = styled.span`
    margin-right: 5px;
    font-weight: 500;
`
const AddOnLi = styled.li`
    font-size: .8em;
`
const SpecialReqP = styled.p`
    font-size: .8em;
`

// TODO: style a bit more
export default function DeleteOrderOrItemModal({
    isOpen, 
    type,
    handleDelete,
    clearModalState,
    itemToDelete=null,
}) {
    // console.log('itemToDelete: ', itemToDelete)
    return (
        // TODO: does container or content get focused by default? If so add `tabindex='-1'`
        <ModalContainer
            clearModalState={clearModalState}
            fontSize='1.5em'
            mediaQueryFontSize='1em'
            display='grid'
            minHeight='40vh'
            textAlign='center'
            applyMediaQuery='false'
            ariaLabelledBy={null}
        >
            {isOpen && (
                <ModalContent>
                        <p>Are you sure you want to delete this {type}?</p>
                        {itemToDelete && (
                            <OrderItemDetails>
                                <p>
                                    <ItemName>{itemToDelete.name}</ItemName>
                                    {itemToDelete.option && (
                                        <span>{`(${itemToDelete.option})`}</span>
                                    )}
                                </p>

                                <ul>
                                    {itemToDelete.addOns?.map(addOn => {
                                        return <AddOnLi key={addOn.id}>{addOn.description}</AddOnLi>
                                    })}
                                </ul>

                                {itemToDelete.specialRequests && (
                                    <SpecialReqP>{itemToDelete.specialRequests}</SpecialReqP>
                                )}
                            </OrderItemDetails>
                        )}

                        <div>
                            <Button 
                                autoFocus
                                onClick={handleDelete}
                                className='close-modal-btn'
                            >
                                Delete
                            </Button>

                            <Button 
                                onClick={clearModalState}
                                className='close-modal-btn' 
                            >
                                Cancel
                            </Button>
                        </div>
                </ModalContent>
            )}
        </ModalContainer>
    )
}