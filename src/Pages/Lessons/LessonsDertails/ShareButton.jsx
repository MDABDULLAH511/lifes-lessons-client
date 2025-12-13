import React from "react";
import ReactDOM from "react-dom/client";
import Swal from "sweetalert2";
import { FaShareAlt } from "react-icons/fa";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

const ShareButton = () => {
  const handleShare = () => {
    const shareUrl = window.location.href;

    Swal.fire({
      title: "Share this lesson",
      html: `
        <div id="share-icons" style="display:flex; gap:20px; justify-content:center; margin-top:20px;">
          <div id="facebook"></div>
          <div id="twitter"></div>
          <div id="whatsapp"></div>
        </div>
      `,
      showConfirmButton: false,
      showCloseButton: true,
      didOpen: () => {
        const container = Swal.getHtmlContainer();

        const closePopup = () => {
          setTimeout(() => Swal.close(), 150);
        };

        // Facebook
        ReactDOM.createRoot(container.querySelector("#facebook")).render(
          <FacebookShareButton url={shareUrl} onClick={closePopup}>
            <FacebookIcon size={48} round />
          </FacebookShareButton>
        );

        // Twitter
        ReactDOM.createRoot(container.querySelector("#twitter")).render(
          <TwitterShareButton url={shareUrl} onClick={closePopup}>
            <TwitterIcon size={48} round />
          </TwitterShareButton>
        );

        // WhatsApp
        ReactDOM.createRoot(container.querySelector("#whatsapp")).render(
          <WhatsappShareButton url={shareUrl} onClick={closePopup}>
            <WhatsappIcon size={48} round />
          </WhatsappShareButton>
        );
      },
    });
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 px-4 py-3 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 shadow-sm transition"
    >
      <FaShareAlt className="text-lg" />
      <span className="font-medium">Share</span>
    </button>
  );
};

export default ShareButton;
