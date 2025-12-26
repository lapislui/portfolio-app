'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const navbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on client side to avoid SSR mismatch
    if (typeof window !== 'undefined') {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 10);
      };
    
      window.addEventListener('scroll', handleScroll);
      
      // Initial check
      handleScroll();
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);
  
  useEffect(() => {
    // Only run on client side to avoid SSR mismatch
    if (typeof window !== 'undefined') {
      const handleClickOutside = (event: MouseEvent) => {
        if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
          setOpenSubmenu(null);
        }
      };
    
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, []);

  // Set scrolled class based on state
  const scrolledClass = isScrolled 
    ? 'bg-black/90 backdrop-blur-md py-2 shadow-lg' 
    : 'bg-transparent py-4';

  const topNavItems = [
    { name: 'Home', href: '/' },
    { 
      name: 'Profile', 
      submenu: [
        { name: 'About', href: '#about' },
        { name: 'Education', href: '#education' },
        { name: 'Skills', href: '#skills' },
        { name: 'Certificates', href: '#certificates' },
        { name: 'GitHub', href: '#github' },
      ]
    },
    { 
      name: 'Work', 
      submenu: [
        { name: 'Experience', href: '#experience' },
        { name: 'Projects', href: '#projects' },
      ]
    },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolledClass}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div ref={navbarRef} className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-white">
          Keval Patel
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {topNavItems.map((item, index) => (
            <div key={item.name} className="relative group">
              {item.submenu ? (
                <>
                  <motion.a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors relative"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenSubmenu(openSubmenu === item.name ? null : item.name);
                    }}
                  >
                    {item.name}
                    <motion.div 
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-500"
                      initial={{ width: 0 }}
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                  {/* Submenu */}
                  <motion.div
                    className={`absolute left-0 mt-2 w-48 bg-gray-800/90 backdrop-blur-md rounded-lg shadow-lg py-2 z-50 ${openSubmenu === item.name ? 'opacity-100 block' : 'opacity-0 hidden'}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: openSubmenu === item.name ? 1 : 0, y: openSubmenu === item.name ? 0 : 20 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.submenu.map((subItem, subIndex) => (
                      <motion.a
                        key={subItem.name}
                        href={subItem.href}
                        className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {subItem.name}
                      </motion.a>
                    ))}
                  </motion.div>
                </>
              ) : (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-white transition-colors relative"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.name}
                  <motion.div 
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-500"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <motion.button 
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            ) : (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16" 
              />
            )}
          </svg>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          className="md:hidden bg-black/90 backdrop-blur-md"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {topNavItems.map((item) => (
              <div key={item.name}>
                {item.submenu ? (
                  <div>
                    <div 
                      className="text-gray-300 font-medium py-2 transition-colors relative flex justify-between items-center cursor-pointer"
                      onClick={() => setOpenSubmenu(openSubmenu === item.name ? null : item.name)}
                    >
                      <span>{item.name}</span>
                      <span className="ml-2">{openSubmenu === item.name ? '▲' : '▼'}</span>
                    </div>
                    <div className={`pl-4 flex flex-col space-y-2 overflow-hidden transition-all duration-300 ${openSubmenu === item.name ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                      {item.submenu.map((subItem) => (
                        <motion.a
                          key={subItem.name}
                          href={subItem.href}
                          className="text-gray-400 hover:text-white py-1 transition-colors relative"
                          onClick={() => {
                            setIsMenuOpen(false);
                            setOpenSubmenu(null);
                          }}
                          whileHover={{ x: 5 }}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {subItem.name}
                        </motion.a>
                      ))}
                    </div>
                  </div>
                ) : (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="text-gray-300 hover:text-white py-2 transition-colors relative"
                    onClick={() => setIsMenuOpen(false)}
                    whileHover={{ x: 5 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.name}
                    <motion.div 
                      className="absolute -bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                      initial={{ width: 0 }}
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;