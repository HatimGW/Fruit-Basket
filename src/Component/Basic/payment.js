import React from 'react'
import StripeCheckout from 'react-stripe-checkout';

const Payment = ({ handleToken, cartTotal }) => {
  return (
    <StripeCheckout
    stripeKey="pk_test_51OSaeVE1aWVuJTbP1IiEDyJ49iu6UEWqBBUSzqknbEpSVnDjxHlHgSHQWma1RTsRvaF2BSPUcYdgPTbxHM9zywDu00uHNg5GDd"
    token={handleToken}
    amount={cartTotal*100}
    name="Fruit Basket"
    description="Enter your card details"
    currency="INR"
  />
  )
}

export default Payment