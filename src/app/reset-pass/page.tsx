import ResetPasswordPage from '@/common/form/resetFrom';
import React, { Suspense } from 'react';

const page = () => {
     return (
          <Suspense fallback={<div>Loading...</div>}>
               <ResetPasswordPage />
          </Suspense>
     );
};

export default page;