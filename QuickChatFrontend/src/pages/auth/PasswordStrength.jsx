import React, { useState, useEffect } from 'react';

const PasswordStrength = ({ password }) => {
  const [strength, setStrength] = useState('');
  const [strengthColor, setStrengthColor] = useState('');
  const [feedback, setFeedback] = useState([]);

  const evaluatePasswordStrength = (password) => {
    let score = 0;
    const requirements = [];

    if (password.length > 8) score++;
    else requirements.push('At least 8 characters');

    if (/[a-z]/.test(password)) score++;
    else requirements.push('At least one lowercase letter');

    if (/[A-Z]/.test(password)) score++;
    else requirements.push('At least one uppercase letter');

    if (/\d/.test(password)) score++;
    else requirements.push('At least one number');

    if (/[^A-Za-z0-9]/.test(password)) score++;
    else requirements.push('At least one special character');

    setFeedback(requirements);

    switch (score) {
      case 0:
      case 1:
      case 2:
        setStrength('Weak');
        setStrengthColor('text-red-600');
        break;
      case 3:
        setStrength('Medium');
        setStrengthColor('text-yellow-500');
        break;
      case 4:
      case 5:
        setStrength('Strong');
        setStrengthColor('text-green-600');
        break;
      default:
        setStrength('');
    }
  };

  useEffect(() => {
    if (password) {
      evaluatePasswordStrength(password);
    } else {
      setStrength('');
      setFeedback([]);
    }
  }, [password]);

  return (
    <div className='mt-2'>
      {strength && (
        <p className={`text-sm font-medium ${strengthColor}`}>
          Password strength: {strength}
        </p>
      )}
      {feedback.length > 0 && (
        <ul className='text-sm text-red-600 mt-2 list-disc list-inside'>
          {feedback.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PasswordStrength;
