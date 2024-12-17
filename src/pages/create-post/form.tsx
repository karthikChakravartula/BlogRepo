import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import { addDoc, collection } from 'firebase/firestore'
import { db , auth} from '../../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'

interface createFormData {
    title:string,
    description:string
}

export const CreateForm = () => {
    const [user] = useAuthState(auth);
     const navigate = useNavigate();
   const schema =yup.object().shape(
    {
        title:yup.string().required("Title is required"),
        description:yup.string().required("Description is required"),
    });

    const { register, handleSubmit, formState :{ errors} } = useForm<createFormData>({
        resolver:yupResolver(schema),
    });

    const postsRef = collection(db,"posts");

    

    const onCreatePost = async (data:createFormData) =>{
        await addDoc(postsRef,{
            title:data.title,
            description:data.description,
            username:user?.displayName,
            userId:user?.uid,
        });
        navigate("/");
    };
  
    return (
    <div>
        <form onSubmit={handleSubmit(onCreatePost) }>
            <input placeholder='Title...' {...register("title")}></input>
            <p style={{color:"red"}}>{errors.title?.message}</p>
            <textarea placeholder='Description...'{...register("description")}></textarea>
            <p style={{color:"red"}}>{errors.description?.message}</p>
            <input type='submit'></input>
        </form>
    </div>
  )
}

