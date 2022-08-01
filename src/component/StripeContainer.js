import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import React from 'react'

const StripeContainer = () => {

    const PUBLIC_KEY = 'pk_live_51K9gozB4Ud20UqTQnnDxi7i8sdObW5pOuw0HXWv4mPsfBEgiWSFZ7h7GBTUqu8y5e6WOwJCfvn83b0BCOOcGKtGi00eXmKcETc'

    const stripeTestPromise = loadStripe(PUBLIC_KEY)

  return (
    <Elements stripe = {stripeTestPromise}>

        <PaymentForm/>

    </Elements>
  )
}

export default StripeContainer