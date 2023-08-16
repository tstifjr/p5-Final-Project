import React, { useState, useContext } from 'react'
import { useFormik } from "formik";
import * as yup from "yup";
import { useHistory, Link } from 'react-router-dom'

import {UserContext} from '../context/user'

function Signup() {
    const {user, setUser} = useContext(UserContext)
    console.log(user)
    const history = useHistory()
    const formSchema = yup.object().shape({
        username: yup.string().required("Must enter a Name").min(6),
        password: yup.string().required("Must enter password").min(6).max(16),
    })
    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch("/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values, null, 2),
            }).then(
                r => {
                    if (r.ok) {
                        r.json().then(
                            new_user => {
                                console.log(`welcome ${new_user}`)
                                history.push('/')
                            }
                        )
                    }
                }
            )
        },
    });
    return (
        <div className='App'>
        {/* Add Login Option */}
        <Link to= '/login'>Click Here To Login</Link>
        <div>Sign Up Page</div>
        {/* Form JSX */}
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor='username'>username: </label>
                <input
                    id='username'
                    name="username"
                    type='text'
                    required
                    onChange={formik.handleChange}
                    value={formik.values.username} />
                <br></br>
                <span>{formik.errors.username}</span>
                <br></br>
                <label htmlFor='password'>password: </label>
                <input
                    id='password'
                    name="password"
                    type='password'
                    required
                    onChange={formik.handleChange}
                    value={formik.values.password} />
                <br></br>
                <span>{formik.errors.password}</span>
                <br></br>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default Signup