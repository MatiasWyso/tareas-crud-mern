import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from "react-router-dom"



function RegisterPage() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { signup, isAuthenticated, errors: registerErrors } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticated) navigate("/tasks")
    }, [isAuthenticated])

    const onSubmit = handleSubmit(async (values) => {
        signup(values)
    })

    return (
        <div className='flex items-center justify-center h-[calc(100vh-100px)]'>
            <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
                {
                    registerErrors.map((error, i) => (
                        <div className='bg-red-500 p-2 text-white' key={i}>
                            {error}
                        </div>
                    ))
                }
                <h1 className='text-3xl font-bold my-2'>Registrar</h1>
                <form onSubmit={onSubmit}
                >
                    <input type="text" {...register("username", { required: true })} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' placeholder="Usuario" />
                    {errors.username && <p className='text-red-500'>Usuario requerido</p>}
                    <input type="email"{...register("email", { required: true })} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' placeholder="Email" />
                    {errors.email && <p className='text-red-500'>Email requerido</p>}
                    <input type="password" {...register("password", { required: true })} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' placeholder="Contraseña" />
                    {errors.password && <p className='text-red-500'>Contraseña requerida</p>}
                    <button type="submit" className='bg-sky-500 text-white px-4 py-2 rounded-md my-2 '> Registrar </button>

                </form>
                <p className="flex gap-x-2 justify-between">
                    Ya tenes una cuenta? <Link to="/login" className="text-sky-500">Ingresar</Link>
                </p>
            </div>
        </div>
    )
}

export default RegisterPage