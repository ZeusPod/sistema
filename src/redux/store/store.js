import { configureStore } from "@reduxjs/toolkit";

import authReduce from "../slice/auth.slice";
import messageReduce from "../slice/message.slice";
import productReduce from "../slice/product.slice";
import customerReduce from "../slice/customer.slice";
import SellReduce from "../slice/sell.slice";
import InvoiceReduce from "../slice/invoice.slice";
import UserReduce from "../slice/user.slice";

export const store = configureStore({
  reducer: {
    auth: authReduce,
    message: messageReduce,
    product: productReduce,
    customer: customerReduce,
    sell: SellReduce,
    invoice: InvoiceReduce,
    user: UserReduce,
  },
});
