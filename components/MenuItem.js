import Link from 'next/link'

export default function MenuItem(props) {
    console.log('menu item props: ', props)
    return (
        <>
            <p>{props.item.name}</p>
            <p>{props.item.cost}</p>
        </>
    )
}