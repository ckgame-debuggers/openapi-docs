import type React from "react";

export default function WithUsItem({
  title,
  children,
  description,
  docs,
}: {
  title: string;
  children: React.ReactNode;
  description: string;
  docs: string;
}) {
  return (
    <div className="bg-sidebar p-5 rounded-md flex flex-col justify-between gap-5">
      <div className="flex w-full justify-between gap-5 items-center">
        <h3 className="text-xl">{title}</h3>
        {children}
      </div>
      <div>
        <p className="break-keep">{description}</p>
      </div>
      <div className="w-full">
        <a
          href={docs}
          className="w-full bg-accent block rounded-md text-center p-2"
        >
          문서
        </a>
      </div>
    </div>
  );
}
