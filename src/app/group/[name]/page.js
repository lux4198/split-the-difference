"use client";

import React, { useEffect, useState } from "react";
import { Text } from "@mantine/core";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

function Page() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [groups, setGroups] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/group/all/`);
      const newData = await response.json();
      setGroups(newData.data);
    };
    fetchData();
  }, []);

  console.log(session, status);
  return (
    <>
      <h2>Group Page</h2>
      {groups &&
        groups.map((group) => <Text key={group.name}>{group.name}</Text>)}
    </>
  );
}

export default Page;
