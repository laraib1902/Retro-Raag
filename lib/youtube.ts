let apiPromise: Promise<typeof window.YT> | null = null;

/**
 * Loads the YouTube IFrame Player API script exactly once and resolves with
 * the global `YT` namespace once it's ready. Safe to call from multiple
 * components — later callers reuse the same in-flight promise.
 */
export function loadYouTubeIframeAPI(): Promise<typeof window.YT> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("loadYouTubeIframeAPI called on the server"));
  }

  if (window.YT && window.YT.Player) {
    return Promise.resolve(window.YT);
  }

  if (apiPromise) return apiPromise;

  apiPromise = new Promise((resolve) => {
    const previousCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previousCallback?.();
      resolve(window.YT);
    };

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
  });

  return apiPromise;
}
