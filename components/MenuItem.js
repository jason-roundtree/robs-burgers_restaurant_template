export default function MenuItem(props) {
    return (
        <div className="menu_item">
            <p>{props.item.name}</p>
            <p>{props.item.description}</p>
            <p>${props.item.cost}</p>

            <style jsx>{`
                .menu_item {
                    padding: 12px 0;
                    border-top: 1px solid rgb(215, 225, 250);
                }
                p {
                    margin: 0;
                }
            `}</style>
        </div>
    )
}