import { useState } from 'react'
import styled from 'styled-components'
import AddOns from './AddOns'
import Options from './Options'

const Button = styled.button`
    margin: 10px 0 0;
    padding: 3px 4px;
    border-radius: 3px;
    border: none;
    background-color: rgb(255, 112, 110);
    color: white;
    &:hover {
        cursor: pointer;
        background: rgb(227, 70, 68);
    }
`
const OrderEditor = styled.div`
    padding: 10px 5px;
    text-align: center;
`
const Input = styled.input`
    padding: 5px;
    display: block;
    margin: 5px auto;
    width: 80%;
`
const QuantityInput = styled(Input)`
    width: 50px;
`
const SpecialRequests = styled.textarea`
    margin: 5px auto;
    width: 60%;
    height: 70px;
    padding: 3px;
    display: block;
    @media (max-width: 640px) {
        width: 80%;
        height: 100px;
    }
    @media (max-width: 400px) {
        width: 100%;
        /* height: 100px; */
    }
`
const SectionLabel = styled.label`
    font-weight: 500;
    display: inline-block;
    margin-top: 1em;
`

export default function OrderItem({ item }) {
    // console.log('item: ', item)
    const [itemEditorIsOpen, setItemEditorIsOpen] = useState(false)
    // TODO: how to setup options fields to dynamically be held in state?
    const [inputState, setInputState] = useState({
        specialRequests: '',
        quantity: 0
    })
    // console.log('inputState: ', inputState)

    function handleBtnClick() {
        setItemEditorIsOpen(itemEditorIsOpen ? false : true)
    }

    function handleInputChange({ target }) {
        setInputState({
            ...inputState,
            [target.name]: target.value
        })
    }

    return (
        <div>
            <Button onClick={handleBtnClick}>
                {!itemEditorIsOpen ? 'Order' : 'Cancel'}
            </Button>

            {itemEditorIsOpen && (
                <OrderEditor>
                    <h3>Order Details</h3>

                    {item.one_item_options && (
                        <Options options={item.one_item_options} />
                    )}

                    {item.add_ons && (
                        <AddOns addOns={item.add_ons} />
                    )}
                 
                    <SectionLabel 
                        htmlFor="quantity"
                    >
                        Quantity
                    </SectionLabel>
                    <QuantityInput 
                        type="number"
                        name="quantity"
                        id="quantity"
                        min="0"
                        value={inputState.quantity}
                        onChange={handleInputChange}
                    />

                    <SectionLabel 
                        htmlFor="specialRequests"
                    >
                        Special Requests
                    </SectionLabel>
                    <SpecialRequests 
                        name="specialRequests"
                        id="specialRequests"
                        value={inputState.specialRequests}
                        onChange={handleInputChange}
                        placeholder="Not all special requests can be accomodated"
                    />

                </OrderEditor>
            )}
        </div>
    )
}