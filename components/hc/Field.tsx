"use client";

import { useId } from "react";
import { ChevronUpDownIcon, ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { cn } from "@/lib/utils";

const control =
  "w-full rounded-sm border bg-surface text-base text-text transition-[border-color,box-shadow] duration-200 placeholder:text-text-muted " +
  "hover:border-border-strong focus:border-primary focus:shadow-focus focus:outline-none disabled:cursor-not-allowed disabled:bg-bg-muted disabled:opacity-60";

type FieldProps = { label: string; hint?: string; error?: string; required?: boolean };

function FieldShell({
  id,
  label,
  hint,
  error,
  required,
  children,
}: FieldProps & { id: string; children: React.ReactNode }) {
  return (
    <div className="flex w-full flex-col gap-1">
      <label htmlFor={id} className="text-sm font-bold">
        {label}
        {required && <span className="pl-half text-danger" aria-hidden>*</span>}
      </label>
      {children}
      {error ? (
        <p id={`${id}-msg`} className="flex items-center gap-half text-sm text-danger">
          <ExclamationCircleIcon className="size-2" />
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-msg`} className="text-sm text-text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export function Input({
  label,
  hint,
  error,
  required,
  leading,
  className,
  ...props
}: FieldProps & React.InputHTMLAttributes<HTMLInputElement> & { leading?: React.ReactNode }) {
  const id = useId();
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} required={required}>
      <div className="relative">
        {leading && (
          <span className="pointer-events-none absolute top-1/2 left-2 -translate-y-1/2 text-text-muted [&>svg]:size-2">{leading}</span>
        )}
        <input
          id={id}
          aria-invalid={!!error || undefined}
          aria-describedby={hint || error ? `${id}-msg` : undefined}
          required={required}
          className={cn(control, "h-6 px-2", leading && "pl-5", error ? "border-danger" : "border-border", className)}
          {...props}
        />
      </div>
    </FieldShell>
  );
}

export function Textarea({
  label,
  hint,
  error,
  required,
  className,
  maxLength,
  value,
  ...props
}: FieldProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = useId();
  const count = typeof value === "string" ? value.length : 0;
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} required={required}>
      <div className="relative">
        <textarea
          id={id}
          value={value}
          maxLength={maxLength}
          aria-invalid={!!error || undefined}
          aria-describedby={hint || error ? `${id}-msg` : undefined}
          className={cn(control, "min-h-16 resize-y px-2 py-1", error ? "border-danger" : "border-border", className)}
          {...props}
        />
        {maxLength && (
          <span className="absolute right-2 bottom-1 font-mono text-mono text-text-muted tabular">
            {count}/{maxLength}
          </span>
        )}
      </div>
    </FieldShell>
  );
}

export function Select({
  label,
  hint,
  error,
  required,
  options,
  className,
  ...props
}: FieldProps & React.SelectHTMLAttributes<HTMLSelectElement> & { options: string[] }) {
  const id = useId();
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} required={required}>
      <div className="relative">
        <select
          id={id}
          aria-invalid={!!error || undefined}
          className={cn(control, "h-6 appearance-none pr-5 pl-2", error ? "border-danger" : "border-border", className)}
          {...props}
        >
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
        <ChevronUpDownIcon className="pointer-events-none absolute top-1/2 right-2 size-2 -translate-y-1/2 text-text-muted" />
      </div>
    </FieldShell>
  );
}
