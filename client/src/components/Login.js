import React, { useState, useEffect } from 'react'
import { useFormik } from "formik";
import * as yup from "yup";


function Login() {
    // const [username, setUserName] = useState('')

    const formSchema = yup.object().shape({
        username: yup.string().required("Must enter a Name").min(6),
        password: yup.string().required("Must enter password").min(6).max(16)
    })
    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch("/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values, null, 2),
            }).then(
                r => {
                    if (r.ok) {
                        console.log("Everything OK")
                        r.json().then(
                            data => {
                                console.log(data)
                            })
                    }
                    else {
                        console.log("Not OK")
                        r.json().then(
                            data => {
                                console.log(data)
                            })
                    }
                }
            )
        },
    });

    return (
        <div className='App'>
            <div >Login</div>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor='username'>username: </label>
                <input id='username' name="username" type='text' onChange={formik.handleChange} value={formik.values.username}></input>
                <label htmlFor='password'>password: </label>
                <input id='password' name="password" type='text' onChange={formik.handleChange} value={formik.values.password}></input>
                <span>{formik.errors.username}</span>
                <span>{formik.errors.password}</span>
                <br></br>
                <button type='submit'>Login</button>
            </form>

        </div>

    )
}

export default Login