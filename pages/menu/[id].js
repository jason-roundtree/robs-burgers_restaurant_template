import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import MenuItem from '../../components/MenuItem'
import sanity from '../../lib/sanity'

const query = `*[ _type == "menu" ] {
    _id,
    name,
    active,
    comments,
    "menuItems": menu_items[]->
}`

export default function Menu(props) {
    const router = useRouter()
    const [ menu ] = props.menus.filter(menu => {
        return menu._id === router.query.id
    })
    console.log('menu: ', menu)
    return (
        <Layout>
            <div>
                <h2><span className="sign_font">{menu.name}</span></h2>

                {menu.comments && menu.comments.map(comment => {
                    return <p>{comment}</p>
                })}

                {menu.menuItems.map(menuItem => {
                    return <MenuItem item={menuItem} />
                })}
            </div>

            <style jsx>{`
                div {
                    margin: 10px;
                }
                h2 {
                    font-family: 'Bebas Neue', cursive;
                    color: rgb(219, 21, 18);
                }
                p {
                    margin: 2px 0 5px 5px;
                    font-size: .7em;
                }
                span {
                    background-color: rgb(219, 21, 18);
                    margin-bottom: 10px;
                }
            `}</style>
        </Layout>
    )
}

Menu.getInitialProps = async () => {
    return {
      menus: await sanity.fetch(query)
    }
}