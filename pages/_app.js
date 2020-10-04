// import { useState, useEffect } from 'react'
// import sanity from '../lib/sanity'
import { GlobalStyles } from '../components/GlobalStyles'

export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <GlobalStyles />
            <Component 
                {...pageProps} 
            />
        </>
    )
}


