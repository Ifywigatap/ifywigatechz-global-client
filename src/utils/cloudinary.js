/**
 * Central utility for Cloudinary image optimization.
 * Injects transformation parameters into Cloudinary URLs or returns normalized local paths.
 * 
 * @param {string} src - The image source URL or path.
 * @param {Object} options - Transformation options.
 * @param {number|string} options.width - Desired width.
 * @param {number|string} options.height - Desired height.
 * @param {string} options.crop - Crop mode (default: 'fill').
 * @param {string} options.quality - Quality (default: 'auto').
 * @param {string} options.format - Format (default: 'auto').
 * @returns {string} - The optimized URL.
 */
export const optimizeImage = (src, options = {}) => {
  const placeholder = "/images/placeholder.jpg";
  if (!src || typeof src !== "string") return placeholder;

  // Handle local paths or non-Cloudinary external URLs
  if (!src.includes("cloudinary.com")) {
    if (src.startsWith("http://") || src.startsWith("https://")) return src;
    const path = src.startsWith("/") ? src : `/${src}`;
    return encodeURI(path);
  }

  // Cloudinary URL detected: extract options
  const {
    width,
    height,
    crop = "fill",
    quality = "auto",
    format = "auto",
  } = options;

  // Construct the transformation string
  const transformList = [`f_${format}`, `q_${quality}`];
  if (width) transformList.push(`w_${width}`);
  if (height) transformList.push(`h_${height}`);
  if (width || height) transformList.push(`c_${crop}`);

  const transformationString = transformList.join(",");

  // Inject the transformation string immediately after /upload/
  return src.replace(/\/upload\//, `/upload/${transformationString}/`);
};