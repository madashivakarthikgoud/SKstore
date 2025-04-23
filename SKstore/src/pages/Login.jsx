import React, { useState, useContext, useEffect } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css'
import { ShopContext } from '../context/ShopContext'

export const Login = () => {
  const [mode, setMode] = useState('Login')
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext)

  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
  })

  // Simple validation
  const errors = {
    name: mode === 'Sign Up' && !form.name.trim() ? 'Required' : '',
    email: !form.email.trim() ? 'Required' : '',
    password: !form.password.trim() ? 'Required' : '',
  }

  // ← No TS annotation here
  const handleBlur = field =>
    setTouched(prev => ({ ...prev, [field]: true }))

  const handleChange = e =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const onSubmit = async e => {
    e.preventDefault()
    setTouched({ name: true, email: true, password: true })

    // Don’t submit if any errors
    if (
      (mode === 'Sign Up' && errors.name) ||
      errors.email ||
      errors.password
    ) {
      return toast.error('Please fill in all required fields.')
    }

    try {
      const url =
        mode === 'Sign Up'
          ? `${backendUrl}/api/user/register`
          : `${backendUrl}/api/user/login`
      const payload =
        mode === 'Sign Up'
          ? { name: form.name, email: form.email, password: form.password }
          : { email: form.email, password: form.password }

      const response = await axios.post(url, payload)
      if (response.data.success) {
        setToken(response.data.token)
        localStorage.setItem('token', response.data.token)
      } else {
        toast.error(response.data.message)
      }
    } catch (err) {
      toast.error(err.message || 'Something went wrong')
    }
  }

  useEffect(() => {
    if (token) navigate('/')
  }, [token, navigate])

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col items-center w-[90%] sm:max-w-[400px] m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="font-medium text-3xl">{mode}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {mode === 'Sign Up' && (
        <div className="relative w-full">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            onBlur={() => handleBlur('name')}
            type="text"
            className="w-full px-3 py-2 border border-gray-800 rounded-md"
            placeholder="Name"
          />
          {touched.name && errors.name && (
            <span className="absolute text-sm text-red-500 top-[50%] right-3 transform -translate-y-1/2">
              {errors.name}
            </span>
          )}
        </div>
      )}

      {['email', 'password'].map(field => (
        <div key={field} className="relative w-full">
          <input
            name={field}
            type={field}
            value={form[field]}
            onChange={handleChange}
            onBlur={() => handleBlur(field)}
            className="w-full px-3 py-2 border border-gray-800 rounded-md"
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          />
          {touched[field] && errors[field] && (
            <span className="absolute text-sm text-red-500 top-[50%] right-3 transform -translate-y-1/2">
              {errors[field]}
            </span>
          )}
        </div>
      ))}

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your password?</p>
        <p
          onClick={() => {
            setMode(prev => (prev === 'Login' ? 'Sign Up' : 'Login'))
            setTouched({ name: false, email: false, password: false })
          }}
          className="cursor-pointer text-blue-500"
        >
          {mode === 'Login' ? 'Create account' : 'Login here'}
        </p>
      </div>

      <button
        type="submit"
        className="bg-black text-white font-light px-8 py-2 mt-4 rounded-md"
      >
        {mode}
      </button>
    </form>
  )
}
