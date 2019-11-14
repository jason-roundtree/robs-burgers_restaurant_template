import Head from 'next/head'
import Link from 'next/link'

export default function Layout(props) {
    return (
        <div>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Restaurant Template / Next.js + Sanity.io</title>
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
                    @media (max-width: 600px) {
                        
                    }
                `}</style>
            </header>

            <div id="main">{props.children}</div>
            
        </div>
    )
}