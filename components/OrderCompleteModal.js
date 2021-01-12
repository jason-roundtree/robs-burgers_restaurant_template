import { useRouter } from 'next/router'
import styled from 'styled-components'
import ModalContainer from './ModalContainer'

const ModalContent = styled.div`
    display: grid;
    align-content: center;
    padding: 10px 5px;
    text-align: center;
    min-height: 50vh;
`
// TODO: should this be h3 like MenuItemOfDayModal?
const H2 = styled.h2`
    margin-bottom: 20px;
`
const ButtonContainer = styled.div`
    margin-top: 20px;
`
const Button = styled.button`
    margin: 10px 10px 0 0;
`
const P = styled.p`
    font-family: 'Contrail One', sans-serif;
    font-size: 1.5em;
`

export default function OrderCompleteModal({ clearModalState }) {
    const router = useRouter()
    function handleHomeClick() {
        clearModalState()
        router.replace('/')
    }

    return (
        <ModalContainer>
            <ModalContent>
                <H2>Success!</H2>
                <P>Thank you for your order! We'll get started on it ASAP.</P>
                <P>Please have payment ready upon arrival.</P>

                <ButtonContainer>
                    <Button onClick={clearModalState}>Close</Button>
                    <Button onClick={handleHomeClick}>Home</Button>
                </ButtonContainer>
            </ModalContent>
        </ModalContainer>
    )
}