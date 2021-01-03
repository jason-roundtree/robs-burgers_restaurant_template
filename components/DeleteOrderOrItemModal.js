import { useEffect, useRef } from 'react'
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
// TODO: style a bit more
export default function DeleteOrderOrItemModal({
    isOpen, 
    type,
    handleDelete,
    clearModalState,
    // TODO: render item name/summary if exists?
    itemToDelete=null,
}) {
    const modalContent = useRef(null)

    useEffect(() => {
        function escKeyListener(e) {
          if (e.keyCode === 27) {
            clearModalState()
          }
        }
        document.addEventListener('keydown', escKeyListener)
        return () => document.removeEventListener('keydown', escKeyListener)
    })

    // console.log('itemToDelete: ', itemToDelete)
    return (
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
                <ModalContent 
                    ref={modalContent}
                >
                        <p>Are you sure you want to delete this {type}?</p>
                        
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