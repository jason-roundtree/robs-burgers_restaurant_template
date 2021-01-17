import styled from 'styled-components'
import formatCost from '../utils/formatCost'

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
export default function AddOns({ addOns, activeAddOns, onAddOnChange }) {
    // const formatter = new Intl.NumberFormat('en-US', {
    //     style: 'currency',
    //     currency: 'USD',
    //     minimumFractionDigits: 2,
    //     //maximumFractionDigits: 2,
    // });
    return (
        <Fieldset>
            <Legend>Add-Ons</Legend>
            <ul>
                {addOns.map(addOn => {
                    return (
                        <li key={addOn._id}>
                            <OrderAddOn
                                type="checkbox"
                                id={addOn._id}
                                name={addOn.name}
                                data-cost={addOn.cost}
                                data-description={addOn.description}
                                onChange={onAddOnChange}
                                checked={activeAddOns.find(addOn => {
                                    return addOn.id === addOn._id
                                })}
                            />
                            <AddOnLabel
                                htmlFor={addOn._id}
                            >
                                {addOn.description}&nbsp; 
                                <Cost> 
                                    - {formatCost(addOn.cost)}
                                </Cost>
                            </AddOnLabel>
                        </li>
                    )
                })} 
            </ul>
        </Fieldset>
    )
}
