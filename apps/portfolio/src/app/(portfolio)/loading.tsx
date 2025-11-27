import { Spinner } from "@workspace/ui";

function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Spinner className="size-8" />
    </div>
  );
}

export default Loading;
