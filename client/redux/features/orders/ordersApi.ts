import { apiSlice } from "../api/apiSlice";

export const ordersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: (type) => ({
        url: `get-orders`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    createPaymentIntent: builder.mutation({
      query: ({razorpay, courseId}) => ({
        url: "payment",
        method: "POST",
        body: {
          razorpay,
          courseId
        },
        credentials: "include" as const,
      }),
    }),
    createOrder: builder.mutation({
      query: ({ courseId }) => ({
        url: "create-order",
        body: {
          courseId,
        },
        method: "POST",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useGetAllOrdersQuery, useCreatePaymentIntentMutation ,useCreateOrderMutation} =
  ordersApi;
