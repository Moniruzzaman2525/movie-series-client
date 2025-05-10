import { PaymentTable } from "@/components/DashboardComponetns/UserDashboard/paymentTable";
import { getAllPayment } from "@/service/Payments";

const page = async() => {
    const payments=await getAllPayment()
    console.log(payments);
    return (
         <div className="">
                     <div className='h-10 w-full bg-gray-700 p-10 flex items-center justify-between text-white font-bold '>
                   <h1>My Payments</h1>
                   </div>
                  <PaymentTable invoice={payments.data} />
               </div>
    );
};

export default page;