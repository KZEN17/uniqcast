import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setCurrentSection } from '../store/slices/navigationSlice';
import { FiHome, FiSearch, FiBookmark, FiSettings } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';

const menuItems = [
  { name: 'home', icon: <FiHome size={20} /> },
  { name: 'search', icon: <FiSearch size={20} /> },
  { name: 'saved', icon: <FiBookmark size={20} /> }
];

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const currentSection = useSelector((state: RootState) => state.navigation.currentSection);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`fixed left-0 top-0 h-screen bg-gray-900 text-white p-2 flex flex-col items-center transition-all duration-500 
        ${isExpanded ? 'w-40 absolute z-50 shadow-xl' : 'w-16 z-40'}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="flex items-center w-full p-3">
        <FaUserCircle size={20} className="text-gray-400" />
        {isExpanded && <span className="ml-2 text-sm text-gray-300">Username</span>}
      </div>
      {/* Centered menu items */}
      <div className="flex-1 flex flex-col justify-center space-y-2">
        {menuItems.map((item) => (
          <div
            key={item.name}
            className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all duration-600 w-full ${currentSection === item.name ? 'bg-blue-600' : 'hover:bg-gray-800'
              }`}
            onClick={() => dispatch(setCurrentSection(item.name))}
          >
            {item.icon}
            {isExpanded && <span className="text-sm capitalize">{item.name}</span>}
          </div>
        ))}
      </div>

      {/* Bottom section */}
      <div className="flex flex-col space-y-2 pb-4 w-full">
        <div
          className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all duration-600 w-full ${currentSection === 'settings' ? 'bg-blue-600' : 'hover:bg-gray-800'
            }`}
          onClick={() => dispatch(setCurrentSection('settings'))}
        >
          <FiSettings size={20} />
          {isExpanded && <span className="text-sm capitalize">Settings</span>}
        </div>

      </div>
    </div>
  );
};

export default Sidebar;
