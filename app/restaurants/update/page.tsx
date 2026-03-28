import { Suspense } from "react";
import UpdatePageContent from "./UpdatePageContent";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UpdatePageContent />
    </Suspense>
  );
}
