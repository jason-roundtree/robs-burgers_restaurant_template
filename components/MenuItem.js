export default function MenuItem(props) {
    return (
        <div className="menu_item" key={props.item._id}>
            <p className="menu_item_title">{props.item.name}</p>
            <p className="menu_item_description">{props.item.description}</p>
            <p>${props.item.cost.toFixed(2)}</p>
            {props.item.options && props.item.options.map(option => {
                    return <p className="menu_item_option">{option}</p>
                })
            }

            <style jsx>{`
                p {
                    margin: 0;
                }
                .menu_item {
                    padding: 12px 0;
                    border-top: 2px solid rgb(255, 205, 41);
                    font-size: 16px;
                }
                .menu_item * {
                    margin-left: 10px;
                }
                .menu_item_title {
                    font-family: 'Bebas Neue', cursive;
                    font-size: 1.25em;
                    color: rgb(255, 112, 110);
                }
                .menu_item_option {
                    font-size: .7em;
                }
                .menu_item_option:before {
                    content: '🍔';
                }
            `}</style>
        </div>
    )
}