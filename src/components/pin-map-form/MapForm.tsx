import React, { useState } from 'react';
import ChooseLocationButton from './ChooseLocationButton';
import './Styles.scss';

const MapForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    isRecurrent: false,
    isActive: false,
    isPaid: false,
    numberOfPeople: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type} = e.target;
    
    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value === '1', // Convert slider value '1' to boolean
    }));
  };

  const handleConfirmClick = () => {
    // Perform any action with the captured data (e.g., store in state)
    console.log('Form Data:', formData);
    // Reset form data if needed
    setFormData({
      name: '',
      description: '',
      isRecurrent: false,
      isActive: false,
      isPaid: false,
      numberOfPeople: 0,
    });
  };

  return (
    <div className="map-form">
      <div className="map-form-inner">
        <div className='map-form-1'>
        <label className='name-field'>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            maxLength={100}
            onChange={handleInputChange}
            className='name-label-input'
          />
        </label>
        
        <label className='isrecurrent-field'>
          Recurrent:
          <input
            type="checkbox"
            name="isRecurrent"
            checked={formData.isRecurrent}
            onChange={handleInputChange}
          />
        </label>
        <label className='isactive'>
          Active:
          <input
            type="range"
            min="0"
            max="1"
            step="1"
            name="isActive"
            value={formData.isActive ? '1' : '0'}
            onChange={handleSliderChange}
          />
          {formData.isActive ? 'Yes' : 'No'}
        </label>
        <label className='ispaid'>
          Is Paid:
          <input
            type="checkbox"
            name="isPaid"
            checked={formData.isPaid}
            onChange={handleInputChange}
          />
        </label>
        <label className='numberofpeople'>
          Number of People:
          <input
            type="number"
            name="numberOfPeople"
            value={formData.numberOfPeople}
            onChange={handleInputChange}
          />
        </label>
        </div>
        <div className='map-form-2'>  
        <label className='description-field'>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className='description-textarea'
          />
        </label>
        <ChooseLocationButton/>
        </div>
      </div>
      <button onClick={handleConfirmClick} className="confirm-button">
        Confirm
      </button>
    </div>
    
  );
};

export default MapForm;