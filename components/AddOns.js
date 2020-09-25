import styled from 'styled-components'

const OrderAddOn = styled.input`
    margin-right: .5em;
`
const Fieldset = styled.fieldset`
    margin-top: .8em;
`
const Legend = styled.legend`
    font-weight: 500;
`
const AddOnLabel = styled.label`
    font-size: .85em;
`
const Cost = styled.span`
    display: inline-block;
`
export default function AddOns({ addOns }) {
    return (
        <Fieldset>
            <Legend>Add-Ons</Legend>
            <ul>
                {addOns.map(addOn => {
                    return (
                        <li key={addOn._id}>
                            <OrderAddOn
                                type="checkbox"
                                name={addOn.name}
                                id={addOn.name}
                            />
                            <AddOnLabel
                                htmlFor={addOn.name}
                            >
                                {addOn.description}&nbsp; 
                                <Cost> - ${addOn.cost.toFixed(2)}</Cost>
                            </AddOnLabel>
                        </li>
                    )
                })} 
            </ul>
        </Fieldset>
    )
}
