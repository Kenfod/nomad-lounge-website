import { eachDayOfInterval } from "date-fns";
import { supabase } from "./supabase";
import { notFound } from "next/navigation";

/////////////
// GET

export async function getCabin(id) {
  const { data, error } = await supabase
    .from("cabins")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    notFound();
  }

  return data;
}

export async function getCabinPrice(id) {
  const { data, error } = await supabase
    .from("cabins")
    .select("regularPrice, discount")
    .eq("id", id)
    .single();

  // For testing Loading Spinner in the CabinList streaming
  // await new Promise((res) => setTimeout(res, 2000));

  if (error) {
    console.error(error);
  }

  return data;
}

export const getCabins = async function () {
  const { data, error } = await supabase
    .from("cabins")
    .select("id, name, maxCapacity, regularPrice, discount, image")
    .order("name");

  // For testing Loading Spinner in the CabinList streaming
  // await new Promise((res) => setTimeout(res, 5000));

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
};

// Guests are uniquely identified by their email address
export async function getGuest(email) {
  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .eq("email", email)
    .single();

  // No error here! We handle the possibility of no guest in the sign in callback
  return data;
}

export async function getBooking(id) {
  const { data, error, count } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not get loaded");
  }

  return data;
}

export async function getBookings(guestId) {
  const { data, error, count } = await supabase
    .from("bookings")
    // We actually also need data on the cabins as well. But let's ONLY take the data that we actually need, in order to reduce downloaded data.
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, totalPrice, guestId, cabinId, cabins(name, image)",
    )
    .eq("guestId", guestId)
    .order("startDate");

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

export async function getBookedDatesByCabinId(cabinId) {
  let today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  today = today.toISOString();

  // Getting all bookings
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("cabinId", cabinId)
    .or(`startDate.gte.${today},status.eq.checked-in`);

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  // Converting to actual dates to be displayed in the date picker
  const bookedDates = data
    .map((booking) => {
      return eachDayOfInterval({
        start: new Date(booking.startDate),
        end: new Date(booking.endDate),
      });
    })
    .flat();

  return bookedDates;
}

export async function getSettings() {
  const { data, error } = await supabase.from("settings").select("*").single();

  // For testing Loading Spinner in the CabinList streaming
  // await new Promise((res) => setTimeout(res, 2000));

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }

  return data;
}

export async function getCountries() {
  try {
    const apiKey = process.env.REST_COUNTRIES_API_KEY;

    if (!apiKey) {
      throw new Error("REST_COUNTRIES_API_KEY is missing");
    }

    const countries = [];
    let offset = 0;
    let hasMore = true;

    while (hasMore) {
      const url = new URL("https://api.restcountries.com/countries/v5");

      url.searchParams.set("response_fields", "names.common,flag.emoji");
      url.searchParams.set("limit", "100");
      url.searchParams.set("offset", String(offset));

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        cache: "force-cache",
      });

      const body = await res.json();

      if (!res.ok || !Array.isArray(body.data?.objects)) {
        throw new Error(
          `Countries API failed: HTTP ${res.status} - ${
            body.errors?.[0]?.message ?? "Unexpected response"
          }`,
        );
      }

      countries.push(
        ...body.data.objects
          .filter((country) => country.names?.common)
          .map((country) => ({
            name: country.names.common,
            flag: country.flag?.emoji ?? "",
          })),
      );

      hasMore = body.data.meta?.more === true;
      offset += body.data.objects.length;

      if (hasMore && body.data.objects.length === 0) {
        throw new Error("Countries API pagination made no progress");
      }
    }

    return countries.sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error("getCountries failed:", error);

    throw new Error("Could not fetch countries", { cause: error });
  }
}

// export async function getCountries() {
//   const res = await fetch(
//     "https://restcountries.com/v3.1/all?fields=name,flag",
//   );

//   const body = await res.json();

//   console.log("Countries API status:", res.status);
//   console.log(
//     "Countries API response preview:",
//     JSON.stringify(body).slice(0, 1000),
//   );

//   if (!res.ok || !Array.isArray(body)) {
//     throw new Error(`Unexpected countries API response: HTTP ${res.status}`);
//   }

//   if (!res.ok) {
//     throw new Error(`HTTP error: ${res.status} ${res.statusText}`);
//   }

//   const countries = await res.json();
//   if (!Array.isArray(countries)) {
//     throw new Error("Invalid countries API response");
//   }

//   return countries
//     .map((country) => ({
//       name: country.name?.common,
//       flag: country.flag ?? "",
//     }))
//     .filter((country) => country.name)
//     .sort((a, b) => a.name.localeCompare(b.name));
// } catch (error) {
//   console.error("getCountries failed:", error);
//   throw new Error("Could not fetch countries", { cause: error });
// }
// }

/////////////
// CREATE

export async function createGuest(newGuest) {
  const { data, error } = await supabase.from("guests").insert([newGuest]);

  if (error) {
    console.error(error);
    throw new Error("Guest could not be created");
  }

  return data;
}

export async function createBooking(newBooking) {
  const { data, error } = await supabase
    .from("bookings")
    .insert([newBooking])
    // So that the newly created object gets returned!
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }

  return data;
}

/////////////
// UPDATE

// The updatedFields is an object which should ONLY contain the updated data
export async function updateGuest(id, updatedFields) {
  const { data, error } = await supabase
    .from("guests")
    .update(updatedFields)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }
  return data;
}

export async function updateBooking(id, updatedFields) {
  const { data, error } = await supabase
    .from("bookings")
    .update(updatedFields)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

/////////////
// DELETE

export async function deleteBooking(id) {
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
