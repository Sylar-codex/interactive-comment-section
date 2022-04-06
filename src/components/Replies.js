import React, { useState } from 'react'
import * as uuid from 'uuid';
import plus from '../images/icon-plus.svg';
import minus from '../images/icon-minus.svg';
import replyIcon from '../images/icon-reply.svg';
import Delete from '../images/icon-delete.svg';
import Edit from '../images/icon-edit.svg';
import content from '../data/contents';
import moment from 'moment';

function Replies(props) {
    //You have not completed the modal for me

    //You find the replies and replies here
    const [score, setScore] = useState(props.score);
    const [reply, setReply] = useState(false);
    const [val, setVal] = useState([]);
    const [scoree, setScoree] = useState(2);
    const [id, setId] = useState('');
    const [Value, setValue] = useState('');
    const [edit, setEdit] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const addition = () => {
        setScore((prev) => prev + 1)
    }
    const subtraction = () => {
        score > 0 &&
            setScore((prev) => prev - 1)
    }

    const onReply = (id) => {
        setReply((R) => R = !R)
        setId(id)
    }

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

    const handleSubmit = (e) => {
        e.preventDefault()
        getContents()
        setEdit(false)
    }
    const addition1 = () => {
        setScoree((prev) => prev + 1)
    }
    const subtract1 = () => {
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

    const onEdit = (id) => {
        const Result = val.filter((cont) => {
            return (cont.id !== id)
        })
        const selectItem = val.find((item) => {
            return (item.id === id)
        })
        setValue(selectItem.Content);
        setEdit(true)
        setId(id);
        setVal(Result)
    }


    return (
        <div>
            <div>

                <div className="align-middle bg-white mt-6 p-6 flex rounded-md mx-44 mr-64 ml-64">
                    <div className="bg-light-grayish-blue w-10 h-24 align-middle justify-center px-3 pr-5 py-3 rounded-md" >
                        <div>
                            <img className='w-2 hover:cursor-pointer' onClick={() => { addition() }} src={plus} alt="plus" />
                            <p className='py-4 text-moderate-blue font-bold'>{score}</p>
                            <img className='w-2 hover:cursor-pointer' onClick={() => { subtraction() }} src={minus} alt="minus" />
                        </div>
                    </div>
                    <div className='w-full ml-5'>
                        <div className='flex justify-between'>
                            <div className='flex'>
                                <div> <img className='w-9' src={props.image} alt="Avatar" /></div>
                                <div className='ml-3'> <p> {props.username}</p></div>
                                <div className='ml-3'> <p> {props.time} </p></div>
                            </div>
                            <div onClick={() => { onReply(props.id) }} className='flex hover:cursor-pointer'>
                                <img className='h-3 w-3 mt-2' src={replyIcon} alt="reply" /><p className='text-base ml-1 text-moderate-blue font-bold'>Reply</p>
                            </div>
                        </div>
                        <div className='mt-5'>
                            <p className='text-xl'><span className='font-bold text-moderate-blue'>@{props.replyTo}</span> {props.content} </p>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        {reply && props.id === id && <div className="bg-white mt-6 p-6 flex rounded-md mx-44 mr-64 ml-64">
                            <div><img className='w-10' src={content.currentUser.image.png} alt='avatar' /></div>
                            <div className='ml-5 flex-row w-full'>
                                <form onSubmit={handleSubmit}>

                                    <textarea onChange={handleChange} className='border-2 resize-none hover:border-light-gray border-very-light-gray outline-none w-10/12 h-24 pb-14 pl-3 rounded-lg' name='' value={Value} placeholder='leave a reply...' />
                                    <button className='bg-moderate-blue ml-4 px-5 py-2 rounded-lg text-white align-top' type='submit'>REPLY</button>

                                </form>
                            </div>
                        </div>}

                    </div>
                </div>
                <div>
                    <div>
                        {val.map((cont) => (
                            <div>
                                <div className="align-middle bg-white mt-6 p-6 flex rounded-md mx-44 mr-64 ml-64" key={cont.id}>
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
                                                <div className='bg-moderate-blue text-center py-1 h-6 px-3 font-bold ml-3 text-xs text-white'><p>YOU</p></div>
                                                <div className='ml-3'> <p>{cont.time}</p> </div>
                                            </div>
                                            <div className='flex hover:cursor-pointer'>
                                                <div className='flex mr-5' onClick={() => { setModalOpen(true); setId(cont.id) }}> <img className='h-3 w-3 mt-2 mr-1' src={Delete} alt="delete" /><p className='text-base text-soft-red font-bold'>Delete</p></div>
                                                <div onClick={() => { onEdit(cont.id) }} className='flex'> <img className='h-3 w-3 mt-2 mr-1' src={Edit} alt="edit" /><p className='text-base text-moderate-blue font-bold'>Edit</p></div>
                                            </div>
                                        </div>
                                        <div className='mt-5'>
                                            <p className='text-xl'>{cont.Content}</p>
                                        </div>
                                    </div>
                                </div>
                                {modalOpen && id === cont.id && <div className='none bg-bg-modal bg-bg-opacity fixed w-full h-full top-0 left-0 overflow-hidden'>
                                    <div className='bg-white mt-80 mb-80 ml-96 w-80 rounded-md p-4'>
                                        <h1 className='font-medium text-xl text-black'>Delete comment</h1>
                                        <p className='mt-4 mb-4'>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
                                        <button onClick={() => { setModalOpen(false); }} className='bg-grayish-blue text-white rounded-md py-2 px-4'>NO, CANCEL</button>
                                        <button onClick={() => { removal(cont.id); }} className='bg-soft-red text-white py-2 px-4 ml-6 rounded-md'>YES, DELETE</button>
                                    </div>
                                </div>}
                            </div>
                        ))}
                    </div>

                </div>
                <div>
                    {
                        edit && <div className="bg-white mt-6 p-6 flex-row rounded-md mx-44 ml-64 mr-64">
                            <form onSubmit={handleSubmit}>

                                <textarea onChange={handleChange} className='border-2 resize-none hover:border-light-gray border-very-light-gray outline-none w-10/12 h-24 pb-14 pl-3 rounded-lg' value={Value} name='' placeholder='leave a reply...' />
                                <button className='bg-moderate-blue ml-4 px-5 py-2 rounded-lg text-white align-top' type='submit'>UPDATE</button>

                            </form>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Replies