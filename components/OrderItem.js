import { useState } from 'react'
import styled from 'styled-components'

const Button = styled.button`
    margin: 10px 0 0;
    padding: 3px 4px;
    border-radius: 3px;
    border: none;
    background-color: rgb(255, 112, 110);
    color: white;
    &:hover {
        cursor: pointer;
        background: linear-gradient(rgb(255, 112, 110), rgb(227, 70, 68), rgb(219, 21, 18));
    }

`
export default function OrderItem() {
    const [itemEditorIsOpen, setItemEditorIsOpen] = useState(false)
    console.log('itemEditorIsOpen: ', itemEditorIsOpen)
    function handleBtnClick() {
        setItemEditorIsOpen(itemEditorIsOpen ? false : true)
    }

    return (
        <div>
            <Button
                onClick={handleBtnClick}
            >
                Add to Order
            </Button>
        </div>
    )
}