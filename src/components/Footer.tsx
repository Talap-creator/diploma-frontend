import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p className="text-lg font-semibold">Techno Market</p>
          <p className="text-sm">Астана </p>
          <p className="text-sm">Email: info@example.com</p>
          <p className="text-sm">Номер телефона: +7 (495) 780-20-02</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
