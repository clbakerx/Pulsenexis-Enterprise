"use client";

import SharedPlayer from "./SharedPlayerImpl";
import React from "react";

export type SharedPlayerProps = {
  baseUrl: string;
};

export default function SharedPlayerClient(props: SharedPlayerProps) {
  return <SharedPlayer {...props} />;
}
