import { useContext } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import SocialMedia from './SocialMedia'
import OrderContext from './OrderContext'

const MainContainer = styled.main`
    background: url('/bg.png') no-repeat center fixed;
    background-size: cover;
    min-height: calc(100vh - 168px);
`
const SubMainContainer = styled.div`
    padding: 50px 10px 30px;
`
const TitleSignContainer = styled.div`
    /* background-color: rgb(219, 21, 18); */
    background-color: black;
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
    padding: 7px 0;
    background-color: rgb(245, 245, 245);
    @media (max-width: 1000px) {
        /* margin-bottom: 30px;    */
    }
    @media (max-width: 500px) {
        font-size: 1.1em;
    }
`
const NavLink = styled.a`
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1em;
    color: 'black';
    background-color: ${({ active }) => active && 'mistyrose'};
    transform: skewY(-1.5deg);
    text-decoration: none;
    padding: 2px 5px;
    border: 1px solid ${({ active }) => active ? 'rgb(255,112,110)' : 'rgb(245, 245, 245)'};
    /* position: relative; */
    &:hover {
        color: rgb(252, 202, 0);
        /* TODO: why does bg only highlight with double black? */
        background-color: ${({ active }) => active ? 'black' : 'black'};
        border: 1px solid ${({ active }) => active ? 'rgb(252, 202, 0)' : 'rgb(252, 202, 0)'};
        cursor: pointer;    
    }
    &:hover span {
        text-shadow: 1px 1px 5px rgb(255, 222, 115);
    }
    @media (max-width: 400px) {
        font-size: .75em;
    }
`
const OrderItemCount = styled.span`
    font-size: .75em;
    margin-left: 3px;
    position: relative;
    bottom: 5px;
`
export default function Layout(props) {
    const orderContext = useContext(OrderContext)
    const totalOrders = orderContext.orderItems.reduce((total, item) => {
        return total + item.quantity
    }, 0)

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
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css?family=Londrina+Shadow&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css?family=Bebas+Neue&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@300;400;500;700&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Contrail+One&display=swap" rel="stylesheet" />
            </Head>

            <div id="content">
                <header id="navbar_head" role="banner">
                    <TitleSignContainer>
                        <Link href="/">
                            <h1 className="sign_font">
                                Rob's Burgers
                            </h1>
                        </Link>
                    </TitleSignContainer>
                    {/* TODO: make accessible and selectable with Enter */}
                    <Nav id="navbar" role="navigation">
                        <Link href="/">
                            <NavLink active={route.pathname === "/"} tabIndex='0'>
                                Home
                            </NavLink>
                        </Link>

                        <Link href="/menus">
                            <NavLink active={route.pathname === "/menus"} tabIndex='0'>
                                Menus
                            </NavLink>
                        </Link>

                        <Link href="/about">
                            <NavLink active={route.pathname === "/about"} tabIndex='0'>
                                About
                            </NavLink>
                        </Link>

                        <Link href="/contact">
                            <NavLink active={route.pathname === "/contact"} tabIndex='0'>
                                Contact
                            </NavLink>
                        </Link>
                        
                        <Link href="/order-summary">
                            <NavLink active={route.pathname === "/order-summary"} tabIndex='0'>
                                Order
                                <OrderItemCount>{totalOrders}</OrderItemCount>
                            </NavLink>
                        </Link>
                    </Nav>
                </header>

                <MainContainer 
                    id="main" 
                    role="main"
                >
                    <SubMainContainer>
                        {props.children}
                    </SubMainContainer>
                </MainContainer>
            </div>

            <footer role="contentinfo">
                <SocialMedia />
            </footer>
            
        </div>
    )
}