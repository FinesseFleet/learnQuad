import mongoose, {Document,Model,Schema} from "mongoose";


export interface IOrder extends Document{
    isPaid: boolean
    courseId: string;
    userId?:string;
    amount: number;
    razorpay: {
        orderId: String,
        paymentId: String,
        signature: String,
    };
}

const orderSchema = new Schema<IOrder>({
    isPaid: {
     type: Boolean,
     required: true
    },
    courseId: {
     type: String,
     required: true
    },
    userId:{
        type: String,
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    razorpay:{
        orderId: String,
        paymentId: String,
        signature: String,
    },
},{timestamps: true});

const OrderModel: Model<IOrder> = mongoose.model('Order',orderSchema);

export default OrderModel;