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
    // This prevents scrolling underneath modals (TODO: what happens when modal extends past bottom of page and becomes scrollable?)
    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => document.body.style.overflow = 'initial'
    }, [])

    useEffect(() => {
        function keyListener(e) {
            if (e.keyCode === 27) {
                // this prop is always the function passed into the modal from the modal's parent (i.e. the function responsible for handling closing modal on ESC doesn't live in the modal itself and isn't always named `clearModalState`)
                return clearModalState()
            } else if (e.keyCode === 9) {
                return handleTabKey(e)
            }
        }
        document.addEventListener('keydown', keyListener)
        return () => document.removeEventListener('keydown', keyListener)
    })

    const modalRef = useRef()
    function handleTabKey(e) {
        const focusableModalElements = modalRef.current.querySelectorAll(
            'input[type="text"], input [type="number"], input[type="radio"], input[type="checkbox"], textarea, select, button, a[href]'
        )
        const firstElement = focusableModalElements[0]
        const lastElement = focusableModalElements[focusableModalElements.length - 1]
        if (!e.shiftKey && document.activeElement === lastElement) {
            firstElement.focus()
            return e.preventDefault()
        }
    
        if (e.shiftKey && document.activeElement === firstElement) {
            lastElement.focus()
            e.preventDefault()
        }
    }
    
    return (
        <ClientOnlyPortal selector="#modal">
            <ModalContainerStyled id='modal-container'>
                <ModalDialog
                    ref={modalRef}
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