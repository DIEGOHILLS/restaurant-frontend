import { Suspense } from "react";
import CreateRestaurantPage from "./CreateRestaurantPage";

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-[100vh] flex items-center justify-center">Loading 🍝</div>}>
      <CreateRestaurantPage />
    </Suspense>
  );
}