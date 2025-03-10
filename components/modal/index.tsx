import { ReactNode } from "react"

type props = {
    children: ReactNode
    isShow: boolean //true or false
}

const Modal = (myProp: props) => {
    return (
        <div className={`z-[1024] w-dvw h-dvh fixed top-0 left-0 bg-black bg-opacity-75 flex justify-center items-center ${myProp.isShow ? `block` : `hidden`}`}>
            <div className="w-5/6 md:w-4/6 lg:w-3/6 bg-white overflow-auto max-h-full">
                {myProp.children}
            </div>
        </div>
    )
}
export default Modal