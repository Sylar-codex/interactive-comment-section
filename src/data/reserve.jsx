<div>
    {val.map((cont) => (
        <div className=" align-middle bg-white mt-6 p-6 flex rounded-md mx-44 mr-64 ml-64" key={cont.id}>
            <div className="bg-light-grayish-blue w-10 h-24 align-middle justify-center px-3 pr-5 py-3 rounded-md">
                <div className='w-2 hover:cursor-pointer' onClick={() => { addition1() }}><img src={plus} alt="plus" /></div>
                <div className='py-4 text-moderate-blue font-bold'> {scoree} </div>
                <div className='w-2 hover:cursor-pointer' onClick={() => { subtract1() }}> <img src={minus} alt="minus" /> </div>
            </div>
            <div className='w-full ml-5'>
                <div className='flex justify-between'>
                    <div className='flex'>
                        <div><img className='w-9' src={cont.image} alt="avatar" /> </div>
                        <div className='ml-3'> <p>{cont.username}</p> </div>
                        <div className='ml-3'> <p>{cont.time}</p> </div>
                    </div>
                    <div className='flex hover:cursor-pointer'>
                        <div className='flex mr-5' onClick={() => { removal(cont.id); }}> <img className='h-3 w-3 mt-2 mr-1' src={Delete} alt="delete" /><p className='text-base text-soft-red font-bold'>Delete</p></div>
                        <div className='flex'> <img className='h-3 w-3 mt-2 mr-1' src={Edit} alt="edit" /><p className='text-base text-moderate-blue font-bold'>Edit</p></div>
                    </div>
                </div>
                <div className='mt-5'>
                    <p className='text-xl'>{cont.Content}</p>
                </div>
            </div>
        </div>
    ))}
</div>

{
    cont.id === id && edit && <div className='ml-5 flex-row w-full'>
        <form onSubmit={handleSubmit}>

            <textarea onChange={handleChange} className='border-2 resize-none hover:border-light-gray border-very-light-gray outline-none w-10/12 h-24 pb-14 pl-3 rounded-lg' value={Value} name='' placeholder='leave a reply...' />
            <button className='bg-moderate-blue ml-9 px-5 py-2 rounded-lg text-white align-top' type='submit'>UPDATE</button>

        </form>
    </div>
}