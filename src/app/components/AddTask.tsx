"use client"

import { useRouter } from "next/navigation";
import { addTodo } from "../api";
import { useRef } from "react";

const AddTask=()=>{
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router=useRouter();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const titleRef=useRef<HTMLInputElement|null>(null);
  
    const handleSubmit=async(e:React.FormEvent)=>{
      e.preventDefault();
      console.log(titleRef.current?.value);
      await addTodo(titleRef.current?.value);
      router.push("/");
      router.refresh();
    };

    return (
        <form onSubmit={handleSubmit}>
          <input
          ref={titleRef}
          type="text"
          className="rounded-md px-4 w-full py-2 my-2"
          />
          <button className="w-full px-4 py-2 text-white bg-gray-500 rounded transform hover:bg-gray-400 hover:scale-95 duration-200">
            Add Task
          </button>
        </form>
    )
}

export default AddTask