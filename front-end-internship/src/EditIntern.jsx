import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router';
import {useHistory} from 'react-router-dom';
import {ReactComponent as Logo} from "./images/logo.svg";
import {ReactComponent as Arrow} from './images/arrow.svg';
import {ReactComponent as Calendar} from './images/calendar.svg';
import {ReactComponent as Alert} from './images/alert.svg';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Controller, useForm} from 'react-hook-form';


const EditIntern = () => {
        const history = useHistory();
        const {id} = useParams();
        const [intern, setIntern] = useState({
            id: '',
            name: '',
            email: '',
            internshipStart: new Date(),
            internshipEnd: new Date(),
        });
        const {
            register,
            reset,
            control,
            handleSubmit,
            formState: {errors}
        } = useForm({
                mode: "all",
            }
        );


        const [startDatePickerIsOpen, setStartDatePickerIsOpen] = useState(false);
        const [endDatePickerIsOpen, setEndDatePickerIsOpen] = useState(false);

        const onSubmit = async () => {
            const requestOptions = {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(intern)
            };

            console.log(requestOptions.body)
            await fetch('http://localhost:3001/interns/' + intern.id, requestOptions);
            alert("Data updated");
        };


        useEffect(() => {
                const fetchInternDetails = async () => {
                    const response = await fetch('http://localhost:3001/interns/' + id);
                    const i = await response.json();

                    setIntern({
                        id: i.id,
                        name: i.name,
                        email: i.email,
                        internshipStart: new Date(i.internshipStart.replace('+', ':')),
                        internshipEnd: new Date(i.internshipEnd.replace('+', ':')),
                    });

                    reset({
                        id: i.id,
                        name: i.name,
                        email: i.email,
                        internshipStart: new Date(i.internshipStart.replace('+', ':')),
                        internshipEnd: new Date(i.internshipEnd.replace('+', ':')),
                    });


                }
                fetchInternDetails()

                console.log(`I want to get intern with id: ${id}!`);
                return fetchInternDetails;
            }, [id]
        )
        ;


        return (

            <div className="wrapper">
                <div className="logo">
                    <Logo className="logoSvg"/>
                </div>
                <button className="goBack" onClick={() => history.push(`/`)}>
                    <div className="icon" id="label">
                        <Arrow/>
                    </div>
                    <span className="label">Back to list</span>
                </button>
                <div className="container">
                    <span className="containerLabel">Edit</span>
                    <form className="fields" onSubmit={handleSubmit(onSubmit)}>
                        <div className="input-txt">
                            <span className="label">Full name *</span>
                            <div className="field" id="name"
                                 style={{'box-shadow': errors?.name ? '0px 0px 0px 2px #A3270C' : ''}}>
                                <input
                                    {...register("name", {required: true})}

                                    onChange={(event) => {
                                        setIntern({...intern, name: event.target.value})
                                    }}
                                />
                                <div className="icon" id="alert">
                                    {errors?.name && <Alert className="alert"/>}
                                </div>
                            </div>
                            {errors?.name && <span className="error">This field is required</span>}

                        </div>
                        <div className="input-txt">
                            <span className="label">Email address *</span>
                            <div className="field" id="email"
                                 style={{'box-shadow': errors?.email ? '0px 0px 0px 2px #A3270C' : ''}}>
                                <input
                                    {...register("email", {
                                        required: true,
                                        pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                                    })}
                                    onChange={(event) => {
                                        setIntern({...intern, email: event.target.value})
                                    }}
                                />
                                <div className="icon" id="alert">
                                    {errors?.email && <Alert className="alert"/>}
                                </div>
                            </div>
                            {errors?.email?.type === 'required' && <span className="error">This field is required</span>}
                            {errors?.email?.type === 'pattern' && <span className="error">This email is not correct</span>}
                        </div>
                        <div className="date">
                            <div className="input-date-start">
                                <span className="label">Internship start *</span>
                                <div className="field-date"
                                     style={{'box-shadow': errors?.internshipStart ? '0px 0px 0px 2px #A3270C' : ''}}>
                                    <Controller
                                        control={control}
                                        name="internshipStart"
                                        render={() => (
                                            <DatePicker
                                                className="datePicker"
                                                dateFormat="dd.MM.yyyy"
                                                open={startDatePickerIsOpen}
                                                onChange={date => setIntern({...intern, internshipStart: date})}
                                                onClickOutside={() => setStartDatePickerIsOpen(false)}
                                                disabled={true}
                                                selected={intern.internshipStart}
                                            />
                                        )}
                                    />
                                    <div className="icon" id="date">
                                        {errors?.internshipStart && <Alert className="alert"/>}
                                    </div>
                                    <button className="calendarButton" onClick={(e) => {
                                        e.preventDefault()
                                        setStartDatePickerIsOpen(true)
                                    }}>
                                        <div className="icon">
                                            <Calendar/>
                                        </div>
                                    </button>

                                </div>
                            </div>
                            <div className="input-date-end">
                                <span className="label">Internship end *</span>
                                <div className="field-date"
                                     style={{'box-shadow': errors?.internshipEnd ? '0px 0px 0px 2px #A3270C' : ''}}>
                                    <Controller
                                        control={control}
                                        name="internshipEnd"
                                        defaultValue={false}
                                        rules={{
                                            validate: () => {
                                                return intern.internshipEnd > intern.internshipStart;
                                            },

                                        }}
                                        render={() => (
                                            <DatePicker
                                                className="datePicker"
                                                dateFormat="dd.MM.yyyy"
                                                open={endDatePickerIsOpen}
                                                onChange={date => setIntern({...intern, internshipEnd: date})}
                                                onClickOutside={() => setEndDatePickerIsOpen(false)}
                                                disabled={true}
                                                selected={intern.internshipEnd}

                                            />
                                        )}
                                    />
                                    <div className="icon" id="date">
                                        {errors?.internshipEnd && <Alert className="alert"/>}
                                    </div>

                                    <button className="calendarButton" onClick={(e) => {
                                        e.preventDefault()
                                        setEndDatePickerIsOpen(true)
                                    }}>
                                        <div className="icon">
                                            <Calendar/>
                                        </div>
                                    </button>
                                </div>
                                {errors?.internshipEnd?.type === 'validate' &&
                                <span className="error">This date is not correct</span>}
                            </div>
                        </div>

                        <button type="submit" className="submitButton">
                            <span className="submitLabel">Submit</span>
                        </button>
                    </form>
                </div>
            </div>
        );
    }
;

export default EditIntern;
