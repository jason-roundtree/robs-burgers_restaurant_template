import Head from 'next/head'
import Link from 'next/link'

export default function Layout(props) {
    return (
        <div>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Restaurant Template built with Next.js + Sanity.io</title>
                {/* <link href="https://fonts.googleapis.com/css?family=Bebas+Neue&display=swap" rel="stylesheet" /> */}
                <link href="https://fonts.googleapis.com/css?family=Libre+Franklin&display=swap" rel="stylesheet" />
                {/* body {
                                font-family: 'Bebas Neue', cursive;
                            } */}
                <style
                    dangerouslySetInnerHTML={{
                        __html: `
                            * {
                                font-family: 'Libre Franklin', sans-serif;
                                margin: 0;
                                padding: 0;
                                box-sizing: border-box;
                            }
                        `
                    }}
                />
            </Head>
            
            <header>
                <div>Robert's Burgers</div>

                <nav>
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

                <style jsx>{`
                    header {
                        text-align: center;
                    }
                    nav {
                        display: flex;
                        justify-content: space-evenly;
                        padding: 10px 0;
                    }
                    a {
                        color: blue;
                        text-decoration: none;
                        padding: 0 5px;
                    }
                    @media (max-width: 640px) {
                        
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
            </header>

            <div id="main">{props.children}</div>
            
            
        </div>
    )
}