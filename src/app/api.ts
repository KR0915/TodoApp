//全Todoリスト取得API
export async function getAllTodos(){
    const res=await fetch(`https://todo-e60lr7u63-ren-kikuchis-projects.vercel.app/todo`,{
        cache:"no-store",//SSR or CSR
    });
    const todos=await res.json()

    return todos.posts;
};

  //Todoリスト投稿API
export const addTodo=async(title:string|undefined)=>{
    const res=await fetch(`https://todo-e60lr7u63-ren-kikuchis-projects.vercel.app/api/todo`,{
        method:"POST",
        headers:{
            "Content-type":"application/json",
        },
        body: JSON.stringify({title}),
    });
    return res.json();
};

//Todoリスト編集用API
export const editTodo=async(
    title:string |undefined,
    id:number
    )=>{
    const res=await fetch(`https://todo-e60lr7u63-ren-kikuchis-projects.vercel.app/api/todo/${id}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({title,id}),
    });
    return res.json();//json形式でresを返す
};

//編集中に編集前の文字を表示
export const getTodoByID=async(id:number)=>{
    const res=await fetch(`https://todo-e60lr7u63-ren-kikuchis-projects.vercel.app/api/todo/${id}`);
    const data=await res.json();//受け取った
    console.log(data)
    return data.post;//json形式でresを返す
};

//Todo1リスト削除API
export const deleteTodo=async(id:number)=>{
    const res=await fetch(`https://todo-e60lr7u63-ren-kikuchis-projects.vercel.app/api/todo/${id}`,{
        method:"DELETE",
        headers:{
            "Content-type":"application/json",
        },
    });
    return res.json();
};