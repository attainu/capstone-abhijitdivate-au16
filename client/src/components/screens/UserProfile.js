import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import {useParams} from "react-router-dom"
export const UserProfile = () =>{
    const{state,dispatch} = useContext(UserContext)
    const [Profile, setProfile] = useState()
    const[userProfile,setUserProfile] = useState("")
    const [userEmail,setUserEmail] = useState("")
    const{userid} = useParams()
    const[posts, setposts] = useState([])

    console.log(userid)
    useEffect(()=>{
        fetch(`/user/${userid}`,{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            setUserProfile(result.user.name)
            setUserEmail(result.user.email)
            console.log(result)
            setProfile(result.posts.length)
            console.log(Profile)
            setposts(result.posts)
        })     
    },[])
    return(
        <>
        {
            posts?
            <div style={{maxWidth:"550px", margin:"0px auto"}}>
            <div style={{
                display:"flex",
                justifyContent:"space-around",
                margin:"18px 0px",
                borderBottom:"1px solid grey"
            }}>
                <div>
                    <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
                    src="https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8bWFufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60" />
                </div>
                <div>
                    <h4>{userProfile}</h4>
                    <h5>{userEmail}</h5>
                    <div style={{
                        display:"flex",
                        justifyContent:"space-around",
                        width:"108%"

                    }}>
                        <h6>{Profile}posts</h6>
                        <h6>30 followers</h6>
                        <h6>30 following</h6>
                    </div>
                </div>
            </div>
        

            <div className="gallery">
                {
                    posts.map(item=>{
                        return(
                            <img key={item._id} className="item" src={item.photo}/>
                        )
                    })
                }
                
                
                
            </div>
        </div>






            :
        "Loading..."    
        }
        
        </>
    )
}