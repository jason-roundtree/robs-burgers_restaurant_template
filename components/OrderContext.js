import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'

// TODO: should orderId only be assigned when somebody submits the order?
const orderId = uuid()

// TODO: are these property outlines necessary when creating context?
const OrderContext = React.createContext({
    orderId,
    orderItems: [],
    addItem: () => {},
    removeItem: () => {},
    deleteOrder: () => {},
    editItemQuantity: () => {},
    // totalCost: null,
})

function OrderDetailsProvider({ children }) {
    const [orderItems, setOrderItems] = useState([])
    // const [totalCost, setTotalCost] = useState(null)
    console.log('all orderItems: ', orderItems)
    function addItem(item) {
        setOrderItems([...orderItems, item])
    }

    function removeItem(itemId) {
        const deletedItems = orderItems.filter(item => {
            return item.orderItemId !== itemId
        })
        setOrderItems(deletedItems)
    }

    function removeOrder() {
        setOrderItems([])
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
            removeOrder,
            editItemQuantity,
        }}>
            {children}
        </OrderContext.Provider>
    )
}

export { 
    OrderContext as default, 
    OrderDetailsProvider 
}
