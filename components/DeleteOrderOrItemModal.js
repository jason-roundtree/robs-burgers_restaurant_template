import styled from 'styled-components'
import ModalContainer from './ModalContainer'

const P = styled.p`
    align-self: end;
`
const Button = styled.button`
    margin: 10px 10px 0 0;
    font-size: .95em;
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
        <ModalContainer
            fontSize='1.5em'
            display='grid'
            minHeight='40vh'
            textAlign='center'
        >
            {isOpen && (
                <>
                    <P>Are you sure you want to delete this {type}?</P>
                    
                    <div>
                        <Button onClick={handleDelete} >
                            Delete
                        </Button>

                        <Button onClick={clearModalState}>
                            Cancel
                        </Button>
                    </div>
                </>
            )}
        </ModalContainer>
    )
}