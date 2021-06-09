import React from "react";

const Footer = (props) => {
  return (
    <>
      <footer className="footer bg-gray-50 relative pt-1 border-b-2 border-red-500">
        <div className="px-6 divide-y-2 divide-gray-150">
          <div className="flex my-4 flex-wrap justify-center text-sm font-medium text-gray-500 ">
            <div className="mx-2 hover:text-gray-900 transition cursor-pointer">
              <div>
                <span>TENTANG KAMI</span>
              </div>
            </div>
            <div className="mx-2 hover:text-gray-900 transition cursor-pointer">
              <div>
                <span>HUBUNGI KAMI</span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap justify-center">
            <p className="my-4 text-sm font-medium text-gray-500">© 2021 Josafat</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
