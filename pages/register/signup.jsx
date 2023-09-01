import { useState } from "react";
import { Client, Account, ID } from 'appwrite';

export default function SignUp({ account }) {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function registerUser() {
    const client = new Client();

    const account = new Account(client);

    client
    .setEndpoint('http://localhost/v1')
    .setProject('test');

    //login the user
    account.createEmailSession(email, password).then((response) => {
      console.log('login response', response);
      account.createJWT().then((response) => {
        console.log(response);
        localStorage.setItem('jwt', response.jwt);

      })
    }).catch(err => { });


  }

  return <div>
    <div> Sign Up</div>
    <div> Email : </div>
    <input value={email} onChange={e => setEmail(e.target.value)} />

    <div> Password: </div>
    <input value={password} onChange={e => setPassword(e.target.value)} />

    <button onClick={registerUser}>Submit</button>
  </div>




}

