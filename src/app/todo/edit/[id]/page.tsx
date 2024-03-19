"use client"
import { deleteTodo, editTodo, getTodoByID } from "@/app/api";
import { useRouter } from "next/navigation"
import { useEffect, useRef } from "react"

const EditTodo=({params}:{params:{id:number}})=>{
    const router=useRouter();
    const titleRef=useRef<HTMLInputElement|null>(null);

    const handleSubmit=async(e:React.FormEvent)=>{
        e.preventDefault();

        console.log(titleRef.current?.value);

        await editTodo(
            titleRef.current?.value,
            params.id);

        router.push("/")
        router.refresh();
    };

    const handleDelete=async()=>{
        await deleteTodo(params.id)

        router.push("/")
        router.refresh();
    };

    return (
        <div className="w-full m-auto flex my-4">
            <div className="flex flex-col justify-center items-center m-auto">
            <p className="text-2xl text-slate-200 font-bold p-3">
                Edit Todo
            </p>
            <form onSubmit={handleSubmit}>
                <input
                ref={titleRef}
                placeholder="タイトル入力"
                type="text"
                className="rounded-md px-4 w-full py-2 my-2"
                />
                <button className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100">
                    update
                </button>
                <button
                onClick={handleDelete}
                className="ml-2 font-semibold px-4 py-2 shadow-xl bg-red-400 rounded-lg m-auto hover:bg-slate-100">
                    delete
                </button>
            </form>
            </div>
        </div>
    )
}

export default EditTodo