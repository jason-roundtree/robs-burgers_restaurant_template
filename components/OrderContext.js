import React, { useState } from 'react'

const OrderContext = React.createContext({
    items: [],
    addItem: () => {},
    removeItem: () => {},
    deleteOrder: () => {},
    totalCost: null,
})

function OrderDetailsProvider({ children }) {
    const [orderItems, setOrderItems] = useState([])
    const [totalCost, setTotalCost] = useState(null)
    console.log('all orderItems: ', orderItems)
    function addItem(item) {
        setOrderItems([...orderItems, item])
    }

    // TODO: Still need to add buttons that trigger remove item and delete order
    function removeItem() {
        
    }

    function deleteOrder() {
        
    }

    return (
        <OrderContext.Provider value={{
            orderItems,
            addItem,
            removeItem,
            deleteOrder,
            totalCost,
        }}>
            {children}
        </OrderContext.Provider>
    )
}

export { 
    OrderContext as default, 
    OrderDetailsProvider 
}
