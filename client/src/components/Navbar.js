import React, { useContext } from "react"
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from "../App";

const Navbar=()=>{
  const{state,dispatch}= useContext(UserContext)
  const history= useHistory()
  const renderList = ()=>{

    if(state){
      return [ 
      <>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/create">Create Post</Link></li>
        <li><Link to="/myfollowerspost">My following post</Link></li>
        <li>
        <button class="btn waves-effect waves-light #e57373  lighten-2" type="submit" name="action"
        onClick={()=>{
          localStorage.clear()
          dispatch({type:"CLEAR"})
          history.push("/signin")
        }}>Logout
          <i class="material-icons" >send</i>
        </button>
        </li>
      </>
      ]
    }else{
      return [ 
      <>
        <li><Link to="/signin">Signin</Link></li>
        <li><Link to="/signup">Signup</Link></li>
      </>
      ]
    }
  }
    return(
        <nav>
        <div class="nav-wrapper">  
          <Link to={state?"/":"signin"} className="brand-logo left b">The Social Network</Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {renderList()}
          </ul>
        </div>
      </nav>
    )
}
export default Navbar
