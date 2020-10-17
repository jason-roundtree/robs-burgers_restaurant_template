import { useState, useContext } from 'react'
import styled from 'styled-components'
import formatCost from '../utils/formatCost'
import Layout from '../components/Layout'
import OrderContext from '../components/OrderContext'
import QuantityInput from '../components/QuantityInput'

const OrderItemContainer = styled.div`
    border: 1px solid black;
    border-radius: 3px;
    padding: 10px;
    margin-top: 3px;
`
const GridColContainer = styled.div`
    display: grid;
    grid-template-columns: 75% 25%;
    grid-template-rows: 75% 25%;
`
const TopLeftRow = styled.div`
    grid-column-start: 1;
    grid-column-end: 2;
`
const BtmLeftRow = styled.div`
    grid-column-start: 1;
    grid-column-end: 2;
    padding-top: 5px;
`
const TopRightRow = styled.div`
    grid-column-start: 2;
    grid-column-end: 3;
    padding-bottom: 10px;
`
const BtmRightRow = styled.div`
    grid-column-start: 2;
    grid-column-end: 3;
    justify-self: end;
`
const QuantityInputStyled = styled(QuantityInput)`
    height: 100%;
    width: 100%;
    font-size: 1.2em;
`
const AddOnLi = styled.li`
    margin-left: 10px;
    font-size: .9em;
`
const Span = styled.span`
    margin-right: 5px;
`
const SpecialRequestP = styled(AddOnLi)``
const DeleteItemBtn = styled.button`
    
`
const OrderEndContainer = styled.div`
    width: 100%;
    margin: 15px auto 0;
    text-align: center;
    display: grid;
    justify-content: center;
`
const SubmitOrderBtn = styled.button`
    margin-bottom: 10px;
    font-size: 1em;
`
const DeleteOrderBtn = styled.button`
    
`

export default function OrderSummary() {
    const orderObject = useContext(OrderContext)
    // console.log('order summary context: ', orderObject)
    const totalCost = orderObject.orderItems.reduce((total, orderItem) => {
        let addOnTotal = 0
        if (orderItem.addOns.length > 0) {
            addOnTotal = orderItem.addOns.reduce((total, addOn) => {
                return total + +addOn.cost
            }, 0)
        }
        
        return total + 
            (orderItem.quantity * addOnTotal) + 
            (orderItem.quantity * orderItem.cost)
        
    }, 0)
    
    function handleQuantityChange(e, orderItemId) {
        orderObject.editItemQuantity(+e.target.value, orderItemId)
    }

    return (
        <Layout>
            <h2>Order Summary</h2>
            {orderObject.orderItems.map(item => {
                // console.log(item)
                const option = item.option
                let addOnsTotal = 0
                if (item.addOns.length > 0) {
                    addOnsTotal = item.addOns.reduce((total, addOn) => {
                        return total + +addOn.cost
                    }, 0)
                }

                return (
                    // TODO: format costs below
                    <OrderItemContainer key={item.orderItemId}>
                        <GridColContainer>
                            <TopLeftRow>
                                <Span>
                                    {item.name}
                                </Span> 
                                
                                {option && (
                                    <Span>
                                        {`(${option})`}
                                    </Span>
                                )} 

                                <Span>
                                    {formatCost(item.cost)}
                                </Span>

                                {item.addOns.length > 0 && (
                                    <ul>
                                        {item.addOns.map(addOn => {
                                            return (
                                                <AddOnLi key={addOn.id}>
                                                    <Span>
                                                        {addOn.description}
                                                    </Span>
                                                    <span>{formatCost(addOn.cost)}</span>
                                                </AddOnLi>
                                            )
                                        })}
                                    </ul>
                                )}
                                
                                {item.specialRequests && (
                                    <SpecialRequestP as="p">
                                        Special Request: 
                                        <em> {item.specialRequests}</em>
                                    </SpecialRequestP>
                                )}
                            </TopLeftRow>
                            
                            <TopRightRow>
                                <QuantityInputStyled 
                                    quantity={item.quantity}
                                    _onChange={e => {
                                        handleQuantityChange(e, item.orderItemId)
                                    }}
                                />
                            </TopRightRow>
                        
                            <BtmLeftRow>
                                <p>
                                    Subtotal: {formatCost(
                                        (item.quantity * item.cost) +
                                        (item.quantity * addOnsTotal)
                                    )}
                                </p>
                            </BtmLeftRow>

                            <BtmRightRow>
                                {/* TODO: add validation */}
                                <DeleteItemBtn
                                    onClick={() => {
                                        orderObject.removeItem(item.orderItemId)
                                    }}
                                >
                                    Delete Item
                                </DeleteItemBtn>
                            </BtmRightRow>
                           
                        </GridColContainer>
                        
                    </OrderItemContainer>
                )
            })}

            {/* TODO: should item be deleted if quantity is set to 0? */}
            {totalCost > 0 && (
                <OrderEndContainer>
                    <span>Total: {formatCost(totalCost)}</span>
                    {/* TODO: add validation */}
                    <SubmitOrderBtn>
                        Submit Order
                    </SubmitOrderBtn>

                    <DeleteOrderBtn
                        onClick={orderObject.removeOrder}
                    >
                        Delete Order
                    </DeleteOrderBtn>
                </OrderEndContainer>
            )}
        </Layout>
    )
}
