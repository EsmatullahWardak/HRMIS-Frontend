"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ViewResourcesRoute() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/resources");
  }, [router]);

  return (
    <div className='h-full flex items-center justify-center text-sm text-muted-foreground'>
      Opening resources...
    </div>
  );
}
