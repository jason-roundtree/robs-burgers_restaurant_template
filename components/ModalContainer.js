import styled from 'styled-components'

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
const ModalContent = styled.div`
    min-height: ${({ minHeight }) => minHeight && minHeight };
    display: ${({ display }) => display && display };
    font-size: ${({ fontSize }) => fontSize && fontSize };
    text-align: ${({ textAlign }) => textAlign && textAlign };
    width: 90%;
    max-width: 900px;
    max-height: 90vh;
    background: white;
    box-shadow: 0 0 10px rgb(255, 205, 41);
    border: 1px solid rgb(255, 205, 41);
    border-radius: 3px;
    /* TODO: conditionally render so that this doesn't apply to DeleteOrderOrItemModal */
    @media (max-width: 700px) {
        font-size: .8em;   
    }
`

export default function ModalContainer({ 
    children, 
    minHeight, 
    display, 
    fontSize, 
    textAlign 
}) {
    return (
        <ModalContainerStyled id='modal-container'>
            <ModalContent
                minHeight={minHeight}
                display={display}
                fontSize={fontSize}
                textAlign={textAlign}
            >
                {children}
            </ModalContent>
        </ModalContainerStyled>
    )
}
