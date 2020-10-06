import { useState, useContext } from 'react'
import Layout from '../components/Layout'
import OrderContext from '../components/OrderContext'

export default function OrderSummary() {
    const orderContext = useContext(OrderContext)
    return (
        <Layout>
            <h2>Order Summary</h2>
        </Layout>
    )
}
