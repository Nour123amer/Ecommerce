import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Navigate } from 'react-router-dom'
import * as Yup from "yup"

export default function Register() {
  const [errorMsg , setErrorMsg]=useState(null)
  const phoneRegex=/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$ /
  const validationSchema = Yup.object({
    name: Yup.string().required("name is required")
    .min(3,"name must be at least 3 characters")
    .max(15, "name must be at most 15 character"), 
    email:Yup.string().required("email is required").email("email is not valid"),
    phone:Yup.string().required("phone is required").matches(phoneRegex,"phone number is not valid"),
    password:Yup.string().required("password is required")
    .matches(/^[A-Z][0-9a-zA-Z]{5.25}$/ ,"password must start with uppercase letter"),
    repassword:Yup.string().required("repassword is required").oneOf([Yup.ref("password")],"password and repassword should be the same"),
  })
  async function sedDataToRegister(values){
  try{
    const options={
      url:"https://ecommerceroutmisr.com/api/v1/auth/signup",
      method:"POST",
      data:values
    }
    toast.loading("Waiting...")
    const {data} =await axios.request(options);
    console.log(data);
    toast.dismiss(id);
    toast.error(error.response.data.message);
    toast.success("User created successfully");

    setTimeout(()=> {
        if(data.message==="success" ){
      Navigate("/login")
    }
    },3000)
  
  }catch(error){
    console.log(error);
    setErrorMsg(error.response.data.message);
  }
  }
  const formik = useFormik({
    initialValues:{
      name:"",
      email:"",
      password:" ",
      rePassword:" ",
      phone: "",
    },
    validationSchema,
    onsubmit:sedDataToRegister,
  })
  return (
    <section>
      <h2 className="mb-6">
        <i className='fa-regular fa-circle-user me-3'></i>
        <span>Register Now</span>
      </h2>
      <form className='space-y-3' onsubmit={formik.handleSubmit}>
        <div>
          <input type="text" className='form-control w-full' placeholder='username' value={formik.values.name}
          name='name'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          />
          {formik.errors.name && formik.touched.name? (
            <div className='text-red-600 font-semibold mt-2'>
            * {formik.errors.name}
           </div>
          ):(
            ""
          )}
        </div>

        <div>
          <input type="email" className='form-control w-full' placeholder='Email'
          value={formik.values.email}
          name='email'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          />
           {formik.errors.email &&formik.touched.email ? (
            <div className='text-red-600 font-semibold mt-2'>
            * {formik.errors.email}
           </div>
          ):(
            ""
          )}
        </div>

        <div>
          <input type="tel" className='form-control w-full' placeholder='Phone'
               value={formik.values.phone}
               name='phone'
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
          />
           {formik.errors.phone &&formik.touched.phone? (
            <div className='text-red-600 font-semibold mt-2'>
            * {formik.errors.phone}
           </div>
          ):(
            ""
          )}
        </div>

        <div>
          <input type="password" className='form-control w-full' placeholder='Password'
               value={formik.values.password}
               name='password'
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
          />
          
             {formik.errors.password && formik.touched.password? (
              <div className='text-red-600 font-semibold mt-2'>
              * {formik.errors.password}
             </div>
            ):(
              ""
            )}
          
        </div>

        <div>
          <input type="password" className='form-control w-full' placeholder='Repassword'
               value={formik.values.rePassword}
               name='rePassword'
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
          />
           {formik.errors.rePassword && formik.touched.rePassword ? (
            <div className='text-red-600 font-semibold mt-2'>
            * {formik.errors.rePassword}
           </div>
          ):(
            ""
          )}
        </div>
        <button type='submit' className='btn-primary'>Sign Up</button>
      
      </form>
    </section>
  )
}


/*
  <section>
      <h2 className="mb-6">
        <i className='fa-regular fa-circle-user me-3'></i>
        <span>Register Now</span>
      </h2>
      <form className='space-y-3'>
        <div>
          <input type="text" className='form-control w-full' placeholder='username' />
        </div>
        <div>
          <input type="email" className='form-control w-full' placeholder='Email' />
        </div>
        <div>
          <input type="tel" className='form-control w-full' placeholder='Phone' />
        </div>
        <div>
          <input type="password" className='form-control w-full' placeholder='Password' />
        </div>
        <div>
          <input type="password" className='form-control w-full' placeholder='Repassword' />
        </div>
        <button className='btn-primary'>Sign Up</button>
      
      </form>
    </section>
*/