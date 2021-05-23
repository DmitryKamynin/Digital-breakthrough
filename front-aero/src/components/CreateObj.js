import React from 'react';

import {Formik, Form, Field} from 'formik';
import { Button } from '@material-ui/core';

export default function CreateTask({ fields, submit}) {
    return (
        <>
            <Formik
                initialValues={{}}
                onSubmit={(values) => submit(values)}
            >
                {(props) => (
                    <Form>
                        {fields.map( field => (
                                <div key={field.label} style={{display:'flex'}}>
                                    <div style={{flex:'1 1 100%'}}>{field.name}</div>
                                    <Field name={field.label}/>
                                </div>
                            ) )
                        }

                        <Button variant='contained' color='primary' style={{width: '100%'}} type='submit'>
                            Отправить
                        </Button>
                    </Form>
                )}
            </Formik>
        </>
    )
}
