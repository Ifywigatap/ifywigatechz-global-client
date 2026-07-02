import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Download, ArrowLeft, Loader2, CheckCircle, Share2, Check } from "lucide-react";
import { resources } from "../data/resourcesData";
import { useState, useEffect } from "react";
import confetti from 'canvas-confetti';
import ResourceCard from "../components/ResourceCard";

/**
 * Loading Skeleton UI
 * Mimics the exact layout of the resource card to prevent layout shift.
 */
const ResourceSkeleton = () => (
  <div className="animate-pulse">
    <div className="flex items-center justify-between mb-8">
      <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded-lg" />
      <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded-lg" />
    </div>
    <div className="bg-white/60 dark:bg-white/5 backdrop-blur-2xl rounded-3xl border border-slate-200 dark:border-white/10 p-8 sm:p-10 shadow-lg">
      <div className="flex flex-col sm:flex-row items-start gap-6">
        <div className="w-20 h-20 rounded-2xl bg-slate-200 dark:bg-slate-800 flex-shrink-0" />
        <div className="flex-1 w-full space-y-4">
          <div className="h-6 w-16 bg-slate-200 dark:bg-slate-800 rounded-full" />
          <div className="h-10 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-xl" />
          <div className="h-20 w-full bg-slate-200 dark:bg-slate-800 rounded-xl" />
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-slate-200 dark:border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-2 text-center">
            <div className="h-3 w-16 bg-slate-200 dark:bg-slate-800 mx-auto rounded" />
            <div className="h-5 w-24 bg-slate-200 dark:bg-slate-800 mx-auto rounded" />
          </div>
        ))}
      </div>
      <div className="mt-10 h-14 w-full bg-slate-200 dark:bg-slate-800 rounded-xl" />
    </div>
  </div>
);

export default function ResourceDownloadPage() {
  const { slug } = useParams();

  const [isFinding, setIsFinding] = useState(true);
  const [resource, setResource] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [localDownloads, setLocalDownloads] = useState(0);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Simulate async data fetching/finding
    const timer = setTimeout(() => {
      const found = resources.find((r) => r.slug === slug);
      setResource(found);
      if (found) {
        setLocalDownloads(found.downloads || 0);
      }
      setIsFinding(false);
    }, 600); // Short delay to show skeleton and improve perceived smoothness

    return () => clearTimeout(timer);
  }, [slug]);

  if (!isFinding && !resource) {
    return <Navigate to="/404" replace />;
  }

  // Filter for related resources (same category, different item, limit to 4)
  const relatedResources = resource
    ? resources
        .filter(
          (r) => r.category === resource.category && r.id !== resource.id
        )
        .slice(0, 4)
    : [];

  const handleShare = async () => {
    const shareData = {
      title: resource?.title || "Free Resource",
      text: resource?.desc || "Check out this free resource from IFYWIGATECHZ!",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if (err.name !== 'AbortError') console.error("Error sharing:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy link:", err);
      }
    }
  };

  const handleDownload = async () => {
    if (downloaded) return;

    setIsDownloading(true);
    setDownloadProgress(0);
    
    // Simulate API call to increment count and start download
    try {
      // In a production environment, you would call your backend here:
      // await resourceService.incrementDownload(resource.id);
      
      // Simulate preparation progress over 1.5s
      const steps = 20;
      const delay = 1500 / steps;
      for (let i = 1; i <= steps; i++) {
        await new Promise(resolve => setTimeout(resolve, delay));
        setDownloadProgress(Math.round((i / steps) * 100));
      }
      
      setLocalDownloads(prev => prev + 1);
      setDownloaded(true);

      // Trigger premium confetti effect
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#fbbf24', '#10b981', '#ffffff'], // Brand Blue, Gold, Success Green, White
        disableForReducedMotion: true,
        zIndex: 9999
      });
      
      // In a real app, you'd trigger the file download here
      console.log(`Starting download for: ${resource.title}`);
    } catch (err) {
      console.error("Download failed:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <section className="min-h-screen bg-slate-50 dark:bg-gradient-to-b dark:from-slate-950 dark:via-slate-900 dark:to-blue-950 transition-colors duration-300 py-20">
      <Helmet>
        <title>{isFinding ? "Loading Resource..." : `Download ${resource?.title} | IFYWIGATECHZ`}</title>
        <meta 
          name="description" 
          content={isFinding ? "Preparing your download..." : `Download our free resource: ${resource?.title}. ${resource?.desc}`} 
        />
      </Helmet>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {isFinding ? (
          <ResourceSkeleton />
        ) : (
          <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/free-resources"
              className="inline-flex items-center gap-2 text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white transition-colors text-sm"
            >
              <ArrowLeft size={16} />
              Back to All Resources
            </Link>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 text-slate-600 dark:text-neutral-400 hover:text-brandBlue dark:hover:text-brandGold transition-all duration-300 text-sm font-medium"
            >
              {copied ? <Check size={16} className="text-green-500" /> : <Share2 size={16} />}
              {copied ? "Link Copied!" : "Share Resource"}
            </button>
          </div>

          <div className="bg-white/60 dark:bg-white/5 backdrop-blur-2xl rounded-3xl border border-slate-200 dark:border-white/10 p-8 sm:p-10 shadow-lg dark:shadow-2xl transition-colors duration-300">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${resource.color} flex items-center justify-center text-white shadow-lg flex-shrink-0`}>
                <resource.icon size={40} />
              </div>
              <div className="flex-1">
                <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30 font-semibold">
                  {resource.tag}
                </span>
                <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mt-3 mb-4">
                  {resource.title}
                </h1>
                <p className="text-slate-600 dark:text-neutral-300 text-lg leading-relaxed">
                  {resource.desc}
                </p>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-200 dark:border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center transition-colors duration-300">
              <div>
                <p className="text-sm text-slate-500 dark:text-neutral-400 uppercase tracking-wider">Category</p>
                <p className="text-lg font-semibold text-slate-900 dark:text-white mt-1">{resource.category}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-neutral-400 uppercase tracking-wider">File Size</p>
                <p className="text-lg font-semibold text-slate-900 dark:text-white mt-1">{resource.fileSize}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-neutral-400 uppercase tracking-wider">Downloads</p>
                <p className="text-lg font-semibold text-slate-900 dark:text-white mt-1">{localDownloads.toLocaleString()}</p>
              </div>
            </div>

            <div className="mt-10">
              {isDownloading && (
                <div className="mb-6 space-y-2">
                  <div className="flex justify-between text-xs font-semibold text-slate-500 dark:text-neutral-400 uppercase tracking-wider">
                    <span>Preparing your file...</span>
                    <span>{downloadProgress}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${downloadProgress}%` }}
                      className="h-full bg-brandBlue"
                    />
                  </div>
                </div>
              )}
              <button
                onClick={handleDownload}
                disabled={isDownloading || downloaded}
                className={`w-full py-4 rounded-xl font-bold shadow-lg transition-all duration-300 flex items-center justify-center gap-3 text-lg ${
                  downloaded 
                    ? "bg-green-500 text-white cursor-default" 
                    : "bg-gradient-to-r from-brandGold to-yellow-500 text-black hover:shadow-brandGold/25 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70"
                }`}
              >
                {isDownloading ? (
                  <Loader2 size={24} className="animate-spin" />
                ) : downloaded ? (
                  <CheckCircle size={24} />
                ) : (
                  <Download size={24} />
                )}
                {isDownloading ? "Preparing..." : downloaded ? "Download Started" : "Download Now"}
              </button>
              <p className="text-center text-slate-500 dark:text-neutral-500 text-xs mt-3">
                By downloading, you agree to our terms of service.
              </p>
            </div>
          </div>
        </motion.div>
        )}
      </div>

      {/* Related Resources Section */}
      {relatedResources.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
            More Resources You Might Like
          </h2>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {relatedResources.map((relResource) => (
              <ResourceCard key={relResource.id} resource={relResource} />
            ))}
          </motion.div>
        </div>
      )}
    </section>
  );
}