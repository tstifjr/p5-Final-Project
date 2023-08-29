import React, { useState, useContext, useEffect } from 'react'
import { useFormik } from "formik";
import * as yup from "yup";
import { useHistory, Link } from 'react-router-dom'
import { UserContext } from '../context/user'
import { Form, Button, Alert } from 'react-bootstrap'
function Login() {
    const [message, setMessage] = useState(null)
    const { setUser } = useContext(UserContext)
    const history = useHistory()

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
                        r.json().then(
                            user => {
                                setUser(user)
                                setMessage(null)
                                history.push('/')
                            })
                    }
                    else {
                        r.json().then(
                            data => {
                                setMessage(data)
                            })
                    }
                }
            )
        },
    });

    useEffect(() => {
        const clearMessage = setTimeout(() => setMessage(''), 2000)
        return () => clearTimeout(clearMessage);
    }, [setMessage, message])

    return (
        <div className='container mt-5 mx-auto row justify-content-center'>

            <Link className="btn w-auto h-auto bg-secondary p-3 text-center fs-3" to='/signup'>Click Here To Signup</Link>
            <div className='p-3 text-center fs-1'>Login Page</div>
            {message && <Alert className='alert-danger w-75'>{message['error']}</Alert>}



            <Form className='text-center w-75 h-auto mt-3' onSubmit={formik.handleSubmit}>
                <Form.Group className='p-2'>
                    <Form.Label htmlFor='username'>Username: </Form.Label>
                    <Form.Control
                        id='username'
                        type='text'
                        placeholder='...enter username'
                        required
                        onChange={formik.handleChange}
                        value={formik.values.username}
                    />
                    <Form.Text>
                        {formik.errors.username}
                    </Form.Text>
                </Form.Group>
                <Form.Group className='p-2'>
                    <Form.Label htmlFor='password'> Password: </Form.Label>
                    <Form.Control
                        placeholder='...password...'
                        id='password'
                        type='password'
                        required
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                    <Form.Text>
                        {formik.errors.password}
                    </Form.Text>
                </Form.Group>
                <Form.Group>
                    <Button className='position-relative' type='submit'>Login</Button>
                </Form.Group>

            </Form>
        </div>


    )
}

export default Login