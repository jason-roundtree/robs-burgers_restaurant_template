import { useRouter } from 'next/router'
import sanity from '../../lib/sanity'
import styled from 'styled-components'
import Layout from '../../components/Layout'
import MenuItem from '../../components/MenuItem'

const P = styled.p`
    margin: 2px 0 5px 5px;      
    font-size: .8em;
`
// const MenuCommentRowP = styled.p``

export default function Menu(props) {
    const router = useRouter()
    const [ menu ] = props.menus.filter(menu => {
        // TODO: figure out how to turn slug to id
        return menu._id === router.query.id
    })
    console.log('menu: ', menu)
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

const query = `*[ _type == "menu" ] {
    _id,
    name,
    active,
    comments,
    "menuItems": menu_items[]-> {
        ...,
        add_ons[]->,
  	    options[]->
    }
} | order(menu_order asc)`

Menu.getInitialProps = async () => {
    return {
      menus: await sanity.fetch(query)
    }
}
