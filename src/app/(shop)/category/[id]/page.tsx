import { notFound } from "next/navigation";
import * as React from "react";

interface Props {
  params: {
    id: string;
  }
}

export default async function({ params }: Props) {

  const { id } = await params

  if ( id === 'kids') {
    notFound();
  }

  return (
    <div>
      <h1>vategory Page {id}</h1>
    </div>
  );
}