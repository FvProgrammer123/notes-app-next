"use client";

import { useEffect, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";

type Props = {
  children: ReactNode;
};

export default function AuthGuard({ children }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      const publicRoutes = ["/login"];
      const commonRoutes = ['/', '/home']
      const isPublic = publicRoutes.includes(pathname);
      

      if (commonRoutes.includes(pathname)) {
        return;
      }

      if (!token && !isPublic) {
        router.replace("/login");
        return;
      }

      if (token && publicRoutes.includes(pathname)) {
        router.replace("/");
        return;
      }
    } catch (error) {
      // Silent error handling
      console.error("AuthGuard error:", error);
      router.replace("/");
    }

  }, [pathname, router]);

  return <>{children}</>;
}
