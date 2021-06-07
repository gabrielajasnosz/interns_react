import React, {useEffect, useState} from 'react';
import {ReactComponent as Logo} from './logo.svg';
import {ReactComponent as EditIcon} from './images/edit.svg';
import {useHistory} from 'react-router-dom';


const InternList = () => {

    const [interns, setInterns] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const fetchInterns = async () => {
            const response = await fetch('http://localhost:3001/interns');
            const interns = await response.json();
            setInterns(interns);
        }
        fetchInterns();
    }, []);


    return (

        <div className="wrapper">
            <div className="logo">
                <Logo/>
            </div>
            <div className="container">
                <span className="containerLabel">Participants</span>
                <div className="fields" id="list">
                    {interns.map((u) =>
                        <li key={u.id}>
                            <span className="intern-data">{u.name}</span>
                            <button className="navigationButton" onClick={() => history.push(`/interns/${u.id}`)}>
                                <div className="icon" id="edit">
                                    <EditIcon/>
                                </div>
                                <span className="label">Edit</span>
                            </button>
                        </li>
                    )}
                </div>
            </div>
        </div>

    );
};

export default InternList;
