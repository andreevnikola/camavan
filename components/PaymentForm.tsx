"use client";

import { useUser } from "@clerk/nextjs";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React from "react";

export default function PaymentForm({ price }: { price: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const user = useUser();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cardElement = elements?.getElement("card");

    try {
      if (!stripe || !cardElement) return null;
      const { data } = await axios.post("/api/create-payment-intent", {
        data: { amount: 3 },
      });
      const clientSecret = data;

      await stripe?.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
        receipt_email: user.user?.primaryEmailAddress! as any,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmit} className="w-full mt-5">
      <CardElement />
      <button
        type="submit"
        className="bg-primary mt-2 p-5 text-2xl font-bold rounded-lg text-white w-full hover:brightness-125 transition-all"
      >
        {price} лв
      </button>
    </form>
  );
}
