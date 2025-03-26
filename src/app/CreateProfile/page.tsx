"use client"
import { useState } from "react"

import { SecondPage } from "./SecondPage"
import { LastPage } from "./LastPage"
import FristPage from "./FristPage"



const Page = () => {
    const [chnagePage, setChangePage] = useState<number>(0)
    console.log('setChangePage :>> ', setChangePage);
    const Controller = [FristPage, SecondPage, LastPage][chnagePage]
    const nextPage = (() => {
        setChangePage(chnagePage + 1)
    })
    return (
        <div>
            <Controller nextPage={nextPage} />
        </div>
    )
}
export default Page