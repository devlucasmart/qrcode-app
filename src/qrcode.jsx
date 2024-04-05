import React, { useState } from 'react';
import axios from 'axios';

function QRCodeGenerator() {
  const [documentUrl, setDocumentUrl] = useState('');
  const [foregroundColor, setForegroundColor] = useState('#000000'); // Default black
  const [backgroundColor, setBackgroundColor] = useState('#ffffff'); // Default white
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'documentUrl') setDocumentUrl(value);
    if (name === 'foregroundColor') setForegroundColor(value);
    if (name === 'backgroundColor') setBackgroundColor(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/qrcode', {
        documentUrl: documentUrl,
        foregroundColor: foregroundColor,
        backgroundColor: backgroundColor
      }, { responseType: 'blob' });

      if (response.status === 200) {
        setQrCodeUrl(URL.createObjectURL(response.data));
        setError('');
      } else {
        setError('Failed to generate QR Code.');
      }
    } catch (error) {
      console.error('Error generating QR code:', error);
      setError('Failed to generate QR Code.');
    }
  };

  return (
    <div>
      <h2>Gerador de QRCode</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="documentUrl">Digite a URL: </label>
          <input
            type="text"
            className="form-control"
            id="documentUrl"
            name="documentUrl"
            value={documentUrl}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="foregroundColor">Foreground Color: </label>
          <input
            type="color"
            className="form-control"
            id="foregroundColor"
            name="foregroundColor"
            value={foregroundColor}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="backgroundColor">Background Color: </label>
          <input
            type="color"
            className="form-control"
            id="backgroundColor"
            name="backgroundColor"
            value={backgroundColor}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Gerar QRCode
        </button>
      </form>
      {qrCodeUrl && (
        <div className="mt-4">
          <h3>QR Code Gerado:</h3>
          <img src={qrCodeUrl} alt="QR Code" />
        </div>
      )}
      {error && <div className="alert alert-danger mt-4">{error}</div>}
    </div>
  );
}

export default QRCodeGenerator;