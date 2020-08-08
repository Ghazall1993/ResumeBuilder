
import React from 'react';
import TitleSection from "../../components/templates/customerService/TitleSection";

export default {
  title: 'TitleSection',
  component: TitleSection,
};

  const sampleData = {
    personal_info: {
      "first_name": "Mary",
      "last_name": "Anderson",
      "prof_title": "Customer Service Professional",
      "email": "jrichardson@gmail.com",
      "phone_number": "(404) 292-9090",
      "address_line1": "342 Rutherford Avenue",
      "city": "Toronto",
      "province": "ON",
      "postal_code": "L6B 0M7"
    }
  }

export const test = () => <TitleSection personal_info={sampleData.personal_info} />;
