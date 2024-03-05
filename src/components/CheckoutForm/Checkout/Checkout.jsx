import React from 'react'
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
  CssBaseline,
  useTheme,
  spacing,
} from '@mui/material'

import { commerce } from '../../../lib/commerce'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const steps = ['Shipping address', 'Payment details']
const Checkout = ({ cart, onCaptureCheckout, order, error }) => {
  const theme = useTheme()
  const styles = {
    toolbar: theme.mixins.toolbar,
    layout: {
      marginTop: '5%',
      width: 'auto',
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
        width: 600,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },

    // ... other styles
    paper: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(5),
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        marginTop: 60,
      },
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
        padding: theme.spacing(3),
      },
    },
    stepper: {
      padding: theme.spacing(3, 0, 5),
    },
    buttons: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    button: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1),
    },
    divider: {
      margin: '20px 0',
    },
    spinner: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  }

  const [checkoutToken, setCheckoutToken] = useState(null)
  const [activeStep, setActiveStep] = useState(0)
  const [shippingData, setShippingData] = useState({})
  const [isFinished, setIsFinished] = useState(false)
  const navigate = useNavigate()

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1)
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)

  useEffect(() => {
    if (cart.id) {
      const generateToken = async () => {
        try {
          const token = await commerce.checkout.generateToken(cart.id, {
            type: 'cart',
          })
          console.log(token)
          setCheckoutToken(token)
        } catch {
          if (activeStep !== steps.length) navigate.push('/')
        }
      }

      generateToken()
    }
  }, [cart])

  const test = (data) => {
    setShippingData(data)

    nextStep()
  }
  const timeout = () => {
    setTimeout(() => {
      setIsFinished(true)
    }, 3000)
  }

  let Confirmation = () =>
    order.customer ? (
      <>
        <div>
          <Typography variant="h5">
            Thank you for your purchase, {order.customer.firstname}{' '}
            {order.customer.lastname}!
          </Typography>
          <Divider sx={styles.divider} />
          <Typography variant="subtitle2">
            Order ref: {order.customer_reference}
          </Typography>
        </div>
        <br />
        <Button
          component={Link}
          variant="outlined"
          type="button"
          to="/Products"
        >
          Back to home
        </Button>
      </>
    ) : (
      <div sx={styles.spinner}>
        <CircularProgress />
      </div>
    )

  if (error) {
    Confirmation = () => (
      <>
        <Typography variant="h5">Error: {error}</Typography>
        <br />
        <Button component={Link} variant="outlined" type="button" to="/">
          Back to home
        </Button>
      </>
    )
  }

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm
        checkoutToken={checkoutToken}
        nextStep={nextStep}
        setShippingData={setShippingData}
        test={test}
      />
    ) : (
      <PaymentForm
        checkoutToken={checkoutToken}
        nextStep={nextStep}
        backStep={backStep}
        shippingData={shippingData}
        onCaptureCheckout={onCaptureCheckout}
        timeout={timeout}
      />
    )

  return (
    <>
      <CssBaseline />
      <div sx={styles.toolbar} />
      <main sx={styles.layout}>
        <Paper sx={styles.paper}>
          <Typography variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={styles.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Confirmation />
          ) : (
            checkoutToken && <Form />
          )}
        </Paper>
      </main>
    </>
  )
}

export default Checkout
