import styled from 'styled-components'

const OrderOption = styled.input`
    margin-right: .5em;
`
const Fieldset = styled.fieldset`
    margin-top: 1em;
`
const Legend = styled.legend`
    font-weight: 500;
    margin-top: .8em;
`
const Label = styled.label`
    font-size: .85em;
`
export default function Options({ options }) {
    return (
        <Fieldset>
            <Legend>Options</Legend>
            {options.map(option => {
                return (
                    <div key={option}>
                        <OrderOption 
                            type="radio"
                            name="option"
                            value={option}
                            id={option}
                        />
                        <Label htmlFor={option}>
                            {option}
                        </Label>
                    </div>
                )
            })} 
        </Fieldset>
    )
}
