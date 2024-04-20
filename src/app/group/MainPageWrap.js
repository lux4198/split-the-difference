"use client";

function MainPageWrap({ children, title }) {
  return (
    <main className="w-full flex flex-col">
      <h2 className="font-medium w-full">{title}</h2>
      <div>{children}</div>
    </main>
  );
}

export default MainPageWrap;
