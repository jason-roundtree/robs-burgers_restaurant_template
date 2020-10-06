import OrderItem from '../components/OrderItem'
import styled from 'styled-components'

const ItemContainer = styled.div`
    padding: 12px;
    border: 1px solid rgb(255, 205, 41);
    border-radius: 3px;
    font-size: 16px;
    margin: 10px 0;
    background-color: white;
`
const ItemTitle = styled.p`
    font-family: 'Bebas Neue', cursive;
    font-size: 1.5em;
    color: rgb(255, 112, 110);
    display: inline-block;
    border-radius: 5px;
    margin: 0 0 5px 0;
`
// const ItemOption = styled.p`
//     font-size: .9em;
//     &::before {
//         content: '🍔 ';
//     }
// `

export default function MenuItem({ item }) {
    // console.log('item: ', item)
    return (
        <ItemContainer>
            <ItemTitle>{item.name}</ItemTitle>
            <p>{item.description}</p>
            <p>${item.cost.toFixed(2)}</p>
            {item.options && 
                item.options.map((option, i) => {
                    return (
                        <ItemOption key={i}>
                            {option}
                        </ItemOption>
                    )
                })
            }
            {/* TODO: remove this isOrderItem check if you don't do a separate component for non-ordering menu */}
            {/* {isOrderItem && */}
                <OrderItem 
                    item={item} 
                />
            {/* } */}

        </ItemContainer>
    )
}