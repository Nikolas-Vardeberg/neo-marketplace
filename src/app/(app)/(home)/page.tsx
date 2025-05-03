"use client"

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";


export default function Home() {
  const trpc = useTRPC();
  const {data} = useQuery(trpc.auth.session.queryOptions());
  
  return (
    <div>
      <pre>
        {JSON.stringify(data, undefined, 2)}
      </pre>
    </div>
  );
}
