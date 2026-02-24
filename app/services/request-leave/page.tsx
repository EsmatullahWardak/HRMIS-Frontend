"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RequestLeaveRoute() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/leave");
  }, [router]);

  return (
    <div className='h-full flex items-center justify-center text-sm text-muted-foreground'>
      Opening leave request...
    </div>
  );
}
