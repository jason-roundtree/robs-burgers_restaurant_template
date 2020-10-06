// import { useState, useEffect } from 'react'
// import sanity from '../lib/sanity'
import { GlobalStyles } from '../components/GlobalStyles'
import { OrderDetailsProvider } from '../components/OrderContext'

export default function MyApp({ Component, pageProps }) {
    return (
        <OrderDetailsProvider>
            <GlobalStyles />
            <Component 
                {...pageProps} 
            />
        </OrderDetailsProvider>
    )
}


