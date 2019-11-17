import Layout from '../components/Layout'
import Link from 'next/link'
// TODO: sanity vs client fetch vs isomorphic fetch??
// import client from '../lib/sanity'
import sanity from "../lib/sanity";

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
                                as={`/menu/${menu._id}`}
                            >
                                <div key={menu._id}>
                                    <span>{menu.name}</span>
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
                    }
                    .menu_container div:hover {
                        cursor: pointer;
                        background-color: rgb(215, 225, 250)
                    }
                    .menu_container div > span {
                        font-family: 'Londrina Shadow', cursive;
                        text-align: left;
                        vertical-align: text-top;
                        font-size: 1.5em;
                        display: inline-block;
                        margin: 7px 7px 50px;
                        padding: 2px 4px;
                        border: 1px solid white;
                        border-radius: 3px;
                        background-color: white;
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
