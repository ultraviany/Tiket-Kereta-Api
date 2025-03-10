"use client"

import { axiosInstance } from "@/helper/api"
import { storeCookie } from "@/helper/client-cookie"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { toast, ToastContainer } from "react-toastify"

const LoginPage = () => {
  const [username, setUsername] =
    useState<string>("")
  const [password, setPassword] =
    useState<string>("")

  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {

    try {
      e.preventDefault()
      const url = `/auth`
      const requestData = {
        username, password
      }
      //hit endpoint
      const response: any = await axiosInstance
        .post(url, requestData)

      //response postman
      if (response.data.succes === false) {
        const message = response.data.message
        toast(
          message,
          {
            type: "warning",
            containerId: "toastLogin"
          }
        )
      } else {
        const message = response.data.message
        const token = response.data.token
        const role = response.data.role

        /**store token in cookie */
        storeCookie(`token`, token)

        toast(
          message,
          {
            type: "success",
            containerId: `toastLogin`
          }
        )

        // from next navigation

        if (role == `ADMIN`) {
          /**direct ke halaman kereta */
          setTimeout(
            () => router.replace(`/karyawan/kereta`),
            100
          )
        } else if (role === `CUSTOMER`) {
          // direct ke halaman jadwal
          setTimeout(
            () => router.replace(`/pelanggan/jadwal`),
            1000
          )
        }
      }

    } catch (error) {
      console.log(error)
      toast(`Something wrong`,
        {
          containerId: `toastLogin`,
          type: `error`

        }
      )
    }
  }

  return (
    <div className="w-dvw h-dvh flex justify-center items-center">
      <ToastContainer
        containerId={`toastLogin`} />
      <form
        onSubmit={e => handleSubmit(e)}
        className="w-5/6 md:w-1/2 border rounded-lg">
        {/* header login */}
        <div className="w-full bg-blue-600 text-white p-3">
          <h1 className="text-xl  font-semibold">
            Login
          </h1>
        </div>

        {/* login body */}
        <div className="w-full p-5">
          <div className="mb-3">
            <span className="text-sm text-blue-600">Username</span>
            <input type="text"
              id={`username`}
              value={username}
              onChange={e => setUsername(e.target.value)}
              required={true}
              className="w-full p-2 border rounded-md" />
          </div>

          <div className="mb-3">
            <span className="text-sm text-blue-600">Password</span>
            <input type="password"
              id={`password`}
              value={password}
              onChange={e => setPassword(e.target.value)}
              required={true}
              className="w-full p-2 border rounded-md" />
          </div>
          <button type="submit"
            className="bg-green-600 hover:bg-green-500 text-white w-full rounded-md px-4 py-2">
            Login
          </button>


        </div>
      </form>
    </div>
  )
}
export default LoginPage