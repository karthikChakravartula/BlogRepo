import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useEffect, useState } from "react";
import { Post } from "./post";

export interface PostInt{
  title:string,
  userId:string,
  description:string,
  username:string, 
  id:string
}

export const Main = () => {
  const [postsList, SetPostLists] = useState<PostInt[] | null>(null);
  const postsRef = collection(db,"posts");
  const getPosts = async()=>{
     const data = await getDocs(postsRef);
     SetPostLists(data.docs.map((doc)=>({ ...doc.data(), id: doc.id })) as PostInt[]);
  };

  useEffect(()=>{
      getPosts();
  },[]);

  return (
    <div>
      { postsList?.map((post)=> (
           <Post post={post}/>
        ))
          

      }
    </div>
  )
};
