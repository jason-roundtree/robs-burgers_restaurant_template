import { useEffect, useState, useContext } from 'react'
import Layout from '../components/Layout'
import OrderContext from '../components/OrderContext'

export default function OrderSummary() {
    const orderObject = useContext(OrderContext)
    console.log('order summary context: ', orderObject)
    
    return (
        <Layout>
            <h2>Order Summary</h2>
            {orderObject.orderItems.map(item => {
                return (
                    <>
                        <p>{item.quantity}</p>
                        <p>{item.item.id}</p>
                        <p>{item.item.name}</p>
                        <p>{item.item.cost}</p>
                    </>
                )
            })}
        </Layout>
    )
}
