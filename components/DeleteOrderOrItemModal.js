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
    font-size: .75em;
`

// TODO: style a bit more
export default function DeleteOrderOrItemModal({
    isOpen, 
    type,
    handleDelete,
    clearModalState,
    itemToDelete=null,
}) {
    
    // TODO: is there a good way to move this escKeyListener fn to it's own file?
    useEffect(() => {
        function escKeyListener(e) {
          if (e.keyCode === 27) {
            clearModalState()
          }
        }
        document.addEventListener('keydown', escKeyListener)
        return () => document.removeEventListener('keydown', escKeyListener)
    })

    console.log('itemToDelete: ', itemToDelete)
    return (
        // TODO: does container or content get focused by default? If so add `tabindex='-1'`
        <ModalContainer
            fontSize='1.5em'
            mediaQueryFontSize='1em'
            display='grid'
            minHeight='30vh'
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
                                        return <AddOnLi>{addOn.description}</AddOnLi>
                                    })}
                                </ul>
                            </OrderItemDetails>
                        )}

                        <div>
                            <Button onClick={handleDelete} >
                                Delete
                            </Button>

                            <Button onClick={clearModalState}>
                                Cancel
                            </Button>
                        </div>
                </ModalContent>
            )}
        </ModalContainer>
    )
}