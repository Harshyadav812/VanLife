import { notFound } from "@tanstack/react-router";

export async function getVans() {
  const res = await fetch(`/api/vans`);

  if (!res.ok) {
    throw new Error("Van not found");
  }

  const data = await res.json();

  if (!data?.vans?.length) {
    throw notFound();
  }

  return data.vans;
}
