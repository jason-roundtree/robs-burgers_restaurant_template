import { useEffect, useState, useContext } from 'react'
import styled from 'styled-components'
import Layout from '../components/Layout'
import OrderContext from '../components/OrderContext'
import QuantityInput from '../components/QuantityInput'

const OrderItemContainer = styled.div`
    border: 1px solid black;
    border-radius: 3px;
    padding: 10px;
    margin-top: 3px;
`
const DeleteButton = styled.button`
    display: block;
`
export default function OrderSummary() {
    const orderObject = useContext(OrderContext)
    // console.log('order summary context: ', orderObject)
    {/* TODO: fix cost to account for add-ons */}
    const totalCost = orderObject.orderItems.reduce((total, orderItem) => {
        return total + (orderItem.quantity * orderItem.cost)
    }, 0)
    
    function handleQuantityChange(e, orderItemId) {
        orderObject.editItemQuantity(+e.target.value, orderItemId)
    }

    return (
        <Layout>
            <h2>Order Summary</h2>
            {orderObject.orderItems.map(item => {
                return (
                    <OrderItemContainer key={item.orderItemId}>
                        <span>{item.name} - </span> 
                        <span>${item.cost}</span>

                        <QuantityInput
                            quantity={item.quantity}
                            _onChange={e => {
                                handleQuantityChange(e, item.orderItemId)
                            }}
                        />

                        <span>${item.cost * item.quantity}</span>

                        {/* TODO: add validation */}
                        <DeleteButton
                            onClick={() => orderObject.removeItem(item.orderItemId)}
                        >Delete</DeleteButton>
                    </OrderItemContainer>
                )
            })}

            {/* TODO: should item be deleted if quantity is set to 0? */}
            
            {totalCost > 0 && (
                <>
                    <span>Total: {totalCost}</span>
                    {/* TODO: add validation */}
                    <button
                        onClick={orderObject.removeOrder}
                    >
                        Clear Order
                    </button>
                </>
            )}
        </Layout>
    )
}
