import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "../config/axios.js";
import { useLocation } from "react-router-dom";
import {
  initializeSocket,
  sendMessage,
  receiveMessage,
} from "../config/socket.js";
import { UserContext } from "../context/user.context.jsx";

const Projects = () => {
  const location = useLocation();
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCollaboratorIds, setSelectedCollaboratorIds] = useState([]);
  const [collaborators, setCollaborators] = useState([]);
  const [project, setProject] = useState(location.state.project);
  const [message, setMessage] = useState("");
  const { user } = useContext(UserContext);
  const messageBox=useRef()
  

  function send() {
    sendMessage("project-message", {
      message,
      sender: user.email,
    });
    appendOutgoingMessage(message)
    setMessage("");
  }

  useEffect(() => {
    initializeSocket(project._id);

    receiveMessage("project-message", (data) => {
      console.log(data);
      appendIncomingMessage(data)
    });
    axios
      .get(`/projects/get-project/${location.state.project._id}`)
      .then((res) => {
        setProject(res.data.project);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("/users/all")
      .then((res) => {
        setCollaborators(res.data.allUsers);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);

  async function addCollaborator() {
    await axios
      .put("/projects/add-user", {
        projectId: location.state.project._id,
        users: Array.from(selectedCollaboratorIds),
      })
      .then((res) => {
        setIsModalOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const toggleCollaborator = (userId) => {
    setSelectedCollaboratorIds((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId],
    );
  };

  function appendIncomingMessage(messageObject) {
    const messageBox=document.querySelector('.message-box')
    const message = document.createElement("div");
    message.classList.add('message','flex','w-fit','max-w-56','flex-col','rounded-md','bg-amber-50','p-2','m-2')
    message.innerHTML=`
    <small className='opacity-65 text-xs'>${messageObject.sender} </small> 
    <p className='text-sm'>${messageObject.message}</p>
    `
    messageBox.appendChild(message)
  
  }
  function appendOutgoingMessage(messageObject) {
    const messageBox=document.querySelector('.message-box')
    const message = document.createElement("div");
    message.classList.add('message','ml-auto','flex','w-fit','max-w-56','flex-col','rounded-md','bg-amber-50','p-2','m-2')
    message.innerHTML=`
    <small className='opacity-65 text-xs'>${user.email} </small> 
    <p className='text-sm'>${messageObject}</p>
    `
    messageBox.appendChild(message)
    
  }
  

  return (
    <main className="min-h-screen w-full bg-slate-100">
      <section className="flex h-screen w-full flex-col md:flex-row">
        <div className="left flex h-full w-full flex-col bg-slate-300 relative md:w-90">
          <header className="flex items-center justify-between w-full bg-white px-4 py-3 shadow-sm">
            <button
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              onClick={() => setIsModalOpen(true)}
            >
              <i className="ri-add-fill text-lg"></i>
              <span>Add Collaborators</span>
            </button>
            <button
              className="rounded-full p-2 transition hover:bg-slate-100"
              onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
            >
              <i className="ri-group-fill text-lg"></i>
            </button>
          </header>

          <div className="conversation-area flex grow flex-col">
            <div
            ref={messageBox}
             className="message-box grow overflow-y-auto h-25 p-2"
            >
              <div className="incoming flex w-fit max-w-56 flex-col rounded-md bg-amber-50 p-2 m-2">
                <small className="text-xs opacity-65">email@email.com</small>
                <p className="text-sm">Lorem ipsum dolor sit amet.</p>
              </div>
              <div className="ml-auto flex w-fit max-w-56 flex-col rounded-md bg-amber-50 p-2 m-2">
                <small className="text-xs opacity-65">email@email.com</small>
                <p className="text-sm">Lorem ipsum dolor sit amet.</p>
              </div>
            </div>

            <div className="inputField flex w-full border-t border-slate-200 bg-white">
              <input
                type="text"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                placeholder="Enter message"
                className="grow border-none bg-white px-4 py-3 outline-none"
              />
              <button
                onClick={send}
                className="bg-slate-600 px-4 text-white transition hover:bg-slate-700"
              >
                <i className="ri-send-plane-fill"></i>
              </button>
            </div>

            <div
              className={`absolute top-0 left-0 flex h-full w-full flex-col gap-2 bg-slate-100 shadow-xl transition-all duration-300 ${isSidePanelOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
              <header className="flex w-full items-center justify-between bg-white px-4 py-2">
                <h1 className="font-semibold text-lg">Collaborators</h1>
                <button
                  className="rounded-full p-2 transition hover:bg-slate-100"
                  onClick={() => setIsSidePanelOpen(false)}
                >
                  <i className="ri-close-fill text-lg"></i>
                </button>
              </header>

              <div className="flex flex-col gap-2 overflow-y-auto px-2 py-2">
                {project.users.map((user) => (
                  <div className="user flex items-center gap-2 rounded-lg p-2 hover:bg-sky-100">
                    <div className="m-2 flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 text-white">
                      <i className="ri-user-fill"></i>
                    </div>
                    <h1 className="font-medium text-slate-700">{user.email}</h1>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-3 py-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-4 shadow-xl sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-800">
                  Add Collaborators
                </h3>
                <p className="text-sm text-slate-500">
                  Choose users and save their IDs.
                </p>
              </div>
              <button
                className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100"
                onClick={() => setIsModalOpen(false)}
              >
                <i className="ri-close-fill text-xl"></i>
              </button>
            </div>

            <div className="mt-4 max-h-[60vh] space-y-2 overflow-y-auto">
              {collaborators?.map((user) => {
                const isSelected = selectedCollaboratorIds.includes(user._id);

                return (
                  <button
                    key={user._id}
                    type="button"
                    onClick={() => toggleCollaborator(user._id)}
                    className={`flex w-full items-center justify-between rounded-xl border p-3 text-left transition ${
                      isSelected
                        ? "border-sky-500 bg-sky-50"
                        : "border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-700 text-sm font-semibold text-white">
                        {user.email.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">
                          {user.email}
                        </p>
                        {/* <p className='text-sm text-slate-500'>{user.email}</p> */}
                      </div>
                    </div>
                    <div
                      className={`h-5 w-5 rounded-full border-2 ${isSelected ? "border-sky-500 bg-sky-500" : "border-slate-300"}`}
                    >
                      {isSelected && (
                        <i className="ri-check-line flex items-center justify-center text-xs text-white"></i>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-between">
              <div className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-600">
                Selected: {selectedCollaboratorIds.length}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
                  onClick={() => setSelectedCollaboratorIds([])}
                >
                  Clear
                </button>
                <button
                  type="button"
                  className="rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
                  onClick={addCollaborator}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Projects;
