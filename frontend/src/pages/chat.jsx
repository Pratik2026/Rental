import Navbar from "../components/navbar";
import c1 from "../assets/c1.png";
import {
  DotsThreeVertical,
  Chats,
  Smiley,
  PaperPlaneRight,
  PaperclipHorizontal,
} from "phosphor-react";
import { useParams } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";
const socket = io.connect("http://localhost:7000");
import { useEffect, useState } from "react";


export const Chat = () => {
  const name = localStorage.getItem("userid");
  const { sellerid } = useParams();
  const [userid, setUserid] = useState(name);
  const linkName = joinInAlphabeticalOrder(name, sellerid);
  function joinInAlphabeticalOrder(name, sellerId) {
    const lowerCaseName = name.toLowerCase();
    const lowerCaseSellerId = sellerId.toLowerCase();

    const sortedStrings = [lowerCaseName, lowerCaseSellerId].sort((a, b) =>
      a.localeCompare(b)
    );

    return sortedStrings.join("");
  }
  
  const [room, setRoom] = useState(linkName);
  const [showChat, setShowChat] = useState(false);
  useEffect(() => {
    socket.emit("join_room", room);
  }, []);

  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const sendMessage = async () => {
    console.log('message sent')
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: userid,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
      console.log(messageList);
    });
  }, [socket]);
      

  return (
    <div className="flex flex-col bg-[#A4A0A0] h-screen">
      <Navbar />
      <div className="flex justify-center bg-white shadow-md h-[80vh] mx-20 mt-32">
        <div className="w-1/3 outline outline-1 outline-gray-100">
          <div className="header flex justify-between items-center h-20 bg-[#EDEDED] border-[1px] border-gray-50">
            <div className="ml-4">
              <img className="h-10 rounded-full" src={c1} alt="" />
            </div>
            <div className="group flex gap-2">
              <Chats size={32} />
              <DotsThreeVertical size={32} />
            </div>
          </div>
          <div className="chat flex items-center h-20 border-b-[1px] border-gray-50 hover:bg-[#ebebeb] ">
            <img className="h-10 rounded-full mx-4" src={c1} alt="" />

            <div className="flex flex-col gap-2 w-3/4">
              <div className="flex justify-between w-full">
                <div className="title ml-1 text-lg font-medium">
                  Ramesh Babu
                </div>
                <div className="mr-1">time</div>
              </div>

              <div className="flex justify-between">
                <p className="text-[#BBACAF] ml-1">How u doing...?</p>
                <div className="h-6 w-6 rounded-full text-center text-white bg-custom_primary">
                  1
                </div>
              </div>
            </div>
          </div>
          <div className="chat flex items-center h-20 border-b-[1px] border-gray-50 hover:bg-[#ebebeb] ">
            <img className="h-10 rounded-full mx-4" src={c1} alt="" />

            <div className="flex flex-col gap-2 w-3/4">
              <div className="flex justify-between w-full">
                <div className="title ml-1 text-lg font-medium">
                  Ramesh Babu
                </div>
                <div className="mr-1">time</div>
              </div>

              <div className="flex justify-between">
                <p className="text-[#BBACAF] ml-1">How u doing...?</p>
                <div className="h-6 w-6 rounded-full text-center text-white bg-custom_primary">
                  1
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="right-side w-2/3">
          <div className="header flex justify-between items-center h-20 bg-[#EDEDED]">
            <div className="flex w-full">
              <div className="flex">
                <img className="h-10 rounded-full mx-4" src={c1} alt="" />
                <div className="flex flex-col">
                  <div className="title ml-1 text-lg font-medium">
                    Ramesh Babu
                  </div>
                  <div className="text-[#686C72] ml-1">Online</div>
                </div>
              </div>
            </div>
            <div className="group flex gap-2">
              <DotsThreeVertical size={32} />
            </div>
          </div>
          <div className="h-[499px] bg-[#e5ddd5] flex flex-col overflow-y-scroll ">
            {messageList.map((messageContent) => {
              
                <div className="bg-[#e5ddd5] h-[10rem]  flex items-start">
                  <div className="p-4">
                    <div className="flex gap-3">
                      <div className="w-12 h-12 rounded-full bg-rose-400 p-0.5">
                        <img
                          src={c1}
                          alt=""
                          className="h-full w-full object-cover rounded-full"
                        />
                      </div>

                      <div className="text-sm p-5 w-[75%] bg-slate-600 text-slate-100 rounded-lg relative before:absolute before:content-[''] before:w-3 before:h-3 before:bg-slate-600 before:rotate-45 before: before:-left-1 before:top-4">
                        <p>{messageContent.message}</p>
                      </div>
                    </div>
                  </div>
                </div>
               ; 
            })}
            <div className="bg-[#F0F0F0] h-16 flex justify-around items-center gap-2 py-2">
              <Smiley size={32} />
              <PaperclipHorizontal size={32} className=" rotate-90" />
              <input
                className="rounded-full w-4/5 h-10 p-2 pl-4"
                type="text"
                placeholder="Type a Message"
                value={currentMessage}
                onChange={(event) => {
                  setCurrentMessage(event.target.value);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    sendMessage();
                  }
                }}
              />
              <button onClick={sendMessage}>&#9658;</button>
              <PaperPlaneRight size={32} />
            </div>
        </div>
      </div>
      </div>
      </div>
  );
};
