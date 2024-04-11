import { useGetCourseDetailsQuery } from "@/redux/features/courses/coursesApi";
import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import Heading from "@/app/utils/Heading";
import Header from "../Header";
import Footer from "../Footer";
import CourseDetails from "./CourseDetails";

type Props = {
  id: string;
};

const CourseDetailsPage = ({ id }: Props) => {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetCourseDetailsQuery(id);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Heading
            title={data?.course?.name + " - FinesseFleet"}
            description={
              "Discover the power of personalized guidance at FinesseFleet! We firmly believe in unlocking the unique potential within every student. Tailored to individual preferences, our guidance ensures students can excel confidently in their chosen fields. Join us on the journey to academic excellence!"
            }
            keywords={data?.course?.tags}
          />
          <Header
            route={route}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
            activeItem={1}
          />
            <CourseDetails
              data={data?.course}
              setRoute={setRoute}
              setOpen={setOpen}
            />
          <Footer />
        </>
      )}
    </>
  );
};

export default CourseDetailsPage;
