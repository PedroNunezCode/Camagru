import React, { Component } from 'react';
import Logo42 from '../../../images/42logo.png';

class AboutSection extends Component {
    render() {
        return (
            <div className="container" style={{paddingTop:'50px', paddingBottom:'50px'}}>
                <div align="center">
                    <img src={Logo42} alt="42 school logo" className="responsive-image"/>
                    <h4 style={{paddingTop: '30px'}}><b>About Camagru</b></h4>
                    <p>Camagru is a web project for <a target="_blank" rel="noopener noreferrer" href="https://www.42.us.org/">42 Silicon Valley</a>, The school I currently attend.</p>
                    <br></br>
                    <p>The purpose of camagru is to create a full stack photo sharing app using the tech stack of your choice. In my case, MERN.</p>
                    <p>Camagru opens the portal to the rabbit hole that is full stack engineering. Unlike the rest of the 42 curriculum written in C, Camagru</p>
                    <p>is one of the first web projects that the curriculum provides. Thus allowing me to learn React, Axios, Redux (state management), and</p>
                    <p>many other technologies. If you are interested in everything this project has to offer. I have attached the <a target="_blank" rel="noopener noreferrer" href="https://github.com/Binary-Hackers/42_Subjects/blob/master/00_Projects/04_Web/camagru.pdf">PDF</a></p>
                    <p>with all the requirements of the project. <br></br><br></br>Thanks for looking.</p>
                </div>
            </div>
        );
    }
}

export default AboutSection;