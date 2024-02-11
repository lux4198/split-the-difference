'use client';

import { useMantineColorScheme } from "@mantine/core";
import { Button } from '@mantine/core';
import {IconMoon, IconSun} from '@tabler/icons-react'



export default function Home() {
  const {colorScheme, setColorScheme} = useMantineColorScheme();
  return (
    <main className="p-5">
      <h1>Hello There</h1>
      <Button onClick={() => {setColorScheme(colorScheme === 'dark'? 'light' : 'dark')}}
              variant="filled" radius={'xl'}  
              >
                {colorScheme === 'dark'? 
                <IconMoon/> : <IconSun/>}
      </Button>   
    </main>
  );
}
