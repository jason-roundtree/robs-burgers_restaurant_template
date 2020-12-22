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
    background: rgba(0,0,0,0.5);
`

export default function ModalContainer({ children }) {
    return (
        <ModalContainerStyled id='modal-container'>
            {children}
        </ModalContainerStyled>
    )
}
