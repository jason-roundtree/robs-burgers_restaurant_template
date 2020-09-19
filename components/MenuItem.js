import OrderItem from '../components/OrderItem'
import styled from 'styled-components'

const ItemContainer = styled.div`
    padding: 12px;
    border-top: 2px solid rgb(255, 205, 41);
    font-size: 16px;
`
const ItemTitle = styled.p`
    font-family: 'Bebas Neue', cursive;
    font-size: 1.5em;
    color: rgb(255, 112, 110);
`
const ItemOption = styled.p`
    font-size: .9em;
    &::before {
        content: '🍔 ';
    }
`
export default function MenuItem(props) {
    return (
        <ItemContainer>
            <ItemTitle>{props.item.name}</ItemTitle>
            <p>{props.item.description}</p>
            <p>${props.item.cost.toFixed(2)}</p>
            {props.item.options && 
                props.item.options.map((option, i) => {
                    return (
                        <ItemOption key={i}>
                            {option}
                        </ItemOption>
                    )
                })
            }

            <OrderItem />

        </ItemContainer>
    )
}