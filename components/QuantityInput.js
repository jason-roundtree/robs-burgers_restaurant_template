import styled from 'styled-components'

const QuantityInputField = styled.input`
    display: block;
    padding: 3px;
    width: 75px;
`

export default function QuantityInput({ 
    quantity, 
    className, 
    // children, 
    _onChange 
}) {
    return (
        <QuantityInputField
            className={className}
            // children={children}
            type="number"
            name="quantity"
            id="quantity"
            min="0"
            value={quantity}
            onChange={_onChange}
        />
    )
}
