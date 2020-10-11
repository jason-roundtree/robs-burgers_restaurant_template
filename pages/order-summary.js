import { useState, useContext } from 'react'
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
const DeleteItem = styled.button`
    display: block;
`
const AddOnLi = styled.li`
    margin-left: 10px;
`
// const DeleteOrderButton = styled(DeleteItem)`
// `

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
                        <span>{item.name} {option && `(${option})`} - </span> 
                        <span>${item.cost}</span>

                        {item.addOns.length > 0 && (
                            <ul>
                                {item.addOns.map(addOn => {
                                    return (
                                        <AddOnLi>
                                            <span>{addOn.description} - </span>
                                            <span>${addOn.cost}</span>
                                        </AddOnLi>
                                    )
                                    
                                })}
                            </ul>
                        )}

                        <QuantityInput
                            quantity={item.quantity}
                            _onChange={e => {
                                handleQuantityChange(e, item.orderItemId)
                            }}
                        />

                        <span>Subtotal: ${
                            (item.quantity * item.cost) +
                            (item.quantity * addOnsTotal)
                        }</span>

                        {/* TODO: add validation */}
                        <DeleteItem
                            onClick={() => orderObject.removeItem(item.orderItemId)}
                        >
                            Delete
                        </DeleteItem>
                    </OrderItemContainer>
                )
            })}

            {/* TODO: should item be deleted if quantity is set to 0? */}
            {totalCost > 0 && (
                <>
                    <span>Total: {totalCost}</span>
                    {/* TODO: add validation */}
                    <DeleteItem
                        onClick={orderObject.removeOrder}
                    >
                        Clear Order
                    </DeleteItem>
                </>
            )}
        </Layout>
    )
}
