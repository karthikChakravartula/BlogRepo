import { addDoc, collection , deleteDoc, doc, getDocs, query, where} from "firebase/firestore";
import { PostInt as IPost} from "./main";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

interface Props{
    post:IPost;
}

interface Like{
    userId : string
}

export const Post = (props: Props) => {
    const {post}= props;
     const likesRef = collection(db,"likes");
     const [user] = useAuthState(auth);
     const [likesp, SetLikesP] = useState<Like[] | null>(null);

     const likesDoc = query(likesRef,where("postId","==",post.id));

     const getlikes= async () =>{
        const data = await getDocs(likesDoc);
        SetLikesP(data.docs.map((doc)=>({userId:doc.data().userId})));
     }

     const hasUserLikes = likesp?.find((doc)=> doc.userId == auth.currentUser?.uid);

     const addlike = async () =>{
             await addDoc(likesRef,{
                 userId:user?.uid,
                 postId:post.id
             });
             if(user){
             SetLikesP((prev)=> prev ? [...prev,{userId:user?.uid}]:[{userId:user?.uid}]);}
         };

         const removelike = async () =>{
            try {
                const likesDoc = query(likesRef,where("postId","==",post.id),where("userId","==",user?.uid)); 
                const data = await getDocs(likesDoc);
                const lketodel = doc(db,"likes",data.docs[0].id);
                await deleteDoc(lketodel);
                if(user){
                SetLikesP((prev)=> prev ? [...prev,{userId:user?.uid}]:[{userId:user?.uid}]);
            }
            } catch (error) {
                
            }
        };

     useEffect(()=>{
        getlikes();
     },[]);   

     return (
    <div>
        <div className="title">
            <h1>
                {post.title}
            </h1>
        </div>
        <div className="body">
            <p>
                {post.description}
            </p>
        </div>
        <div className="footer">
            <p>
                @{post.username}
            </p>
            {likesp && <p>Likes : {likesp.length}</p>}
            {hasUserLikes ? <button onClick={removelike}>&#128078;</button> :<button onClick={addlike}>&#128077;</button>}
        </div>
    </div>
  )
};