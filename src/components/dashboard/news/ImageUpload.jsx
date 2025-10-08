import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import clsx from 'clsx';
import Button from '../../ui/Button';
import Card from '../../ui/Card';
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';

const ImageUpload = ({ label = 'Feature image', value, onChange }) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      onChange?.({ url: reader.result, file });
    };
    reader.readAsDataURL(file);
  }, [onChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: {
      'image/*': []
    },
    maxFiles: 1
  });

  const clearImage = () => {
    onChange?.(null);
  };

  return (
    <Card className="p-5 space-y-4">
      <div className="space-y-1">
        <label className="text-sm font-medium text-gov-gray-900">{label}</label>
        <p className="text-xs text-gov-gray-500">
          Recommended size: 1200x630px. Supported formats: JPG, PNG (max 5 MB).
        </p>
      </div>

      <div
        {...getRootProps()}
        className={clsx(
          'relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 text-center transition-colors cursor-pointer',
          value ? 'border-transparent bg-gov-gray-900/80 text-white' : 'border-gov-gray-300 hover:border-gov-blue-400 hover:bg-gov-blue-50/30'
        )}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <input {...getInputProps()} />
        {value ? (
          <div className="relative w-full">
            <img
              src={typeof value === 'string' ? value : value.url}
              alt="Uploaded preview"
              className="h-56 w-full rounded-lg object-cover"
            />
            <div
              className={clsx(
                'absolute inset-0 flex items-center justify-center rounded-lg bg-black/40 transition-opacity',
                isHovering ? 'opacity-100' : 'opacity-0'
              )}
            >
              <p className="text-sm font-medium text-white">Drop a new image to replace</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <PhotoIcon className="mx-auto h-12 w-12 text-gov-blue-500" />
            <div className="space-y-1">
              <p className="text-sm font-semibold text-gov-gray-900">
                {isDragActive ? 'Drop the image here' : 'Drag & drop an image, or click to browse'}
              </p>
              <p className="text-xs text-gov-gray-500">
                The cover image appears on cards and social previews.
              </p>
            </div>
          </div>
        )}
      </div>

      {value && (
        <div className="flex justify-between items-center bg-gov-gray-50 rounded-lg px-4 py-3">
          <div>
            <p className="text-sm font-medium text-gov-gray-900">Current image</p>
            <p className="text-xs text-gov-gray-500">Click or drop a new file to replace</p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={clearImage}
            className="inline-flex items-center gap-1 text-red-600 hover:text-red-700"
          >
            <XMarkIcon className="h-4 w-4" />
            Remove
          </Button>
        </div>
      )}
    </Card>
  );
};

export default ImageUpload;
