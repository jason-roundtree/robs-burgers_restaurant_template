import { useContext } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import SocialMedia from './SocialMedia'
import OrderContext from './OrderContext'

const TitleSignContainer = styled.div`
    background-color: rgb(219, 21, 18);
    text-align: center;
    font-size: 2em;
    padding: 10px;
    @media (max-width: 400px) {
        font-size: 1.25em;
    }
`
const Nav = styled.nav`
    font-size: 1.4em;
    display: flex;
    justify-content: space-evenly;
    padding: 10px 0;
    margin-bottom: 20px;
    background-color: rgb(255, 112, 110);
`
const NavLink = styled.a`
    font-family: 'Bebas Neue', cursive;
    font-size: 1em;
    padding: 10px;
    color: ${props => props.active ? 'rgb(252, 202, 0)' : 'black'};
    text-decoration: none;
    padding: 0 5px;
    position: relative;
    &:hover {
        color: rgb(252, 202, 0);
        cursor: pointer;    
    }
    @media (max-width: 400px) {
        font-size: .75em;
    }
`
const OrderItemCount = styled.span`
    color: rgb(255,205,41);
    font-size: .75em;
    text-shadow: 1px 1px 5px rgb(255, 222, 115); 
    margin-left: 3px;
    position: relative;
    bottom: 5px;
`
export default function Layout(props) {
    const orderContext = useContext(OrderContext)
    const route = useRouter()
    return (
        <div>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Rob's Burgers - Restaurant Website Template built with Next.js + Sanity.io</title>
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <link href="https://fonts.googleapis.com/css?family=Londrina+Shadow&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css?family=Bebas+Neue&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@300;400;500;700&display=swap" rel="stylesheet" />
            </Head>

            <div id="content">
                <header id="navbar_head">
                    <TitleSignContainer>
                        <Link href="/">
                            <h1 className="sign_font">
                                Rob's Burgers
                            </h1>
                        </Link>
                    </TitleSignContainer>

                    <Nav id="navbar">
                        <Link href="/">
                            <NavLink active={route.pathname === "/"}>
                                Home
                            </NavLink>
                        </Link>

                        <Link href="/menus">
                            <NavLink active={route.pathname === "/menus"}>
                                Menus
                            </NavLink>
                        </Link>

                        <Link href="/about">
                            <NavLink active={route.pathname === "/about"}>
                                About
                            </NavLink>
                        </Link>

                        <Link href="/contact">
                            <NavLink active={route.pathname === "/contact"}>
                                Contact
                            </NavLink>
                        </Link>
                        
                        <Link href="/order">
                            <NavLink active={route.pathname === "/order"}>
                                Order
                                <OrderItemCount>{orderContext.orderItems.length}</OrderItemCount>
                            </NavLink>
                        </Link>
                    </Nav>
                </header>

                <div id="main">{props.children}</div>
            </div>

            <footer>
                <SocialMedia />
            </footer>
            
        </div>
    )
}