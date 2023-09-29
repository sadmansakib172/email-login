import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";


const Register = () => {

    const handleRegister = e =>{
        e.preventDefault();
        console.log('form submitting');
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password)
        // create user
        createUserWithEmailAndPassword(auth, email, password)
        .then(result =>{
            console.log(result.user)
        })
        .catch(error =>{
            console.error(error)
        })
    }
    return (
        <div>
          <div className="mx-auto md:w-1/2">
          <h2 className="text-3xl mb-8">Please Register</h2>
            <form onSubmit={handleRegister}>
                <input className="mb-4 w-3/4 py-2 px-4" type="email" name="email" placeholder="Email Address:" id="" />
                <br></br>
                <input className="mb-4 w-3/4 py-2 px-4" type="password" name="password" placeholder="Password" id=""/>
                <br />
                <input className="btn btn-primary mb-4 w-3/4" type="submit" value="Submit" />
            </form>
          </div>
        </div>
    );
};

export default Register;