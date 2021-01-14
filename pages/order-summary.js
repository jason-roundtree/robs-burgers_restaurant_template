import { useState, useContext } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import formatCost from '../utils/formatCost'
import Layout from '../components/Layout'
import OrderContext from '../components/OrderContext'
import QuantityInput from '../components/QuantityInput'
import DeleteOrderOrItemModal from '../components/DeleteOrderOrItemModal'
import CheckoutModal from '../components/CheckoutModal'
import OrderCompleteModal from '../components/OrderCompleteModal'

const OrderItemContainer = styled.div`
    border: 1px solid black;
    border-radius: 3px;
    padding: 10px;
    margin-top: 3px;
    @media (max-width: 400px) {
        font-size: .85em;
    }
`
const GridColContainer = styled.div`
    display: grid;
    grid-template-columns: 75% 25%;
    grid-template-rows: 75% 25%;
`
const TopLeftRow = styled.div`
    grid-column-start: 1;
    grid-column-end: 2;
`
const BtmLeftRow = styled.div`
    grid-column-start: 1;
    grid-column-end: 2;
    align-self: center;
`
const TopRightRow = styled.div`
    grid-column-start: 2;
    grid-column-end: 3;
`
const BtmRightRow = styled.div`
    grid-column-start: 2;
    grid-column-end: 3;
    justify-self: end;
    align-self: center;
`
const Span = styled.span`
    margin-right: 5px;
`
const ItemName = styled(Span)`
    font-weight: 500;
`
const ItemCost = styled(ItemName)``
const QuantityInputStyled = styled(QuantityInput)`
    /* border: none;
    background-color: rgb(255,233,161); */
    height: 70%;
    width: 100%;
    font-size: 1.2em;
`
const AddOnLi = styled.li`
    margin-left: 10px;
    font-size: .9em;
`
const SpecialRequestP = styled(AddOnLi)``
const DeleteAddOnBtn = styled.button`
    margin-left: 5px;
    padding: 0 2px;
    width: 20px;
    font-size: .9em;
    font-family: 'M PLUS Rounded 1c',sans-serif;
    font-weight: 500;
`
const DeleteItemBtn = styled.button`
    @media (max-width: 400px) {
        font-size: .85em;
    }
`
const OrderEndContainer = styled.div`
    width: 100%;
    margin: 15px auto 0;
    text-align: center;
    display: grid;
    justify-content: center;
`
// const SubmitOrderBtn = styled.button`
//     margin: 15px 0;
//     /* font-size: 1em; */
// `
const CheckoutBtn = styled.button`
    margin: 15px 0;
    /* font-size: 1em; */
`
const DeleteOrderBtn = styled.button``
const TotalCost = styled.span`
    font-weight: 500;
`
const P = styled.p`
    font-size: 1.25em;
`

export default function OrderSummary() {
    const [itemToDelete, setItemToDelete] = useState({})
    const [deleteItemModalIsOpen, setDeleteItemModalIsOpen] = useState(false)
    const [deleteOrderModalIsOpen, setDeleteOrderModalIsOpen] = useState(false)
    const [checkoutModalIsOpen, setCheckoutModalIsOpen] = useState(false)
    const [orderCompleteModalIsOpen, setOrderCompleteModalIsOpen] = useState(false)
    const orderObject = useContext(OrderContext)
    console.log('order summary context: ', orderObject)
    
    const totalCost = orderObject.orderItems.reduce((total, orderItem) => {
        let addOnTotal = 0
        if (orderItem.addOns.length > 0) {
            addOnTotal = orderItem.addOns.reduce((total, addOn) => {
                return total + +addOn.cost
            }, 0)
        }
        return total + 
            (orderItem.quantity * addOnTotal) + 
            (orderItem.quantity * orderItem.cost)
    }, 0)
    
    function handleQuantityChange(e, orderItemId) {
        orderObject.editItemQuantity(+e.target.value, orderItemId)
    }

    // TODO: why does event listener not get removed when you select Cancel/Close buttons from modals?
    function clearModalState() {
        setDeleteItemModalIsOpen(false)
        setDeleteOrderModalIsOpen(false)
        setOrderCompleteModalIsOpen(false)
        setCheckoutModalIsOpen(false)
        setItemToDelete({})
        document.removeEventListener('click', handleOutsideModalClick)
    }

    function handleOpenDeleteItemModal(item) {
        setItemToDelete(item)
        document.addEventListener('click', handleOutsideModalClick)
        setDeleteItemModalIsOpen(true)
    }

    function handleOpenDeleteOrderModal() {
        setDeleteOrderModalIsOpen(true)
        document.addEventListener('click', handleOutsideModalClick)
    }

    function handleDeleteItem(orderItemId) {
        clearModalState()
        orderObject.removeItem(orderItemId)
    }

    function handleDeleteOrder() {
        clearModalState()
        // TODO: i don't need to pass orderId right?
        orderObject.removeOrder()
    }

    function handleOutsideModalClick(e) {
        // console.log('handleOutsideModalClick: ', e.target.id)
        if (e.target.id === 'modal-container') {
            clearModalState()
        }
    }

    function handleOpenCheckoutModal() {
        // TODO: move this to it's own function
        document.addEventListener('click', handleOutsideModalClick)
        setCheckoutModalIsOpen(true)
    }

    // function handleSubmitOrder() {
    //     document.addEventListener('click', handleOutsideModalClick)
    //     setOrderCompleteModalIsOpen(true)
    //     // TODO: in real app change this to save to db and then delete
    //     orderObject.removeOrder()
    // }

    return (
        <Layout>
            <div className="page_container">
                <div className='heading_container'>
                    <h2>Order Summary</h2>
                </div>

                {/* TODO: render loading status */}
                {!orderObject.isLoading && (
                    <div>
                        {orderObject.orderItems.length === 0 
                            ? <P>You currently have no items added to your order. Please add items from the <Link href="/menus">Menus</Link> page.</P>
                            : <P>Back to <Link href="/menus">Menus</Link></P>
                        }
        
                        {orderObject.orderItems.map(item => {
                            // console.log(item)
                            const option = item.option
                            let addOnsTotal = 0
                            if (item.addOns.length > 0) {
                                addOnsTotal = item.addOns.reduce((total, addOn) => {
                                    return total + +addOn.cost
                                }, 0)
                            }
        
                            return (
                                // TODO: format costs below
                                <OrderItemContainer key={item.orderItemId}>
                                    <GridColContainer>
                                        <TopLeftRow>
                                            <ItemName>
                                                {item.name}
                                            </ItemName> 
                                            
                                            {option && (
                                                <Span>
                                                    {`(${option})`}
                                                </Span>
                                            )} 
        
                                            <Span>
                                                {formatCost(item.cost)}
                                            </Span>
        
                                            {item.addOns.length > 0 && (
                                                <ul>
                                                    {item.addOns.map(addOn => {
                                                        return (
                                                            <AddOnLi key={addOn.id}>
                                                                <Span>
                                                                    {addOn.description}
                                                                </Span>
        
                                                                <span>{formatCost(addOn.cost)}</span>
        
                                                                {/* TODO: add validation?? */}
                                                                <DeleteAddOnBtn
                                                                    onClick={() => {
                                                                        orderObject.removeItemAddOn(
                                                                            item.orderItemId, addOn.id
                                                                        )
                                                                    }}
                                                                >
                                                                    X
                                                                </DeleteAddOnBtn>
                                                            </AddOnLi>
                                                        )
                                                    })}
                                                </ul>
                                            )}
                                            
                                            {item.specialRequests && (
                                                <SpecialRequestP as="p">
                                                    Special Request: 
                                                    <em>{item.specialRequests}</em>
                                                </SpecialRequestP>
                                            )}
                                        </TopLeftRow>
                                        
                                        <TopRightRow>
                                            <QuantityInputStyled 
                                                quantity={item.quantity}
                                                handleQuantityChange={e => {
                                                    handleQuantityChange(e, item.orderItemId)
                                                }}
                                            />
                                        </TopRightRow>
                                    
                                        <BtmLeftRow>
                                            <ItemCost>
                                                Subtotal: {formatCost(
                                                    (item.quantity * item.cost) +
                                                    (item.quantity * addOnsTotal)
                                                )}
                                            </ItemCost>
                                        </BtmLeftRow>
        
                                        <BtmRightRow>
                                            <DeleteItemBtn
                                                onClick={() => handleOpenDeleteItemModal(item)}
                                            >
                                                Delete Item
                                            </DeleteItemBtn>
                                        </BtmRightRow>
                                    
                                    </GridColContainer>
                                    
                                </OrderItemContainer>
                            )
                        })}
        
                        {/* TODO: should item be deleted if quantity is set to 0? */}
                        {totalCost > 0 && (
                            <OrderEndContainer>
                                <TotalCost>Total: {formatCost(totalCost)}</TotalCost>
                                <CheckoutBtn onClick={handleOpenCheckoutModal}>
                                    Checkout
                                </CheckoutBtn>
                                {/* TODO: add validation */}
                                {/* <SubmitOrderBtn
                                    onClick={handleSubmitOrder}
                                >
                                    Submit Order
                                </SubmitOrderBtn> */}
        
                                <DeleteOrderBtn
                                    onClick={handleOpenDeleteOrderModal}
                                >
                                    Delete Order
                                </DeleteOrderBtn>
                            </OrderEndContainer>
                        )}
                    </div>
                )}
            </div>

            {deleteItemModalIsOpen && (
                <DeleteOrderOrItemModal 
                    type='item'
                    itemToDelete={itemToDelete}
                    isOpen={deleteItemModalIsOpen}
                    handleDelete={() => handleDeleteItem(itemToDelete.orderItemId)}
                    clearModalState={clearModalState}
                />
            )}

            {deleteOrderModalIsOpen && (
                <DeleteOrderOrItemModal 
                    type='order'
                    // orderToDelete={orderToDelete}
                    isOpen={deleteOrderModalIsOpen}
                    handleDelete={handleDeleteOrder}
                    clearModalState={clearModalState}
                />
            )}

            {checkoutModalIsOpen && (
                <CheckoutModal
                    clearModalState={clearModalState}
                />
            )}

            {/* {orderCompleteModalIsOpen && (
                <OrderCompleteModal 
                    clearModalState={clearModalState}
                />
            )} */}

        </Layout>
    )
}
