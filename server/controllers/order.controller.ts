import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import OrderModel, { IOrder } from "../models/order.Model";
import userModel from "../models/user.model";
import CourseModel, { ICourse } from "../models/course.model";
import path from "path";
import ejs from "ejs";
import sendMail from "../utils/sendMail";
import NotificationModel from "../models/notification.Model";
import { redis } from "../utils/redis";
require("dotenv").config();
import Razorpay from "razorpay";
import crypto from "crypto";

// create order
export const createOrder = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId } = req.body as IOrder;

      const user = await userModel.findById(req.user?._id);

      const courseExistInUser = user?.courses.some(
        (course: any) => course._id.toString() === courseId
      );

      if (courseExistInUser) {
        return next(
          new ErrorHandler("You have already purchased this course", 400)
        );
      }

      const course: ICourse | null = await CourseModel.findById(courseId);

      if (!course) {
        return next(new ErrorHandler("Course not found", 404));
      }

      const mailData = {
        order: {
          _id: course._id.toString().slice(0, 6),
          name: course.name,
          price: course.price,
          date: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        },
      };

      await ejs.renderFile(
        path.join(__dirname, "../mails/order-confirmation.ejs"),
        { order: mailData }
      );

      try {
        if (user) {
          await sendMail({
            email: user.email,
            subject: "Order Confirmation",
            template: "order-confirmation.ejs",
            data: mailData,
          });
        }
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
      }

      await NotificationModel.create({
        user: user?._id,
        title: "New Order",
        message: `You have a new order from ${course?.name}`,
      });      

      const instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY!,
        key_secret: process.env.RAZORPAY_SECRET,
      });
      const options = {
        amount: (course.price * 100),
        currency: "INR",
      };

      instance.orders.create(options, (error, order)=>{
        if (error) {
          return next(new ErrorHandler("Error occured white creating order", 500));
        } else {          
          res.status(201).json({
            succcess:true,
            order: order.id,
        })
        }
      });

    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// get All orders --- only for admin
export const getAllOrders = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orders = await OrderModel.find().sort({ createdAt: -1 });
  
      res.status(201).json({
        success: true,
        orders,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// new payment
export const newPayment = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let {razorpay, courseId} = req.body as IOrder;      

      const user = await userModel.findById(req.user?._id);

      const courseExistInUser = user?.courses.some(
        (course: any) => course._id.toString() === courseId
      );
      if (courseExistInUser) {
        return next(
          new ErrorHandler("You have already purchased this course", 400)
        );
      }

      const course: ICourse | null = await CourseModel.findById(courseId);
      if (!course) {
        return next(new ErrorHandler("Course not found", 404));
      }

      let body = razorpay.orderId + "|" + razorpay.paymentId;

    var expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET!)
        .update(body.toString())
        .digest('hex');

    if (expectedSignature === razorpay.signature) {

      const newOrder = {
          isPaid: true,
          courseId: courseId,
          userId: user?._id,
          amount: course.price,
          razorpay: {
            orderId: razorpay.orderId,
            paymentId: razorpay.paymentId,
            signature: razorpay.signature,
          },
        };
        await OrderModel.create(newOrder);
  
        user?.courses.push(course?._id);
        await redis.set(req.user?._id, JSON.stringify(user));
        await user?.save();
  
        course!.purchased = course!.purchased + 1;
        await course!.save();
  
        res.send({
          msg: 'Payment was successfull',
        });
    } else {
      return next(new ErrorHandler("Sign Invalid", 500));
    }
      
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
