import { NextRequest, NextResponse } from "next/server"
import { verifyKaryawan, verifyPelanggan } from "./helper/authorization"

export const middleware = async (request: NextRequest) => {
    //untuk melindungi folder karyawan
    if (request.nextUrl.pathname.startsWith(`/karyawan`)) {
        // jika URL diawali dengan "/karyawan"

        // ambil data token dari cookie
        const token = request.cookies.get(`token`)?.value

        // prepare redirect to login
        const redirectLogin = request.nextUrl.clone()
        redirectLogin.pathname = "/" //url halaman login

        if (typeof token === undefined) {
            return NextResponse.redirect(redirectLogin)
        }

        const isVerifiedToken = await verifyKaryawan(token ?? "")
        if (!isVerifiedToken) return NextResponse.redirect(redirectLogin)
        return NextResponse.next()
    }

    //melindungi folder pelanggan
    if (request.nextUrl.pathname.startsWith(`/pelanggan`)) {
        // jika URL diawali dengan "/karyawan"

        // ambil data token dari cookie
        const token = request.cookies.get(`token`)?.value

        // prepare redirect to login
        const redirectLogin = request.nextUrl.clone()
        redirectLogin.pathname = "/" //url halaman login

        if (typeof token === undefined) {
            return NextResponse.redirect(redirectLogin)
        }

        const isVerifiedToken = await verifyPelanggan(token ?? "")
        if (!isVerifiedToken) return NextResponse.redirect(redirectLogin)
        return NextResponse.next()
    }

    return NextResponse.next()
}
/**
 * menentukan route mana saja yang akan memberlakukan proses middleware
 */
export const config ={
    matcher:[
        "/karyawan/:path*", "/pelanggan/:path*"
    ]
    // *all(semua halaman yang ada di suatu folder dilalui midelware dahulu)
}