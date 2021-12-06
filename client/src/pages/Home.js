import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import Auth from '../utils/auth';
// import { useMutation } from '@apollo/react-hooks';
import { useMutation } from '@apollo/client';
import { FormattedMessage } from 'react-intl';
import {LOGIN_USER} from '../utils/mutations';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import "./Home.css";

import Modal from '../components/Modal'
import ContactusModal from '../components/ContactusModal'


// const LoginForm = () => {
//   const [userFormData, setUserFormData] = useState({
//     first_name: "",
//     last_name: "",
//     username: "",
//     email: "",
//     password: ""
//   });
//   const [validated] = useState(false);
//   // const [showAlert, setShowAlert] = useState(false);
//   const [loginUser] = useMutation(LOGIN_USER);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setUserFormData({
//       ...setUserFormData, [name]: value
//     });
//   };
//   const handleFormSubmit = async (event) => {
//     event.preventDefault();
//     const form = event.currentTarget; 
//     if (form.checkValidity() === false) {
//       event.preventDefault();
//       event.setPropahation();
//     }
//     try {
//       const { data } = await loginUser ({
//         variables: {
//           ...userFormData
//         },
//       });
//       Auth.login(data.login.token);
//     } catch(err) {
//       console.log(err);
//       // setShowAlert(true);
//     }
//     setUserFormData({
//       first_name: "",
//       last_name: "",
//       username: "",
//       email: "",
//       password: ""
//     });
//   };
  
// };
const Home = ({ setUser, updateLocal }) => {
  // const { loading, data } = useQuery(QUERY_ME, {
  //   fetchPolicy: "no-cache"
  // });
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);
  const history = useHistory();
  // const [login] = useMutation(LOGIN_USER);
  // const User = data?.User || [];


  // const [userFormData, setUserFormData] = useState({
  //   first_name: "",
  //   last_name: "",
  //   username: "",
  //   email: "",
  //   password: ""
  // });


  // const [validated] = useState(false);
  // const [showAlert, setShowAlert] = useState(false);
  // const [loginUser] = useMutation(LOGIN_USER);

  const handleLanguageChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    updateLocal(value);
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState, [name]: value
    });
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    // const form = event.currentTarget; 
    // if (form.checkValidity() === false) {
    //   event.preventDefault();
    //   event.setPropahation();
    // }
    try {
      const { data } = await login ({
        variables: {...formState},
      });
      console.log(data);
      Auth.login(data.login.token, history);
      setUser(data.login.user);
    } catch(err) {
      console.log(err);
      // setShowAlert(true);
    }
    // setUserFormData({
    //   first_name: "",
    //   last_name: "",
    //   username: "",
    //   email: "",
    //   password: ""
    // });

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  // };

  //update state besed on input changes
  // const handleChange = (event) =>{
  //   const {name, value} = event.target;

  //   setFormState({
  //     ...formState,
  //     [name]: value,
  //     });
  // }


  // //submit form
  // const handleformSubmit = async (event) =>{
  //   event.preventDefault();
  //   console.log(formState);

  //   try{
  //     const {data} = await addUser({
  //       variables: {...formState},
  //     });
  //     Auth.login(data.addUser.token)
  //   }
  //   catch (err) {
  //     console.log(err)
  //   }
  // }

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(prev => !prev);
  };

  const [showContactusModal, setShowContactusModal] = useState(false);

  const openContactusModal = () => {
    setShowContactusModal(prev => !prev);
  };

  return (
    <main className="home base-grid home-columns" >
      <div className="mission full-width">
        <h5 className="miss"><FormattedMessage id="missionSatement"/></h5>
        <p><FormattedMessage id="missionStateText"/></p>
        <div className="center">
        <img src={require("../assets/fb.png").default} style={{width:"30px"}} alt="pp"/>
        <img src={require("../assets/instagram.png").default} style={{width:"30px"}} alt="pp"/>
        <img src={require("../assets/pinterest.png").default} style={{width:"30px"}} alt="pp"/>
        <img src={require("../assets/twitter.png").default} style={{width:"30px"}} alt="pp"/>
        </div>
      </div>
      <div className="images full-width distribute-even fit">
        <img src={require("../assets/babysitter.jpg").default} style={{maxWidth:"10%"}} alt="pp"/>
        <img src={require("../assets/caregiver.jpeg").default} style={{maxWidth:"10%"}} alt="pp"/>
        <img src={require("../assets/cleaning1.jpg").default} style={{maxWidth:"10%"}} alt="pp"/>
        <img src={require("../assets/handyman.jpg").default} style={{maxWidth:"10%"}} alt="pp"/>
        <img src={require("../assets/petsitter.jpg").default} style={{maxWidth:"10%"}} alt="pp"/>
        <img src={require("../assets/photographer.jpg").default} style={{maxWidth:"10%"}} alt="pp"/>
        <img src={require("../assets/remote.png").default} style={{maxWidth:"10%"}} alt="pp"/>
        <img src={require("../assets/tutoring.jpg").default} style={{maxWidth:"10%"}} alt="pp"/>
      </div >
      <section className="login">
          <form onSubmit={handleFormSubmit} className=" signin fit stack" style={{margin:"auto", maxWidth:"65%"}}>
            <h4 className="log"><FormattedMessage id="login"/></h4>
            <div className="empw full-width">
              <label><FormattedMessage id="email"/></label>
              <input 
                style={{minWidth:"70%",padding:"10px",borderRadius:"5px",border:"2px, solid, var(--green)",marginBottom:"1rem"}}
                type="text" 
                placeholder="email"
                name ="email"
                onChange = {handleInputChange}
                value = {formState.email}
                // required 
              />
              <label><FormattedMessage id="password"/></label>
              <input 
                style={{minWidth:"70%",padding:"10px",borderRadius:"5px",border:"2px, solid, var(--green)"}}  
                type= "password"
                placeholder="pasword"
                name= "password"
                onChange = {handleInputChange}
                value = {formState.password}
                // required
              />
            </div>
            <button 
              className="btnlog"
              disabled = {!(formState.email && formState.password)}
              type = "submit"
              onClick={handleFormSubmit}
              variant = "success">
              <FormattedMessage id="login1"/>
            </button>
          </form>
          <Link to="/signup">
            <button className="btnsign full-width"><FormattedMessage id="signUp"/>!</button>
          </Link>
      </section>
      <section className="intro">
        <div className="">
          <img className="screen" src={require("../assets/screens.png").default} style={{maxWidth:"50%"}}alt="pp"/>
          <div>
            <h2 className="works"><FormattedMessage id="howItWorks"/>:</h2>
            <h4><FormattedMessage id="howItWorksText"/></h4>
          </div>
        <div className="full-width distribute-even fit">
        <button className="btnmore " onClick={openModal}><FormattedMessage id="aboutUs"/></button>
        <button className="btnmore" onClick={openContactusModal}><FormattedMessage id="contactUs"/></button>
        </div>
        </div>
      </section>
    </main>

  );
};

export default Home;
