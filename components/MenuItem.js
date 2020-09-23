import OrderItem from '../components/OrderItem'
import styled from 'styled-components'

const ItemContainer = styled.div`
    padding: 12px;
    /* border-top: 2px solid rgb(255, 205, 41); */
    border: 1px solid rgb(255, 205, 41);
    font-size: 16px;
    margin: 15px 0;
    /* background: linear-gradient(rgb(255, 235, 168), rgb(247, 220, 129), rgb(255, 205, 41)); */
    
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

            <OrderItem 
                item={item} 
            />

        </ItemContainer>
    )
}