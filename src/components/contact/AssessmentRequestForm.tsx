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

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
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

const VALID_SERVICES = [
  "damage-assessment",
  "pre-purchase-inspections",
  "aircraft-recovery",
  "repair-coordination",
  "modification-approvals",
  "general-enquiry",
];

function AssessmentRequestFormInner({ initialService }: { initialService: string }) {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: "",
    companyName: "",
    email: "",
    telephone: "",
    serviceRequired: initialService,
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
     * =========================================================================
     */
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-2xl border-2 border-blue-600 p-8 sm:p-12 text-slate-950 shadow-chic-card">
        <div className="max-w-xl mx-auto text-center space-y-6">
          <div className="w-14 h-14 bg-blue-50 text-blue-700 border border-blue-200 rounded-2xl flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="inline-flex items-center gap-2">
            <Badge variant="primary">
              Submission Recorded — Simulated Preview
            </Badge>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold font-sans">
            Assessment Request Received
          </h3>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
            Thank you, <strong className="text-slate-900">{formData.fullName}</strong>. Your assessment intake request for aircraft registration <strong className="text-slate-900">{formData.aircraftRegistration}</strong> has been logged in this preview environment.
          </p>

          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-xl text-left font-mono text-xs text-slate-700 space-y-2">
            <div><span className="text-slate-400">ORGANISATION:</span> {formData.companyName || "N/A"}</div>
            <div><span className="text-slate-400">AIRCRAFT:</span> {formData.aircraftType} ({formData.aircraftRegistration})</div>
            <div><span className="text-slate-400">LOCATION:</span> {formData.aircraftLocation}</div>
            <div><span className="text-slate-400">ATTACHMENTS:</span> {files.length} file(s) attached</div>
          </div>

          <div className="pt-2">
            <Button
              variant="outline"
              size="md"
              className="shadow-thock-light font-medium"
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
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200/80 p-8 sm:p-12 shadow-chic-card space-y-10 font-sans">
      {errorMessage && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-sm flex items-center gap-2.5">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* SECTION 1: CONTACT & ORGANISATION */}
      <div>
        <div className="border-b border-slate-100 pb-3 mb-6 flex items-center justify-between">
          <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-900">
            01. Contact & Organisation
          </h3>
          <span className="text-xs font-sans text-slate-400">* Required</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="fullName" className="block text-xs font-semibold text-slate-700 mb-1.5">
              Full Name *
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
              placeholder="e.g. Captain David Vance"
            />
          </div>

          <div>
            <label htmlFor="companyName" className="block text-xs font-semibold text-slate-700 mb-1.5">
              Company / Organisation *
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              required
              value={formData.companyName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
              placeholder="e.g. Global Aviation Insurance Ltd / Owner"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-slate-700 mb-1.5">
              Business Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
              placeholder="name@organisation.com"
            />
          </div>

          <div>
            <label htmlFor="telephone" className="block text-xs font-semibold text-slate-700 mb-1.5">
              Telephone Number *
            </label>
            <input
              type="tel"
              id="telephone"
              name="telephone"
              required
              value={formData.telephone}
              onChange={handleInputChange}
              className="w-full px-4 py-3 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
              placeholder="+44 (0) ... / International format"
            />
          </div>
        </div>
      </div>

      {/* SECTION 2: SERVICE & AIRCRAFT PARTICULARS */}
      <div>
        <div className="border-b border-slate-100 pb-3 mb-6">
          <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-900">
            02. Service Selection & Aircraft Particulars
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <label htmlFor="serviceRequired" className="block text-xs font-semibold text-slate-700 mb-1.5">
              Service Required *
            </label>
            <select
              id="serviceRequired"
              name="serviceRequired"
              value={formData.serviceRequired}
              onChange={handleInputChange}
              className="w-full px-4 py-3 text-sm border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
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
            <label htmlFor="aircraftType" className="block text-xs font-semibold text-slate-700 mb-1.5">
              Aircraft Type / Model *
            </label>
            <input
              type="text"
              id="aircraftType"
              name="aircraftType"
              required
              value={formData.aircraftType}
              onChange={handleInputChange}
              className="w-full px-4 py-3 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
              placeholder="e.g. Beechcraft King Air 200 / Cessna 208B"
            />
          </div>

          <div>
            <label htmlFor="aircraftRegistration" className="block text-xs font-semibold text-slate-700 mb-1.5">
              Aircraft Registration *
            </label>
            <input
              type="text"
              id="aircraftRegistration"
              name="aircraftRegistration"
              required
              value={formData.aircraftRegistration}
              onChange={handleInputChange}
              className="w-full px-4 py-3 text-sm border border-slate-300 rounded-xl font-mono uppercase focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
              placeholder="e.g. G-ABCD / N12345"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="aircraftLocation" className="block text-xs font-semibold text-slate-700 mb-1.5">
              Current Aircraft Location (Airfield / Hangar / Coordinates) *
            </label>
            <input
              type="text"
              id="aircraftLocation"
              name="aircraftLocation"
              required
              value={formData.aircraftLocation}
              onChange={handleInputChange}
              className="w-full px-4 py-3 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
              placeholder="e.g. Biggin Hill Airport (EGKB), Main Apron / Off-airport site"
            />
          </div>
        </div>
      </div>

      {/* SECTION 3: INCIDENT & CLAIM DETAILS */}
      <div>
        <div className="border-b border-slate-100 pb-3 mb-6">
          <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-900">
            03. Incident & Claim Context
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="incidentDate" className="block text-xs font-semibold text-slate-700 mb-1.5">
              Date of Incident *
            </label>
            <input
              type="date"
              id="incidentDate"
              name="incidentDate"
              required
              value={formData.incidentDate}
              onChange={handleInputChange}
              className="w-full px-4 py-3 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
            />
          </div>

          <div>
            <label htmlFor="insurerOrBroker" className="block text-xs font-semibold text-slate-700 mb-1.5">
              Insurance Company or Broker *
            </label>
            <input
              type="text"
              id="insurerOrBroker"
              name="insurerOrBroker"
              required
              value={formData.insurerOrBroker}
              onChange={handleInputChange}
              className="w-full px-4 py-3 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
              placeholder="e.g. Underwriting Syndicate / Broker Name"
            />
          </div>

          <div className="sm:col-span-2">
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="claimReference" className="block text-xs font-semibold text-slate-700">
                Claim Reference
              </label>
              <span className="text-[11px] font-sans text-slate-400">
                Optional
              </span>
            </div>
            <input
              type="text"
              id="claimReference"
              name="claimReference"
              value={formData.claimReference}
              onChange={handleInputChange}
              className="w-full px-4 py-3 text-sm border border-slate-300 rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
              placeholder="e.g. CLM-2026-AV-0491 (Optional)"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="incidentDescription" className="block text-xs font-semibold text-slate-700 mb-1.5">
              Description of Incident & Observable Damage *
            </label>
            <textarea
              id="incidentDescription"
              name="incidentDescription"
              rows={4}
              required
              value={formData.incidentDescription}
              onChange={handleInputChange}
              className="w-full px-4 py-3 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
              placeholder="Please provide details of the event (e.g. runway excursion, bird strike, hangar rash, heavy landing) and initial known damage points..."
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="additionalInformation" className="block text-xs font-semibold text-slate-700 mb-1.5">
              Additional Information / Specific Requests
            </label>
            <textarea
              id="additionalInformation"
              name="additionalInformation"
              rows={2}
              value={formData.additionalInformation}
              onChange={handleInputChange}
              className="w-full px-4 py-3 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
              placeholder="Any access restrictions, urgency requirements, or third-party AMO coordination notes..."
            />
          </div>
        </div>
      </div>

      {/* SECTION 4: DOCUMENT & PHOTO UPLOAD (SIMPLIFIED & GENERIC) */}
      <div>
        <div className="border-b border-slate-100 pb-3 mb-6">
          <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-900">
            04. Upload Supporting Documentation or Photographs (Optional)
          </h3>
        </div>

        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleFileDrop}
          className="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/70 hover:bg-slate-100/70 p-8 sm:p-10 text-center transition-all cursor-pointer relative"
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
            <UploadCloud className="w-9 h-9 text-blue-600 mx-auto" />
            <div className="text-sm font-bold text-slate-900">
              Upload optional supporting documentation or photographs
            </div>
            <p className="text-xs text-slate-500 max-w-sm mx-auto font-sans">
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
                  className="flex items-center justify-between p-3 bg-slate-100/80 border border-slate-200/80 rounded-xl text-xs font-mono text-slate-800"
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
      <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="text-xs text-slate-500 font-sans">
          * Required fields for technical assessment scoping.
        </div>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isSubmitting}
          className="w-full sm:w-auto font-semibold shadow-thock-primary min-w-[220px]"
          icon={isSubmitting ? undefined : <Send className="w-4 h-4" />}
        >
          {isSubmitting ? "Processing..." : "Submit Assessment Request"}
        </Button>
      </div>
    </form>
  );
}

function FormKeyWrapper() {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get("service");
  const selectedService =
    serviceParam && VALID_SERVICES.includes(serviceParam)
      ? serviceParam
      : "damage-assessment";

  return (
    <AssessmentRequestFormInner
      key={selectedService}
      initialService={selectedService}
    />
  );
}

export function AssessmentRequestForm() {
  return (
    <Suspense
      fallback={
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-sm text-slate-500 font-sans">
          Loading assessment intake form...
        </div>
      }
    >
      <FormKeyWrapper />
    </Suspense>
  );
}
