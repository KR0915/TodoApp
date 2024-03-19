
import { getAllTodos } from "./api";
import AddTask from "./components/AddTask";
import Link from "next/link";
import { Task } from "./types";

export default async function Home() {
  const posts=await getAllTodos();
  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold text-gray-800 -mt-31">
        TodoApp
      </h1>
      <div className="w-full max-w-xl mt-5 px-8 py-5 bg-white shadow-md rounded-lg">
        <AddTask />
      </div>
      <div className="w-full max-w-xl mt-5 px-8 py-5 rounded-lg">
      <div className="w-full flex flex-col justify-center items-center">
        {posts.map((post:Task)=>(//post:PostTypeで定義されたデータすべてにhtmlで処理する
          <div key={posts.id}//GET ALL BLOGSのtodosのidをkeyに設定してhtmlとひも付ける
          className="w-3/4 p-4 rounded-md mx-3 my-2 bg-slate-500 flex flex-col justify-center">
          <div className="flex items-center my-3">
            <div className="mr-auto">
              <h2 className="mr-auto font-semibold text-slate-50">
                {post.title}
                {/*postで定義されたデータのtitleをここで表示する*/}
              </h2>
            </div>
            <div>
            <Link
              href={`/todo/edit/${post.id}`}//リンク先のurlをしていしている
              className="px-4 py-1 text-center text-xl bg-slate-600 rounded-md font-semibold text-slate-200"
            >
              edit
            </Link>
            </div>
          </div>
        </div>))}
        </div>
      </div>
    </main>
  );
}
