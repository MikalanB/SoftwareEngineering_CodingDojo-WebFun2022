import React from 'react';
import axios from 'axios';
import {useParams, useHistory} from 'react-router-dom';
import {useState, useEffect} from 'react';

const Update = (props) => {
    const {_id} = useParams();
    const [form, setForm] = useState({
        title: "",
        price: 0,
        description: "",
    });

    const history = useHistory();

    useEffect (() => {
        axios.get(`http://localhost:8000/api/products/${_id}`)
            .then(res => {
                console.log(res.data)
                setForm({
                    title: res.data.title,
                    price: res.data.price,
                    description: res.data.description
                })
            })
            .catch(err => {console.log(err)});
    }, [])

    const onChangeHandler = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        
        console.log("You working?")

        axios.put(`http://localhost:8000/api/products/${_id}`, form)
            .then(res => {
                console.log(res)
                history.push("/")
            })
            .catch(err => console.error(err))
    }

    return (
        <div>
            <h1>Edit Product</h1>
            <div className="d-flex flex-column w-50 justify-content-center mx-auto">
                <form onSubmit={onSubmitHandler} className="row g-3 needs-validation">
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput" placeholder="Title of Product" name="title" onChange={onChangeHandler} value={form.title} />
                        <label htmlFor="floatingInput">Title</label>
                        {form.title.length === 0 ? "" : form.title.length < 3 ? <span className="alert-danger">Title needs at least 3 characters!</span> : ""}
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput" placeholder="Price of Product" name="price" onChange={onChangeHandler} value={form.price} />
                        <label htmlFor="floatingInput">Price</label>
                        {form.price === 0 ? "" : form.price < 1 ? <span className="alert-danger">Price needs to be at least $1!</span> : ""}
                    </div>
                    <div className="form-floating mb-3">
                        <textarea type="text" className="form-control" id="floatingInput" placeholder="name@example.com" style={{height: "150px"}} name="description" onChange={onChangeHandler} value={form.description} ></textarea>
                        <label htmlFor="floatingInput">Description</label>
                        {form.description.length === 0 ? "" : form.description.length < 10 ? <span className="alert-danger">Description needs at least 10 characters!</span> : ""}
                    </div>
                    <input type="submit" className="btn btn-primary btn-lg " value="Update"/>
                </form>
            </div>
        </div>
    )
}

export default Update;