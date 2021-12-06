import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import {QUERY_FINDSERVICE} from '../utils/queries';
import { useParams } from 'react-router-dom';
import "./ServicePost.css"


const ServicePost = () =>{

    const { location, type } = useParams();
    // const [formState, setFormState] = useState({ 
    //     type: '',
    //     location: '', 
    // });
    const [service, setService] = useState({location: '', description: '', type: '', hourly_rate: '', user: {first_name: '', last_name: ''}})

    const { loading, data, error } = useQuery(QUERY_FINDSERVICE, {
        fetchPolicy: "no-cache",
        variables: {
            type: type,
            location: location,
        }
    });
    useEffect(() => {
        console.log('params: ', location, type)
        if (!loading && data && data.findServicePost) {
            setService(data.findServicePost[0])
        }
    }, [data])
    console.log('data: ', data)
    console.log('service: ', service)


    return(
        <main className="base-grid home-columns">
            <nav className="full-width nav-columns distribute-even fit">
                <Link to="/profile">
                <button className="btn">Profile</button>
                </Link>
                <Link to="/find-service">
                <button className="btn">Find Service</button>
                </Link>
                <Link to="/offer-service">
                <button className="btn">Offer Service</button>
                </Link>
                <button className="btn">Language</button>
                <button onClick={Auth.logout}className="btn">Logout</button>
            </nav>
            <section className="edit full-width">
                <form className="editprof fit stack" style={{margin:"auto", maxWidth:"70%"}}>
                    <h4 className="ed">Service Name: {service.type} </h4>
                    <div className="empw">
                        <img/>
                        <h6>by: {service.user.first_name} {service.user.last_name}</h6>
                    
                        <p>Location: {service.location}</p>
                        <p>Description: {service.description}</p>
                        <p>Hourly Rate: {service.hourly_rate}</p>
                    </div>
                    <button 
                        className="editprof-btn"
                        // onClick={()=>handleNotification(1)}
                        >
                        Hire Service! 
                    </button>
                    <button 
                        className="editprof-btn"
                        // onClick={()=>handleNotification(2)}
                        >
                        Send a message 
                    </button>
                </form>
            </section>
        </main>
    );
}
export default ServicePost;