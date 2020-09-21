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
        return menu._id === router.query.id
    })
    console.log('menu: ', menu)
    return (
        <Layout>
            <div>
                <h1>
                    <span className="sign_font">
                        {menu.name}
                    </span>
                </h1>

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

            {/* <style jsx>{`
                h2 {
                    font-family: 'Bebas Neue', cursive;
                    color: rgb(219, 21, 18);
                }
                p {
                    
                }
                div.menu_comment_row p {
                    
                }
                .menu_comment:before {
                    content: '🍔 ';
                }
                span {
                    background-color: rgb(219, 21, 18);
                    margin-bottom: 5px;
                }
                span.emoji {
                    background-color: white;
                }
            `}</style> */}
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
}`

Menu.getInitialProps = async () => {
    return {
      menus: await sanity.fetch(query)
    }
}
