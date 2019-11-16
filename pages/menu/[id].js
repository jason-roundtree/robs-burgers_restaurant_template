import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import MenuItem from '../../components/MenuItem'
import sanity from '../../lib/sanity'

const query = `*[ _type == "menu" ] {
    _id,
    name,
    active,
    "menuItems": menu_items[]->
}`

export default function Menu(props) {
    const router = useRouter()
    console.log('Menu props: ', props)
    const menu = props.menus.filter(menu => {
        return menu._id === router.query.id
    })
    console.log('menu: ', menu)
    return (
        <Layout>
            <>
                <h2>{menu[0].name}</h2>
                {menu[0].menuItems.map(menuItem => {
                    return <MenuItem item={menuItem} />
                })}
            </>
        </Layout>
    )
}

Menu.getInitialProps = async () => {
    return {
      menus: await sanity.fetch(query)
    }
}