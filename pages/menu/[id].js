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
            <div>
                <h1>
                    <span className="sign_font">
                        {menu.name}
                    </span>
                </h1>

                {menu.comments && menu.comments.map((comment, i) => {
                    return (
                        <div className="menu_comment_row" key={i}>
                            <p className="menu_comment">{comment}</p>
                        </div>
                    )
                })}

                {menu.menuItems.map(menuItem => {
                    return (
                        <MenuItem 
                            item={menuItem} 
                            id={menuItem._id} 
                            key={menuItem._id}
                        />
                    )
                })}
            </div>

            <style jsx>{`
                h2 {
                    font-family: 'Bebas Neue', cursive;
                    color: rgb(219, 21, 18);
                }
                p {
                    margin: 2px 0 5px 5px;      
                    font-size: .8em;
                }
                div.menu_comment_row p {
                    margin-left: 10px;
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
            `}</style>
        </Layout>
    )
}

Menu.getInitialProps = async () => {
    return {
      menus: await sanity.fetch(query)
    }
}