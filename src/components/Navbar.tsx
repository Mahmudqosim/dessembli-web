"use client"

import {
  Button,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
} from "@aws-amplify/ui-react"
import { signOut } from "aws-amplify/auth"
import { Hub } from "aws-amplify/utils"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import {
  HiChat,
  HiViewGrid,
  HiViewGridAdd,
  HiHome,
  HiLogout,
  HiCog,
  HiUser,
} from "react-icons/hi"
import { TbWorldSearch } from "react-icons/tb"

const menuItems = [
  { name: "Explore", Icon: TbWorldSearch, active: "explore" },
  {
    name: "Add Project",
    Icon: HiViewGridAdd,
    active: "add-project",
    protected: true,
  },
  { name: "Messages", Icon: HiChat, active: "messages", protected: true },
]

interface NavbarProps {
  isSignedIn: boolean
}

const Navbar = ({ isSignedIn }: NavbarProps) => {
  const router = useRouter()
  const [authCheck, setAuthCheck] = useState(isSignedIn)

  console.log("isSignedIn", isSignedIn)

  useEffect(() => {
    const hubListenerCancel = Hub.listen("auth", (data) => {
      switch (data.payload.event) {
        case "signedIn":
          setAuthCheck(true)

          router.push("/")
          break
        case "signedOut":
          setAuthCheck(false)

          router.push("/login")
          break
      }
    })

    return () => hubListenerCancel()
  }, [router])

  const handleAuth = async () => {
    if (authCheck) {
      await signOut()
    } else {
      router.push("/login")
    }
  }

  const routes = menuItems.filter(
    (route) => route.protected === authCheck || route.protected === undefined
  )

  return (
    <Flex
      width="relative.full"
      padding="1rem 2.5rem"
      backgroundColor="white"
      alignItems="center"
      justifyContent="space-between"
      position="sticky"
      top="0"
    >
      <Link href="/">
        <Image height="2rem" src="/dessembli.svg" alt="lorgger" />
      </Link>

      <Flex display={{ base: "none", medium: "flex" }}>
        {routes.map((menu, index) => {
          return (
            <Button
              as={Link}
              href={`/${menu.active}`}
              key={index}
              backgroundColor="var(--amplify-colors-neutral-10)"
              color="var(--amplify-colors-neutral-50)"
              borderRadius="8rem"
              gap=".5rem"
              size="small"
            >
              <menu.Icon fontSize="1.25rem" /> {menu.name}
            </Button>
          )
        })}

        {authCheck ? (
          <Menu
            trigger={
              <MenuButton borderRadius="8rem">
                <Image
                  alt="Amplify logo"
                  src="/amplify-logo.svg"
                  objectFit="initial"
                  height="1rem"
                  width="1rem"
                />
              </MenuButton>
            }
          >
            <MenuItem gap="1rem" fontSize=".9rem" fontWeight="500">
              <HiUser /> Profile
            </MenuItem>
            <MenuItem gap="1rem" fontSize=".9rem" fontWeight="500">
              <HiCog /> Settings
            </MenuItem>
            <MenuItem
              gap="1rem"
              fontSize=".9rem"
              fontWeight="500"
              onClick={handleAuth}
            >
              <HiLogout /> Log out
            </MenuItem>
          </Menu>
        ) : (
          <Button
            onClick={handleAuth}
            backgroundColor="var(--amplify-colors-neutral-100)"
            color="var(--amplify-colors-neutral-10)"
          >
            Sign In
          </Button>
        )}
      </Flex>
    </Flex>
  )
}

export default Navbar
