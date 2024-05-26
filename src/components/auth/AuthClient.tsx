"use client"

import { Authenticator } from "@aws-amplify/ui-react"

const AuthClient = () => {
  return <Authenticator signUpAttributes={['picture','name']} />
}

export default AuthClient