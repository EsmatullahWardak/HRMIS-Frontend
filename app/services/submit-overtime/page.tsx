"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SubmitOvertimeRoute() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/dashboard/overtime");
  }, [router]);

  return (
    <div className='h-full flex items-center justify-center text-sm text-muted-foreground'>
      Opening overtime...
    </div>
  );
}
