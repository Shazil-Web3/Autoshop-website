"use client";
import { useState } from 'react';
import { 
  BriefcaseIcon, 
  MapPinIcon, 
  ClockIcon, 
  CurrencyDollarIcon,
  CheckCircleIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

const CareerPage = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  const jobs = [
    {
      id: 1,
      title: "Sales Representative",
      department: "Sales",
      location: "Manama, Bahrain",
      type: "Full-time",
      salary: "$2,500 - $3,500",
      experience: "2-5 years",
      description: "We are looking for an experienced Sales Representative to join our team. The ideal candidate will have a strong background in automotive sales and excellent customer service skills.",
      requirements: [
        "Bachelor's degree in Business or related field",
        "Minimum 2 years of sales experience",
        "Excellent communication and negotiation skills",
        "Knowledge of automotive industry preferred",
        "Valid driver's license"
      ],
      responsibilities: [
        "Develop and maintain relationships with customers",
        "Present and demonstrate vehicles to potential buyers",
        "Negotiate sales prices and terms",
        "Follow up with customers after sales",
        "Meet monthly sales targets"
      ]
    },
    {
      id: 2,
      title: "Mechanical Engineer",
      department: "Engineering",
      location: "Manama, Bahrain",
      type: "Full-time",
      salary: "$3,500 - $4,500",
      experience: "3-7 years",
      description: "Join our engineering team to work on vehicle inspection, quality control, and technical specifications. This role requires strong analytical skills and automotive expertise.",
      requirements: [
        "Bachelor's degree in Mechanical Engineering",
        "Minimum 3 years of automotive engineering experience",
        "Knowledge of vehicle systems and diagnostics",
        "Experience with CAD software",
        "Strong problem-solving skills"
      ],
      responsibilities: [
        "Conduct vehicle inspections and assessments",
        "Develop technical specifications",
        "Quality control and testing",
        "Provide technical support to sales team",
        "Maintain engineering documentation"
      ]
    },
    {
      id: 3,
      title: "Marketing Specialist",
      department: "Marketing",
      location: "Manama, Bahrain",
      type: "Full-time",
      salary: "$2,800 - $3,800",
      experience: "2-4 years",
      description: "Help us grow our brand presence and reach new customers through innovative marketing strategies and digital campaigns.",
      requirements: [
        "Bachelor's degree in Marketing or related field",
        "Minimum 2 years of marketing experience",
        "Experience with digital marketing tools",
        "Strong creative and analytical skills",
        "Knowledge of social media platforms"
      ],
      responsibilities: [
        "Develop and execute marketing campaigns",
        "Manage social media presence",
        "Create content for various platforms",
        "Analyze marketing performance",
        "Coordinate with external agencies"
      ]
    },
    {
      id: 4,
      title: "Customer Service Representative",
      department: "Customer Service",
      location: "Manama, Bahrain",
      type: "Full-time",
      salary: "$1,800 - $2,500",
      experience: "1-3 years",
      description: "Provide exceptional customer service and support to our clients throughout their buying journey.",
      requirements: [
        "High school diploma or equivalent",
        "Minimum 1 year of customer service experience",
        "Excellent communication skills",
        "Proficiency in English and Arabic",
        "Patient and empathetic attitude"
      ],
      responsibilities: [
        "Handle customer inquiries and complaints",
        "Provide product information",
        "Process orders and track shipments",
        "Maintain customer records",
        "Escalate complex issues to management"
      ]
    }
  ];

  const handleApply = (job) => {
    setSelectedJob(job);
    setShowApplicationForm(true);
  };

  const handleApplicationSubmit = (e) => {
    e.preventDefault();
    // Handle application submission
    alert('Application submitted successfully! We will contact you soon.');
    setShowApplicationForm(false);
    setSelectedJob(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Join Our Team</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Be part of a dynamic team that's revolutionizing the automotive industry. 
              We offer competitive salaries, growth opportunities, and a supportive work environment.
            </p>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Work With Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircleIcon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Competitive Benefits</h3>
              <p className="text-blue-100">Health insurance, paid time off, and performance bonuses</p>
            </div>
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <PlusIcon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Career Growth</h3>
              <p className="text-blue-100">Continuous learning opportunities and advancement paths</p>
            </div>
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <BriefcaseIcon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Dynamic Environment</h3>
              <p className="text-blue-100">Work with cutting-edge technology and innovative solutions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Open Positions</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
                  <p className="text-blue-600 font-medium">{job.department}</p>
                </div>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  {job.type}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center text-gray-600">
                  <MapPinIcon className="h-4 w-4 mr-2" />
                  <span className="text-sm">{job.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <ClockIcon className="h-4 w-4 mr-2" />
                  <span className="text-sm">{job.experience}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <CurrencyDollarIcon className="h-4 w-4 mr-2" />
                  <span className="text-sm">{job.salary}</span>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4 line-clamp-3">{job.description}</p>
              
              <button
                onClick={() => handleApply(job)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>

        {/* No Open Positions Message */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Don't see a position that matches your skills?</p>
          <button
            onClick={() => setShowApplicationForm(true)}
            className="bg-gray-800 text-white py-3 px-6 rounded-md hover:bg-gray-900 transition-colors font-medium"
          >
            Send General Application
          </button>
        </div>
      </div>

      {/* Application Form Modal */}
      {showApplicationForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedJob ? `Apply for ${selectedJob.title}` : 'General Application'}
                </h2>
                <button
                  onClick={() => {
                    setShowApplicationForm(false);
                    setSelectedJob(null);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <form onSubmit={handleApplicationSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                
                {selectedJob && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Position Applied For
                    </label>
                    <input
                      type="text"
                      value={selectedJob.title}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                    />
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Resume/CV
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <textarea
                  placeholder="Cover Letter (Optional)"
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
                
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
                  >
                    Submit Application
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowApplicationForm(false);
                      setSelectedJob(null);
                    }}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerPage; 