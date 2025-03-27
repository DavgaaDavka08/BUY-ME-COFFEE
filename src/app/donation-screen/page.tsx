"use client"
import { Input } from '@/components/ui/input'
import React from 'react'
import { useUser } from '../_Context/userContext'
import Image from 'next/image'

const Page = () => {
    const { callData } = useUser()
    return (
        <div className='w-full h-screen'>
            <div className='w-full h-[339px] flex justify-center items-center bg-[#F4F4F5] '>
                <Input type='file' className='w-[300px] h-[20px]' />
            </div>
            <div className='flex w-full gap-10 items-center m-auto justify-around' >
                <div className='flex w-[40%]  flex-col gap-5 ' >
                    <div className='flex p-6  gap-10 flex-col items-start  rounded-2xl border '>
                        <div className='w-[100%] flex justify-between '>
                            <div className='flex gap-2 items-center'>
                                <Image src="/avatar.svg" alt="" width={50} height={50} />
                                <p>  {callData && callData[0].name}</p>
                            </div>
                            <div>dfsml;</div>
                        </div>
                        <div className='flex flex-col w-[100%] gap-2 bg-[#F4F4F5]'>
                            <p>about Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse excepturi qui nihil, unde error, commodi nemo repudiandae voluptas quae doloribus asperiores cum iure. Eos vitae culpa architecto deserunt magnam sequi. {callData && callData[0].name}</p>
                            <p>{callData && callData[0].about}</p>
                        </div>

                    </div>
                    <div className='flex p-6 flex-col items-start gap-2 rounded-2xl border '>
                        <div className='flex flex-col gap-2'>
                            <p> Social media URL</p>
                            <p>{callData && callData[0].socialMediaURL}</p>
                        </div>
                    </div>
                    <div className='flex p-6 flex-col items-start gap-2 rounded-2xl border '>
                        <div>
                            <p>Recent Supporters</p>
                        </div>
                        <div className='flex w-[100%] p-6 flex-col justify-center items-center gap-6 rounded-2xl border'>
                            <Image src="/avatar.svg" alt="" width={50} height={50} />
                            <p>Be the first one to support Jake</p>
                        </div>

                    </div>
                </div>


                <div className='flex w-[40%] p-6 flex-col gap-2 rounded-2xl border '>
                    <div className='w-[100%] flex justify-between '>
                        <p>  {callData && callData[0].name}</p>
                        <div>dfsml;</div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Page