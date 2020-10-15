import styled from 'styled-components'

const QuantityInputField = styled.input`
    display: block;
    padding: 3px;
    width: 75px;
`

export default function QuantityInput({ 
    quantity, 
    className, 
    _onChange 
}) {
    return (
        <QuantityInputField
            className={className}
            type="number"
            name="quantity"
            id="quantity"
            // TODO: do i need to add custom validation so that 0 doesn't show up when input is deleted?
            min="0"
            value={quantity}
            onChange={_onChange}
        />
    )
}
