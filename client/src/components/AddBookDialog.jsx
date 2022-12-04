import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Alert, AlertTitle} from "@mui/material";
import React, { useState, useEffect } from 'react'
import AddBookField from './AddBookField';

export default function AddBookDialog(props) {
    const { onClose, open, setSuccess } = props;
    const initialState = {
        title: null,
        authorFirstname: null,
        authorLastname: null,
        description: null,
        date: null,
        file: null,
        language: null,
        genre: null,
        price: null      
    };
    const [ formValues, setFormValues ] = useState(initialState);
    const [ invalid, setInvalid] = useState(true);

    const submitForm = (event) =>{
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', formValues.file);
        formData.append('formValues', JSON.stringify(formValues));
        formData.append('fileName', formValues.file.name);

        fetch('http://localhost:3001/book/addbook', {
            method: 'POST',
            headers: { 'Location': sessionStorage.getItem("countryCode")},
            body: formData,
            mode: 'cors'
        }).then(res => {
            res.json().then(data => {
                setSuccess(true);
             
            });
            
           
            
        });
        handleClose();
    }

    const handleChange = (event) =>  {
        console.log(event.target.files);
        if(event.target.files){
            setFormValues({...formValues, [event.target.id]: event.target.files[0]});
        }else{
            setFormValues({...formValues, [event.target.id]: event.target.value});
        }
    }

    const handleClose = () =>{
        setInvalid(true);
        setFormValues({...initialState});
        onClose(false);
    }

    useEffect(() => {
        if (Object.values(formValues).includes(null) || Object.values(formValues).includes('')) return setInvalid(true);
        console.log(formValues.file.files);
        return setInvalid(false);
    }, [formValues]);
    console.log(formValues);
    return (
        <Dialog maxWidth="sm" fullWidth open={open} onClose={handleClose}>
            <DialogTitle>Add a new book</DialogTitle>
            <form id="add-book-form" sx={8} onSubmit={submitForm} onChange={handleChange}>
                <DialogContent>
                    <AddBookField setInvalid={setInvalid} invalid={invalid} ></AddBookField>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' type="submit" id="submit" disabled={invalid}>Submit</Button>
                    <Button variant='contained' type="submit" id="submit" onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </form>
     
        }
        </Dialog>
     
    )



}