import Head from 'next/head'
import Link from 'next/link'
import styled from 'styled-components'
import SocialMedia from './SocialMedia'

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
    color: black;
    text-decoration: none;
    padding: 0 5px;
    &:hover {
        color: rgb(252, 202, 0);
        cursor: pointer;    
    }
    @media (max-width: 400px) {
        font-size: .75em;
    }
`
    
export default function Layout(props) {
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
                            <span className="sign_font">Rob's Burgers</span>
                        </Link>
                    </TitleSignContainer>

                    <Nav id="navbar">
                        <Link href="/">
                            <NavLink>Home</NavLink>
                        </Link>

                        <Link href="/menus">
                            <NavLink>Menus</NavLink>
                        </Link>

                        <Link href="/about">
                            <NavLink>About</NavLink>
                        </Link>

                        <Link href="/contact">
                            <NavLink>Contact</NavLink>
                        </Link>
                        
                        <Link href="/order">
                            <NavLink>Order</NavLink>
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