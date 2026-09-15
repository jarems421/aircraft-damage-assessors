"use client";

/**
 * =============================================================================
 * SIMULATED / NON-PRODUCTION INTAKE FORM (CLIENT-REVIEW PREVIEW BUILD)
 * =============================================================================
 * NOTICE: This form is currently FRONTEND-ONLY and operates in a SIMULATED state.
 * Submissions are NOT transmitted to any backend API, database, or external email
 * service (e.g., Resend, AWS SES, SendGrid, Postmark).
 * 
 * File attachments and form submission states are handled in client memory for
 * visual QA and client demonstration purposes only.
 * 
 * When backend integration is ready:
 * 1. Implement a Next.js App Router Route Handler (e.g., `src/app/api/assessment/route.ts`).
 * 2. Connect server-side input validation (e.g., Zod) and rate limiting.
 * 3. Store file attachments securely in GCS/S3 using presigned URLs.
 * 4. Dispatch transactional notification emails to the designated assessor inbox.
 * =============================================================================
 */

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ContactFormData } from "@/types";
import {
  Send,
  UploadCloud,
  CheckCircle2,
  FileText,
  X,
  AlertCircle,
} from "lucide-react";

export function AssessmentRequestForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: "",
    companyName: "",
    email: "",
    telephone: "",
    serviceRequired: "damage-assessment",
    aircraftType: "",
    aircraftRegistration: "",
    aircraftLocation: "",
    incidentDate: "",
    incidentDescription: "",
    insurerOrBroker: "",
    claimReference: "",
    additionalInformation: "",
  });

  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      setFiles((prev) => [...prev, ...droppedFiles]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...selectedFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    // Basic frontend validation
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.telephone ||
      !formData.aircraftType ||
      !formData.aircraftRegistration ||
      !formData.incidentDescription
    ) {
      setErrorMessage("Please complete all required fields marked with an asterisk (*).");
      setIsSubmitting(false);
      return;
    }

    /**
     * =========================================================================
     * SIMULATED / NON-PRODUCTION SUBMISSION HANDLER
     * =========================================================================
     * This handler is strictly SIMULATED and NON-PRODUCTION for client preview.
     * No data or files are sent over the network.
     * 
     * To activate for production:
     * 1. Connect a POST endpoint (e.g. Next.js Route Handler /api/assessment).
     * 2. Send payload to email transport (Resend, Postmark, AWS SES, etc.).
     * 3. Upload files to secure cloud object storage (S3/GCS) with presigned URLs.
     * =========================================================================
     */
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  if (isSubmitted) {
    return (
      <div className="bg-white border-2 border-blue-600 p-8 sm:p-12 text-slate-900 shadow-md">
        <div className="max-w-xl mx-auto text-center space-y-5">
          <div className="w-12 h-12 bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-7 h-7" />
          </div>

          <Badge variant="primary" mono>
            SUBMISSION RECORDED — SIMULATED PREVIEW
          </Badge>

          <h3 className="text-2xl font-bold font-sans">
            Assessment Request Received
          </h3>

          <p className="text-sm text-slate-600 leading-relaxed font-sans">
            Thank you, <strong className="text-slate-900">{formData.fullName}</strong>. Your assessment intake request for aircraft registration <strong className="text-slate-900">{formData.aircraftRegistration}</strong> has been logged in this preview environment.
          </p>

          <div className="p-4 bg-slate-50 border border-slate-200 text-left font-mono text-xs text-slate-700 space-y-1.5">
            <div><span className="text-slate-400">ORGANISATION:</span> {formData.companyName || "N/A"}</div>
            <div><span className="text-slate-400">AIRCRAFT:</span> {formData.aircraftType} ({formData.aircraftRegistration})</div>
            <div><span className="text-slate-400">LOCATION:</span> {formData.aircraftLocation}</div>
            <div><span className="text-slate-400">ATTACHMENTS:</span> {files.length} file(s) attached</div>
          </div>

          <div className="pt-4">
            <Button
              variant="outline"
              size="md"
              onClick={() => {
                setIsSubmitted(false);
                setFiles([]);
              }}
            >
              Submit Another Request
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8 font-sans">
      {errorMessage && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-sm flex items-center gap-2">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* SECTION 1: CONTACT & ORGANISATION */}
      <div>
        <div className="border-b border-slate-200 pb-2 mb-4 flex items-center justify-between">
          <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-900">
            01. Contact & Organisation
          </h3>
          <span className="text-[11px] font-mono text-slate-400">* Required</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="fullName" className="block text-xs font-semibold text-slate-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full px-3.5 py-2.5 text-sm border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="e.g. Captain David Vance"
            />
          </div>

          <div>
            <label htmlFor="companyName" className="block text-xs font-semibold text-slate-700 mb-1">
              Company / Organisation *
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              required
              value={formData.companyName}
              onChange={handleInputChange}
              className="w-full px-3.5 py-2.5 text-sm border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="e.g. Global Aviation Insurance Ltd / Owner"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-slate-700 mb-1">
              Business Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3.5 py-2.5 text-sm border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="name@organisation.com"
            />
          </div>

          <div>
            <label htmlFor="telephone" className="block text-xs font-semibold text-slate-700 mb-1">
              Telephone Number *
            </label>
            <input
              type="tel"
              id="telephone"
              name="telephone"
              required
              value={formData.telephone}
              onChange={handleInputChange}
              className="w-full px-3.5 py-2.5 text-sm border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="+44 (0) ... / International format"
            />
          </div>
        </div>
      </div>

      {/* SECTION 2: SERVICE & AIRCRAFT PARTICULARS */}
      <div>
        <div className="border-b border-slate-200 pb-2 mb-4">
          <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-900">
            02. Service Selection & Aircraft Particulars
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label htmlFor="serviceRequired" className="block text-xs font-semibold text-slate-700 mb-1">
              Service Required *
            </label>
            <select
              id="serviceRequired"
              name="serviceRequired"
              value={formData.serviceRequired}
              onChange={handleInputChange}
              className="w-full px-3.5 py-2.5 text-sm border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            >
              <option value="damage-assessment">Aircraft Damage Assessment (Flagship)</option>
              <option value="pre-purchase-inspections">Pre-Purchase Aircraft Inspection</option>
              <option value="aircraft-recovery">Aircraft Recovery Arrangement & Costing</option>
              <option value="repair-coordination">Aircraft Repair Coordination (Third-Party AMO)</option>
              <option value="modification-approvals">Aircraft Modification Applications & Approvals</option>
              <option value="general-enquiry">General Aviation Technical Enquiry</option>
            </select>
          </div>

          <div>
            <label htmlFor="aircraftType" className="block text-xs font-semibold text-slate-700 mb-1">
              Aircraft Type / Model *
            </label>
            <input
              type="text"
              id="aircraftType"
              name="aircraftType"
              required
              value={formData.aircraftType}
              onChange={handleInputChange}
              className="w-full px-3.5 py-2.5 text-sm border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="e.g. Beechcraft King Air 200 / Cessna 208B"
            />
          </div>

          <div>
            <label htmlFor="aircraftRegistration" className="block text-xs font-semibold text-slate-700 mb-1">
              Aircraft Registration *
            </label>
            <input
              type="text"
              id="aircraftRegistration"
              name="aircraftRegistration"
              required
              value={formData.aircraftRegistration}
              onChange={handleInputChange}
              className="w-full px-3.5 py-2.5 text-sm border border-slate-300 font-mono uppercase focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="e.g. G-ABCD / N12345"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="aircraftLocation" className="block text-xs font-semibold text-slate-700 mb-1">
              Current Aircraft Location (Airfield / Hangar / Coordinates) *
            </label>
            <input
              type="text"
              id="aircraftLocation"
              name="aircraftLocation"
              required
              value={formData.aircraftLocation}
              onChange={handleInputChange}
              className="w-full px-3.5 py-2.5 text-sm border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="e.g. Biggin Hill Airport (EGKB), Main Apron / Off-airport site"
            />
          </div>
        </div>
      </div>

      {/* SECTION 3: INCIDENT & CLAIM DETAILS */}
      <div>
        <div className="border-b border-slate-200 pb-2 mb-4">
          <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-900">
            03. Incident & Claim Context
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="incidentDate" className="block text-xs font-semibold text-slate-700 mb-1">
              Date of Incident *
            </label>
            <input
              type="date"
              id="incidentDate"
              name="incidentDate"
              required
              value={formData.incidentDate}
              onChange={handleInputChange}
              className="w-full px-3.5 py-2.5 text-sm border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="insurerOrBroker" className="block text-xs font-semibold text-slate-700 mb-1">
              Insurance Company or Broker *
            </label>
            <input
              type="text"
              id="insurerOrBroker"
              name="insurerOrBroker"
              required
              value={formData.insurerOrBroker}
              onChange={handleInputChange}
              className="w-full px-3.5 py-2.5 text-sm border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="e.g. Underwriting Syndicate / Broker Name"
            />
          </div>

          <div className="sm:col-span-2">
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="claimReference" className="block text-xs font-semibold text-slate-700">
                Claim Reference
              </label>
              <span className="text-[11px] font-mono text-slate-400">
                Optional UX field
              </span>
            </div>
            <input
              type="text"
              id="claimReference"
              name="claimReference"
              value={formData.claimReference}
              onChange={handleInputChange}
              className="w-full px-3.5 py-2.5 text-sm border border-slate-300 font-mono focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="e.g. CLM-2026-AV-0491 (Optional)"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="incidentDescription" className="block text-xs font-semibold text-slate-700 mb-1">
              Description of Incident & Observable Damage *
            </label>
            <textarea
              id="incidentDescription"
              name="incidentDescription"
              rows={4}
              required
              value={formData.incidentDescription}
              onChange={handleInputChange}
              className="w-full px-3.5 py-2.5 text-sm border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="Please provide details of the event (e.g. runway excursion, bird strike, hangar rash, heavy landing) and initial known damage points..."
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="additionalInformation" className="block text-xs font-semibold text-slate-700 mb-1">
              Additional Information / Specific Requests
            </label>
            <textarea
              id="additionalInformation"
              name="additionalInformation"
              rows={2}
              value={formData.additionalInformation}
              onChange={handleInputChange}
              className="w-full px-3.5 py-2.5 text-sm border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="Any access restrictions, urgency requirements, or third-party AMO coordination notes..."
            />
          </div>
        </div>
      </div>

      {/* SECTION 4: DOCUMENT & PHOTO UPLOAD (SIMPLIFIED & GENERIC) */}
      <div>
        <div className="border-b border-slate-200 pb-2 mb-4">
          <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-900">
            04. Upload Supporting Documentation or Photographs (Optional)
          </h3>
        </div>

        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleFileDrop}
          className="border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100/80 p-6 sm:p-8 text-center transition-colors cursor-pointer relative"
        >
          <input
            type="file"
            multiple
            onChange={handleFileInputChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            id="file-upload"
            aria-label="Upload optional supporting documentation or photographs"
          />
          <div className="space-y-2 pointer-events-none">
            <UploadCloud className="w-8 h-8 text-blue-600 mx-auto" />
            <div className="text-sm font-semibold text-slate-800">
              Upload optional supporting documentation or photographs
            </div>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Drag and drop optional incident photographs, defect notes, or damage surveys here, or click to browse files.
            </p>
          </div>
        </div>

        {/* Selected files preview */}
        {files.length > 0 && (
          <div className="mt-4 space-y-2">
            <span className="text-xs font-mono text-slate-500 block">
              Attached Files ({files.length}):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {files.map((file, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 bg-slate-100 border border-slate-200 text-xs font-mono text-slate-800"
                >
                  <div className="flex items-center gap-2 truncate">
                    <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                    <span className="truncate">{file.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(idx)}
                    className="p-1 hover:text-red-600 focus:outline-none"
                    aria-label={`Remove file ${file.name}`}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* SUBMISSION ACTION */}
      <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-slate-500 font-sans">
          All incident records and technical inquiries are handled under commercial confidentiality.
        </div>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isSubmitting}
          className="w-full sm:w-auto font-semibold shadow-md min-w-[200px]"
          icon={isSubmitting ? undefined : <Send className="w-4 h-4" />}
        >
          {isSubmitting ? "Processing..." : "Submit Assessment Request"}
        </Button>
      </div>
    </form>
  );
}
