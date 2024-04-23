import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function Navbar() {

    const { isAuthenticated, logout, user } = useAuth()
    return (
        <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
            <Link to={isAuthenticated ? "/tasks" : "/"}>
                <h1 className='text-2xl font-bold'>Administrador de tareas</h1></Link>
            <ul className='flex gap-x-2'>
                {isAuthenticated ? (
                    <>
                        <li>
                            Bienvenido {user.username}
                        </li>
                        <li>
                            <Link to="/add-task"
                                className="bg-indigo-500 px-4 py-1 rounded-sm"
                            > Añadir tarea</Link>
                        </li>
                        <li>
                            <Link to="/" onClick={logout}> Salir</Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/login" className="bg-indigo-500 px-4 py-1 rounded-sm"> Ingresar</Link>
                        </li>
                        <li>
                            <Link to="/register" className="bg-indigo-500 px-4 py-1 rounded-sm"> Registrar</Link>
                        </li>
                    </>
                )
                }
            </ul >

        </nav >
    )
}

export default Navbar