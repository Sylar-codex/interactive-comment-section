import React, { useState, useEffect } from "react";
import * as uuid from "uuid";
import plus from "../images/icon-plus.svg";
import minus from "../images/icon-minus.svg";
import replyIcon from "../images/icon-reply.svg";
import Delete from "../images/icon-delete.svg";
import Edit from "../images/icon-edit.svg";
import content from "../data/contents";
import moment from "moment";

function Replies(props) {
  //need to figure this out
  //const replies = localStorage.getItem("replies") === null ? [] : JSON.parse(localStorage.getItem('replies'))

  //These are the states
  const [score, setScore] = useState(props.score);
  const [reply, setReply] = useState(false);
  const [val, setVal] = useState([]);
  const [scoree, setScoree] = useState(2);
  const [id, setId] = useState("");
  const [Value, setValue] = useState("");
  const [edit, setEdit] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [username, setUsername] = useState("");

  // This function increases the score of the reply which was originally there before the user used the platform
  const addition = () => {
    setScore((prev) => prev + 1);
  };

  //This function reduces the score of the reply which was originally there before the user used the platform
  const subtraction = () => {
    score > 0 && setScore((prev) => prev - 1);
  };

  //This function makes it possible to show the user's reply form
  const onReply = (id, replyTo) => {
    setReply((R) => (R = !R));
    setId(id);
    setUsername(replyTo);
  };
  //a function which gets all the contents to be submitted
  const getContents = () => {
    const comment = {
      id: uuid.v4(),
      subId: id,
      Content: Value,
      image: content.currentUser.image.png,
      replyTo: username,
      username: content.currentUser.username,
      time: moment().startOf("hour").fromNow(),
    };

    setVal([...val, comment]);
  };

  //Whenever the user reloads the page he can still view his replies or comment
  useEffect(() => {
    const comment = JSON.parse(localStorage.getItem("replies"));
    if (comment) setVal(comment);
  }, []);

  useEffect(() => {
    if (val?.length) localStorage.setItem("replies", JSON.stringify(val));
  });

  //This submits the forms
  const handleSubmit = (e) => {
    e.preventDefault();
    getContents();
    setValue("");
    setEdit(false);
    setReply(false);
  };
  //This is used to add scores from the user scores
  const addition1 = () => {
    setScoree((prev) => prev + 1);
  };
  //This is used to add scores from the user scores
  const subtract1 = () => {
    scoree > 0 && setScoree((prev) => prev - 1);
  };
  //This is used to delete the User's reply
  const removal = (id) => {
    const Result = val.filter((cont) => {
      return cont.id !== id;
    });
    console.log(Result);
    setVal(Result);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  //A function which has a parameter of id being passed from the onclick button of the edit
  const onEdit = (id) => {
    const Result = val.filter((cont) => {
      return cont.id !== id;
    });
    const selectItem = val.find((item) => {
      return item.id === id;
    });
    setValue(selectItem.Content);
    setEdit(true);
    setVal(Result);
    console.log(Result);
  };

  return (
    <div>
      <div>
        <div className="align-middle bg-white mt-6 p-6 flex desktop:flex-row mobile:flex-col-reverse rounded-md desktop:mx-44 desktop:ml-64 mobile:ml-9 desktop:mr-64 mobile:mx-5 mobile:mr-4">
          <div className="bg-light-grayish-blue desktop:mt-0 mobile:mt-4 desktop:w-10 desktop:h-24 mobile:w-24 mobile:h-10 align-middle flex desktop:flex-col mobile:flex-row justify-center px-3 pr-5 py-3 rounded-md">
            <div
              className="desktop:w-2 desktop:mt-0 mobile:mt-1 h-auto mobile:min-w-fit obj hover:cursor-pointer"
              onClick={() => {
                addition();
              }}
            >
              {" "}
              <img src={plus} alt="plus" />
            </div>
            <div className="desktop:py-4 desktop:px-0 mobile:px-4 text-moderate-blue font-bold">
              {score}
            </div>
            <div
              className="desktop:w-2 desktop:mt-0 mobile:mt-2 h-auto min-w-fit hover:cursor-pointer"
              onClick={() => {
                subtraction();
              }}
            >
              {" "}
              <img src={minus} alt="minus" />
            </div>
          </div>
          <div className="w-full desktop:ml-5 mobile:ml-0">
            <div className="flex justify-between desktop:flex-row mobile:flex-col">
              <div>
                <div className="flex">
                  <div>
                    {" "}
                    <img
                      className="desktop:w-9 mobile:w-6"
                      src={props.image}
                      alt="Avatar"
                    />
                  </div>
                  <div className="desktop:ml-3 mobile:ml-2 desktop:text-lg mobile:text-sm">
                    {" "}
                    <p> {props.username}</p>
                  </div>
                  <div className="desktop:ml-3 mobile:ml-2 desktop:text-lg mobile:text-sm">
                    {" "}
                    <p> {props.time} </p>
                  </div>
                </div>
                <div className="mt-5">
                  <p className="desktop:text-xl mobile:text-md">
                    <span className="font-bold text-moderate-blue">
                      @{props.replyTo}
                    </span>{" "}
                    {props.content}{" "}
                  </p>
                </div>
              </div>
              <div
                onClick={() => {
                  onReply(props.id, props.username);
                }}
                className="flex desktop:ml-0 desktop:mb-0 desktop:mt-0 mobile:ml-56 mobile:-mb-12 mobile:mt-10 hover:cursor-pointer"
              >
                <img className="h-3 w-3 mt-2" src={replyIcon} alt="reply" />
                <p className="text-base ml-1 text-moderate-blue font-bold">
                  Reply
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            {reply && props.id === id && (
              <div className="bg-white mt-6 p-6 flex desktop:flex-row mobile:flex-col-reverse rounded-md desktop:mx-44 desktop:mr-64 desktop:ml-64 mobile:ml-9 mobile:mx-5 mobile:mr-4">
                <div>
                  <img
                    className="w-10"
                    src={content.currentUser.image.png}
                    alt="avatar"
                  />
                </div>
                <div className="desktop:ml-5 mobile:ml-0 flex-row w-full">
                  <form onSubmit={handleSubmit}>
                    <textarea
                      onChange={handleChange}
                      className="border-2 resize-none hover:border-light-gray border-very-light-gray outline-none desktop:w-10/12 mobile:w-full h-24 pb-14 pl-3 rounded-lg"
                      name=""
                      value={Value}
                      placeholder="leave a reply..."
                    />
                    <button
                      className="bg-moderate-blue desktop:ml-5 mobile:ml-48 desktop:mb-0 mobile:-mb-10  px-5 py-2 rounded-lg text-white mobile:align-bottom desktop:align-top"
                      type="submit"
                    >
                      REPLY
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
        <div>
          {/* User's reply to previous reply */}
          <div>
            {val.map(
              (cont) =>
                cont.subId === props.id && (
                  <div key={cont.id}>
                    <div
                      className="align-middle bg-white mt-6 p-6 flex desktop:flex-row mobile:flex-col-reverse rounded-md desktop:mx-44 desktop:ml-64 mobile:ml-9 desktop:mr-64 mobile:mx-5 mobile:mr-4"
                      key={cont.id}
                    >
                      <div className="bg-light-grayish-blue desktop:mt-0 mobile:mt-4 desktop:w-10 desktop:h-24 mobile:w-24 mobile:h-10 align-middle flex desktop:flex-col mobile:flex-row justify-center px-3 pr-5 py-3 rounded-md">
                        <div
                          className="desktop:w-2 desktop:mt-0 mobile:mt-1 h-auto mobile:min-w-fit obj hover:cursor-pointer"
                          onClick={() => {
                            addition1();
                          }}
                        >
                          <img src={plus} alt="plus" />
                        </div>
                        <div className="desktop:py-4 desktop:px-0 mobile:px-4 text-moderate-blue font-bold">
                          {" "}
                          {scoree}{" "}
                        </div>
                        <div
                          className="desktop:w-2 desktop:mt-0 mobile:mt-2 h-auto min-w-fit hover:cursor-pointer"
                          onClick={() => {
                            subtract1();
                          }}
                        >
                          {" "}
                          <img src={minus} alt="minus" />{" "}
                        </div>
                      </div>
                      <div className="w-full desktop:ml-5 mobile:ml-0">
                        <div className="flex justify-between desktop:flex-row mobile:flex-col">
                          <div>
                            <div className="flex">
                              <div>
                                <img
                                  className="desktop:w-9 mobile:w-6"
                                  src={cont.image}
                                  alt="avatar"
                                />{" "}
                              </div>
                              <div className="desktop:ml-3 mobile:ml-2 desktop:text-lg mobile:text-sm">
                                {" "}
                                <p>{cont.username}</p>{" "}
                              </div>
                              <div className="bg-moderate-blue text-center py-1 h-6 mobile:px-1 desktop:px-3 font-bold desktop:ml-3 mobile:ml-2 text-xs text-white">
                                <p>YOU</p>
                              </div>
                              <div className="desktop:ml-3 mobile:ml-2 desktop:text-lg mobile:text-sm">
                                {" "}
                                <p>{cont.time}</p>{" "}
                              </div>
                            </div>
                            <div className="mt-5">
                              <p className="desktop:text-xl mobile:text-md">
                                {" "}
                                <span className="font-bold text-moderate-blue mr-2">
                                  @{cont.replyTo}
                                </span>
                                {cont.Content}
                              </p>
                            </div>
                          </div>
                          <div className="flex desktop:ml-0 desktop:mb-0 desktop:mt-0 mobile:ml-36 mobile:-mb-12 mobile:mt-10 hover:cursor-pointer">
                            <div
                              className="flex mr-5"
                              onClick={() => {
                                setModalOpen(true);
                                setId(cont.id);
                              }}
                            >
                              {" "}
                              <img
                                className="h-3 w-3 mt-2 mr-1"
                                src={Delete}
                                alt="delete"
                              />
                              <p className="text-base text-soft-red font-bold">
                                Delete
                              </p>
                            </div>
                            <div
                              onClick={() => {
                                onEdit(cont.id);
                              }}
                              className="flex"
                            >
                              {" "}
                              <img
                                className="h-3 w-3 mt-2 mr-1"
                                src={Edit}
                                alt="edit"
                              />
                              <p className="text-base text-moderate-blue font-bold">
                                Edit
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* The modal which states whether you want to go ahead with deleting your comment or not */}
                    </div>
                    {modalOpen && id === cont.id && (
                      <div className="none bg-bg-opacity fixed w-full h-full top-0 left-0 overflow-hidden">
                        <div className="bg-white desktop:mt-80 mobile:mt-64 desktop:mb-80 mobile:mb-96 desktop:ml-96 mobile:ml-8 w-80 rounded-md p-4">
                          <h1 className="font-medium text-xl text-black">
                            Delete comment
                          </h1>
                          <p className="mt-4 mb-4">
                            Are you sure you want to delete this comment? This
                            will remove the comment and can't be undone.
                          </p>
                          <button
                            onClick={() => {
                              setModalOpen(false);
                            }}
                            className="bg-grayish-blue text-white rounded-md py-2 px-4"
                          >
                            NO, CANCEL
                          </button>
                          <button
                            onClick={() => {
                              removal(cont.id);
                            }}
                            className="bg-soft-red text-white py-2 px-4 ml-6 rounded-md"
                          >
                            YES, DELETE
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )
            )}
          </div>
        </div>
        {/* Text area particularly meant for editing */}
        <div>
          {edit && (
            <div className="bg-white mt-6 p-6 flex-row rounded-md desktop:mx-44 desktop:mr-64 desktop:ml-64 mobile:ml-9 mobile:mx-5 mobile:mr-4">
              <form onSubmit={handleSubmit}>
                <textarea
                  onChange={handleChange}
                  className="border-2 resize-none hover:border-light-gray border-very-light-gray outline-none desktop:w-10/12 mobile:w-full h-24 pb-14 pl-3 rounded-lg"
                  value={Value}
                  name=""
                  placeholder="leave a reply..."
                />
                <button
                  className="bg-moderate-blue desktop:mt-0 mobile:mt-2 desktop:ml-4 mobile:ml-44 px-5 py-2 rounded-lg text-white align-top"
                  type="submit"
                >
                  UPDATE
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Replies;
