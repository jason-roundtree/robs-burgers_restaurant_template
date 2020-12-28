import styled from 'styled-components'
import ModalContainer from './ModalContainer'

const ModalContent = styled.div`
    padding: 0 30px 10px 30px;
    font-size: 1.5em;   
    text-align: center;
    width: 90%;
    max-width: 900px;
    /* max-height: 70vh; */
    background: white;
    border-radius: 3px;
    @media (max-width: 700px) {
        font-size: .8em;   
    }
`
const Button = styled.button`
    margin: 10px 10px 0 0;
`
// TODO: style a bit
export default function DeleteOrderOrItemModal({
    isOpen, 
    type,
    handleDelete,
    clearModalState,
    // TODO: render item name/summary if exists?
    itemToDelete=null,
}) {
    // console.log('itemToDelete: ', itemToDelete)
    return (
        <ModalContainer id='modal-container'>
            <ModalContent>
                {isOpen && (
                    <>
                        <p>Are you sure you want to delete this {type}?</p>
                        <Button onClick={handleDelete} >
                            Delete
                        </Button>

                        <Button onClick={clearModalState}>
                            Cancel
                        </Button>
                    </>
                )}
            </ModalContent>
        </ModalContainer>
    )
}