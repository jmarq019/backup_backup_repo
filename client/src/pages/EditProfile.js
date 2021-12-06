import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { UPDATE_USER } from "../utils/mutations";

import "./EditProfile.css";
import { FormattedMessage } from 'react-intl';

const EditProfile = ({ setUser }) =>{
    const [formState, setFormState] = useState({
        first_name: '',
        last_name: '',
        // username: '',
        // email: '',
        // password: '',
        // confirm_password: '',
        aboutme: '',
        profpic: '',
    });
    const history = useHistory();
    const [updateUser, { error, data }] = useMutation(UPDATE_USER);
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormState({
        ...formState, [name]: value
    });
    console.log(formState)
        };
        const handleFormSubmit = async (event) => {
            event.preventDefault();
            console.log(formState);
            console.log(formState.aboutme);
            try {
                console.log("handle form submit = edit profile")
            const { data } = await updateUser({
                
            variables: {
                // ...formState,
                first_name: formState.first_name,
                last_name: formState.last_name,
                // username: formState.username,
                // email: formState.email,
                // password: formState.password,
                // confirm_password: formState.confirm_password,
                aboutme: formState.aboutme,
                profpic: formState.profpic,
                user: Auth.getUser()
            },
            });
            console.log(data);
            await setUser(data.updateUser);
            history.push("/profile")


        }
        catch(err) {
            console.error(err);
        }};
    return(
        <main className="base-grid home-columns">
            <section className="edit full-width">
                <form className="editprof fit stack" style={{margin:"auto", maxWidth:"70%"}}>
                    <h2 className="ed"><FormattedMessage id="editMyProfile"/></h2>
                    <div className="empw">
                        <label><FormattedMessage id="name"/></label>
                        <input 
                            placeholder="name"
                            type="text"
                            placeholder="name"
                            name="first_name"
                            onChange={handleInputChange}
                            value={formState.first_name}
                            style={{minWidth:"70%",padding:"10px",borderRadius:"5px",border:"2px, solid, var(--green)",marginBottom:"1rem"}}
                        />
                        <label><FormattedMessage id="lastName"/></label>
                        <input 
                            type="text"
                            placeholder="last name"
                            name="last_name"
                            onChange={handleInputChange}
                            value={formState.last_name}
                            style={{minWidth:"70%",padding:"10px",borderRadius:"5px",border:"2px, solid, var(--green)",marginBottom:"1rem"}}
                        />
                        {/* <label>Username</label>
                        <input 
                            type="text"
                            placeholder="username"
                            name="username"
                            onChange={handleInputChange}
                            value={formState.username}
                            // required
                        /> */}
                        {/* <label>Email</label>
                        <input 
                            type="text"
                            placeholder="email"
                            name="email"
                            onChange={handleInputChange}
                            value={formState.email}
                            // required
                        />
                        <label>Change Password</label>
                        <input 
                            type="text"
                            placeholder="change pasword"
                            name="password"
                            onChange={handleInputChange}
                            value={formState.password}
                            // required
                        />
                        <label>Confirm Password</label>
                        <input 
                            placeholder="confirm password"
                            name="confirm_password"
                            onChange={handleInputChange}
                            value={formState.confirm_password}
                            // required
                        /> */}
                        <label><FormattedMessage id="biography"/></label>
                        <input 
                            placeholder="about me"
                            type="text"
                            name="aboutme"
                            onChange={handleInputChange}
                            value={formState.aboutme}
                            style={{minWidth:"70%",padding:"10px",borderRadius:"5px",border:"2px, solid, var(--green)",marginBottom:"1rem"}}
                        />
                        <label><FormattedMessage id="updateProfPic"/></label>
                        <input 
                            className="profpic" 
                            placeholder="upload profile picture"
                            type="file"
                            name="profpic"
                            onChange={handleInputChange}
                            value={formState.profpic}
                            // required
                        />
                    </div>
                        <div className="full-width distribute-even fit">
                            {/* <button className="add fit">Add photo</button> */}
                            <button 
                                className="save"
                                disabled = {!(formState.first_name && formState.last_name && formState.aboutme && formState.profpic)}
                                type = "submit"
                                onClick={handleFormSubmit}
                                variant = "success">
                                <FormattedMessage id="saveChanges"/>
                            </button>
                            <button className="cancel"><FormattedMessage id="cancel"/></button>
                        </div>
                </form>
            </section>
        </main>
    );
}
export default EditProfile;