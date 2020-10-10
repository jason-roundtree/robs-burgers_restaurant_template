import React, { useState } from 'react'

// TODO: are these property outlines necessary when creating context?
const OrderContext = React.createContext({
    orderItems: [],
    addItem: () => {},
    removeItem: () => {},
    deleteOrder: () => {},
    editItemQuantity: () => {},
    totalCost: null,
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
        // console.log(quantity)
        // console.log(orderItemId)
        const updatedItems = orderItems.map(item => {
            if(item.orderItemId === orderItemId) {
                item.quantity = quantity
            }
            return item
        })
        setOrderItems(updatedItems)
    }

    return (
        <OrderContext.Provider value={{
            orderItems,
            addItem,
            removeItem,
            removeOrder,
            editItemQuantity,
            // totalCost,
        }}>
            {children}
        </OrderContext.Provider>
    )
}

export { 
    OrderContext as default, 
    OrderDetailsProvider 
}
