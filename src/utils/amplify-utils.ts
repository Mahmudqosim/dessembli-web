import { type Schema } from "@/../amplify/data/resource"
import { createServerRunner } from "@aws-amplify/adapter-nextjs"
import config from "@/../amplify_outputs.json"
import { cookies } from "next/headers"
import { getCurrentUser } from "aws-amplify/auth/server"

import { generateServerClientUsingCookies } from "@aws-amplify/adapter-nextjs/data"

export const { runWithAmplifyServerContext } = createServerRunner({
  config,
})

export const isAuthenticated = async () =>
  await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    async operation(contextSpec) {
      try {
        const user = await getCurrentUser(contextSpec)

        console.log(user)

        return !!user
      } catch (error) {
        return false
      }
    },
  })

export const cookieBasedClient = generateServerClientUsingCookies<Schema>({
  config,
  cookies,
  authMode: 'userPool'
})
