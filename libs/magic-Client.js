import { Magic } from "magic-sdk";

const createMagic = () =>{
    return(
        typeof window !=="undefined" &&  new Magic(process.env.NEXT_PUBLIC_Magic_Publishable_API_Key)
    )
}

export const magic = createMagic()