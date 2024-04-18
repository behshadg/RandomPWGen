// RandomPasswordGenerator.jsx
import React, { useState, useRef, useEffect } from 'react';
import { FaCopy, FaRedo } from 'react-icons/fa';
import { BsToggleOn, BsToggleOff } from 'react-icons/bs';

const RandomPasswordGenerator = () => {
  const [passwordLength, setPasswordLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(true);
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [strength, setStrength] = useState('');
  const [showStrength, setShowStrength] = useState(false);
  const passwordInputRef = useRef(null);

  const generatePassword = () => {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const specialChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    let charPool = '';
    if (includeUppercase) charPool += uppercaseChars;
    if (includeLowercase) charPool += lowercaseChars;
    if (includeNumbers) charPool += numberChars;
    if (includeSpecialChars) charPool += specialChars;

    let password = '';
    for (let i = 0; i < passwordLength; i++) {
      password += charPool[Math.floor(Math.random() * charPool.length)];
    }

    setGeneratedPassword(password);
    calculatePasswordStrength(password);
  };

  const copyToClipboard = () => {
    if (generatedPassword) {
      navigator.clipboard.writeText(generatedPassword);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (password.match(/[a-z]/)) strength += 1;
    if (password.match(/[A-Z]/)) strength += 1;
    if (password.match(/[0-9]/)) strength += 1;
    if (password.match(/[!@#$%^&*(),.?":{}|<>]/)) strength += 1;

    switch (strength) {
      case 0:
      case 1:
        setStrength('Weak');
        break;
      case 2:
      case 3:
        setStrength('Medium');
        break;
      case 4:
      case 5:
        setStrength('Strong');
        break;
      default:
        setStrength('');
    }
  };

  useEffect(() => {
    generatePassword();
  }, [
    passwordLength,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSpecialChars,
  ]);

  useEffect(() => {
    if (passwordInputRef.current) {
      passwordInputRef.current.focus();
    }
  }, [generatedPassword]);

  return (
    <div className="bg-[#0a192f] text-[#ccd6f6] p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Random Password Generator</h2>

      <div className="mb-4">
        <label htmlFor="password-length" className="block mb-2 text-sm">
          Password Length:
        </label>
        <input
          type="range"
          id="password-length"
          min="8"
          max="32"
          value={passwordLength}
          onChange={(e) => setPasswordLength(e.target.value)}
          className="w-full"
        />
        <p className="text-sm text-gray-400">{passwordLength} characters</p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Include:</h3>
        <div className="flex items-center mb-2">
          <button
            onClick={() => setIncludeUppercase(!includeUppercase)}
            className="mr-2 focus:outline-none"
          >
            {includeUppercase ? (
              <BsToggleOn className="text-[#64ffda]" />
            ) : (
              <BsToggleOff />
            )}
          </button>
          <label htmlFor="uppercase">Uppercase</label>
        </div>
        <div className="flex items-center mb-2">
          <button
            onClick={() => setIncludeLowercase(!includeLowercase)}
            className="mr-2 focus:outline-none"
          >
            {includeLowercase ? (
              <BsToggleOn className="text-[#64ffda]" />
            ) : (
              <BsToggleOff />
            )}
          </button>
          <label htmlFor="lowercase">Lowercase</label>
        </div>
        <div className="flex items-center mb-2">
          <button
            onClick={() => setIncludeNumbers(!includeNumbers)}
            className="mr-2 focus:outline-none"
          >
            {includeNumbers ? (
              <BsToggleOn className="text-[#64ffda]" />
            ) : (
              <BsToggleOff />
            )}
          </button>
          <label htmlFor="numbers">Numbers</label>
        </div>
        <div className="flex items-center">
          <button
            onClick={() => setIncludeSpecialChars(!includeSpecialChars)}
            className="mr-2 focus:outline-none"
          >
            {includeSpecialChars ? (
              <BsToggleOn className="text-[#64ffda]" />
            ) : (
              <BsToggleOff />
            )}
          </button>
          <label htmlFor="special-chars">Special Characters</label>
        </div>
      </div>

      <div className="flex items-center mb-4">
        <button
          onClick={generatePassword}
          className="bg-[#64ffda] text-[#0a192f] font-bold py-2 px-4 rounded hover:bg-[#4fc8b7] transition-colors duration-300 mr-4"
        >
          <FaRedo className="mr-2" />
          Generate New
        </button>
        <div
          className={`px-4 py-2 rounded-md ${
            strength === 'Weak'
              ? 'bg-red-500'
              : strength === 'Medium'
              ? 'bg-yellow-500'
              : 'bg-green-500'
          }`}
        >
          <p className="text-[#0a192f] font-bold">{strength}</p>
        </div>
        <button
          onClick={() => setShowStrength(!showStrength)}
          className="ml-4 focus:outline-none"
        >
          {showStrength ? (
            <FaRedo className="text-[#64ffda]" />
          ) : (
            <FaRedo className="text-gray-400" />
          )}
        </button>
      </div>

      <div className="mt-4">
        <p className="font-medium mb-2">Your password:</p>
        <div className="flex items-center">
          <input
            ref={passwordInputRef}
            type="text"
            value={generatedPassword}
            readOnly
            className="bg-[#1e2842] rounded-l-md px-4 py-2 flex-1"
          />
          <button
            onClick={copyToClipboard}
            className="bg-[#64ffda] text-[#0a192f] font-bold px-4 py-2 rounded-r-md hover:bg-[#4fc8b7] transition-colors duration-300"
          >
            <FaCopy />
          </button>
        </div>
        {isCopied && (
          <p className="text-sm text-green-500 mt-2">
            Password copied to clipboard!
          </p>
        )}
        {showStrength && (
          <p className="text-sm mt-2">
            Password Strength: <span className="font-bold">{strength}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default RandomPasswordGenerator;
