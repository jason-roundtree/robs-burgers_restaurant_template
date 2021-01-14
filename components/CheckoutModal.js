import { useState } from 'react'
import styled from 'styled-components'
import ModalContainer from './ModalContainer'

const ModalContent = styled.div`
    display: grid;
    align-content: center;
    justify-items: center;
    padding: 10px 5px;
    text-align: center;
    min-height: 50vh;
`
// TODO: should this be h3 like MenuItemOfDayModal?
const H2 = styled.h2`
    margin-bottom: 20px;
`
const Form = styled.form`
    width: 80%;
`
const Label = styled.label`
    display: block;
    font-weight: 500;
`
const Input = styled.input`
    width: 90%;
    height: 45px;
    padding: 3px 7px;
    margin-bottom: 10px;
    font-family: 'M PLUS Rounded 1c',sans-serif;
    font-size: 1.3em;
    /* TODO: add breakpoint to adjust font-size and width 100%; */
`
// TODO: look into fixing this button styling here and elsewhere as it seems it's not centering
const Button = styled.button`
    margin: 10px 10px 0 0;
`
// TODO: add labels or at least aria-label and other aria attributes for forms
// TODO: add select input to choose time of pickup
export default function CheckoutModal({
    clearModalState
}) {
    const [inputState, setInputState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
    })

    function handleInputChange({ target }) {
        setInputState(inputState => {
            return {
                ...inputState,
                [target.id]: [target.value]
            }
        })
    }

    return (
        <ModalContainer
            clearModalState={clearModalState}
        >
            <ModalContent>
                <H2>Complete Order</H2>

                <Form>
                    <Label htmlFor='firstName'>First Name</Label>
                    {/* TODO: why does this border look darker and have no radius when not focused? */}
                    <Input 
                        type='text'
                        id='firstName'
                        value={inputState.firstName}
                        onChange={handleInputChange}
                        // placeholder='First name'
                    />

                    <Label htmlFor='lastName'>Last Name</Label>
                    <Input 
                        type='text'
                        id='lastName'
                        value={inputState.lastName}
                        onChange={handleInputChange}
                        // placeholder='Last name'
                    />

                    <Label htmlFor='email'>Email</Label>
                    <Input 
                        type='email'
                        id='email'
                        value={inputState.email}
                        onChange={handleInputChange}
                        // placeholder='Email'
                    />

                    <Label htmlFor='phone'>Phone Number</Label>
                    <Input 
                        type='tel'
                        id='phone'
                        pattern='[0-9]{3}[0-9]{3}[0-9]{4}'
                        value={inputState.phone}
                        onChange={handleInputChange}
                        // TODO: Or should i have 3 separate fields?
                        // placeholder='(XXX-XXX-XXXX)'
                    />

                    <div>
                        <Button>
                            Submit Order
                        </Button>

                        <Button>
                            Back to Order Summary
                        </Button>
                    </div>
                </Form>
            </ModalContent>
        </ModalContainer>
    )
}