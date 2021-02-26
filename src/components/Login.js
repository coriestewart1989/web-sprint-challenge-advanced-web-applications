import React, { useState } from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom'

const initialState = {
  username:'',
  password:''
}

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  //TASK 2
 const [userLogin, setUserLogin] = useState(initialState)
 const [error, setError] = useState('')

 const history=useHistory()
  

  const login = e =>{
      e.preventDefault()

      axios.post('http://localhost:5000/api/login', userLogin)
      .then((res)=>{
        console.log('userLogin :', res)
        localStorage.setItem('token', res.data.payload)
        history.push('/bubbles')
      })
      .catch((err)=>{
       setError(err.response.data.error)
      })
  }

  const changeHandler = e =>{
    e.preventDefault()
    setUserLogin({...userLogin, [e.target.name]: e.target.value})
  }

  // useEffect(()=>{
  //   axios
  //     .delete(`http://localhost:5000/api/colors/1`, {
  //       headers:{
  //         'authorization': "ahuBHejkJJiMDhmODZhZi0zaeLTQ4ZfeaseOGZgesai1jZWYgrTA07i73Gebhu98"
  //       }
  //     })
  //     .then(res=>{
  //       axios.get(`http://localhost:5000/api/colors`, {
  //         headers:{
  //           'authorization': ""
  //         }
  //       })
  //       .then(res=> {
  //         console.log(res);
  //       });
  //       console.log(res);
  //     })
  // });

  return (
    <>
     <div className='login form'>
       <h2>Login</h2>
       {/* Task 1 */}
       <form onSubmit={login}>
         {/* Task 3 */}
         <label> Username:
         <input
         id= 'username'
         type= 'text'
         name= 'username'
         placeholder= 'USERNAME...'
         value= {userLogin.username}
         onChange={changeHandler}
         />
         </label>
         {/* Task 3 */}
         <label> Password:
         <input
         id= 'password'
         type= 'password'
         name= 'password'
         placeholder= 'Password...'
         value= {userLogin.password}
         onChange={changeHandler}
         />
         </label>
         <h4>{error}</h4>

        <button>Login</button>
       </form>

     </div>
    </>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state nessiary for form functioning.
//3. MAKE SURE THAT FORM INPUTS INCLUDE THE LABEL TEXT "username" and "password" RESPECTIVELY.
//4. If either the username or password is not displaied display EXACTLY the following words: Username or Password not valid.
//5. If the username / password is equal to Lambda School / i<3Lambd4, save that token to localStorage.