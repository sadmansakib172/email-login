import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from "react-router-dom";


const Register = () => {
    const [registerError, setRegisterError]= useState('')
    const [success, setSuccess]=useState()
    const [showPassword, setShowPassword] = useState(false)

    const handleRegister = e =>{
        e.preventDefault();
        console.log('form submitting');
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;
        console.log(name,email, password, accepted)

        // reset error 
        setRegisterError('');
        setSuccess('') 

        if(password.length < 6){
            setRegisterError('Password should be 6 digits or longer!')
            return;
        }
        else if(!/[A-Z]/.test(password)){
            setRegisterError('password should have at least one upper case character')
        }
        else if(!accepted){
            setRegisterError('please accept our terms and conditions');
            return;
        }
        
        // create user
        createUserWithEmailAndPassword(auth, email, password)
        .then(result =>{
            console.log(result.user)
            setSuccess('User created successfully')

            //   update profile 
            updateProfile(result.user, {
                displayName:name,
                photoURL: "https://example.com/jane-q-user/profile.jpg"
            })
            .then(()=>console.log('profile updated'))
            .catch(error => console.log(error))

            // send verification email 
            sendEmailVerification(result.user)
            .then(()=>{
                alert('please check your email and verify your account')
            })
        })
        .catch(error =>{
            console.error(error)
            setRegisterError(error.message)
        })
    }
    return (
        <div>
          <div className="mx-auto md:w-1/2">
          <h2 className="text-3xl mb-8">Please Register</h2>
            <form onSubmit={handleRegister}>
                <input className="mb-4 w-full py-2 px-4" type="name" name="name" placeholder="Your Name:" id="" required/>
                <input className="mb-4 w-full py-2 px-4" type="email" name="email" placeholder="Email Address:" id="" required/>
                <br></br>
               <div className="relative mb-4">
               <input 
                className=" w-full py-2 px-4" 
                type={showPassword ? 'text' : 'password'}
                name="password" 
                placeholder="Password" 
                id=""/>
                <span className="absolute top-3 right-2" onClick={()=>{setShowPassword(!showPassword)}}>
                    {
                        showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                    }
                </span>
               </div>
                <br />
                <div className="mb-2">
                <input type="checkbox" name="terms" id="terms" />
                <label htmlFor="terms">Accept our <a href="">Terms and conditions</a></label>
                </div>
                <br />
                <input className="btn btn-primary mb-4 w-full" type="submit" value="Submit" />
            </form>
            {
                registerError && <p className="text-red-700">{registerError}</p>
            }
            {
                success && <p className="text-green-700">{success}</p>
            }
            <p>Already have an account? please <Link className="text-green-600 underline" to="/login">Login</Link></p>
          </div>
        </div>
    );
};

export default Register;