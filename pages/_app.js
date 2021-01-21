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


