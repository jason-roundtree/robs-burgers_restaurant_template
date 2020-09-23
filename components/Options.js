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

export default function Options({ options }) {
    return (
        <Fieldset>
            <Legend>Options</Legend>
            {options.map(option => {
                return (
                    <div>
                        <OrderOption 
                            type="radio"
                            name="option"
                            value={option}
                            id={option}
                        />
                        <label htmlFor={option}>
                            {option}
                        </label>
                    </div>
                )
            })} 
        </Fieldset>
    )
}
