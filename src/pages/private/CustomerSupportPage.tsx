function CustomerSupportPage() {
  return (
    <div className=' flex montserrat bg-slate-50 w-full h-full'>
      <div className='flex border-r flex-col basis-2/12 ' >
        <div className='flex flex-col'>
        <h1 className='font-bold  cp-24 c3'>Chats</h1>
          {
            [1,2,3,4,5].map(chat=>(
              <div className='flex cp-l-50 ch-70 hover:bg-white rounded-md items-center   '>
                  <div className=' h-full scale-50 aspect-square overflow-hidden rounded-full'>
                    <img className='w-full object-contain' src="/images/img2.jpg" alt="" />
                  </div>
                <div>
                  <h1 className='c3 font-bold'>Ali Fahmi</h1>
                  <h1 className='c2'>how are you ?</h1>
                </div>
              </div>
            ))
          }
        </div>
      </div>
      <div className='flex flex-col  basis-10/12  bg-slate-100 '>
        <div className='flex gap-3  items-center ch-100 overflow-hidden   bg-slate-50'>
            <div className=' h-full scale-50 aspect-square overflow-hidden rounded-full'>
              <img className='w-full object-contain' src="/images/img2.jpg" alt="" />
            </div>
          <div>
            <h1 className='c3 font-bold'>Ali Fahmi</h1>
          </div>
        </div>
        <div className='flex flex-1 flex-col-reverse'>
            <div className='flex'>
              <div className=' cp-6 m-3 rounded-md bg-white w-fit max-w-[50%] '>
                    Fine
              </div>
            </div>
            <div className='flex flex-row-reverse'>
              <div className=' cp-6 m-3  bg-white w-fit max-w-[50%] '>
                  how are you ?
              </div>
            </div>
        </div>
        <div className='flex  items-center ch-100 overflow-hidden   bg-slate-50'>
          <div className='flex w-full relative items-center gap-4  '>
            <input placeholder='Type your message ' 
            className={`
             px-5 py-2 w-[90%] mx-auto
              c3  rounded-lg bg-slate-100 transition-all  focus:border outline-none  `} type="text" />
            {/* <div className="c3 absolute right-2 bg-slate-100 border-l scale-125 ">
            <IoIosSend className='m-1 cursor-pointer' />

            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomerSupportPage