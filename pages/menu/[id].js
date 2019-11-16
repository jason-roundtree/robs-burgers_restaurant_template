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
    // console.log('menu: ', menu)
    return (
        <Layout>
            <>
                <h2>{menu.name}</h2>
                <p>{menu.comments}</p>
                {menu.menuItems.map(menuItem => {
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