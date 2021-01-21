import { useState, useContext, useEffect, useRef } from 'react'
import { v4 as uuid } from 'uuid'
import styled from 'styled-components'
import formatCost from '../utils/formatCost'
import calculateCostWithDiscount from '../utils/calculateCostWithDiscount'
import AddOns from './AddOns'
import Options from './Options'
import QuantityInput from './QuantityInput'
import OrderContext from './OrderContext'
import ModalContainer from './ModalContainer'

const H3 = styled.h3`
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.75em;
    color: rgb(255, 112, 110);
`
const Button = styled.button`
    margin: 10px 10px 0 0;
`
const ModalContent = styled.div`
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
const ItemNameP = styled(SectionLabel)`
`
const Cost = styled.span`
    display: block;
`
const FormErrorP = styled.p`
    color: red;
`

// TODO: check add-on/options on Enter keypress
// TODO: add something to UI confirming order was added
// TODO: factor in add-ons/options to cost?
// TODO: add validation for pending order items when user goes to new page 
// (i.e. "are you sure you don't want to save this item to your order")
export default function OrderItemModal({ 
    item, 
    isOpen, 
    isItemOfDay,
    itemOfDayDiscount,
    handleModalBtnClick,
    showNoQuantityError,
    showNoOptionError,
    setShowNoQuantityError,
    setShowNoOptionError
}) {
    // console.log('order item: ', item)
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
    const modalRef = useRef(null)
    // useEffect(() => {
    //     // console.log('here')
    //     // isMounted.current = true
    //     // return () => (isMounted.current = false)
    //     console.log('JAHDSJHKJ')
    //     // if (modalRef.current) {
    //     //     console.log('modalRef.current: ', modalRef.current)
    //         const firstInput = modalRef.current.querySelector('input')
    //         console.log('firstInput: ', firstInput)
    //         firstInput.focus()
    //     // }
    // }, [])

    // useEffect(() => {
    //     // console.log('now here')
    //     const firstInput = modalRef.current.querySelector('input')
    //     console.log('firstInput: ', firstInput)
    //     firstInput.focus()
    // })

    function handleAddToOrderClick() {
        // TODO: is there a cleaner way to do this logic?
        if (
            !orderItemState.quantity || 
            (item.one_item_options && orderItemState.option === '')
        ) {
            if (!orderItemState.quantity) {
                setShowNoQuantityError(true)
            } else {
                setShowNoQuantityError(false)
            }
            if (item.one_item_options && orderItemState.option === '') {
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
        setShowNoQuantityError(false)
        setShowNoOptionError(false)
    }

    // TODO: this used to be necessary but something changed and it no longer is. Research when returning early is necessary
    // if (!isOpen) { return null }
    
    return (
        <ModalContainer 
            mediaQueryFontSize='.8em'
            clearModalState={handleModalBtnClick}
        >
            {isOpen && (
                <ModalContent ref={el => modalRef.current = el}>
                {/* <ModalContent> */}
                    <div>
                        <H3 id='dialog-title' className='h3-no-global-style'>
                            ORDER DETAILS
                        </H3>
                    </div>
                    <ItemNameP as='p'>{item.name}</ItemNameP>
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
                            autoFocus
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
                        handleQuantityChange={handleInputChange}
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

                    <Button 
                        onClick={handleAddToOrderClick}
                        className='close-modal-btn' 
                    >
                        Add to Order
                    </Button>

                    <Button 
                        onClick={handleCancelOrder}
                        className='close-modal-btn' 
                    >
                        Cancel
                    </Button>
                    
                </ModalContent>
            )}
        </ModalContainer>
    )
}