import React, { useState, useContext } from 'react'
import { useFormik } from "formik";
import * as yup from "yup";
import { useHistory, Link } from 'react-router-dom'

import { Form, Button } from 'react-bootstrap'

function Signup() {
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
                                history.push('/login')
                            }
                        )
                    }
                }
            )
        },
    });
    return (
        <div className='container mt-5 mx-auto row justify-content-center text-center text-light'>
            <h2 className='p-2 mb-5'>Welcome To NCAA Squares: Please Sign Up</h2>
            <div className='d-flex justify-content-center mt-5'>
            <Form className='text-center h-auto mt-3' style={{ width: "33%" }} onSubmit={formik.handleSubmit}>
                <Form.Group className='p-2 d-flex align-items-center flex-column'>
                    <Form.Label htmlFor='username' className='fw-bold p-2'>Username: </Form.Label>
                    <Form.Control
                        className=''
                        id='username'
                        type='text'
                        placeholder='...enter username'
                        required
                        onChange={formik.handleChange}
                        value={formik.values.username}
                    />
                    <Form.Text className="fw-bold">
                        {formik.errors.username}
                    </Form.Text>
                </Form.Group>
                <Form.Group className='p-2 d-flex align-items-center flex-column'>
                    <Form.Label htmlFor='password' className='fw-bold p-2'> Password: </Form.Label>
                    <Form.Control
                        className=''
                        placeholder='...password...'
                        id='password'
                        type='password'
                        required
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                    <Form.Text className='fw-bold'>
                        {formik.errors.password}
                    </Form.Text>
                </Form.Group>
                <Form.Group>
                    <Button className='position-relative w-50' type='submit'>Submit</Button>
                </Form.Group>

            </Form>
            </div>
            <div className='mt-3'><h5>Already Have an Account</h5></div>
            <Link className="btn bg-primary text-light w-auto h-auto p-3 text-center fs-5 mt-3" to='/login'>Click Here To Login</Link>
        </div>
    )
}

export default Signup
