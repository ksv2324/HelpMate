import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../ui/button';
import { Upload, FileText, CheckCircle2, X, AlertCircle, ArrowLeft } from 'lucide-react';
import { UserRole, VerificationType } from '../../types';

interface VerificationScreenProps {
  role: UserRole;
  onComplete: (verificationType: VerificationType, documents: File[]) => void;
  onSkip: () => void;
  onBack: () => void;
}

interface DocumentRequirement {
  type: VerificationType;
  title: string;
  description: string;
  requiredDocs: string[];
}

const verificationRequirements: Record<UserRole, DocumentRequirement | null> = {
  volunteer: {
    type: 'driver',
    title: 'Driver License Verification',
    description: 'As a volunteer driver, we need to verify your driving license',
    requiredDocs: ['Valid Driver License (front)', 'Driver License (back)'],
  },
  receiver: {
    type: 'orphanage',
    title: 'Organization Verification',
    description: 'Please provide certificates for your organization',
    requiredDocs: [
      'Organization Registration Certificate',
      'Tax Exemption Certificate (if applicable)',
      'Identity Proof of Organization Head',
    ],
  },
  donor: null, // No verification needed for donors
};

export default function VerificationScreen({ role, onComplete, onSkip, onBack }: VerificationScreenProps) {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const requirement = verificationRequirements[role!];

  // If no verification needed for this role
  if (!requirement) {
    onComplete('none', []);
    return null;
  }

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const newFiles = Array.from(files).filter(file => {
      // Accept images and PDFs
      return file.type.startsWith('image/') || file.type === 'application/pdf';
    });

    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleContinue = () => {
    if (uploadedFiles.length > 0) {
      onComplete(requirement.type, uploadedFiles);
    }
  };

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Back Button */}
      <div className="px-6 pt-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back</span>
        </button>
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="px-6 pt-2 pb-4"
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{requirement.title}</h1>
        <p className="text-gray-600">{requirement.description}</p>
      </motion.div>

      {/* Content */}
      <div className="flex-1 px-6 pb-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Required Documents List */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">📋 Required Documents:</h3>
            <ul className="space-y-2">
              {requirement.requiredDocs.map((doc, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-start gap-2 text-sm text-gray-700"
                >
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>{doc}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Upload Area */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
              isDragging
                ? 'border-[#4c6ef5] bg-blue-50'
                : 'border-gray-300 hover:border-gray-400 bg-gray-50'
            }`}
          >
            <motion.div
              animate={{ y: isDragging ? -5 : 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Upload className={`w-12 h-12 mx-auto mb-3 ${isDragging ? 'text-[#4c6ef5]' : 'text-gray-400'}`} />
              <p className="text-gray-700 font-medium mb-1">
                {isDragging ? 'Drop files here' : 'Click to upload or drag and drop'}
              </p>
              <p className="text-sm text-gray-500">PNG, JPG, or PDF (max 10MB each)</p>
            </motion.div>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,application/pdf"
              onChange={(e) => handleFileSelect(e.target.files)}
              className="hidden"
            />
          </div>

          {/* Uploaded Files */}
          <AnimatePresence>
            {uploadedFiles.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-3"
              >
                <h3 className="text-sm font-semibold text-gray-900">Uploaded Documents:</h3>
                {uploadedFiles.map((file, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <FileText className="w-5 h-5 text-gray-600 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                      <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFile(index);
                      }}
                      className="p-1 hover:bg-red-100 rounded-full transition-colors"
                    >
                      <X className="w-4 h-4 text-red-600" />
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Info Box */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900 mb-1">Verification Process</p>
              <p className="text-xs text-gray-600">
                Your documents will be reviewed within 24-48 hours. You'll receive a notification once verified.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="px-6 pb-8 pt-4 space-y-3"
      >
        <Button
          onClick={handleContinue}
          disabled={uploadedFiles.length === 0}
          className="w-full bg-[#4c6ef5] hover:bg-[#4263eb] text-white h-14 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Submit Documents
        </Button>
        <button
          onClick={onSkip}
          className="w-full text-gray-600 hover:text-gray-900 py-3 text-center transition-colors"
        >
          Skip for now (Verify later)
        </button>
      </motion.div>
    </div>
  );
}
