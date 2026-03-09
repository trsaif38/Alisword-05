import React, { useState } from "react";
import { Download, Link as LinkIcon, Youtube, Facebook, Instagram, Twitter, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface VideoInfo {
  title: string;
  thumbnail: string;
  duration: string;
  author: string;
  formats: { quality: string; url: string; size: string }[];
}

export function VideoDownloader() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFetch = async () => {
    if (!url) return;
    setIsLoading(true);
    setError(null);
    setVideoInfo(null);

    try {
      // Simulating a real API fetch
      // In a real scenario, you would call a backend or a 3rd party API
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (url.includes("youtube.com") || url.includes("youtu.be") || url.includes("facebook.com") || url.includes("instagram.com")) {
        setVideoInfo({
          title: "Amazing Nature 4K - Cinematic Video",
          thumbnail: "https://picsum.photos/seed/video/800/450",
          duration: "04:20",
          author: "Nature Channel",
          formats: [
            { quality: "1080p (Full HD)", url: "#", size: "125 MB" },
            { quality: "720p (HD)", url: "#", size: "75 MB" },
            { quality: "480p", url: "#", size: "40 MB" },
            { quality: "MP3 (Audio)", url: "#", size: "8 MB" },
          ],
        });
      } else {
        throw new Error("Unsupported URL. Please provide a valid video link.");
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch video information.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-8 space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Alisword Video Downloader
        </h1>
        <p className="text-white/60 text-lg">
          Download your favorite videos from any platform in high quality.
        </p>
      </div>

      {/* Input Section */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
        <div className="relative flex flex-col md:flex-row gap-2 p-2 bg-gemini-sidebar border border-white/10 rounded-2xl shadow-2xl">
          <div className="flex-1 flex items-center px-4 gap-3">
            <LinkIcon className="text-white/40" size={20} />
            <input
              type="text"
              placeholder="Paste video link here (YouTube, FB, Insta...)"
              className="w-full bg-transparent border-none outline-none text-white placeholder:text-white/20 py-3"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleFetch()}
            />
          </div>
          <button
            onClick={handleFetch}
            disabled={isLoading || !url}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Download size={20} />}
            {isLoading ? "Fetching..." : "Download"}
          </button>
        </div>
      </div>

      {/* Supported Platforms */}
      <div className="flex flex-wrap justify-center gap-6 text-white/40">
        <div className="flex items-center gap-2 hover:text-red-500 transition-colors cursor-default">
          <Youtube size={20} />
          <span className="text-sm font-medium">YouTube</span>
        </div>
        <div className="flex items-center gap-2 hover:text-blue-500 transition-colors cursor-default">
          <Facebook size={20} />
          <span className="text-sm font-medium">Facebook</span>
        </div>
        <div className="flex items-center gap-2 hover:text-pink-500 transition-colors cursor-default">
          <Instagram size={20} />
          <span className="text-sm font-medium">Instagram</span>
        </div>
        <div className="flex items-center gap-2 hover:text-sky-400 transition-colors cursor-default">
          <Twitter size={20} />
          <span className="text-sm font-medium">Twitter</span>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 animate-in fade-in slide-in-from-top-2">
          <AlertCircle size={20} />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {/* Video Info Result */}
      {videoInfo && (
        <div className="bg-gemini-sidebar border border-white/10 rounded-3xl overflow-hidden animate-in fade-in zoom-in-95 duration-500 shadow-2xl">
          <div className="flex flex-col lg:flex-row">
            {/* Thumbnail */}
            <div className="lg:w-2/5 relative aspect-video lg:aspect-auto">
              <img
                src={videoInfo.thumbnail}
                alt={videoInfo.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 right-4 px-2 py-1 bg-black/80 rounded text-xs font-mono text-white">
                {videoInfo.duration}
              </div>
            </div>

            {/* Details */}
            <div className="lg:w-3/5 p-6 md:p-8 space-y-6">
              <div>
                <div className="flex items-center gap-2 text-emerald-400 mb-2">
                  <CheckCircle2 size={16} />
                  <span className="text-xs font-bold uppercase tracking-wider">Ready to download</span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-white line-clamp-2 mb-1">
                  {videoInfo.title}
                </h2>
                <p className="text-white/40 text-sm">By {videoInfo.author}</p>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-bold text-white/20 uppercase tracking-widest">Available Formats</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {videoInfo.formats.map((format, i) => (
                    <button
                      key={i}
                      className="flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl transition-all group"
                    >
                      <div className="flex flex-col items-start">
                        <span className="text-sm font-semibold text-white">{format.quality}</span>
                        <span className="text-[10px] text-white/40">{format.size}</span>
                      </div>
                      <Download size={16} className="text-white/20 group-hover:text-white transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Trending Downloads */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest">Trending Downloads</h3>
          <div className="h-px flex-1 bg-white/5 mx-4" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { title: "Nature 4K", platform: "YouTube", color: "text-red-500" },
            { title: "Funny Cats", platform: "Facebook", color: "text-blue-500" },
            { title: "Travel Vlog", platform: "Instagram", color: "text-pink-500" },
            { title: "Tech News", platform: "Twitter", color: "text-sky-400" },
          ].map((item, i) => (
            <div key={i} className="p-3 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group">
              <p className="text-xs font-medium text-white group-hover:text-blue-400 transition-colors">{item.title}</p>
              <p className={cn("text-[10px] font-bold uppercase", item.color)}>{item.platform}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How to Use Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
        <div className="p-6 bg-white/5 rounded-2xl border border-white/5 space-y-3">
          <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold">1</div>
          <h3 className="font-bold text-white">Copy URL</h3>
          <p className="text-sm text-white/40">Copy the link of the video you want to download from your browser or app.</p>
        </div>
        <div className="p-6 bg-white/5 rounded-2xl border border-white/5 space-y-3">
          <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold">2</div>
          <h3 className="font-bold text-white">Paste & Fetch</h3>
          <p className="text-sm text-white/40">Paste the link into the input box above and click the Download button.</p>
        </div>
        <div className="p-6 bg-white/5 rounded-2xl border border-white/5 space-y-3">
          <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400 font-bold">3</div>
          <h3 className="font-bold text-white">Download</h3>
          <p className="text-sm text-white/40">Select your preferred quality and format, then save the video to your device.</p>
        </div>
      </div>
    </div>
  );
}
