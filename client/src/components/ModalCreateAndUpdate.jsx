import React, { useState } from 'react'

const FormValues = {
    email: '',
    first_name: '',
    last_name: ''
}

function ModalCreateAndUpdate({ GetUsers, isupdate, formdata, setformdata, setisupdate }) {

    const [form, setform] = useState(FormValues)



    const Submit = (e) => {
        e.preventDefault()
        if (isupdate) {
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formdata)
            };
            fetch(`http://localhost:4000/usuarios/${formdata.id}`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log({ message: "correcto", data })
                    alert("usuario Actualizado correctamente")
                    setform(FormValues)
                    GetUsers()
                });
        }
        else {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            };
            fetch('http://localhost:4000/usuarios', requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log({ message: "correcto", data })
                    alert("usuario agregado correctamente puedes cerrar esta ventana o crear otro")
                    setform(FormValues)
                    GetUsers()
                });
        }
    }

    const onFormControlChange = (event) => {
        const { name, value } = event.target
        if (isupdate) {
            setformdata({ ...formdata, [name]: value })
        }
        else {
            setform({ ...form, [name]: value });
        }
    }

    return (
        <div className="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Modal title</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => {
                            setform({ email: "", first_name: "", last_name: "" })
                            setisupdate(false)
                        }}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={Submit}>
                            {
                                isupdate
                                    ?
                                    <>
                                        <div className="form-group">
                                            <label >Correo</label>
                                            <input type="email" className="form-control" name='email' required={true} onChange={onFormControlChange} value={formdata.email} />
                                        </div>
                                        <div className="form-group">
                                            <label >Nombres</label>
                                            <input type="text" className="form-control" name='first_name' required={true} onChange={onFormControlChange} value={formdata.first_name} />
                                        </div>
                                        <div className="form-group">
                                            <label>Apellidos</label>
                                            <input type="text" className="form-control" name='last_name' required={true} onChange={onFormControlChange} value={formdata.last_name} />
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" onClick={() => {
                                                setform({ email: "", first_name: "", last_name: "" })
                                                setisupdate(false)
                                            }} data-dismiss="modal">Cerrar</button>
                                            <button type="submit" className="btn btn-primary">{isupdate ? 'Actualizar' : 'Guardar'}</button>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div className="form-group">
                                            <label >Correo</label>
                                            <input type="email" className="form-control" name='email' required={true} onChange={onFormControlChange} value={form.email} />
                                        </div>
                                        <div className="form-group">
                                            <label >Nombres</label>
                                            <input type="text" className="form-control" name='first_name' required={true} onChange={onFormControlChange} value={form.first_name} />
                                        </div>
                                        <div className="form-group">
                                            <label>Apellidos</label>
                                            <input type="text" className="form-control" name='last_name' required={true} onChange={onFormControlChange} value={form.last_name} />
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" onClick={() => {
                                                setform({ email: "", first_name: "", last_name: "" })
                                                setisupdate(false)
                                            }} data-dismiss="modal">Cerrar</button>
                                            <button type="submit" className="btn btn-primary">{isupdate ? 'Actualizar' : 'Guardar'}</button>
                                        </div>
                                    </>
                            }

                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ModalCreateAndUpdate