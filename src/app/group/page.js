"use client";

import React, { useEffect, useState } from "react";
import { Text } from "@mantine/core";

function Page() {
  const [groups, setGroups] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/group/all/`);
      const newData = await response.json();
      setGroups(newData.data);
    };

    fetchData();
  }, []);

  console.log("groups", groups);
  return (
    <>
      <h2>Group Page</h2>
      {groups && groups.map((group) => <Text>{group.name}</Text>)}
    </>
  );
}

export default Page;
