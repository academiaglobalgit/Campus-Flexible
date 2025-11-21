import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, IconButton, Avatar, Alert } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DeleteIcon from '@mui/icons-material/Delete';

type PreviewFile = {
  file: File;
  preview?: string;
};

type DropzoneUploaderProps = {
  files: PreviewFile[];
  onFilesChange: (files: PreviewFile[]) => void;
  maxFiles?: number;
  maxFileSizeMb?: number;
  canUpload?: boolean;
};

const getFileTypeIcon = (fileType: string) => {
  if (fileType.startsWith('image/')) return null;
  return <InsertDriveFileIcon fontSize="large" />;
};

export const FileUploader: React.FC<DropzoneUploaderProps> = ({
  files,
  onFilesChange,
  maxFiles = 3,
  maxFileSizeMb = 3,
  canUpload = true,
}) => {
  const [errorMessage, setErrorMessage] = useState('');

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (!canUpload) return;
      setErrorMessage('');

      const validFiles = acceptedFiles.filter((file) => {
        if (file.size > maxFileSizeMb * 1024 * 1024) {
          setErrorMessage(`El archivo "${file.name}" supera el límite de ${maxFileSizeMb} MB.`);
          return false;
        }
        return true;
      });

      const newFiles: PreviewFile[] = validFiles.map((file) => ({
        file,
        preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
      }));

      const combined = [...files, ...newFiles].slice(0, maxFiles);
      onFilesChange(combined);
    },
    [files, maxFiles, maxFileSizeMb, onFilesChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles,
    multiple: true,
    accept: {
      'application/pdf': [],
      'application/msword': [],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [],
    },
  });

  useEffect(() => {
    return () => {
      files.forEach((file) => {
        if (file.preview) URL.revokeObjectURL(file.preview);
      });
    };
  }, [files]);

  const removeFile = (index: number) => {
    const updated = [...files];
    if (updated[index].preview) {
      URL.revokeObjectURL(updated[index].preview!);
    }
    updated.splice(index, 1);
    onFilesChange(updated);
  };

  return (
    <Box sx={{ border: '2px dashed #ccc', p: 2, borderRadius: 2 }}>
      {
        canUpload &&
        <Box
          {...getRootProps()}
          sx={{
            cursor: 'pointer',
            textAlign: 'center',
            py: 3,
            bgcolor: '#f9f9f9',
            borderRadius: 2,
          }}
        >
          <input {...getInputProps()} />
          <Typography variant="body1">
            {isDragActive
              ? 'Suelta los archivos aquí'
              : `Arrastra archivos o haz clic (máx. ${maxFiles}, máx. ${maxFileSizeMb}MB c/u)`}
          </Typography>
        </Box>
      }


      {errorMessage && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {errorMessage}
        </Alert>
      )}

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
        {files.map((file, index) => (
          <Box
            key={index}
            sx={{
              width: 140,
              border: '1px solid #ddd',
              borderRadius: 2,
              overflow: 'hidden',
              position: 'relative',
              p: 1,
              bgcolor: '#fff',
            }}
          >
            <Box sx={{ mb: 1, display: 'flex', justifyContent: 'center' }}>
              {file.preview ? (
                <Avatar
                  variant="rounded"
                  src={file.preview}
                  alt={file.file.name}
                  sx={{ width: 100, height: 100, objectFit: 'cover' }}
                />
              ) : (
                getFileTypeIcon(file.file.type)
              )}
            </Box>
            <Typography
              variant="body2"
              sx={{ textAlign: 'center', wordBreak: 'break-word', fontSize: '0.75rem' }}
            >
              {file.file.name}
            </Typography>
            {
              canUpload &&
              <IconButton
                size="small"
                onClick={() => removeFile(index)}
                sx={{
                  position: 'absolute',
                  top: 4,
                  right: 4,
                  background: 'rgba(0,0,0,0.6)',
                  color: '#fff',
                  '&:hover': { background: 'rgba(0,0,0,0.8)' },
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            }
          </Box>
        ))}
      </Box>
    </Box>
  );
};
