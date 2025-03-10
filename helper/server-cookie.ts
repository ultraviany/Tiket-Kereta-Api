/**cookie
 * tempat penyimpanan pada browser
 * biasanya untuk menyimpan data sesi user session
 */
import { cookies } from "next/headers"

export const getServerCookie = async (
    key: string
): Promise<any> => {
    return (await cookies()).get(key)?.value || ""
}
