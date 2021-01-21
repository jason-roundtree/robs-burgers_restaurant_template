import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import ClientOnlyPortal from './ClientOnlyPortal'

const ModalContainerStyled = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.7);
`
const ModalDialog = styled.div`
    min-height: ${({ minHeight }) => minHeight && minHeight };
    display: ${({ display }) => display && display };
    font-size: ${({ fontSize }) => fontSize && fontSize };
    text-align: ${({ textAlign }) => textAlign && textAlign };
    width: 90%;
    max-width: 900px;
    max-height: 90vh;
    padding: 0 15px;
    background: white;
    box-shadow: 0 0 10px rgb(255, 205, 41);
    border: 1px solid rgb(255, 205, 41);
    border-radius: 3px;
    @media (max-width: 750px) {
        font-size: ${({ mediaQueryFontSize }) => mediaQueryFontSize && mediaQueryFontSize }  
    }
`

// TODO: do I need isOpen prop on all the modals?
// TODO: do I need to use react Portal for this?
export default function ModalContainer({ 
    children, 
    clearModalState,
    minHeight, 
    display, 
    textAlign,
    fontSize, 
    mediaQueryFontSize,
    ariaLabelledBy='dialog-title'
}) {
    
    useEffect(() => {
        function escKeyListener(e) {
            if (e.keyCode === 27) {
                // this prop is always the function passed into the modal from the modal's parent (i.e. the function responsible for handling closing modal on ESC doesn't live in the modal itself and isn't always named `clearModalState`)
                clearModalState()
            }
        }
        document.addEventListener('keydown', escKeyListener)
        return () => document.removeEventListener('keydown', escKeyListener)
    })

    return (
        <ClientOnlyPortal selector="#modal">
            <ModalContainerStyled id='modal-container'>
                <ModalDialog
                    minHeight={minHeight}
                    display={display}
                    fontSize={fontSize}
                    textAlign={textAlign}
                    mediaQueryFontSize={mediaQueryFontSize}
                    role='dialog' 
                    aria-modal='true' 
                    aria-labelledby={ariaLabelledBy}
                >
                    {children}
                </ModalDialog>
            </ModalContainerStyled>
        </ClientOnlyPortal>
    )
}