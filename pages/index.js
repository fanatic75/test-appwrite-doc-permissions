
import Link from 'next/link'
import { Account, Client, Databases, Permission, Role } from 'appwrite';
import { useEffect, useState } from 'react';

export default function Home() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function isLogin() {
      const client = new Client();
      client
    .setEndpoint('http://localhost/v1')
    .setProject('test');
      const account = new Account(client);
      try {
        const user = await account.get();
        const database = new Databases(client);
        database.updateDocument('test','level1','1', {
          'level2':{
            $id:'new'
          }
        }).
        then((response) => {
          console.log(response);
        }).catch((error) => {
          console.log(error);
        });
        setUser(user);
      } catch (e) {
        setUser(false);
        console.error(e);
      }
    }
    isLogin();
  }, []);

  return (
    user !== false ? <div>hello from to do list</div> : <div id="loginform">
      <FormHeader title="Login" />
      <Form />
    </div>

  )
}



const FormHeader = props => (
  <h2 id="headerTitle">{props.title}</h2>
);




const Form = props => (
  <div>
    <FormInput description="Username" placeholder="Enter your username" type="text" />
    <FormInput description="Password" placeholder="Enter your password" type="password" />
    <FormButton title="Log in" />
    <OtherMethods />
  </div>
);

const FormButton = props => (
  <div id="button" className="row">
    <button>{props.title}</button>
  </div>
);

const FormInput = props => (
  <div className="row">
    <label>{props.description}</label>
    <input type={props.type} placeholder={props.placeholder} />
  </div>
);

const OtherMethods = props => (
  <div id="alternativeLogin">


    <Link href="/register/signup" >Sign Up:</Link>

  </div>
);



