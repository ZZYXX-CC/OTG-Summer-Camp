"use client";

import React, { useState, useRef, useEffect } from "react";
import { SaveButton } from "@/components/ui/save-button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Github, Mail, CreditCard, HelpCircle } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import { format, differenceInYears } from "date-fns";
import confetti from "canvas-confetti";

export function MultiStepForm() {
  const [hasPaid, setHasPaid] = useState(false);
  const [hasExperience, setHasExperience] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState<string | null>(null);
  const [age, setAge] = useState<number | null>(null);
  const [error, setError] = useState<string>();
  const formRef = useRef<HTMLFormElement>(null);

  // Calculate age when date of birth changes
  useEffect(() => {
    if (dateOfBirth) {
      const dob = new Date(dateOfBirth);
      const today = new Date();
      const calculatedAge = differenceInYears(today, dob);
      setAge(calculatedAge);
    }
  }, [dateOfBirth]);

  // Format date of birth for display
  const formattedDateOfBirth = dateOfBirth ? format(new Date(dateOfBirth), 'dd MMMM yyyy') : '';

  return (
    <div className="relative max-w-3xl w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-xl bg-white/75 dark:bg-black/75 backdrop-blur-md border border-green-100/50 dark:border-green-900/50">
      <div className="absolute -right-32 top-8 hidden xl:block">
        <div className="relative w-[280px] h-[280px]">
          <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-3xl blur-2xl" />
          <Image 
            src="/images/child-football.png" 
            alt="Child Football Player" 
            width={280} 
            height={280}
            className="relative drop-shadow-2xl"
            priority
          />
        </div>
      </div>
      <div className="space-y-2">
        <h2 className="font-bold text-2xl bg-gradient-to-r from-green-600 to-green-800 dark:from-green-400 dark:to-green-600 bg-clip-text text-transparent">
          OTG Football Academy Registration
        </h2>
        <p className="text-green-700 dark:text-green-300 text-sm max-w-sm">
          Please fill out the registration form below to secure your spot in the Summer Camp.
        </p>
      </div>

      <form className="my-8" ref={formRef} onSubmit={(e) => e.preventDefault()}>
        {/* Participant Information */}
        <div className="space-y-4 mb-8">
          <h3 className="text-lg font-semibold text-green-700 dark:text-green-300">Participant Information</h3>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
            <LabelInputContainer>
              <Label htmlFor="firstName">First name<span className="text-red-500">*</span></Label>
              <Input id="firstName" name="firstName" placeholder="John" type="text" required />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastName">Last name<span className="text-red-500">*</span></Label>
              <Input id="lastName" name="lastName" placeholder="Doe" type="text" required />
            </LabelInputContainer>
          </div>

          <LabelInputContainer 
            tooltip="Optional: This will be used for camp communications. If not available, we'll use the parent/guardian's contact information."
          >
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="e.g. john@example.com" />
          </LabelInputContainer>

          <LabelInputContainer 
            tooltip="Optional: This will be used for camp communications. If not available, we'll use the parent/guardian's contact information."
          >
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" type="tel" placeholder="e.g. +2341234567890" />
          </LabelInputContainer>

          <LabelInputContainer 
            tooltip="Please enter your date of birth"
          >
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <Input 
              id="dateOfBirth" 
              name="dateOfBirth" 
              type="date" 
              required 
              value={dateOfBirth || ''}
              onChange={(e) => setDateOfBirth(e.target.value)}
              min="2005-01-01" 
              max="2018-12-31"
            />
            {dateOfBirth && (
              <p className="text-sm text-gray-500 mt-1">Selected: {formattedDateOfBirth}</p>
            )}
          </LabelInputContainer>

          <LabelInputContainer 
            tooltip="Automatically calculated from date of birth"
          >
            <Label htmlFor="age">Age</Label>
            <Input 
              id="age" 
              name="age" 
              type="number" 
              value={age || ''}
              readOnly
            />
          </LabelInputContainer>
        </div>

        {/* Parent/Guardian Information */}
        <div className="space-y-4 mb-8">
          <h3 className="text-lg font-semibold text-green-700 dark:text-green-300">Parent/Guardian Information</h3>
          <LabelInputContainer>
            <Label htmlFor="parentName">Parent/Guardian Name<span className="text-red-500">*</span></Label>
            <Input id="parentName" name="parentName" placeholder="Jane Doe" type="text" required />
          </LabelInputContainer>

          <LabelInputContainer 
            tooltip="This email will be used for important camp updates and communications"
          >
            <Label htmlFor="parentEmail">Parent/Guardian Email<span className="text-red-500">*</span></Label>
            <Input id="parentEmail" name="parentEmail" placeholder="parent@example.com" type="email" required />
          </LabelInputContainer>

          <LabelInputContainer 
            tooltip="Please enter a valid Nigerian phone number starting with +234"
          >
            <Label htmlFor="parentPhone">Parent/Guardian Phone<span className="text-red-500">*</span></Label>
            <Input 
              id="parentPhone" 
              name="parentPhone" 
              placeholder="e.g. +2341234567890" 
              type="tel" 
              required 
            />
          </LabelInputContainer>
        </div>

        {/* Emergency Contact Information */}
        <div className="space-y-4 mb-8">
          <h3 className="text-lg font-semibold text-green-700 dark:text-green-300">Emergency Contact Information</h3>
          <LabelInputContainer 
            tooltip="Please provide a contact person different from the parent/guardian who we can reach in case of emergency."
          >
            <Label htmlFor="emergencyName">Emergency Contact Name<span className="text-red-500">*</span></Label>
            <Input id="emergencyName" name="emergencyName" placeholder="John Smith" type="text" required />
          </LabelInputContainer>

          <LabelInputContainer 
            tooltip="Please enter a valid Nigerian phone number starting with +234"
          >
            <Label htmlFor="emergencyPhone">Emergency Contact Phone<span className="text-red-500">*</span></Label>
            <Input 
              id="emergencyPhone" 
              name="emergencyPhone" 
              placeholder="e.g. +2341234567890" 
              type="tel" 
              required 
            />
          </LabelInputContainer>
        </div>

        {/* Medical Information */}
        <div className="space-y-4 mb-8">
          <h3 className="text-lg font-semibold text-green-700 dark:text-green-300">Medical Information</h3>
          <LabelInputContainer 
            tooltip="Please list any allergies your child has. Type 'N/A' if not applicable."
          >
            <Label htmlFor="allergies">Allergies<span className="text-red-500">*</span></Label>
            <Input id="allergies" name="allergies" placeholder="Type N/A if not applicable" type="text" required />
          </LabelInputContainer>

          <LabelInputContainer 
            tooltip="Please list any medical conditions your child has. Type 'N/A' if not applicable."
          >
            <Label htmlFor="medicalConditions">Medical Conditions<span className="text-red-500">*</span></Label>
            <Input id="medicalConditions" name="medicalConditions" placeholder="Type N/A if not applicable" type="text" required />
          </LabelInputContainer>

          <LabelInputContainer 
            tooltip="Please list any medications your child is currently taking. Type 'N/A' if not applicable."
          >
            <Label htmlFor="medications">Medications<span className="text-red-500">*</span></Label>
            <Input id="medications" name="medications" placeholder="Type N/A if not applicable" type="text" required />
          </LabelInputContainer>
        </div>

        {/* Football Experience */}
        <div className="space-y-4 mb-8">
          <h3 className="text-lg font-semibold text-green-700 dark:text-green-300">Football Experience</h3>
          <LabelInputContainer 
            tooltip="Please select if you have prior football experience"
          >
            <Label htmlFor="priorExperience">Do you have prior football experience?</Label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input 
                  type="radio" 
                  name="priorExperience" 
                  value="true" 
                  checked={hasExperience}
                  onChange={(e) => setHasExperience(true)}
                  className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                Yes
              </label>
              <label className="flex items-center gap-2">
                <input 
                  type="radio" 
                  name="priorExperience" 
                  value="false" 
                  checked={!hasExperience}
                  onChange={(e) => setHasExperience(false)}
                  className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                No
              </label>
            </div>
          </LabelInputContainer>

          {hasExperience && (
            <>
              <LabelInputContainer 
                tooltip="Please describe your football experience"
              >
                <Label htmlFor="experienceDetails">Experience Details</Label>
                <textarea 
                  id="experienceDetails" 
                  name="experienceDetails" 
                  rows={3}
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-green-500 dark:focus:ring-green-500"
                  placeholder="e.g. Played for school team for 2 years, participated in local tournaments"
                />
              </LabelInputContainer>

              <LabelInputContainer 
                tooltip="Please select your preferred position"
              >
                <Label htmlFor="preferredPosition">Preferred Position</Label>
                <select 
                  id="preferredPosition" 
                  name="preferredPosition" 
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-green-500 dark:focus:ring-green-500"
                >
                  <option value="">Select position</option>
                  <option value="forward">Forward</option>
                  <option value="midfielder">Midfielder</option>
                  <option value="defender">Defender</option>
                  <option value="goalkeeper">Goalkeeper</option>
                </select>
              </LabelInputContainer>

              <LabelInputContainer 
                tooltip="Please select your dominant foot"
              >
                <Label htmlFor="dominantFoot">Dominant Foot</Label>
                <select 
                  id="dominantFoot" 
                  name="dominantFoot" 
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-green-500 dark:focus:ring-green-500"
                >
                  <option value="">Select foot</option>
                  <option value="right">Right</option>
                  <option value="left">Left</option>
                  <option value="both">Both</option>
                </select>
              </LabelInputContainer>
            </>
          )}
        </div>

        {/* Payment Information */}
        <div className="space-y-4 mb-8">
          <h3 className="text-lg font-semibold text-green-700 dark:text-green-300">Payment Information</h3>
          <LabelInputContainer 
            tooltip="Please select if payment has been made"
          >
            <Label htmlFor="hasPaid">Payment Status</Label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input 
                  type="radio" 
                  name="hasPaid" 
                  value="true" 
                  checked={hasPaid}
                  onChange={(e) => setHasPaid(true)}
                  className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                Payment Completed
              </label>
              <label className="flex items-center gap-2">
                <input 
                  type="radio" 
                  name="hasPaid" 
                  value="false" 
                  checked={!hasPaid}
                  onChange={(e) => setHasPaid(false)}
                  className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                Not Yet
              </label>
            </div>
          </LabelInputContainer>

          {hasPaid && (
            <>
              <LabelInputContainer 
                tooltip="Please select the payment method used"
              >
                <Label htmlFor="paymentMethod">Payment Method</Label>
                <select 
                  id="paymentMethod" 
                  name="paymentMethod" 
                  required={hasPaid}
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-green-500 dark:focus:ring-green-500"
                >
                  <option value="">Select payment method</option>
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="cash">Cash</option>
                  <option value="mobile_money">Mobile Money</option>
                </select>
              </LabelInputContainer>

              <LabelInputContainer 
                tooltip="Please enter the amount paid"
              >
                <Label htmlFor="amountPaid">Amount Paid (₦)</Label>
                <Input 
                  id="amountPaid" 
                  name="amountPaid" 
                  type="number" 
                  min="0" 
                  step="0.01" 
                  required 
                />
              </LabelInputContainer>
            </>
          )}
        </div>

        <div className="flex justify-center">
          <SaveButton 
            text={{ 
              idle: 'Submit Registration', 
              saving: 'Submitting...', 
              saved: 'Registration Submitted!' 
            }} 
            showConfetti={false} // Initially set to false, will be triggered on success
            onSave={async () => {
              try {
                // Get form data
                if (!formRef.current) return;
                const formData = new FormData(formRef.current);
                const data = Object.fromEntries(formData);
                console.log('Form data before submission:', data);

                // Convert boolean values from strings
                const hasPaid = data.hasPaid === 'true';
                const hasExperience = data.priorExperience === 'true';

                // Validate payment fields when hasPaid is true
                if (hasPaid) {
                  if (!data.paymentMethod) {
                    throw new Error('Please select a payment method');
                  }
                  if (!data.amountPaid || parseFloat(data.amountPaid as string) <= 0) {
                    throw new Error('Please enter a valid payment amount');
                  }
                }

                // Prepare data for submission
                const submissionData = {
                  firstName: data.firstName,
                  lastName: data.lastName,
                  email: data.email || '',
                  phone: data.phone || '',
                  dateOfBirth: data.dateOfBirth,
                  age: parseInt(data.age as string),
                  hasPaid,
                  hasExperience,
                  experienceDetails: data.experienceDetails || '',
                  emergencyName: data.emergencyName,
                  emergencyPhone: data.emergencyPhone,
                  medicalConditions: data.medicalConditions || '',
                  dietaryRestrictions: data.dietaryRestrictions || '',
                  parentName: data.parentName,
                  parentEmail: data.parentEmail,
                  parentPhone: data.parentPhone,
                  paymentMethod: hasPaid ? data.paymentMethod : null,
                  amountPaid: hasPaid ? parseFloat(data.amountPaid as string) : null
                };

                // Send to API
                const response = await fetch('/api/register', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(submissionData),
                });

                const responseData = await response.json();
                console.log('API response:', JSON.stringify(responseData, null, 2));

                if (!response.ok || !responseData.success) {
                  const errorMessage = responseData.error || 'Registration failed';
                  console.error('API error details:', {
                    status: response.status,
                    statusText: response.statusText,
                    response: responseData
                  });
                  throw new Error(errorMessage);
                }

                // Show success toast and trigger confetti on successful submission
                confetti({
                  particleCount: 150,
                  spread: 80,
                  origin: { y: 0.6 },
                  colors: ['#22c55e', '#16a34a', '#15803d', '#166534', '#14532d'],
                  shapes: ['star', 'circle'],
                });
                toast.success('Registration submitted successfully!', {
                  duration: 3000,
                  position: 'top-center',
                });
                // Redirect to success page after delay
                setTimeout(() => {
                  window.location.href = '/registration-success';
                }, 3000);

              } catch (error) {
                console.error('Registration error:', error);
                toast.error(error instanceof Error ? error.message : 'Failed to submit registration', {
                  duration: 5000,
                  position: 'top-center',
                });
                throw error; // Rethrow to prevent success state
              }
            }}
          />
        </div>
      </form>
    </div>
  );
}

interface LabelInputContainerProps {
  children: React.ReactNode;
  tooltip?: string;
  className?: string;
}

const LabelInputContainer: React.FC<LabelInputContainerProps> = ({ 
  children, 
  tooltip, 
  className = '' 
}) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Find the Label component and input/select components among children
  const childArray = React.Children.toArray(children);
  const labelComponent = childArray.find(
    (child) => React.isValidElement(child) && child.type === Label
  );

  // Clone other components and add focus/blur handlers if they're inputs or selects
  const otherComponents = childArray
    .filter((child) => React.isValidElement(child) && child.type !== Label)
    .map((child) => {
      if (!React.isValidElement(child)) return child;
      
      const isInput = 
        child.type === Input ||
        (typeof child.type === 'string' && 
         (child.type === 'input' || child.type === 'select'));

      if (!isInput) return child;

      return React.cloneElement(child, {
        ...child.props,
        onFocus: (e: FocusEvent) => {
          setIsTooltipOpen(true);
          child.props.onFocus?.(e);
        },
        onBlur: (e: FocusEvent) => {
          // Clear any existing timeout
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
          // Set a new timeout to close the tooltip
          timeoutRef.current = setTimeout(() => {
            setIsTooltipOpen(false);
          }, 150); // Small delay to prevent flickering
          child.props.onBlur?.(e);
        },
      });
    });

  return (
    <div className={cn("flex flex-col space-y-2 w-full relative", className)}>
      {tooltip ? (
        <div className="flex items-center gap-2 relative">
          {labelComponent}
          <TooltipProvider>
            <Tooltip open={isTooltipOpen}>
              <TooltipTrigger asChild>
                <HelpCircle 
                  className={cn(
                    "h-3.5 w-3.5 transition-colors",
                    isTooltipOpen ? "text-green-600 dark:text-green-400" : "text-green-400 dark:text-green-600"
                  )} 
                />
              </TooltipTrigger>
              <TooltipContent 
                side="top" 
                align="end"
                className="bg-green-50/90 dark:bg-green-950/90 text-green-800 dark:text-green-200 text-[11px] px-2 py-1 border border-green-200/50 dark:border-green-800/50 backdrop-blur-sm shadow-sm"
              >
                <p className="w-[180px] leading-relaxed">{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ) : (
        labelComponent
      )}
      {otherComponents}
    </div>
  );
};
