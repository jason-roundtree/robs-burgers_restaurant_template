import Head from 'next/head'
import Link from 'next/link'
import SocialMedia from './SocialMedia'

export default function Layout(props) {
    return (
        <div>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                {/* TODO: figure out how to load the emoji as favicon */}
                <title>🍔 Rob's Burgers - built with Next.js + Sanity.io</title>
                <link href="https://fonts.googleapis.com/css?family=Londrina+Shadow&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css?family=Bebas+Neue&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap" rel="stylesheet" />
                {/* body {
                    font-family: 'Bebas Neue', cursive;
                } */}
                {/* TODO: Better way to add global styles? */}
                <style
                    dangerouslySetInnerHTML={{
                        __html: `
                            * {
                                font-family: 'Open Sans', sans-serif;
                                margin: 0;
                                padding: 0;
                                box-sizing: border-box;
                            }
                            .sign_font {
                                display: inline-block;
                                font-family: 'Londrina Shadow', cursive;
                                color: rgb(255, 205, 41);
                                padding: 5px;
                                border: 1px solid rgb(255, 205, 41);
                                border-radius: 3px;
                            }
                            #main {
                                padding: 0 15px;
                            }
                            h1 span.sign_font {
                                font-size: .85em;
                                background-color: rgb(219, 21, 18);
                            }
                        `
                    }}
                />
            </Head>
            
            <header id="navbar_head">
                <div>
                    <Link href="/">
                        <span className="sign_font">Rob's Burgers</span>
                    </Link>
                </div>

                <nav id="navbar">
                    <Link href="/">
                        <a>Home</a>
                    </Link>

                    <Link href="/menus">
                        <a>Menus</a>
                    </Link>

                    <Link href="/about">
                        <a>About</a>
                    </Link>

                    <Link href="/contact">
                        <a>Contact</a>
                    </Link>
                </nav>
            </header>

            <div id="main">{props.children}</div>

            <footer>
                <SocialMedia />
            </footer>

            {/* TODO: Setup menu titles to use same rule as header span */}
            {/* html, body, footer rules currently only correspond to sticky footer */}
            <style jsx>{`
                html {
                    height: 100%;
                }
                body {
                    min-height: 100%;
                    display: grid;
                    grid-template-rows: 1fr auto;
                }
                footer {
                    background-color: rgb(255, 112, 110);
                    padding: 15px;
                    grid-row-start: 2;
                    grid-row-end: 3;
                    width: 100%;
                }
                header#navbar_head div {
                    background-color: rgb(219, 21, 18);
                    text-align: center;
                    font-size: 2em;
                    padding: 10px;
                }
                nav {
                    font-size: 1.4em;
                    display: flex;
                    justify-content: space-evenly;
                    padding: 10px 0;
                    margin-bottom: 20px;
                    background-color: rgb(255, 112, 110);
                }
                nav#navbar a {
                    font-family: 'Bebas Neue', cursive;
                    font-size: 1em;
                    padding: 10px;
                    color: black;
                    text-decoration: none;
                    padding: 0 5px;
                }
                nav#navbar a:hover {
                    color: rgb(252, 202, 0);
                }
                span:hover {
                    cursor: pointer;
                }
                
                @media (max-width: 400px) {
                    header#navbar_head div {
                        font-size: 1.25em;
                    }
                    nav#navbar a {
                        font-size: .75em;
                    }
                }
            `}</style>
            {/* <style global jsx>{`
                @font-face {
                    font-family: "Bebas Neue";
                    src: url('https://fonts.googleapis.com/css?family=Bebas+Neue')
                }
                body {
                    font-family: "Bebas Neue";
                }
            `}</style> */}
        </div>
    )
}