import { useState, useContext } from 'react'
import styled from 'styled-components'
import AddOns from './AddOns'
import Options from './Options'
import OrderContext from './OrderContext'

const Button = styled.button`
    margin: 10px 10px 0 0;
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
    padding: 3px 5px;
    display: block;
    @media (max-width: 640px) {
        width: 80%;
        height: 100px;
    }
    @media (max-width: 400px) {
        width: 100%;
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
    const [orderItemState, setOrderItemState] = useState({
        specialRequests: '',
        quantity: 0,
        addOns: [],
        option: null
    })
    console.log('orderItemState: ', orderItemState)

    const orderObject = useContext(OrderContext)
    console.log('orderObject: ', orderObject)

    function handleEditorToggleClick() {
        setItemEditorIsOpen(itemEditorIsOpen ? false : true)
    }

    // TODO: add something to UI confirming order was added
    function handleAddToOrderClick() {
        // TODO: validate count

        // TODO: validate option is picked if necessary (add options required field?)

        orderObject.addItem(orderItemState)
        setOrderItemState({
            specialRequests: '',
            quantity: 0,
            addOns: [],
            option: null
        })
        handleEditorToggleClick()
    }

    function handleInputChange({ target }) {
        let value = target.value
        if (target.name === 'quantity') {
            value = +value
        } 
        setOrderItemState({
            ...orderItemState,
            [target.name]: value
        })
    }

    function handleAddOnToggle({ target }) {
        if (!orderItemState.addOns.includes(target.id)) {
            setOrderItemState({
                ...orderItemState,
                addOns: [...orderItemState.addOns, target.id]
            })
        } else {
            const filteredItems = orderItemState.addOns.filter(addOn => {
                return addOn !== target.id
            })
            setOrderItemState({
                ...orderItemState,
                addOns: filteredItems
            })
        }
    }

    return (
        <div>
            {!itemEditorIsOpen 
                ? (
                    <Button 
                        onClick={handleEditorToggleClick}
                    >
                        Order
                    </Button>
                )
                : ( 
                    <>
                        <Button onClick={handleEditorToggleClick}>
                            Cancel
                        </Button>

                        <Button onClick={handleAddToOrderClick}>
                            Add to Order
                        </Button>
                    </>
                )
            }
            
            {itemEditorIsOpen && (
                <OrderEditor>
                    <h3>Order Details</h3>

                    {item.one_item_options && (
                        <Options 
                            options={item.one_item_options}
                            onOptionChange={handleInputChange}
                            checkedOption={orderItemState.option}
                        />
                    )}

                    {item.add_ons && (
                        <AddOns 
                            addOns={item.add_ons} 
                            onAddOnChange={handleAddOnToggle}
                            activeAddOns={orderItemState.addOns}
                        />
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
                        value={orderItemState.quantity}
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
                        value={orderItemState.specialRequests}
                        onChange={handleInputChange}
                        placeholder="Not all special requests can be accomodated"
                    />

                </OrderEditor>
            )}
        </div>
    )
}