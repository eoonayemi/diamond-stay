// src/lib/schemas.ts
import * as z from "zod";

export const hotelSearchSchema = z
  .object({
    destination: z.string().min(1, {
      message: "Please enter a destination.",
    }),
    checkIn: z.date({
      message: "Check-in date is required.",
    }),
    checkOut: z.date({
      message: "Check-out date is required.",
    }),
    guests: z
      .number()
      .int()
      .positive({ message: "Number of guests must be at least 1." }),
  })
  .refine(
    (data) => {
      if (!data.checkIn || !data.checkOut) return true; // Don't validate if dates are not set
      return data.checkOut > data.checkIn;
    },
    {
      message: "Check-out date must be after the check-in date.",
      path: ["checkOut"],
    }
  );
