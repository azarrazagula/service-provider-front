import React from "react";

const Footer = () => {
  return (
    <footer
      role="contentinfo"
      aria-label="Footer"
      className="sticky bottom-0 z-40 bg-slate-950 text-slate-300 pt-4 pb-4 border-t border-slate-800"
    >
      <div className="max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-16 relative z-10">
        <div className="w-full text-center">
          <p className="text-sm text-slate-300 font-medium">
            Copyright © 2026 Design By AzarIbrahim. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
