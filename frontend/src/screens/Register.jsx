import React, { useContext } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../config/axios'
import {UserContext} from '../context/user.context'

const Register = () => {
   const {user,setuser}=useContext(UserContext)
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const navigate=useNavigate()
    async function handleSubmit(e) {
        e.preventDefault()
        axios.post('/users/register',{
            email,
            password
        })
        .then((res)=>{
             setuser(res.data.user)
           localStorage.setItem('token',res.data.token)
            navigate('/')
        })
        .catch((err)=>{
            console.log(err.response.data);
        })
    }
  return (
     <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md rounded-[32px] border border-slate-800 bg-slate-900/95 p-10 shadow-2xl shadow-slate-950">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Welcome back</p>
          <h1 className="mt-5 text-3xl font-semibold text-white">Register to your account</h1>
          <p className="mt-3 text-sm text-slate-400">Use your email and password to continue.</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-slate-300">
              Email
            </label>
            <input
              onChange={(e)=>{setemail(e.target.value)}}
            value={email}
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-slate-300">
              Password
            </label>
            <input
            onChange={(e)=>{setpassword(e.target.value)}}
            value={password}
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            Sign up
          </button>
        </form>

        <p className="mt-7 text-center text-sm text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-indigo-400 hover:text-indigo-300">
            Login now
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register