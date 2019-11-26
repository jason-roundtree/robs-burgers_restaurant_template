import Layout from '../components/Layout'
import Link from 'next/link'
// TODO: sanity vs client fetch vs isomorphic fetch??
// import client from '../lib/sanity'
import sanity from '../lib/sanity'

const query = `*[ active == true ] {
    _id, 
    name, 
    active
}`
 
export default function Menus(props) {
    return (
        <Layout>
            <div className="menu_container">
                {props.menus.map(menu => {
                    return (
                        <>
                            <Link 
                                href='/menu/[id]' 
                                // TODO: change this to slug?
                                as={`/menu/${menu._id}`}

                            >
                                <div key={menu._id}>
                                    <span className="sign_font">{menu.name}</span>
                                </div>
                            </Link>
                        </>
                    )
                })}
                
                <style jsx>{`
                    .menu_container {
                        display: flex;
                        margin: 0 25px;
                    }
                    .menu_container div {
                        background-color: rgb(252, 98, 98);
                        margin: 0 10px;
                        border-radius: 3px;
                        width: 55%;
                        border: 1px solid rgb(255, 112, 110);
                    }
                    .menu_container div:hover {
                        cursor: pointer;
                        background-color: rgb(255, 205, 41);
                    }
                    .menu_container div > span {
                        background-color: rgb(219, 21, 18);
                        text-align: left;
                        vertical-align: text-top;
                        font-size: 1.5em;
                        display: inline-block;
                        margin: 7px 7px 50px;
                        padding: 4px 8px;
                    }
                    @media (max-width: 640px) {
                        .menu_container {
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                        }
                        .menu_container div {
                            margin: 10px 0;
                        }
                    }
                `}</style>
            </div>
        </Layout>
    )
}

Menus.getInitialProps = async () => {
    return {
      menus: await sanity.fetch(query)
    }
}
