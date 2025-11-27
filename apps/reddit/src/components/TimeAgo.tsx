"use client";

import TimeAgoComponent from "react-timeago";

function TimeAgo({ date }: Readonly<{ date: Date }>) {
  return <TimeAgoComponent date={date} />;
}

export default TimeAgo;