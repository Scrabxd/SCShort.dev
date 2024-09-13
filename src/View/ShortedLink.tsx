import { FC, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import QRCode from "react-qr-code";
import { PiCopyLight,PiXLight } from 'react-icons/pi';

interface QRCodeProps {
  shortLink: string;
}

export const ShortLink: FC<QRCodeProps> = ({ shortLink }) => {

  const [visible, setVisible] = useState(true);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const downloadQRCode = () => {
    if (svgRef.current) {
      const svgData = new XMLSerializer().serializeToString(svgRef.current);
      const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(svgBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "qrcode.svg";
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleCopy = async () => {
    if (inputRef.current) {
      try {
        toast.success('Copied to clipboard!', {
          id: 'clipboard',
          position: 'top-center'
        });
        const text = inputRef.current.value;
        await navigator.clipboard.writeText(text);
      } catch (err) {
        toast.error('Error copying to the clipboard');
      }
    }
  };

  const closeModal = () => {
    setVisible(false);
  };

  return (
    <>
      {visible ? (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 backdrop-blur-lg bg-black bg-opacity-10 z-40"></div>
          <div className="relative w-11/12 max-w-lg h-auto p-4 rounded-lg shadow-lg bg-[#0B101B] z-50 flex flex-col items-center">
            <Toaster position="top-center" />

            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white text-[32px] font-bold"
            >
              <PiXLight/>
            </button>

            <div className="flex flex-col items-center mb-4">
              <QRCode
                value={shortLink}
                size={256}
                renderAs="svg"
                ref={svgRef}
              />
              <button
                onClick={downloadQRCode}
                className="mt-4 px-4 py-2 bg-button text-white rounded-md font-inter-font-semibold"
              >
                Download QR
              </button>
            </div>

            <div className="relative w-full">
              <input
                ref={inputRef}
                type="text"
                value={`${import.meta.env.VITE_API_URL}/${shortLink}`}
                readOnly
                className="w-full border-2 border-border bg-secondary font-inter text-white p-2 rounded-lg pr-12"
              />
              <button
                onClick={handleCopy}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white px-4 py-2 rounded-md font-inter-font-semibold"
              >
                <PiCopyLight />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
