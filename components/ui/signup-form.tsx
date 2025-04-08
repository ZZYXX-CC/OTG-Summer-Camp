"use client";

import React, { useState, useRef } from "react";
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

export function SignupForm() {
  const [hasPaid, setHasPaid] = useState(false);
  const [priorExperience, setPriorExperience] = useState(false);
  const [error, setError] = useState<string>();

  return (
    <div className="relative max-w-3xl w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-xl bg-white/90 dark:bg-black/90 backdrop-blur-sm border border-green-100 dark:border-green-900">
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
          Please fill out the registration form below to secure your spot in the Easter Camp.
        </p>
      </div>

      <form className="my-8" onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstName">First name<span className="text-red-500">*</span></Label>
            <Input id="firstName" name="firstName" placeholder="John" type="text" required />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastName">Last name<span className="text-red-500">*</span></Label>
            <Input id="lastName" name="lastName" placeholder="Doe" type="text" required />
          </LabelInputContainer>
        </div>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email<span className="text-red-500">*</span></Label>
          <Input id="email" name="email" type="email" required />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="phone">Phone<span className="text-red-500">*</span></Label>
          <Input id="phone" name="phone" type="tel" placeholder="e.g. +2341234567890" required />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="age">Age<span className="text-red-500">*</span></Label>
          <Input id="age" name="age" type="number" min="6" max="18" required />
        </LabelInputContainer>

        <LabelInputContainer 
          className="mb-4"
          tooltip="Participants must be between 6 and 18 years old to join the camp."
        >
          <Label htmlFor="age">Age<span className="text-red-500">*</span></Label>
          <Input id="age" name="age" type="number" min="6" max="18" required />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="parentName">Parent/Guardian's Name<span className="text-red-500">*</span></Label>
          <Input id="parentName" name="parentName" placeholder="Jane Doe" type="text" required />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="parentEmail">Parent/Guardian's Email Address<span className="text-red-500">*</span></Label>
          <Input id="parentEmail" name="parentEmail" placeholder="parent@example.com" type="email" required />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="parentPhone">Parent/Guardian's Contact Phone Number<span className="text-red-500">*</span></Label>
          <Input 
            id="parentPhone" 
            name="parentPhone" 
            placeholder="+234 803 123 4567" 
            type="tel" 
            pattern="\+234[0-9]{10}" 
            title="Please enter a valid Nigerian phone number starting with +234"
            required 
          />
        </LabelInputContainer>

        <LabelInputContainer 
          className="mb-4"
          tooltip="Please provide a contact person different from the parent/guardian who we can reach in case of emergency."
        >
          <Label htmlFor="emergencyName">Emergency Contact Name<span className="text-red-500">*</span></Label>
          <Input id="emergencyName" name="emergencyName" placeholder="John Smith" type="text" required />
        </LabelInputContainer>

        <LabelInputContainer 
          className="mb-4"
          tooltip="Please enter a valid Nigerian phone number starting with +234"
        >
          <Label htmlFor="emergencyPhone">Emergency Contact Phone<span className="text-red-500">*</span></Label>
          <Input 
            id="emergencyPhone" 
            name="emergencyPhone" 
            placeholder="+234 803 123 4567" 
            type="tel" 
            pattern="\+234[0-9]{10}" 
            title="Please enter a valid Nigerian phone number starting with +234"
            required 
          />
        </LabelInputContainer>

        <LabelInputContainer 
          className="mb-4"
          tooltip="Please list any allergies your child has. Type 'N/A' if not applicable."
        >
          <Label htmlFor="allergies">Allergies<span className="text-red-500">*</span></Label>
          <Input id="allergies" name="allergies" placeholder="Type N/A if not applicable" type="text" required />
        </LabelInputContainer>

        <LabelInputContainer 
          className="mb-4"
          tooltip="Please list any medical conditions your child has. Type 'N/A' if not applicable."
        >
          <Label htmlFor="medicalConditions">Medical Conditions<span className="text-red-500">*</span></Label>
          <Input id="medicalConditions" name="medicalConditions" placeholder="Type N/A if not applicable" type="text" required />
        </LabelInputContainer>

        <LabelInputContainer 
          className="mb-4"
          tooltip="Please list any medications your child is currently taking. Type 'N/A' if not applicable."
        >
          <Label htmlFor="medications">Medications<span className="text-red-500">*</span></Label>
          <Input id="medications" name="medications" placeholder="Type N/A if not applicable" type="text" required />
        </LabelInputContainer>

        <LabelInputContainer 
          className="mb-4"
          tooltip="This information is important for certain activities and safety measures."
        >
          <Label htmlFor="canSwim">Can your Child Swim?<span className="text-red-500">*</span></Label>
          <select
            id="canSwim"
            name="canSwim"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            required
          >
            <option value="">Select...</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </LabelInputContainer>

        <div className="mb-4 flex items-center space-x-2">
          <Checkbox 
            id="priorExperience" 
            checked={priorExperience}
            onCheckedChange={(checked) => setPriorExperience(checked as boolean)}
          />
          <Label htmlFor="priorExperience">Prior Football Experience</Label>
        </div>

        {priorExperience && (
          <LabelInputContainer className="mb-4">
            <Label htmlFor="experienceDetails">Experience Details*</Label>
            <Input 
              id="experienceDetails" 
              name="experienceDetails" 
              placeholder="Please describe your football experience" 
              type="text"
              required={priorExperience}
            />
          </LabelInputContainer>
        )}

        <div className="mb-4 flex items-center space-x-2">
          <Checkbox 
            id="hasPaid" 
            checked={hasPaid}
            onCheckedChange={(checked) => setHasPaid(checked as boolean)}
          />
          <Label htmlFor="hasPaid">I have already paid</Label>
        </div>

        {hasPaid && (
          <div className="space-y-4 mb-8">
            <LabelInputContainer
              tooltip="Please select how you have made or plan to make the payment."
            >
              <Label htmlFor="paymentMethod">Payment Method<span className="text-red-500">*</span></Label>
              <select
                id="paymentMethod"
                name="paymentMethod"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required={hasPaid}
              >
                <option value="">Select payment method...</option>
                <option value="online">Online</option>
                <option value="in-person">In-Person</option>
                <option value="bank-transfer">Bank Transfer</option>
              </select>
            </LabelInputContainer>

            <LabelInputContainer
              tooltip="Enter the exact amount you have paid. The standard camp fee is ₦100,000."
            >
              <Label htmlFor="amountPaid">Amount Paid<span className="text-red-500">*</span></Label>
              <Input 
                id="amountPaid" 
                name="amountPaid" 
                placeholder="100000.00" 
                type="number" 
                step="0.01"
                required={hasPaid}
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor="receiptNumber">Receipt Number</Label>
              <Input 
                id="receiptNumber" 
                name="receiptNumber" 
                placeholder="For office use only" 
                type="text"
                disabled
              />
            </LabelInputContainer>
          </div>
        )}

        <div className="space-y-2 mb-4">
          <div className="flex items-start">
            <input
              type="checkbox"
              required
              className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label className="ml-2 block text-sm text-gray-700">
              I hereby give consent for my child to participate in the OTG Football Academy Easter Camp.
            </label>
          </div>
          <div className="flex items-start">
            <input
              type="checkbox"
              required
              className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label className="ml-2 block text-sm text-gray-700">
              I understand and acknowledge the risks involved in participating in football activities and
              waive any liability against OTG Football Academy for potential injuries.
            </label>
          </div>
        </div>

        <SaveButton
          text={{
            idle: "Submit Registration",
            saving: "Submitting...",
            saved: "Registration Submitted!"
          }}
          className="w-full"
          onSave={async () => {
            const form = document.querySelector('form') as HTMLFormElement;
            if (!form) {
              console.error('Form element not found');
              throw new Error('Form element not found');
            }
            
            // Check form validity
            if (!form.checkValidity()) {
              form.reportValidity();
              throw new Error('Please fill in all required fields correctly');
            }

            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            console.log('Form data before submission:', data);

            // Convert boolean values from strings
            const hasPaid = data.hasPaid === 'true';
            const priorExperience = data.priorExperience === 'true';

            // Prepare data for submission
            const submissionData = {
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
              phone: data.phone,
              age: parseInt(data.age as string),
              hasPaid,
              priorExperience,
              experienceDetails: data.experienceDetails || '',
              emergencyName: data.emergencyName || '',
              emergencyPhone: data.emergencyPhone || '',
              medicalConditions: data.medicalConditions || '',
              dietaryRestrictions: data.dietaryRestrictions || '',
              parentName: data.parentName || '',
              parentEmail: data.parentEmail || '',
              parentPhone: data.parentPhone || ''
            };

            try {
              console.log('Submitting data:', submissionData);
              const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(submissionData),
              });

              const responseData = await response.json();
              console.log('Response data:', responseData);

              if (!response.ok) {
                throw new Error(responseData.error || 'Registration failed');
              }

              setError(undefined);
              window.location.href = process.env.NEXT_PUBLIC_FORM_SUCCESS_URL!;
            } catch (err) {
              console.error('Detailed error:', {
                error: err,
                errorStack: err instanceof Error ? err.stack : undefined,
                errorName: err instanceof Error ? err.name : undefined,
                errorMessage: err instanceof Error ? err.message : undefined
              });
              
              setError(err instanceof Error ? err.message : 'Failed to submit registration');
              throw err;
            }
          }}
        />
        {error && (
          <p className="text-red-500 text-sm mt-2">{error}</p>
        )}
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-green-400 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-green-300 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
  tooltip,
}: {
  children: React.ReactNode;
  className?: string;
  tooltip?: string;
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
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {tooltip ? (
        <div className="flex items-center gap-2">
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
                side="bottom" 
                align="start"
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
