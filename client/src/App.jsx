import { useEffect, useState } from 'react'
import Navbar from './components/Nabvar'
import Modal from './components/ModalCreateAndUpdate'
import ListUsers from './components/ListUsers'

function App() {
  const [usuarios, setusuarios] = useState([])
  const [isupdate, setisupdate] = useState(false)
  const [formdata, setformdata] = useState({})

  useEffect(() => {
    GetUsers()
  }, [])

  const GetUsers = async () => {
    const response = await fetch('http://localhost:4000/usuarios')
    const data = await response.json()
    setusuarios(data)
  }

  const updateUser = (user) => {
    console.log("entro")
    setisupdate(true)
    setformdata(user)
  }

  const deleteUser = (user) => {
    console.log("entro")
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    };
    fetch(`http://localhost:4000/usuarios/${user.id}`, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log({ message: "correcto", data })
        alert("usuario eliminado correctamente")
        GetUsers()
      });
  }
  const GetUsersByEmail = async (email) => {
    if (email === "") {
      GetUsers()
    }
    else {
      console.log("entro")
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      };
      fetch(`http://localhost:4000/usuarios/${email}`, requestOptions)
        .then(response => response.json())
        .then(data => {
          setusuarios(data)
        });
    }
  }

  return (
    <>
      <Navbar GetUsersByEmail={GetUsersByEmail} />
      <ListUsers usuarios={usuarios} updateUser={updateUser} deleteUser={deleteUser} />
      <Modal GetUsers={GetUsers} isupdate={isupdate} formdata={formdata} setformdata={setformdata} setisupdate={setisupdate} />
    </>
  )
}

export default App
