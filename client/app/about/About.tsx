import React from "react";
import { styles } from "../styles/style";

const About = () => {
  return (
    <div className="text-black dark:text-white">
      <br />
      <h1 className={`${styles.title} 800px:!text-[45px]`}>
        What is <span className="text-gradient">FinesseFleet?</span>
      </h1>

      <br />
      <div className="text-[18px] w-[95%] 800px:w-[85%] m-auto">
        <p className="font-Poppins">
          At FinesseFleet, we don&apos;t merely educate; we empower. Headquartered in
          Bengaluru, India, we stand as a vanguard in educational innovation,
          committed to transforming the global learning landscape. Our
          unwavering dedication lies in providing personalized guidance and
          comprehensive support across all educational levels, fostering
          well-rounded individuals equipped for success in an ever-evolving
          world.
          <br />
          <br />
          Central to our approach is the firm belief in holistic education. We
          seamlessly integrate co-curricular activities within our meticulously
          designed platform, cultivating an enriching environment that
          transcends rote memorization and ignites a passion for lifelong
          learning. Our K-12 program, tailored specifically for CBSE students
          from Grade VI to XII, offers specialized batches for competitive exams
          like IIT JEE, NEET, CUET, KVPY, CLAT, and CAT. We further cater to
          undergraduates and postgraduates in the engineering field with a
          diverse range of courses, fostering well-rounded graduates prepared to
          excel in various industries.

          
          {/* <div className="mx-10">
          <em className="text-blue-400">
            “As a parent, I firmly believe that education should be tailored to
            the unique needs of each child. The approach to teaching must be
            personalized, varying from one child to another. An ideal method
            involves mentoring, providing a more effective and individualized
            learning experience, and that&apos;s what FinesseFleet is aiming to
            provide.”
            <p className="text-[20px] text-white text-center">
              — Arpita BA, Chairperson, FinesseFleet
            </p>
          </em>
        </div> */}
          <br />
          <br />
          The multifaceted structure of FinesseFleet sets us apart. Our
          intricate network of departments, research units, schools, and centers
          of excellence facilitates a comprehensive and dynamic educational
          experience. Each component synergistically contributes to our
          overarching goal: providing unparalleled resources, expert mentorship,
          and limitless opportunities for growth. This collaborative approach
          ensures we remain at the forefront of educational innovation,
          constantly pushing boundaries to craft meaningful impact.
          <br />
          <br />
          Our commitment extends beyond conventional education. We actively
          engage in research and development, fostering a vibrant culture of
          learning and discovery. This dedication positions FinesseFleet as a
          leader in shaping the future of education, producing graduates who are
          not only academically proficient but also well-equipped to navigate
          the complexities of real-world challenges.
          <br />
          <br />
          At FinesseFleet, we invite you to join us on a transformative journey.
          Embrace a holistic approach to learning, cultivate your diverse
          talents, and emerge as a leader ready to make a positive impact on the
          world. Choose FinesseFleet, and choose the future of education.
        </p>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default About;
