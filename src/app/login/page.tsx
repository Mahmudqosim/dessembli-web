"use client"

import AuthClient from "@/components/auth/AuthClient";
import { Flex } from "@aws-amplify/ui-react";

export default function Login() {
  return (
    <Flex width="100%" justifyContent="center" paddingTop="4rem">
      <AuthClient />
    </Flex>
  )
}
