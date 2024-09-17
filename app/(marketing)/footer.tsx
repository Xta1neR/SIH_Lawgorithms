import Link from "next/link";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className=" text-sky-600 py-6">
      <div className="container mx-auto px-4">

        <hr className="border-t border-gray-500 mb-6" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-center md:text-left mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Lawgorithms. All rights reserved.
          </p>

          <div className="flex justify-center space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-gray-400">
              <Image src="/facebook-icon.svg" alt="Facebook" width={24} height={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-gray-400">
              <Image src="/twitter-icon.svg" alt="Twitter" width={24} height={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-gray-400">
              <Image src="/instagram-icon.svg" alt="Instagram" width={24} height={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
