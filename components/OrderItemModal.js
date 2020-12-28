import { useState, useContext, useRef } from 'react'
import { v4 as uuid } from 'uuid'
import styled from 'styled-components'
import formatCost from '../utils/formatCost'
import calculateCostWithDiscount from '../utils/calculateCostWithDiscount'
import AddOns from './AddOns'
import Options from './Options'
import QuantityInput from './QuantityInput'
import OrderContext from './OrderContext'
import ModalContainer from './ModalContainer'

const ModalContent = styled.div`
    width: 90%;
    max-width: 900px;
    max-height: 90vh;
    background: white;
    border-radius: 3px;
`
const H3 = styled.h3`
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.75em;
    color: rgb(255, 112, 110);
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
`
const FormErrorP = styled.p`
    color: red;
`

// TODO: add something to UI confirming order was added
// TODO: factor in add-ons/options to cost
// TODO: add validation for pending order items when user goes to new page 
// (i.e. "are you sure you don't want to save this item to your order")
export default function OrderItemModal({ 
    item, 
    isOpen, 
    isItemOfDay,
    itemOfDayDiscount,
    handleModalBtnClick
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
    console.log('orderItemState: ', orderItemState)
    // console.log('item.cost: ', item.cost)
    const cost = calculateCostWithDiscount(item, isItemOfDay, itemOfDayDiscount)

    const orderObject = useContext(OrderContext)
    // console.log('orderObject: ', orderObject)

    function handleAddToOrderClick() {
        // TODO: is there a cleaner way to do this logic?
        if (
            !orderItemState.quantity || 
            (item.one_item_options && orderItemState.option === '')
        ) {
            if (!orderItemState.quantity) {
                // console.log('Please choose quantity')
                setShowNoQuantityError(true)
            } else {
                setShowNoQuantityError(false)
            }
            if (item.one_item_options && orderItemState.option === '') {
                // console.log('Please select an option')
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
            clearOrderState()
            setShowNoQuantityError(false)
            setShowNoOptionError(false)
            handleModalBtnClick(null)
        }
    }

    function clearOrderState() {
        setOrderItemState({
            orderItemId: '',
            specialRequests: '',
            quantity: '',
            addOns: [],
            option: ''
        })
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

    function handleCancelOrder() {
        clearOrderState()
        handleModalBtnClick(null)
    }

    // TODO: is this still needed?
    if (!isOpen) {
        return null
    }
    
    return (
        <ModalContainer id='modal-container'>
            <ModalContent>
                {isOpen && (
                    <OrderEditor>
                        <div>
                            <H3 className='h3-no-global-style'>ORDER DETAILS</H3>
                        </div>
                        {/* TODO: styled these 3 a little different than options below? */}
                        <h4>{item.name}</h4>
                        <p>{item.description}</p>
                        <Cost className='cost'>{formatCost(cost)}</Cost>

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

                        {showNoQuantityError && (
                            <FormErrorP>Please choose a quantity</FormErrorP>
                        )}

                        {showNoOptionError && (
                            <FormErrorP>Please choose an option</FormErrorP>
                        )}

                        <Button onClick={handleAddToOrderClick}>
                            Add to Order
                        </Button>

                        <Button onClick={() => handleCancelOrder()}>
                            Cancel
                        </Button>
                        
                    </OrderEditor>
                )}
            </ModalContent>
        </ModalContainer>
    )
}