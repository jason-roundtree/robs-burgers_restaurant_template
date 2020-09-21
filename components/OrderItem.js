import { useState } from 'react'
import styled from 'styled-components'

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
// TODO: is there a way to inherit Input from textarea?
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
const OrderOption = styled.input`
    margin-right: .75em;
`
const OrderAddOn = styled(OrderOption)`
    /* display: block; */
`

export default function OrderItem({ item }) {
    console.log('item: ', item)
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

                    {/* TODO: make options and add-ons components */}
                    {item.one_item_options && <p>Options</p>}
                    {item.one_item_options && item.one_item_options.map(option => {
                        return (
                            <div>
                                <OrderOption 
                                    type="radio"
                                    name="option"
                                    value={option}
                                    id={option}
                                />
                                <label htmlFor={option}>
                                    {option}
                                </label>
                            </div>
                        )
                    })}

                    {item.add_ons && <p>Add-Ons</p>}
                    {item.add_ons && item.add_ons.map(addOn => {
                        return (
                            <>
                                <OrderAddOn
                                    type="checkbox"
                                    // name={addOn.name}
                                    id={addOn._id}
                                />
                                <label
                                    // htmlFor={addOn.name}
                                >
                                    {addOn.description}
                                </label>
                            </>
                        )
                    })}

                    <label 
                        htmlFor="quantity"
                    >
                        Quantity
                    </label>
                    <QuantityInput 
                        type="number"
                        name="quantity"
                        id="quantity"
                        min="0"
                        value={inputState.quantity}
                        onChange={handleInputChange}
                    />

                    <label 
                        htmlFor="specialRequests"
                    >
                        Special Requests
                    </label>
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