import React, { forwardRef } from 'react';

export interface OrderingStepData {
  stepNumber: '01' | '02' | '03';
  title: string;
  description: string;
}

interface OrderingStepProps {
  step: OrderingStepData;
  isLast?: boolean;
}

export const OrderingStep = forwardRef<HTMLDivElement, OrderingStepProps>(
  ({ step, isLast = false }, ref) => {
    return (
      <div
        ref={ref}
        className="relative flex flex-col items-center text-center px-4"
      >
        {/* Understated Dotted Comic Connector Line to Next Step (Desktop) */}
        {!isLast && (
          <div
            aria-hidden="true"
            className="hidden md:block pointer-events-none absolute top-[1.75rem] left-[calc(50%+2.5rem)] w-[calc(100%-5rem)] border-t-[0.1875rem] border-dashed border-cocoa-brown/45"
          />
        )}

        {/* Numbered Circle: Warm Cream bg, Thick Cocoa Brown border, Hard Offset Shadow */}
        <div
          aria-hidden="true"
          className="relative z-10 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-warm-cream border-[0.16rem] md:border-[0.22rem] border-solid border-cocoa-brown flex items-center justify-center font-hero text-xs sm:text-sm md:text-[1.1875rem] leading-none text-cocoa-brown select-none shadow-[0.14rem_0.14rem_0_#4B1F0F] md:shadow-[0.2rem_0.2rem_0_#4B1F0F]"
        >
          {step.stepNumber}
        </div>

        {/* Step Title */}
        <h3 className="m-0 mt-2.5 sm:mt-3 md:mt-4 font-hero text-sm sm:text-base md:text-[clamp(1.25rem,1.6vw,1.5rem)] leading-tight tracking-[-0.01em] text-cocoa-brown uppercase">
          <span className="sr-only">Step {step.stepNumber}: </span>
          {step.title}
        </h3>

        {/* Short Step Description */}
        <p className="m-0 mt-1 max-w-[14rem] sm:max-w-[16rem] md:max-w-[17rem] font-jakarta text-xs sm:text-sm md:text-[1rem] font-bold leading-snug md:leading-relaxed text-cocoa-brown/85">
          {step.description}
        </p>
      </div>
    );
  }
);

OrderingStep.displayName = 'OrderingStep';
