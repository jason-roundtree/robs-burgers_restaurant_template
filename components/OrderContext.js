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

    // TODO: Still need to add buttons that trigger remove item and delete order
    function removeItem(itemId) {
        
    }

    function deleteOrder(itemId) {
        
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
            deleteOrder,
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
