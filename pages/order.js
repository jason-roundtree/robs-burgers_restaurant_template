import Layout from '../components/Layout'
import sanity from '../lib/sanity'
import MenuItem from '../components/MenuItem'


export default function Order(props) {
    console.log('props: ', props)
    return (
        <Layout>
            {props.menus.map(menu => {
                return menu.menuItems.map(item => {
                    return (
                        <MenuItem 
                            item={item} 
                            id={item._id} 
                            key={item._id}
                        />
                    )
                })
            })}
        </Layout>
    )
}

const query = `*[ _type == "menu" ] {
    _id,
    name,
    active,
    comments,
    "menuItems": menu_items[]->
}`

export async function getStaticProps() {
    const menus = await sanity.fetch(query)
    // console.log('menus: ', menus)
    return {
        props: { menus }
    }
}

