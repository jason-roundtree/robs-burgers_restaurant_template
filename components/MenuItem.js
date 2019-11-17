export default function MenuItem(props) {
    return (
        <div className="menu_item">
            <p className="menu_item_title">{props.item.name}</p>
            <p className="menu_item_description">{props.item.description}</p>
            <p>${props.item.cost}</p>

            <style jsx>{`
                .menu_item {
                    padding: 12px 0;
                    border-top: 1px solid rgb(255, 205, 41);
                }
                .menu_item_title {
                    font-family: 'Bebas Neue', cursive;
                    font-size: 1.25em;
                    color: rgb(255, 112, 110);
                }
                .menu_item_description {
                    font-size: .85em;
                }
                p {
                    margin: 0;
                }
            `}</style>
        </div>
    )
}