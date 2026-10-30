"use client";

import { differenceInDays } from "date-fns";
import Image from "next/image";

import { useReservation } from "./ReservationContext";
import { createBooking } from "../_lib/actions";
import SubmitButton from "./SubmitButton";

function ReservationForm({ cabin, user }) {
  const { range, resetRange } = useReservation();
  const { maxCapacity, regularPrice, discount, id } = cabin;

  // Selected reservation dates
  const startDate = range.from;
  const endDate = range.to;

  const numNights =
    startDate && endDate ? differenceInDays(endDate, startDate) : 0;
  const cabinPrice = numNights * (regularPrice - discount);

  const bookingData = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinId: id,
  };

  const createBookingWithData = createBooking.bind(null, bookingData);

  return (
    <div className="scale-[1.01]">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
        <p>Logged in as</p>

        <div className="flex gap-4 items-center">
          <Image
            // Important to display google profile images
            referrerPolicy="no-referrer"
            className="h-8 w-8 rounded-full object-cover"
            src={user.image}
            alt={user.name || "User profile"}
            width={32}
            height={32}
          />
          <p>{user.name}</p>
        </div>
      </div>

      <form
        // action={createBookingWithData}
        action={async (formData) => {
          await createBookingWithData(formData);
          resetRange();
        }}
        className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          {!(startDate && endDate) ? (
            <p className="text-primary-300 text-base">
              Start by selecting dates
            </p>
          ) : (
            <SubmitButton pendingLabel="Reserving...">Reserve now</SubmitButton>
          )}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;

// "use client";

// import { differenceInDays } from "date-fns";
// import Image from "next/image";

// import { useReservation } from "./ReservationContext";
// import { createBooking } from "../_lib/actions";
// import SubmitButton from "./SubmitButton";

// function ReservationForm({ cabin, user }) {
//   const { range, resetRange } = useReservation();

//   const { maxCapacity, regularPrice, discount, id } = cabin;

//   // Selected reservation dates
//   const startDate = range?.from;
//   const endDate = range?.to;

//   // Validate date selection before calculating the booking
//   const hasSelectedDates = Boolean(startDate && endDate);

//   const numNights = hasSelectedDates
//     ? differenceInDays(endDate, startDate)
//     : 0;

//   const hasValidDates = hasSelectedDates && numNights > 0;

//   // Calculate the booking price
//   const cabinPrice = hasValidDates
//     ? numNights * (regularPrice - discount)
//     : 0;

//   // Data passed to the server action.
//   // The server must independently verify all booking details.
//   const bookingData = {
//     startDate,
//     endDate,
//     numNights,
//     cabinPrice,
//     cabinId: id,
//   };

//   const createBookingWithData = createBooking.bind(
//     null,
//     bookingData
//   );

//   // Handle booking submission
//   async function handleSubmit(formData) {
//     await createBookingWithData(formData);

//     // Reset dates only after successful completion
//     resetRange();
//   }

//   const displayName = user?.name || "Guest";

//   return (
//     <div className="scale-[1.01]">

//       {/* Logged-in user information */}
//       <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
//         <p>Logged in as</p>

//         <div className="flex gap-4 items-center">

//           {user?.image && (
//             <Image
//               src={user.image}
//               alt={displayName}
//               referrerPolicy="no-referrer"
//               width={32}
//               height={32}
//               className="h-8 w-8 rounded-full object-cover"
//             />
//           )}

//           <p>{displayName}</p>
//         </div>
//       </div>

//       {/* Reservation form */}
//       <form
//         action={handleSubmit}
//         className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col"
//       >

//         {/* Number of guests */}
//         <div className="space-y-2">
//           <label htmlFor="numGuests">
//             How many guests?
//           </label>

//           <select
//             name="numGuests"
//             id="numGuests"
//             defaultValue=""
//             className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
//             required
//           >
//             <option value="" disabled>
//               Select number of guests...
//             </option>

//             {Array.from(
//               { length: maxCapacity },
//               (_, i) => i + 1
//             ).map((x) => (
//               <option value={x} key={x}>
//                 {x} {x === 1 ? "guest" : "guests"}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Additional observations */}
//         <div className="space-y-2">
//           <label htmlFor="observations">
//             Anything we should know about your stay?
//           </label>

//           <textarea
//             name="observations"
//             id="observations"
//             className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
//             placeholder="Any pets, allergies, special requirements, etc.?"
//           />
//         </div>

//         {/* Form submission */}
//         <div className="flex justify-end items-center gap-6">
//           {!hasValidDates ? (
//             <p className="text-primary-300 text-base">
//               Start by selecting valid dates
//             </p>
//           ) : (
//             <SubmitButton pendingLabel="Reserving...">
//               Reserve now
//             </SubmitButton>
//           )}
//         </div>

//       </form>
//     </div>
//   );
// }

// export default ReservationForm;
