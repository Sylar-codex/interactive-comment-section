import React, { useState, useEffect } from 'react';
import content from '../data/contents.js';
import * as uuid from 'uuid';
import plus from '../images/icon-plus.svg';
import minus from '../images/icon-minus.svg';
import Delete from '../images/icon-delete.svg';
import Edit from '../images/icon-edit.svg'
import moment from 'moment'
function UserComments() {
    //These are the states
    const [scoree, setScoree] = useState(2);
    const [val, setVal] = useState([]);
    const [Value, setValue] = useState('');
    const [edit, setEdit] = useState(false);
    const [id, setId] = useState('')
    const [modalOpen, setModalOpen] = useState(false);

    const getContents = () => {
        const comment = {
            id: uuid.v4(),
            Content: Value,
            image: content.currentUser.image.png,
            username: content.currentUser.username,
            time: moment().startOf('hour').fromNow(),
        }

        setVal([...val, comment])
    }

    //Whenever the user reloads the page he can still view his replies or comment
    useEffect(() => {
        const comment = localStorage.getItem('userComment')
        if (!comment) return
        setVal(JSON.parse(comment))
    }, [])

    useEffect(() => {
        localStorage.setItem('userComment', JSON.stringify(val))
    });

    const addition = () => {
        setScoree((prev) => prev + 1)
    }
    const subtract = () => {
        scoree > 0 &&
            setScoree((prev) => prev - 1)
    }

    const removal = (id) => {
        const Result = val.filter((cont) => {
            return (cont.id !== id)
        })
        console.log(Result)
        setVal(Result)
    }
    const handleChange = (e) => {
        setValue(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setValue('')
        getContents()
    }

    const onEdit = (id) => {
        const Result = val.filter((cont) => {
            return (cont.id !== id)
        })
        const selectItem = val.find((item) => {
            return (item.id === id)
        })
        console.log(Result)
        setValue(selectItem.Content);
        setEdit(true)
        setVal(Result)
    }

    return (
        <div>
            <div>

                <div>
                    {val.map((cont) => (
                        <div key={cont.id}>
                            <div className="align-middle bg-white mt-6 p-6 flex desktop:flex-row mobile:flex-col-reverse rounded-md desktop:mx-44 desktop:mr-64 mobile:mx-5 mobile:mr-4" key={cont.id}>
                                <div className="bg-light-grayish-blue desktop:mt-0 mobile:mt-4 desktop:w-10 desktop:h-24 mobile:w-24 mobile:h-10 align-middle flex desktop:flex-col mobile:flex-row justify-center px-3 pr-5 py-3 rounded-md">
                                    <div className='desktop:w-2 desktop:mt-0 mobile:mt-1 h-auto mobile:min-w-fit obj hover:cursor-pointer' onClick={() => { addition() }}><img src={plus} alt="plus" /></div>
                                    <div className='desktop:py-4 desktop:px-0 mobile:px-4 text-moderate-blue font-bold'> {scoree} </div>
                                    <div className='desktop:w-2 desktop:mt-0 mobile:mt-2 h-auto min-w-fit hover:cursor-pointer' onClick={() => { subtract() }}> <img src={minus} alt="minus" /> </div>
                                </div>
                                <div className='w-full desktop:ml-5 mobile:ml-0'>
                                    <div className='flex justify-between desktop:flex-row mobile:flex-col'>
                                        <div>
                                            <div className='flex'>
                                                <div><img className='desktop:w-9 mobile:w-6' src={cont.image} alt="avatar" /> </div>
                                                <div className='desktop:ml-3 mobile:ml-2 desktop:text-lg mobile:text-sm'> <p>{cont.username}</p> </div>
                                                <div className='bg-moderate-blue text-center py-1 h-6 mobile:px-1 desktop:px-3 font-bold desktop:ml-3 mobile:ml-2 text-xs text-white'><p>YOU</p></div>
                                                <div className='desktop:ml-3 mobile:ml-2 desktop:text-lg mobile:text-sm'> <p>{cont.time}</p> </div>
                                            </div>
                                            <div className='mt-5'>
                                                <p className='desktop:text-xl mobile:text-md'>{cont.Content}</p>
                                            </div>
                                        </div>

                                        <div className='flex desktop:ml-0 desktop:mb-0 desktop:mt-0 mobile:ml-40 mobile:-mb-12 mobile:mt-10 hover:cursor-pointer'>
                                            <div className='flex mr-5' onClick={() => { setModalOpen(true); setId(cont.id) }}> <img className='h-3 w-3 mt-2 mr-1' src={Delete} alt="delete" /><p className='text-base text-soft-red font-bold'>Delete</p></div>
                                            <div onClick={() => { onEdit(cont.id) }} className='flex'> <img className='h-3 w-3 mt-2 mr-1' src={Edit} alt="edit" /><p className='text-base text-moderate-blue font-bold'>Edit</p></div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                            {modalOpen && id === cont.id && <div className='none bg-bg-opacity fixed w-full h-full top-0 left-0 overflow-hidden'>
                                <div className='bg-white desktop:mt-80 mobile:mt-64 desktop:mb-80 mobile:mb-96 desktop:ml-96 mobile:ml-8 w-80 rounded-md p-4'>
                                    <h1 className='font-medium text-xl text-black'>Delete comment</h1>
                                    <p className='mt-4 mb-4'>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
                                    <button onClick={() => { setModalOpen(false); }} className='bg-grayish-blue text-white rounded-md py-2 px-4'>NO, CANCEL</button>
                                    <button onClick={() => { removal(cont.id); }} className='bg-soft-red text-white py-2 px-4 ml-6 rounded-md'>YES, DELETE</button>
                                </div>
                            </div>}
                        </div>
                    ))}
                </div>

                <div className="bg-white mt-6 p-6 flex desktop:flex-row mobile:flex-col-reverse rounded-md desktop:mx-44 desktop:mr-64 mobile:mx-5 mobile:mr-4">
                    <div><img className='w-10' src={content.currentUser.image.png} alt='avatar' /></div>

                    <div className='desktop:ml-5 mobile:ml-0 flex-row w-full'>
                        <form onSubmit={handleSubmit}>

                            <textarea onChange={handleChange} className='border-2 resize-none hover:border-light-gray border-very-light-gray outline-none desktop:w-10/12 mobile:w-full h-24 pb-14 pl-3 rounded-lg' value={Value} name='' placeholder='Add a comment...' />
                            <button onClick={() => { setEdit(false); setModalOpen(false) }} style={{ marginLeft: edit && window.innerWidth > 375 && '1rem' }} className='bg-moderate-blue desktop:ml-9 mobile:ml-52 desktop:mb-0 mobile:-mb-10 px-5 py-2 rounded-lg text-white desktop:align-top mobile:align-bottom' type='submit'>{edit ? 'UPDATE' : 'SEND'}</button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserComments