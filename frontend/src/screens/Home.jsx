import React, { useContext, useState } from 'react'
import {UserContext} from '../context/user.context'
import axios from '../config/axios.js'
import { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'

const Home = () => {
      const navigate=useNavigate()
      const {user}=useContext(UserContext)
      const [isModalOpen, setisModalOpen] = useState(false)
      const [projectName, setprojectName] = useState('')
      const [projects,setProjects]=useState([])
      async function handleSubmit(e) {
        e.preventDefault()
        await axios.post('/projects/create',{name:projectName})
        .then((res)=>{
          console.log(res.data);
          
          setisModalOpen(false)
        })
        .catch((err)=>{
          console.log(err.message);
        })
      }
      useEffect(()=>{
        axios.get('/projects/all')
        .then((res)=>{
          setProjects(res.data.projects)
        })
        .catch((err)=>{
          console.log(err.response.data);
        })
      },[])
  return (
   <main className='min-h-screen bg-slate-950 p-5 text-slate-100'>
    <div className="flex items-center gap-4">
      <button
        onClick={() => setisModalOpen(true)}
        className='rounded-2xl border border-slate-700 bg-slate-900 px-5 py-4 text-slate-100 transition hover:border-slate-500'
      >
        <i className='ri-link'></i>
      </button>
      <div>
        <h1 className='text-2xl font-semibold'>Projects</h1>
        <p className='mt-2 text-sm text-slate-400'>Create a new project to begin tracking.</p>
      </div>
    </div>
    {projects.length > 0 ? (
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div
          onClick={()=>{navigate('/project',{state:{project}})}}
          key={project._id} className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="text-lg font-semibold text-white">{project.name}</h3>
            <p className='py-2'><i className='ri-user-line'></i>Collabraters :{project.users.length}</p>
          </div>
        ))}
      </div>
    ) : (
      <p className="mt-4 text-slate-400">No projects found.</p>
    )}

    {isModalOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4">
        <div className="w-full max-w-md rounded-4xl border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-slate-950">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">New project</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">Project details</h2>
            </div>
            <button
              type="button"
              onClick={() => setisModalOpen(false)}
              className="rounded-full  p-3 text-slate-400 transition hover:text-white"
            >
              ✕
            </button>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="projectName" className="block text-sm font-medium text-slate-300">
                Project name
              </label>
              <input
              onChange={(e)=>{setprojectName(e.target.value)}}
              value={projectName}
                id="projectName"
                name="projectName"
                type="text"
                placeholder="Enter project name"
                className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setisModalOpen(false)}
                className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-slate-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-indigo-500"
              >
                Create project
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
   </main>
  )
}

export default Home