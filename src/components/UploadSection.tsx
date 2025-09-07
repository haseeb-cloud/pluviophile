import React, { useState, useCallback } from 'react';
import { Upload, FileImage, File, X, CheckCircle } from 'lucide-react';
import { useAlerts } from '../context/AlertContext';

interface UploadSectionProps {
  uploadedFiles: File[];
  setUploadedFiles: (files: File[]) => void;
}

const UploadSection: React.FC<UploadSectionProps> = ({ uploadedFiles, setUploadedFiles }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { addAlert } = useAlerts();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  }, []);

  const handleFiles = async (files: File[]) => {
    const validFiles = files.filter(file => {
      const validTypes = ['image/jpeg', 'image/png', 'image/tiff', 'application/octet-stream'];
      const validExtensions = ['.dem', '.tif', '.tiff', '.jpg', '.jpeg', '.png'];
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      
      return validTypes.includes(file.type) || validExtensions.includes(fileExtension);
    });

    if (validFiles.length !== files.length) {
      addAlert({
        message: 'Some files were skipped. Only DEM and image files are supported.',
        type: 'warning',
        location: 'Upload Section',
        riskLevel: 'low'
      });
    }

    if (validFiles.length > 0) {
      setUploadedFiles([...uploadedFiles, ...validFiles]);
      
      // Simulate processing
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        addAlert({
          message: `Successfully processed ${validFiles.length} file(s)`,
          type: 'info',
          location: 'Upload Section',
          riskLevel: 'low'
        });
      }, 2000);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(newFiles);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <FileImage className="file-icon" />;
    }
    return <File className="file-icon" />;
  };

  return (
    <div>
      <h1 className="section-title">Upload Data</h1>
      
      <div
        className={`upload-area ${isDragOver ? 'dragover' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-input')?.click()}
      >
        <Upload className="upload-icon" />
        <div className="upload-text">
          <p>Drag and drop DEM files or drone images here</p>
          <p>or click to browse files</p>
        </div>
        <button className="upload-button" type="button">
          Choose Files
        </button>
        <input
          id="file-input"
          type="file"
          multiple
          accept=".dem,.tif,.tiff,.jpg,.jpeg,.png"
          onChange={handleFileInput}
          style={{ display: 'none' }}
        />
      </div>

      {isProcessing && (
        <div style={{ textAlign: 'center', margin: '2rem 0' }}>
          <div className="loading-spinner" style={{ marginRight: '0.5rem' }}></div>
          Processing files...
        </div>
      )}

      {uploadedFiles.length > 0 && (
        <div className="file-list">
          <h3 style={{ marginBottom: '1rem', color: '#2c3e50' }}>Uploaded Files</h3>
          {uploadedFiles.map((file, index) => (
            <div key={index} className="file-item">
              {getFileIcon(file)}
              <div className="file-info">
                <div className="file-name">{file.name}</div>
                <div className="file-size">{formatFileSize(file.size)}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle size={16} style={{ color: '#2ed573' }} />
                <button
                  onClick={() => removeFile(index)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#ff4757',
                    padding: '0.25rem'
                  }}
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="chart-card" style={{ marginTop: '2rem' }}>
        <h3 className="chart-title">Supported File Types</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
            <h4 style={{ marginBottom: '0.5rem', color: '#2c3e50' }}>Digital Elevation Models</h4>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>.dem, .tif, .tiff files</p>
          </div>
          <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
            <h4 style={{ marginBottom: '0.5rem', color: '#2c3e50' }}>Drone Images</h4>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>.jpg, .jpeg, .png files</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadSection;
