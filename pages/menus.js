import Layout from '../components/Layout'
import Link from 'next/link'
// TODO: sanity vs client fetch
// import client from '../lib/sanity'
import sanity from "../lib/sanity";

const query = `*[ active == true ] {
    _id, 
    name, 
    active
}`
 
export default function Menus(props) {
    // const [menus, setMenus] = useState([])
    // console.log('state menus: ', menus)
    // TODO: useEffect vs getInitialProps??
    // useEffect(() => {
    //     client.fetch(query)
    //         .then(menus => {
    //             setMenus(menus)
    //         })
    // // TODO: Should something go in this dependencies array? 
    // // Seems like if I have menus or setMenus it just keeps re-rendering
    // }, [])
    console.log('props menus: ', props)

    return (
        <Layout>
            <div className="menu_container">
                {props.menus.map(menu => {
                    return (
                        <>
                            <Link href='/menu/[id]' as={`/menu/${menu._id}`}>
                                <div key={menu._id}>
                                    {menu.name}
                                </div>
                            </Link>
                        </>
                    )
                })}
                
                <style jsx>{`
                    .menu_container {
                        display: flex;
                        justify-content: center;
                        text-align: center;
                    }
                    .menu_container div {
                        margin: 0 15px;
                        padding: 30px;
                        border: 1px solid black;
                        border-radius: 3px;
                        width: 55%;
                    }
                    @media (max-width: 640px) {
                        .menu_container {
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                            
                        }
                        .menu_container div {
                            margin: 15px 0;
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
