import React from 'react'

function ListUsers({ usuarios, updateUser, deleteUser }) {
    return (
        <div className="container">
            <div className="row">
                {
                    usuarios.map((usuario, i) => (
                        <div key={i} className="col-12 col-md-4 my-3">
                            <div className="card" >
                                <img src={usuario.avatar} className="card-img-top" alt={usuario.avatar} />
                                <div className="card-body text-center">
                                    <h5 className="card-title">{usuario.first_name} {usuario.last_name} </h5>
                                    <p className="card-text">{usuario.email}</p>
                                    <div className="row">
                                        <div className="col-6">
                                            <button
                                                className='btn btn-primary'
                                                onClick={() => updateUser(usuario)}
                                                data-toggle="modal"
                                                data-target="#staticBackdrop"
                                            >EDITAR</button>
                                        </div>
                                        <div className="col-6">
                                            <button
                                                className='btn btn-danger'
                                                onClick={() => deleteUser(usuario)}
                                            >DETETE</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))

                }
            </div>
        </div>
    )
}

export default ListUsers