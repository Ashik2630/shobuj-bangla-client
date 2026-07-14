"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

export default function ManageItemsPage() {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session === undefined) return;
    if (!session?.user) {
      router.replace("/login");
      return;
    }
    router.replace("/manage-places");
  }, [session, router]);

  return null;
}
