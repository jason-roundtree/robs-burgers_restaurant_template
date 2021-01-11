import React, { useState, useEffect } from 'react'
import { v4 as uuid } from 'uuid'

// TODO: are these property outlines necessary when creating context and do i need to pass orderId and orderItems even thought they're being held in state?
const OrderContext = React.createContext({
    // orderId,
    // orderItems: [],
    addItem: () => {},
    removeItem: () => {},
    deleteOrder: () => {},
    editItemQuantity: () => {},
})

function OrderDetailsProvider({ children }) {
    const [orderId, setOrderId] = useState('')
    const [orderItems, setOrderItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    console.log('all orderItems: ', orderItems)

    useEffect(() => {
        const pendingOrder = JSON.parse(window.localStorage.getItem('pendingOrder'))
        if (pendingOrder) {
            setOrderItems(pendingOrder.orderItems)
            setOrderId(pendingOrder.orderId)
        } else {
            setOrderId(uuid())
        }
        setIsLoading(false)
    }, [])

    useEffect(() => {
        if (orderItems.length === 0) {
            window.localStorage.clear('pendingOrder')
        } else {
            window.localStorage.setItem('pendingOrder', JSON.stringify({
                orderId,
                orderItems
            }))
        }
    }, [orderItems])

    function addItem(item) {
        setOrderItems([...orderItems, item])
    }

    function removeItem(itemId) {
        const updatedItems = orderItems.filter(item => {
            return item.orderItemId !== itemId
        })
        setOrderItems(updatedItems)
    }

    function removeItemAddOn(orderItemId, addOnId) {
        const itemIndex = orderItems.findIndex(item => {
            return item.orderItemId === orderItemId
        })
        const updatedAddOns = orderItems[itemIndex]
            .addOns
            .filter(_addOn => {
                return _addOn.id !== addOnId
            })
        const orderItemsCopy = [...orderItems]
        orderItemsCopy[itemIndex].addOns = updatedAddOns
        setOrderItems(orderItemsCopy)
    }

    function removeOrder() {
        setOrderItems([])
        setOrderId('')
    }
   
    function editItemQuantity(quantity, orderItemId) {
        const updatedItems = orderItems.map(item => {
            if (item.orderItemId === orderItemId) {
                item.quantity = quantity
            }
            return item
        })
        setOrderItems(updatedItems)
    }

    return (
        <OrderContext.Provider value={{
            orderId,
            orderItems,
            addItem,
            removeItem,
            removeItemAddOn,
            removeOrder,
            editItemQuantity,
            isLoading
        }}>
            {children}
        </OrderContext.Provider>
    )
}

export { 
    OrderContext as default, 
    OrderDetailsProvider 
}