import { useState, useRef, useEffect } from 'react'
import { Globe, Check } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'

const LanguageDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const { language, changeLanguage, languages, getCurrentLanguage } = useLanguage()
  const { isDarkMode } = useTheme()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLanguageChange = (code) => {
    changeLanguage(code)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-dark-700 text-gray-400' : 'hover:bg-gray-200 text-gray-600'}`}
        title="Language"
      >
        <Globe size={20} />
      </button>

      {isOpen && (
        <div className={`absolute right-0 top-full mt-2 w-48 rounded-xl shadow-lg border z-50 overflow-hidden ${
          isDarkMode ? 'bg-dark-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="max-h-80 overflow-y-auto">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-left transition-colors ${
                  language === lang.code
                    ? isDarkMode ? 'bg-dark-700 text-white' : 'bg-gray-100 text-gray-900'
                    : isDarkMode ? 'text-gray-300 hover:bg-dark-700' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="text-lg">{lang.flag}</span>
                  <span className="text-sm">{lang.name}</span>
                </span>
                {language === lang.code && (
                  <Check size={16} className="text-accent-green" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default LanguageDropdown
