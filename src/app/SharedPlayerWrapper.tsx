"use client";

import React from "react";
import SharedPlayerClient, { SharedPlayerProps } from "../components/SharedPlayer.client";

export default function SharedPlayerWrapper(props: SharedPlayerProps) {
  return <SharedPlayerClient {...props} />;
}
