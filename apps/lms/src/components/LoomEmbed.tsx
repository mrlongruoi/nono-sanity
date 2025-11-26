"use client";

interface LoomEmbedProps {
  shareUrl: string;
  title?: string;
}

export function LoomEmbed({ shareUrl, title = "Loom video player" }: Readonly<LoomEmbedProps>) {
  // Convert share URL to embed URL
  const embedUrl = shareUrl.replace("/share/", "/embed/").split("?")[0];

  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden">
      <iframe
        src={embedUrl}
        title={title}
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full"
      />
    </div>
  );
}