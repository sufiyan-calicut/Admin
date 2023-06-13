import React, { useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import adminInstance from'../instance/instance'

const AdminProtectedRoute = () => {
    const [admin,setAdmin] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
      adminInstance.get('/tokenVerify').then((response)=>{
        setAdmin(true)
      }).catch((error)=>{
        localStorage.clear()
        navigate('/')
      })
    }, []);

    return(
      admin &&  <Outlet/> 
    )
}

export default AdminProtectedRoute;
