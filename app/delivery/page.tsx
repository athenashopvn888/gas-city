import type { Metadata } from "next";
import DeliveryContent from "./DeliveryContent";

export const metadata: Metadata = {
  title: "Delivery Coming Soon — GAS CITY CANNABIS | GTA",
  description: "Get notified when GAS CITY CANNABIS launches same-day weed delivery across GTA and surrounding areas.",
  alternates: {
    canonical: "https://gascitycannabis.com/delivery",
  },
};

export default function DeliveryPage() {
  return <DeliveryContent />;
}
