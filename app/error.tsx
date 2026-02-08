"use client";
export default function Error({ error }) {
  return <p>Could not fetch the list of notes. {error.message}</p>;
}
