import { useForm } from "react-hook-form"
import { useTasks } from "../context/TasksContext"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
dayjs.extend(utc)


function TaskFormPage() {
  const { register, handleSubmit, setValue } = useForm()
  const { createTask, getTask, updateTask } = useTasks()
  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task = await getTask(params.id)
        console.log(task)
        setValue("title", task.title)
        setValue("description", task.description)
        setValue("date", dayjs(task.date).utc().format("YYYY-MM-DD"))
      }
    }
    loadTask()
  }, [])

  const onSubmit = handleSubmit((data) => {
    const dateValid = {
      ...data,
      date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format
    }

    if (params.id) {
      updateTask(params.id, dateValid)
    }
    else {
      createTask(dateValid)
    }
    navigate("/tasks")
  })

  return (
    <div className='flex items-center justify-center h-[calc(100vh-100px)]'>
      <div className="bg-zinc-800 mx-w-md w-full p-10 rounded-md">
        <form onSubmit={onSubmit}>
          <label htmlFor="title" className="">Titulo</label>
          <input type="text" placeholder="Título"
            {...register("title")}
            className="w-full bg-zinc-700 text-white px-4 py-2 my-2 rounded-md"
            autoFocus
          />
          <label htmlFor="description" className="">Descripción</label>
          <textarea rows="3" placeholder="Descripción"
            {...register("description")}
            className="w-full bg-zinc-700 text-white px-4 py-2 my-2 rounded-md"
          />
          <label htmlFor="date">Fecha</label>
          <input type="date" {...register("date")} className="bg-zinc-700 text-white px-4 py-2 w-full my-2 rounded-md" />

          <button className="bg-indigo-500 px-3 py-2 rounded-md">Guardar</button>
        </form>
      </div>
    </div>
  )
}

export default TaskFormPage