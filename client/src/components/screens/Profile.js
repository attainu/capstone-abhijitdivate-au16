import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
export const Profile = () =>{

    // const[Prof, setProf] = useState({})
    const{state,dispatch} = useContext(UserContext)
    const[mypics,setPics] = useState([])
    useEffect(()=>{
        fetch("/mypost",{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            setPics(result.mypost)
            // setProf(result)
        })     
    },[])
    return(
        <div style={{maxWidth:"550px", margin:"0px auto"}}>
            <div style={{
                display:"flex",
                justifyContent:"space-around",
                margin:"18px 0px",
                borderBottom:"1px solid grey"
            }}>
                <div>
                    <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
                    src={state?state.pic:"loading"} />
                </div>
                <div>
                    <h4>{state?state.name:"loading"}</h4>
                    <div style={{
                        display:"flex",
                        justifyContent:"space-around",
                        width:"108%"

                    }}>
                        <h6>{mypics.length} posts</h6>
                        <h6> {state===undefined?"0":state.followers===undefined?"0":state.followers.length} followers</h6>
                        <h6> {state===undefined?"0":state.following===undefined?"0":state.following.length} following</h6>
                    </div>
                </div>
            </div>
        

            <div className="gallery">
                {
                    mypics.map(item=>{
                        return(
                            <img key={item._id} className="item" src={item.photo}/>

                        )
                    })
                }
                
                
            </div>
        </div>
    )
}
