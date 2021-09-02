import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import {useParams} from "react-router-dom"
export const UserProfile = () =>{
    
    const[Prof, setProf] = useState({})
    const[userfollower,setFollower]=useState([])
    const{state,dispatch} = useContext(UserContext)
    const [Profile, setProfile] = useState()
    const[userProfile,setUserProfile] = useState("")
    const [userEmail,setUserEmail] = useState("")
    const{userid} = useParams()
    const[posts, setposts] = useState([])
    const [showfollow,setShowFollow]=useState(state?!state.following.includes(userid):true)
    const[userPic,setUserPic] = useState("")
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
            setProf(result)
            setUserPic(result.user.pic)
            setFollower(result.user.follower)
        })     
    },[])

    const followUser = ()=>{
        fetch("/follow",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+ localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                followId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
            localStorage.setItem("user",JSON.stringify(data))
            setProf((prevState)=>{
                return{ user:{
                    ...prevState.user,
                    followers:[...prevState.user.followers,data._id]
                }
            }
            })
            setShowFollow(false)
        })
    }

    const unfollowUser = ()=>{
        fetch("/unfollow",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+ localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                followId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
            localStorage.setItem("user",JSON.stringify(data))
            setProf((prevState)=>{
                const newFollower = prevState.user.followers.filter(item=>item!=data._id)
                
                return{ user:{
                    ...prevState,
                    users:{
                        ...prevState.user,
                        followers:newFollower
                    }
                    // followers:[...prevState.user.followers,data._id]
                }
            }
            })
            setShowFollow(true)
            window.location.reload();
        })
    }

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
                    src={userPic} />
                </div>
                <div>
                    <h4>{userProfile}</h4>
                    <h5>{userEmail}</h5>
                    <div style={{
                        display:"flex",
                        justifyContent:"space-around",
                        width:"108%"

                    }}>
                        <h6>{Profile} posts</h6>
                        <h6> {Prof.user===undefined?"loading":Prof.user.followers===undefined?"loading":Prof.user.followers.length} followers</h6>
                        <h6> {Prof.user===undefined?"loading":Prof.user.following===undefined?"loading":Prof.user.following.length} following</h6>
                    </div>

                    {!JSON.parse(localStorage.getItem("user")).following.includes(userid) && showfollow?<button onClick={()=>followUser()} class="btn waves-effect waves-light #e57373 blue lighten-2" type="submit" name="action">Follow
          <i class="material-icons right" ></i>
        </button>:<button onClick={()=>unfollowUser()} class="btn waves-effect waves-light #e57373 red lighten-2" type="submit" name="action">UnFollow
        <i class="material-icons right" ></i>
      </button>}

                    


                    
        
        
                    
        

        
      <br/>
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
