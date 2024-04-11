import React, { useState } from "react";
import { styles } from "../styles/style";

type Props = {};

const Policy = (props: Props) => {
  return (
    <div>
      <div
        className={
          "w-[95%] 800px:w-[92%] m-auto py-2 text-black dark:text-white px-3"
        }
      >
        <h1 className={`${styles.title} !text-start pt-2`}>
          Platform Terms and Condition
        </h1>
        <div style={{ marginLeft: "15px" }}>
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            Welcome to FinesseFleet! We are committed to safeguarding your
            privacy and ensuring the security of your personal information. This
            privacy policy outlines how we collect, use, and protect your data
            when you interact with our website and services. By accessing or
            using FinesseFleet, you agree to the terms described in this policy.
            Please read it carefully.
          </p>
          <br />
          <div className="py-2 ml-[-15px] font-Poppins leading-8 whitespace-pre-line">
            <b className=" text-lg">Information We Collect</b>
            <ol>
              <b >1. Personal Information:</b>
              <ul>
                <p className=" py-2">
                &#10686; When you register on our platform, we collect information such
                  as your name, email address, and contact details.
                </p>
                <p className=" py-2">
                &#10686; We may also collect additional data related to your
                  educational background, preferences, and interests.
                </p>
              </ul>
              <b>2. Usage Data:</b>
              <ul>
                <p className=" py-2">
                &#10686; We automatically collect information about your interactions
                  with our website, including IP addresses, browser type, device
                  information, and pages visited.
                </p>
              </ul>
              <b>3. Cookies and Tracking Technologies:</b>
              <ul>
                <p className=" py-2">
                &#10686; We use cookies and similar technologies to enhance your
                  browsing experience, analyze trends, and improve our services.
                </p>
              </ul>
            </ol>
          </div>
          <br />
          <div className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            <b className=" text-lg">How We Use Your Information</b>
            <ol>
              <b>1. Personalization:</b>
              <ul>
                <p className=" py-2">
                &#10686; We use your data to personalize your learning experience,
                  recommend relevant content, and provide tailored mentorship.
                </p>
              </ul>
              <b>2. Communication:</b>
              <ul>
                <p className=" py-2">
                &#10686; We communicate with you regarding course updates, events, and
                  other relevant information.
                </p>
                <p className=" py-2">
                &#10686; You can manage your communication preferences through your
                  account settings.
                </p>
              </ul>
              <b>3. Analytics and Research:</b>
              <ul>
                <p className=" py-2">
                &#10686; We analyze usage patterns to improve our platform, identify
                  areas for enhancement, and conduct research.
                </p>
              </ul>
            </ol>
          </div>
          <br />
          <div className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            <b className=" text-lg">Data Security</b>
            <ol>
              <b>1. Encryption and Access Controls:</b>
              <ul>
                <p className=" py-2">
                &#10686; We employ industry-standard security measures to protect your
                  data from unauthorized access, loss, or misuse.
                </p>
              </ul>
              <b>2. Third-Party Services:</b>
              <ul>
                <p className=" py-2">
                &#10686; We collaborate with trusted third-party providers who adhere
                  to strict privacy standards.
                </p>
              </ul>
            </ol>
          </div>
          <br />
          <div className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            <b className=" text-lg">Your Rights</b>
            <ol>
              <b>1. Access and Correction:</b>
              <ul>
                <p className=" py-2">
                &#10686; You can request access to your personal information and update
                  any inaccuracies.
                </p>
              </ul>
              <b>2. Data Retention:</b>
              <ul>
                <p className=" py-2">
                &#10686; We retain your data only as long as necessary for the purposes
                  outlined in this policy.
                </p>
              </ul>
            </ol>
          </div>
          <br />
          <b className=" text-lg">Children&apos;s Privacy </b>
          <p className=" py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            FinesseFleet is not intended for children under the age of 13. If
            you believe we have inadvertently collected information from a
            child, please contact us immediately.
          </p>
          <b className=" text-lg">Changes to this Policy</b>
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            We may update this privacy policy periodically. Any changes will be
            posted on our website, and we recommend reviewing it regularly.
          </p>
        </div>
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

export default Policy;
