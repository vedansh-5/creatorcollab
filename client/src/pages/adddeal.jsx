import React, { useState } from "react";

const AddDeal = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
    timeline: "",
    requirements: "",
    targetAudience: "",
    platform: "",
    contentType: "",
    files: []
  });

  const totalSteps = 5;

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const removeFile = (index) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <>
            <h1 className="text-2xl font-bold leading-snug mb-2">
              Enter a short and appealing title for your{" "}
              <span className="text-rose-500">deal</span>.
            </h1>
            <p className="text-gray-600 mb-6">
              We'll guide you to create the perfect brief.
            </p>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Join us for a summer campaign."
              className="w-full p-4 bg-gray-200 border-none rounded mb-6 font-semibold"
            />
          </>
        );
      case 2:
        return (
          <>
            <h1 className="text-2xl font-bold leading-snug mb-2">
                Details about the <span className="">deal</span> and expectations.
            </h1>
            <p className="text-gray-600 mb-6">
              Help creators understand what you're looking for.
            </p>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Tell us about your campaign goals..."
              className="w-full p-4 bg-gray-200 border-none rounded mb-3 font-semibold h-16"
            />
            <input
              type="text"
              value={formData.targetAudience}
              onChange={(e) => handleChange('targetAudience', e.target.value)}
              placeholder="Target Audience (e.g., Age 18-24, Interest in Fashion)"
              className="w-full p-4 bg-gray-200 border-none rounded mb-4 font-semibold"
            />
            <select
              value={formData.platform}
              onChange={(e) => handleChange('platform', e.target.value)}
              className="w-full p-4 bg-gray-200 border-none rounded mb-4 font-semibold"
            >
              <option value="">Select Platform</option>
              <option value="instagram">Instagram</option>
              <option value="youtube">YouTube</option>
              <option value="tiktok">TikTok</option>
              <option value="twitter">Twitter</option>
            </select>
            <select
              value={formData.contentType}
              onChange={(e) => handleChange('contentType', e.target.value)}
              className="w-full p-4 bg-gray-200 border-none rounded mb-2 font-semibold"
            >
              <option value="">Select Content Type</option>
              <option value="photo">Photo</option>
              <option value="video">Video</option>
              <option value="story">Story</option>
              <option value="reel">Reel</option>
            </select>
          </>
        );
      case 3:
        return (
          <>
            <h1 className="text-2xl font-bold leading-snug mb-2">
              Set your budget and timeline
            </h1>
            <p className="text-gray-600 mb-6">
              Define your campaign budget and duration
            </p>
            <input
              type="number"
              value={formData.budget}
              onChange={(e) => handleChange('budget', e.target.value)}
              placeholder="Budget (in ₹)"
              className="w-full p-4 bg-gray-200 border-none rounded mb-4 font-semibold"
            />
            <input
              type="text"
              value={formData.timeline}
              onChange={(e) => handleChange('timeline', e.target.value)}
              placeholder="Campaign Duration"
              className="w-full p-4 bg-gray-200 border-none rounded mb-6 font-semibold"
            />
            <textarea
              value={formData.requirements}
              onChange={(e) => handleChange('requirements', e.target.value)}
              placeholder="Additional Requirements or Notes..."
              className="w-full p-4 bg-gray-200 border-none rounded mb-6 font-semibold h-32"
            />
          </>
        );
        case 4:
        return (
          <>
            <h1 className="text-2xl font-bold leading-snug mb-2">
              What else the <span className="text-rose-500">creator</span> need to know?
            </h1>
            <p className="text-gray-600 mb-6">
              Include any other important information the influencer needs to know
            </p>
            <textarea
              value={formData.creator_info}
              onChange={(e) => handleChange('creator_info', e.target.value)}
              placeholder="All content must be reviewed and approved before posting. Deadline for submission: March 1, 2025."
              className="w-full p-4 bg-gray-200 border-none rounded mb-6 font-semibold h-32"
            />
          </>
        );
        case 5:
        return (
          <>
            <h1 className="text-2xl font-bold leading-snug mb-2">
              Add <span className="text-blue-500">resources</span> for your deal
            </h1>
            <p className="text-gray-600 mb-4">
              Upload any reference images, brand guidelines, or other relevant files
            </p>
            
            {/* File Upload Area */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 mb-4 text-center hover:border-blue-400 transition-colors">
              <input
                type="file"
                multiple
                onChange={(e) => handleChange('files', Array.from(e.target.files))}
                className="hidden"
                id="file-upload"
              />
              <label 
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center space-y-2"
              >
                <svg 
                  className="w-10 h-10 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <span className="text-gray-600">
                  Click to upload or drag and drop files here
                </span>
                <span className="text-gray-400 text-sm">
                  Supported formats: PNG, JPG, PDF, DOC
                </span>
              </label>
            </div>

            {/* File List */}
            {formData.files.length > 0 && (
              <div className="space-y-2">
                <p className="font-semibold text-gray-700">
                  Selected Files ({formData.files.length}):
                </p>
                <div className="max-h-32 overflow-y-auto">
                  {formData.files.map((file, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between bg-gray-50 p-2 rounded"
                    >
                      <span className="text-sm text-gray-600">{file.name}</span>
                      <button
                        onClick={() => removeFile(index)}
                        className="text-red-400 hover:text-red-600"
                      >
                        <svg 
                          className="w-5 h-5" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        );
      default:
        return null;
    }
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Create FormData for file upload
      const submitData = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'files') {
          formData[key].forEach(file => {
            submitData.append('files', file);
          });
        } else {
          submitData.append(key, formData[key]);
        }
      });

      // Handle form submission with files
      console.log('Form submitted with files:', submitData);
      // Add your API call here
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const getStepColor = (currentStep) => {
    switch(currentStep) {
      case 1: return 'bg-rose-400';
      case 2: return 'bg-purple-400';
      case 3: return 'bg-amber-400';
      case 4: return 'bg-rose-400';
      case 5: return 'bg-blue-400';
      default: return 'bg-gray-200';
    }
  }

  return (
    <div className="flex w-full h-[calc(85vh-4rem)]">
      <div className="flex w-full overflow-hidden">
        <div className="flex-1 flex flex-col h-full">
          {/* Fixed header - Reduced padding */}
          <div className="shrink-0 p-4">
            <div className="flex items-center mb-4">
              <div className="w-6 h-6 bg-rose-300 rounded-sm mr-2" />
              <span className="text-lg font-semibold">Influencer ready</span>
            </div>

            {/* Progress Indicator - Reduced margin */}
            <div className="flex mb-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <div
                  key={item}
                  className={`h-1 flex-1 ${
                    item <= step ? getStepColor(step) : 'bg-gray-200'
                  } ${item !== 5 ? 'mr-2' : ''}`}
                />
              ))}
            </div>
          </div>

          {/* Scrollable Content - Adjusted padding */}
          <div className="flex-1 overflow-y-auto px-6 min-h-0">
            {renderStep()}
          </div>

          {/* Fixed Footer - Reduced padding */}
          <div className="shrink-0 p-4 bg-white">
            <div className="flex gap-4 mb-2">
              {step > 1 && (
                <button
                  onClick={handleBack}
                  className="bg-gray-300 text-gray-700 font-semibold px-6 py-2 rounded hover:bg-gray-400 transition"
                >
                  Back
                </button>
              )}
              <button
                onClick={handleNext}
                className={`text-white font-semibold px-6 py-2 rounded hover:opacity-90 transition ${getStepColor(step)}`}
              >
                {step === totalSteps ? 'Submit' : 'Next'}
              </button>
            </div>

            <div className="text-[8px] text-gray-700 mt-2">
              <p>Influencer ready connects over 78 million professionals globally.
              From ₹100 tasks to ₹100 million deals, we've got you covered.
              Connect with creators in seconds. <br />
              Pay creators in 2 steps, once they make the post, and when it reaches the desired number</p>
            </div>
          </div>
        </div>

        <div className={`hidden lg:block w-1/3 ${getStepColor(step)}`} />
      </div>
    </div>
  );
};

export default AddDeal;