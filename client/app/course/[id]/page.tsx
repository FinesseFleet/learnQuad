'use client'
import React from "react";
import CourseDetailsPage from "../../components/Course/CourseDetailsPage";


const Page = ({params}:any) => {
    return (
        <>
            <CourseDetailsPage id={params.id} />
        </>
    )
}

export default Page;
 