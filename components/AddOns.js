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
export default function AddOns({ 
    addOns, 
    activeAddOns, 
    onAddOnChange, 
    options,
    handleEnterKeyPress
}) {
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
                {addOns.map((addOn, i) => {
                    return (
                        <li key={addOn._id}>
                            <OrderAddOn
                                // When a menu item has both options and add-ons (typically uncommon, at least for demo app), autoFocus was being set to the first add-on even though options come before in code. This check for options ensures first option is selected when both exist
                                autoFocus={(i === 0) && !options}
                                type='checkbox'
                                id={addOn._id}
                                name={addOn.name}
                                data-cost={addOn.cost}
                                data-description={addOn.description}
                                onChange={onAddOnChange}
                                onKeyPress={handleEnterKeyPress}
                                checked={activeAddOns.find(_addOn => {
                                    return _addOn.id === addOn._id
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
