"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ChangeShiftRoute() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/dashboard/attendance");
  }, [router]);

  return (
    <div className='h-full flex items-center justify-center text-sm text-muted-foreground'>
      Opening shift management...
    </div>
  );
}
