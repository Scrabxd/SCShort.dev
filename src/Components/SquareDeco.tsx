import { FC } from "react";
import '../index.css'

interface SquareStyle{
    className?: string
}

export const SquareDeco:FC<SquareStyle> = ({className}) => {
    return (
        <div className={`w-60 h-60 rounded-[59px] drop-shadow-[0px_25px_15px_rgba(4,4,6,1)] bg-[#0E131E] ${className}`} ></div>
    )
}







