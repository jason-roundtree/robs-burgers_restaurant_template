import styled from 'styled-components'
import formatCost from '../utils/formatCost'
import calculateCostWithDiscount from '../utils/calculateCostWithDiscount'

const ItemContainer = styled.div`
    padding: 12px;
    border: 1px solid rgb(255, 205, 41);
    border-radius: 3px;
    font-size: 16px;
    margin: 10px 0;
    background-color: white;
`
const ItemInfoContainer = styled.div`
    display: grid;
    grid-template-columns: 200px 3fr;
    column-gap: 12px;   
    @media (max-width: 500px) {
        grid-template-columns: 1fr;    
    }
`
const ItemImage = styled.img`
    width: 100%;
`
const ItemTextContainer = styled.div`
    position: relative;
`
const ItemTitle = styled.p`
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.5em;
    color: rgb(255, 112, 110);
    border-radius: 5px;
    margin: 0 0 5px 0;
`
const ItemOfDayTitle = styled(ItemTitle)`
    color: rgb(33, 117, 252);
    font-family: 'Contrail One', sans-serif;
`
const ItemOfDayPreDiscount = styled.span`
    text-decoration: line-through;
    margin-right: 10px;
`
const Cost = styled.span`
    /* color: rgb(33, 117, 252); */
`
const OrderButton = styled.button`
    display: block;
    position: absolute;
    bottom: 0;
    right: 0;
    @media (max-width: 500px) {
        margin-top: 1em;   
        position: relative;
    }
`

export default function MenuItem({ 
    item, 
    isItemOfDay,
    itemOfDayDiscount,
    handleModalBtnClick,
}) {
    // console.log('item: ', item)
    // console.log('isItemOfDay: ', isItemOfDay)
    const cost = calculateCostWithDiscount(item, isItemOfDay, itemOfDayDiscount)
    
    return (
        <ItemContainer>
            <ItemInfoContainer>
                <ItemImage 
                    // TODO: remove this when actual images are used
                    src={'/burger_angels_2.jpg'}
                    alt={`placeholder image for ${item.name}`}
                    title={`placeholder image for ${item.name}`}
                    width="200"
                />

                <ItemTextContainer>
                    <ItemTitle>{item.name}</ItemTitle>
                    {isItemOfDay && (
                        <ItemOfDayTitle>
                            Burger of the Day
                        </ItemOfDayTitle>
                    )}

                    <p>{item.description}</p>

                    {isItemOfDay && (
                        <ItemOfDayPreDiscount>
                            {formatCost(cost + itemOfDayDiscount)}
                        </ItemOfDayPreDiscount>
                    )}
                    <Cost className='cost'>{formatCost(cost)}</Cost>

                    {item.options && (
                        item.options.map((option, i) => {
                            return (
                                <ItemOption key={i}>
                                    {option}
                                </ItemOption>
                            )
                        })
                    )}

                    <OrderButton onClick={() => handleModalBtnClick(item)}>
                        Order
                    </OrderButton>

                </ItemTextContainer>
            </ItemInfoContainer>       
        </ItemContainer>
    )
}