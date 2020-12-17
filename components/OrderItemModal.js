import { useState, useContext } from 'react'
import { v4 as uuid } from 'uuid'
import styled from 'styled-components'
import formatCost from '../utils/formatCost'
import AddOns from './AddOns'
import Options from './Options'
import OrderContext from './OrderContext'
import QuantityInput from './QuantityInput'

const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0,0,0,0.3);
`
const ModalDialog = styled.div`
    width: 90%;
    max-width: 900px;
    max-height: 90vh;
    background: white;
    border-radius: 3px;
`
const Button = styled.button`
    margin: 10px 10px 0 0;
`
const OrderEditor = styled.div`
    padding: 10px 5px;
    text-align: center;
`
const QuantityInputStyled = styled(QuantityInput)`
    margin: 5px auto;
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
const Cost = styled.span`
    display: block;
    margin-top: 1em;
`
const FormErrorP = styled.p`
    color: red;
`

// TODO: add validation for pending order items when user goes to new page (i.e. "are you sure you don't want to save this item to your order")
export default function OrderItemModal({ 
    item, 
    isOpen, 
    isItemOfTheDay,
    itemOfDayDiscount,
    handleEditorToggleClick,
    // costIncludingDiscount
}) {
    // console.log('item: ', item)
    const [showNoQuantityError, setShowNoQuantityError] = useState(false)
    const [showNoOptionError, setShowNoOptionError] = useState(false)
    const [orderItemState, setOrderItemState] = useState({
        orderItemId: uuid(),
        specialRequests: '',
        quantity: '',
        addOns: [],
        option: ''
    })
    // console.log('orderItemState: ', orderItemState)
    // console.log('item.cost: ', item.cost)
    const cost = isItemOfTheDay 
        ? item.cost - itemOfDayDiscount 
        : item.cost

    const orderObject = useContext(OrderContext)
    console.log('orderObject: ', orderObject)

    // TODO: add something to UI confirming order was added
    function handleAddToOrderClick() {
        // TODO: there's gotta be a cleaner way to do this logic, right?
        if (
            !orderItemState.quantity || 
            (item.one_item_options && orderItemState.option === '')
        ) {
            if (!orderItemState.quantity) {
                console.log('Please choose quantity')
                setShowNoQuantityError(true)
            } else {
                setShowNoQuantityError(false)
            }
            if (item.one_item_options && orderItemState.option === '') {
                console.log('Please select an option')
                setShowNoOptionError(true)
            } else {
                setShowNoOptionError(false)
            }
        } else {
            orderObject.addItem({
                // itemId is actual item id from Sanity while orderItemId is the uuid for this specific item being ordered so we can later edit quantity or delete orders
                itemId: item._id,
                name: item.name,
                cost: cost,
                ...orderItemState
            })
            setOrderItemState({
                orderItemId: '',
                specialRequests: '',
                quantity: '',
                addOns: [],
                option: ''
            })
            setShowNoQuantityError(false)
            setShowNoOptionError(false)
            handleEditorToggleClick()
        }
    }

    function handleInputChange({ target }) {
        // TODO: easy way to remove leading zeros when user decrements quantity to 0 and then adds numbers after it without user refocusing input?
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
        const index = orderItemState.addOns.findIndex(addOn => {
            return addOn.id === target.id
        })
        if (index > -1) {
            setOrderItemState({
                ...orderItemState,
                addOns: [
                    ...orderItemState.addOns.slice(0, index),
                    ...orderItemState.addOns.slice(index + 1)
                ]
            })
        } else {
            setOrderItemState({
                ...orderItemState,
                addOns: [
                    ...orderItemState.addOns,
                    {
                        id: target.id,
                        cost: target.dataset.cost,
                        description: target.dataset.description
                    }
                ]
            })
        }
    }

    if (!isOpen) {
        return null
    }
    
    return (
        <ModalContainer>
            <ModalDialog>
                {isOpen && (
                    <OrderEditor>
                        {/* TODO: add name and description to modal */}
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
                        <QuantityInputStyled 
                            quantity={orderItemState.quantity}
                            _onChange={handleInputChange}
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

                        {/* TODO: factor in add-ons/options to cost */}
                        <Cost>{formatCost(cost)}</Cost>

                        {showNoQuantityError && (
                            <FormErrorP>Please choose a quantity</FormErrorP>
                        )}

                        {showNoOptionError && (
                            <FormErrorP>Please choose an option</FormErrorP>
                        )}

                        <Button onClick={handleEditorToggleClick}>
                            Cancel
                        </Button>

                        <Button onClick={handleAddToOrderClick}>
                            Add to Order
                        </Button>
                    </OrderEditor>
                )}
            </ModalDialog>
        </ModalContainer>
    )
}