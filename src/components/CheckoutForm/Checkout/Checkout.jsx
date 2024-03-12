import React, { useState } from 'react'
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
} from '@mui/material'

const steps = ['Shipping address', 'Payment details']

const Checkout = ({ cart, onCheckout }) => {
  const theme = useTheme()
  const [activeStep, setActiveStep] = useState(0)
  const [isFinished, setIsFinished] = useState(false)

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  // const handleConfirmation = () => {
  //   setIsFinished(true)
  // }
  const handleConfirmation = async () => {
    try {
      // Show the spinning bar
      setIsFinished(true)
      console.log('in handle confirmation')
      // Call the onCheckout function passed from app.js
      await onCheckout()

      // After successful checkout, display the spinning bar for 5 seconds
      setTimeout(() => {
        setIsFinished(false)
        setActiveStep(steps.length) // Proceed to the end step
      }, 5000)
    } catch (error) {
      // Handle any errors that occur during the checkout process
      console.error('Error during checkout:', error)
      // Optionally, display an error message to the user
      setIsFinished(false)
    }
  }

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return 'Shipping address form'
      case 1:
        return 'Payment form'
      default:
        return 'Unknown step'
    }
  }

  return (
    <>
      <CssBaseline />
      <div style={{ margin: '20px' }} />
      <main style={{ display: 'flex', justifyContent: 'center' }}>
        <Paper style={{ padding: '20px', maxWidth: '600px' }}>
          <Typography variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} style={{ marginTop: '20px' }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div style={{ textAlign: 'center' }}>
            {activeStep === steps.length ? (
              <div>
                <Typography variant="h5">
                  Thank you for your purchase!
                </Typography>
                <Divider style={{ margin: '10px 0' }} />
                <Button
                  component="a"
                  href="/Products"
                  variant="outlined"
                  color="primary"
                >
                  Back to home
                </Button>
              </div>
            ) : (
              <div>
                <Typography variant="h5">
                  {getStepContent(activeStep)}
                </Typography>
                {isFinished ? (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      marginTop: '20px',
                    }}
                  >
                    <CircularProgress />
                  </div>
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginTop: '20px',
                    }}
                  >
                    <Button disabled={activeStep === 0} onClick={handleBack}>
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={
                        activeStep === steps.length - 1
                          ? handleConfirmation
                          : handleNext
                      }
                    >
                      {activeStep === steps.length - 1
                        ? 'Complete Purchase'
                        : 'Next'}
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </Paper>
      </main>
    </>
  )
}

export default Checkout
