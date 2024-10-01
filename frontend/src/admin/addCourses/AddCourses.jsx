import React,{useState,useEffect} from 'react'
import {useForm} from 'react-hook-form'
import Layout from '../utils/Layout'
import { Input } from '../../components';
import { Button } from '../../components';
import { toast } from 'react-toastify';
import adminService from '../../service/adminService';
import { fetchCourse } from '../../links/courseLinks';
function AddCourses() {
    const {register,handleSubmit} = useForm();
    const [loading, setLoading] = useState(false);
    const addCourse = async(data) => {
        setLoading(true);
        console.log(data);
            const myForm = new FormData()
            myForm.append("title",data.title)
            myForm.append("description", data.description)
            myForm.append("category", data.category)
            myForm.append("price", data.price)
            myForm.append("duration", data.duration)
            myForm.append("createdBy", data.createdBy)
            myForm.append("file", data.image[0])
        try {
            const data = await adminService.addCourse(myForm);
            toast.success(data.message); 
            fetchCourse()
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            setLoading(false);
        }
    }
  return (
    <Layout>
        <h1 className='text-center font-bold text-2xl pb-2'>Add a new Course</h1>
        <div className={`mx-auto w-full max-w-2xl bg-gray-100 
        rounded-xl p-10 border border-black/10`}>
          <form onSubmit={handleSubmit(addCourse)}
                className = 'mt-8'>
                    <div className="space-y-5">
                        <Input
                            label = "Title"
                            placeholder = "Course title"
                            type = "text"
                            {...register("title",{
                                required:true,
                            })}  
                        />
                        <Input
                            label = "Description "
                            type = "text"
                            multiline = {true}
                            placeholder = "Course description"
                            {...register("description",{
                                required:true,
                            })}
                        />
                        <Input
                            label = "Category "
                            type = "text"
                            placeholder = "Course category"
                            {...register("category",{
                                required:true,
                            })}
                        />
                        <div className='flex gap-4'>
                        <Input
                            label = "Price "
                            type = "number"
                            placeholder = "Course price"
                            {...register("price",{
                                required:true,
                            })}
                        />
                        <Input
                            label = "Duration (in hours)"
                            type = "number"
                            placeholder = "Course duration"
                            {...register("duration",{
                                required:true,
                            })}
                        />
                        </div>
                        <Input
                            label = "Created by "
                            type = "text"
                            placeholder = "John cana"
                            {...register("createdBy",{
                                required:true,
                            })}
                        />
                        <Input
                            label="Course Image :"
                            type="file"
                            className="mb-4"
                            accept="image/png image/jpg image/jpeg image/gif"
                            {...register("image",{
                                required:true
                            })}
                        />
                        <Button
                            type='submit'
                            className='w-full'
                            disabled={loading}
                        >{loading?"Please wait..":"Add course"}</Button>
                    </div>
            </form>  
        </div>
    </Layout>
  )
}

export default AddCourses