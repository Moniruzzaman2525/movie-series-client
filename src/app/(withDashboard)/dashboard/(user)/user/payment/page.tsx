"use client";
import { PaymentTable } from "@/components/DashboardComponetns/UserDashboard/paymentTable";
import { useUser } from "@/context/userContext";
import { getPaymentByUserEmail } from "@/service/Payments";
import { useEffect, useState } from "react";
// Ensure this path is correct

const PaymentPage = () => {
    const [data, setData] = useState([]);
    console.log(data);
    const { user } = useUser();
    console.log(user?.email);
    useEffect(() => {
        async function fetchPayments() {
            if (user?.email) {
                const result = await getPaymentByUserEmail(user.email as string);
               setData(result.data);
            }
        }
        fetchPayments();
    }, [user?.email]);

    return (
        <div className="-ms-0 -mt-0 md:-ms-10 md:-mt-2 lg:-ms-10 lg:-mt-2">
              <div className='h-10 w-full bg-gray-700 p-10 flex items-center justify-between text-white font-bold '>
            <h1>My Payments</h1>
            </div>
           <PaymentTable invoice={data} />
        </div>
    );
};

export default PaymentPage;