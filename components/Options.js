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
export default function Options({ 
    options, 
    checkedOption, 
    onOptionChange,
    handleEnterKeyPress
}) {
    return (
        <Fieldset>
            <Legend>Options</Legend>
            {options.map((option, i) => {
                return (
                    <div key={option}>
                        {/* TODO: should i setup options schema to have id or is unique name fine? */}
                        <OrderOption 
                            autoFocus={i === 0}
                            type="radio"
                            name="option"
                            value={option}
                            checked={option === checkedOption}
                            id={option}
                            onChange={onOptionChange}
                            onKeyPress={handleEnterKeyPress}
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
