import React from 'react'
import { SignUp } from '@clerk/clerk-react'
import '../auth/Auth.css'

function Signup() {
  return (
    <div className="auth-container">
      <SignUp 
        routing="path" 
        path="/signup" 
        signInUrl="/signin"
        appearance={{
          elements: {
            card: 'cl-card',
            headerTitle: 'cl-headerTitle',
            headerSubtitle: 'cl-headerSubtitle',
            footerAction: 'cl-footerAction',
            formButtonPrimary: 'cl-formButtonPrimary',
            formFieldInput: 'cl-formFieldInput',
            formFieldLabel: 'cl-formFieldLabel',
            footerActionLink: 'cl-footerActionLink',
            socialButtonsProviderIcon: 'cl-socialButtonsProviderIcon',
            socialButtonsButton: 'cl-socialButtonsButton',
            socialButtonsProviderText: 'cl-socialButtonsProviderText',
            dividerText: 'cl-dividerText',
            dividerLine: 'cl-dividerLine'
          }
        }}
      />
    </div>
  )
}

export default Signup