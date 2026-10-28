"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";

import { updateGuest } from "../_lib/actions";

function UpdateProfileForm({ guest, children }) {
  const [count, setCount] = useState();

  const { fullName, email, nationality, nationalID, countryFlag } = guest;

  return (
    <form
      action={updateGuest}
      className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
    >
      {/* Full Name - Disabled Field */}
      <div className="space-y-2">
        <label className="text-primary-100">Full name</label>
        <input
          disabled
          defaultValue={fullName}
          name="fullName"
          className="px-5 py-3 bg-primary-500 text-primary-200 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-primary-600 disabled:text-primary-200"
        />
      </div>

      {/* Email Address - Disabled Field */}
      <div className="space-y-2">
        <label>Email address</label>
        <input
          disabled
          defaultValue={email}
          name="email"
          className="px-5 py-3 bg-primary-500 text-primary-200 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-primary-600 disabled:text-primary-200"
        />
      </div>

      {/* Nationality Select Section */}
      <div className="space-y-2 ">
        <div className="flex relative items-center justify-between w-full h-5">
          <label htmlFor="nationality" className="text-primary-100">
            Where are you from?
          </label>
          <img
            src={countryFlag}
            alt="Country flag"
            className="h-5 rounded-sm object-contain object-right"
          />
        </div>

        {children}
      </div>

      {/* National ID - Editable Field */}
      <div className="space-y-2">
        <label htmlFor="nationalID" className="text-primary-100">
          National ID number
        </label>
        <input
          defaultValue={nationalID}
          name="nationalID"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
      </div>

      {/* Form Submission Wrapper */}
      <div className="flex justify-end items-center gap-6">
        <Button />
      </div>
    </form>
  );
}

function Button() {
  const { pending } = useFormStatus();

  return (
    <button
      className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-primary-500 disabled:text-primary-100"
      disabled={pending}
    >
      {pending ? "Updating..." : "Update profile"}
    </button>
  );
}

export default UpdateProfileForm;

// {
//   countryFlag && (
//     <img
//       src={countryFlag}
//       alt={`${nationality || "Country"} flag`}
//       className="h-5 w-auto rounded-sm object-contain object-right"
//     />
//   );
// }
