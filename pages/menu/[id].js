import sanity from '../../lib/sanity'
import styled from 'styled-components'
import Layout from '../../components/Layout'
import MenuItem from '../../components/MenuItem'

// TODO: This component is currently not being used because I moved the menus from having separate routes to all be under `menus`. 

const P = styled.p`
    margin: 2px 0 5px 5px;      
    font-size: .8em;
`

export default function Menu(props) {
    const [ menu ] = props.menu
    return (
        <Layout>
            <div>
                <h2 className="sign_font">
                    {menu.name}
                </h2>

                {menu.comments && menu.comments.map((comment, i) => {
                    return (
                        <div key={i}>
                            <P>{comment}</P>
                        </div>
                    )
                })}

                {menu.menuItems && menu.menuItems.map(menuItem => {
                    return (
                        <MenuItem 
                            item={menuItem} 
                            id={menuItem._id} 
                            key={menuItem._id}
                            
                        />
                    )
                })}
            </div>
        </Layout>
    )
}

const query = `*[ _id == $menuId ] {
    _id,
    name,
    active,
    slug,
    comments,
    "menuItems": menu_items[]-> {
        ...,
        add_ons[]->,
        options[]->
    }
}`

Menu.getInitialProps = async (ctx) => {
    // console.log('ctx: ', ctx)
    return {
        menu: await sanity.fetch(query, { 
            menuId: ctx.query.id 
        })
    }
}

// TODO: This doesn't work yet because it seems the menus array of objects can't be serialized by getStaticProps. Might have to take the menu object apart and serialize menus before returning.


// TODO: do i need anything other than slug here?
// const allMenusQuery = `*[_type == "menu"] {
//     _id,
//     active,
//     slug,
// } | order(menu_order asc)`

// const menuQuery = `*[ _type == "menu" && slug.current == $slug ] {
//     _id,
//     name,
//     active,
//     slug,
//     comments,
//     "menuItems": menu_items[]-> {
//         ...,
//         add_ons[]->,
//   	    options[]->
//     }
// }`

// export async function getStaticPaths() {
//     const menus = await sanity.fetch(allMenusQuery)
//     console.log('menus: ', menus)
//     const paths = menus.map(menu => ({
//         params: { slug: menu.slug.current }
//     }))
//     console.log('paths: ', paths)
//     return { paths, fallback: false }
// }

// export async function getStaticProps(ctx) {
//     console.log('ctx: ', ctx)
//     const { slug } = ctx.params
//     const menu = await sanity.fetch(menuQuery, {slug})
//     console.log('menu: ', menu)
//     return { props: JSON.parse(JSON.stringify(menu)) }
// }

// not sure what this it. remove if above gets successfully refactored
// const query = `*[ _id == $menuId ] {}