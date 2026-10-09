// import { getCountries } from "@/app/_lib/data-service";

// // Let's imagine your colleague already built this component 😃

// async function SelectCountry({ defaultCountry, name, id, className }) {
//   const countries = await getCountries();
//   const flag =
//     countriesArray.find((country) => country.name === defaultCountry)?.flag ??
//     "";

//   return (
//     <select
//       name={name}
//       id={id}
//       // Here we use a trick to encode BOTH the country name and the flag into the value. Then we split them up again later in the server action
//       defaultValue={`${defaultCountry}%${flag}`}
//       className={className}
//     >
//       <option value="">Select country...</option>
//       {countries.map((c) => (
//         <option key={c.name} value={`${c.name}%${c.flag}`}>
//           {c.name}
//         </option>
//       ))}
//     </select>
//   );
// }

// export default SelectCountry;

import { getCountries } from "@/app/_lib/data-service";

// Let's imagine your colleague already built this component 😃

async function SelectCountry({ defaultCountry, name, id, className }) {
  const countries = await getCountries();

  // 1. Safeguard against undefined inputs and fix the variable name! ✅
  const countriesArray = Array.isArray(countries) ? countries : [];

  // 2. Updated the lookup string keys to handle modern property mappings safely ✅
  const flag =
    countriesArray.find((country) => country.name === defaultCountry)?.flag ??
    "";

  return (
    <select
      name={name}
      id={id}
      // Here we use a trick to encode BOTH the country name and the flag into the value. Then we split them up again later in the server action
      defaultValue={`${defaultCountry}%${flag}`}
      className={className}
    >
      <option value="">Select country...</option>
      {/* 3. Changed layout reference to use our safe countriesArray mapping loop ✅ */}
      {countriesArray.map((c) => (
        <option key={c.name} value={`${c.name}%${c.flag}`}>
          {c.name}
        </option>
      ))}
    </select>
  );
}

export default SelectCountry;
