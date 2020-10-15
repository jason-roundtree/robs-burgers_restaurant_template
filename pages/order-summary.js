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
const QuantityInputStyled = styled(QuantityInput)`
    margin-left: 1em;
`
const AddOnLi = styled.li`
    margin-left: 10px;
    font-size: .9em;
`
const ItemTopRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const ItemNameOptionCostContainer = styled.div`
    
`
const Span = styled.span`
    margin-right: 5px;
`

const DeleteItemButton = styled.button`
    display: block;
`
const ItemEndContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1em;
`
// const DeleteOrderButton = styled(DeleteItemButton)`
    
// `
const OrderEndContainer = styled.div`
    width: 100%;
    margin: 15px auto 0;
    text-align: center;
    display: grid;
    justify-content: center;
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
                        <ItemTopRow>
                            <ItemNameOptionCostContainer>
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
                            </ItemNameOptionCostContainer>
                            
                            <QuantityInputStyled
                                quantity={item.quantity}
                                _onChange={e => {
                                    handleQuantityChange(e, item.orderItemId)
                                }}
                            />
                        </ItemTopRow>
                        
                        {item.addOns.length > 0 && (
                            <ul>
                                {item.addOns.map(addOn => {
                                    return (
                                        <AddOnLi key={addOn._id}>
                                            <Span>
                                                {addOn.description}
                                            </Span>
                                            <span>{formatCost(addOn.cost)}</span>
                                        </AddOnLi>
                                    )
                                    
                                })}
                            </ul>
                        )}

                        <ItemEndContainer>
                            <p>
                                Subtotal: {formatCost(
                                    (item.quantity * item.cost) +
                                    (item.quantity * addOnsTotal)
                                )}
                            </p>

                            {/* TODO: add validation */}
                            <DeleteItemButton
                                onClick={() => {
                                    orderObject.removeItem(item.orderItemId)
                                }}
                            >
                                Delete Item
                            </DeleteItemButton>
                        </ItemEndContainer>
                        

                    </OrderItemContainer>
                )
            })}

            {/* TODO: should item be deleted if quantity is set to 0? */}
            {totalCost > 0 && (
                <OrderEndContainer>
                    <span>Total: ${totalCost}</span>
                    {/* TODO: add validation */}
                    <button>
                        Submit Order
                    </button>

                    <button
                        onClick={orderObject.removeOrder}
                    >
                        Delete Order
                    </button>
                </OrderEndContainer>
            )}
        </Layout>
    )
}
