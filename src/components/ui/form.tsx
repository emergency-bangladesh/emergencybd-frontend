import * as React from "react";
import { IconCheck, IconEye, IconEyeOff, IconX } from "@tabler/icons-react";
import { useMemo, useState } from "react";
import { Label } from "./label";
import { Input } from "./input";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./select";
import { DatePicker } from "./date-picker";
import { Checkbox } from "./checkbox";
import { Textarea } from "./textarea";
import { Combobox } from "./combo-box";
import AvatarUpload from "./avatar-upload";
import { DateAndTimePicker } from "./date-and-time-picker";
import type { Calendar } from "./calendar";
import type { ComboboxOption } from "./combo-box";
import type { AnyFieldApi } from "@tanstack/react-form";
import { useLanguage } from "@/integrations/language/use-language";

export function FieldErrorInfo({
  field,
  condition = true,
}: {
  field: AnyFieldApi;
  condition?: boolean;
}) {
  return (
    <>
      {field.state.meta.isTouched &&
        field.state.meta.errors.length > 0 &&
        condition && (
          <small className="text-destructive">
            {field.state.meta.errors[0]?.message}
          </small>
        )}
    </>
  );
}

type GenericFormInputProps = {
  field: AnyFieldApi;
  label: string;
} & Omit<
  React.ComponentProps<typeof Input>,
  "aria-invalid" | "value" | "onChange" | "onBlur" | "type"
>;

export const FormTextInput = ({
  field,
  id,
  label,
  ...props
}: GenericFormInputProps) => (
  <div className="flex flex-col gap-2 w-full">
    <Label className="px-1" htmlFor={id}>
      {" "}
      {label}{" "}
    </Label>
    <Input
      id={id}
      type="text"
      aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
      value={field.state.value}
      onBlur={field.handleBlur}
      onChange={(e) => field.handleChange(e.target.value)}
      {...props}
    />
  </div>
);

export const FormEmailInput = ({
  field,
  id,
  label,
  ...props
}: GenericFormInputProps) => (
  <div className="flex flex-col gap-2 w-full">
    <Label className="px-1" htmlFor={id}>
      {label}
    </Label>
    <Input
      id={id}
      type="email"
      aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
      value={field.state.value}
      onBlur={field.handleBlur}
      onChange={(e) => field.handleChange(e.target.value)}
      {...props}
    />
  </div>
);

export const FormTelInput = ({
  field,
  id,
  label,
  placeholder,
  ...props
}: GenericFormInputProps) => (
  <div className="flex flex-col gap-2 w-full">
    <Label className="px-1" htmlFor={id}>
      {label}
    </Label>
    <Input
      id={id}
      type="tel"
      aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
      value={field.state.value}
      onBlur={field.handleBlur}
      onChange={(e) => field.handleChange(e.target.value)}
      placeholder={placeholder ?? "01XXX-XXXXXX"}
      {...props}
    />
  </div>
);

export const FormNumberInput = ({
  field,
  id,
  label,
  ...props
}: GenericFormInputProps) => (
  <div className="flex flex-col gap-2 w-full">
    <Label className="px-1" htmlFor={id}>
      {label}
    </Label>
    <Input
      id={id}
      type="number"
      aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
      value={field.state.value}
      onBlur={field.handleBlur}
      onChange={(e) => field.handleChange(Number(e.target.value))}
      {...props}
    />
  </div>
);

type FormTextAreaProps = {
  field: AnyFieldApi;
  label: string;
} & Omit<
  React.ComponentProps<typeof Textarea>,
  "value" | "onChange" | "onBlur"
>;

export const FormTextArea = ({
  field,
  id,
  label,
  ...props
}: FormTextAreaProps) => (
  <div className="flex flex-col gap-2 w-full">
    <Label className="px-1" htmlFor={id}>
      {label}
    </Label>
    <Textarea
      id={id}
      onChange={(e) => field.handleChange(e.target.value)}
      aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
      onBlur={field.handleBlur}
      value={field.state.value}
      {...props}
    />
  </div>
);

export const FormPasswordInput = ({
  field,
  id,
  label,
  ...props
}: GenericFormInputProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className="px-1" htmlFor={id}>
        {label}
      </Label>
      <div className="relative">
        <Input
          id={id}
          className="pe-9"
          type={isVisible ? "text" : "password"}
          aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          {...props}
        />
        <button
          className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          type="button"
          onClick={toggleVisibility}
          aria-label={isVisible ? "Hide password" : "Show password"}
          aria-pressed={isVisible}
          aria-controls={id}
        >
          {isVisible ? (
            <IconEyeOff size={16} aria-hidden="true" />
          ) : (
            <IconEye size={16} aria-hidden="true" />
          )}
        </button>
      </div>
    </div>
  );
};

export const FormPasswordInputWithValidationFeedback = ({
  field,
  id,
  label,
  ...props
}: GenericFormInputProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  const checkStrength = (pass: string) => {
    const requirements = [
      { regex: /.{8,}/, text: "At least 8 characters" },
      { regex: /[0-9]/, text: "At least 1 number" },
      { regex: /[a-z]/, text: "At least 1 lowercase letter" },
      { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
      { regex: /[^A-Za-z0-9]/, text: "At least 1 special character" },
    ];

    return requirements.map((req) => ({
      met: req.regex.test(pass),
      text: req.text,
    }));
  };

  const strength = checkStrength(field.state.value ?? "");

  const strengthScore = useMemo(() => {
    return strength.filter((req) => req.met).length;
  }, [strength]);

  const getStrengthColor = (score: number) => {
    if (score === 0) return "bg-border";
    if (score <= 1) return "bg-red-500";
    if (score <= 2) return "bg-orange-500";
    if (score <= 3) return "bg-amber-500";
    return "bg-emerald-500";
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className="px-1" htmlFor={id}>
        {label}
      </Label>
      <div className="relative">
        <Input
          id={id}
          className="pe-9"
          type={isVisible ? "text" : "password"}
          aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          {...props}
        />
        <button
          className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          type="button"
          onClick={toggleVisibility}
          aria-label={isVisible ? "Hide password" : "Show password"}
          aria-pressed={isVisible}
          aria-controls={id}
        >
          {isVisible ? (
            <IconEyeOff size={16} aria-hidden="true" />
          ) : (
            <IconEye size={16} aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Password strength indicator */}
      <div
        className="bg-border m-0! p-0! h-1 w-full overflow-hidden rounded-full"
        role="progressbar"
        aria-valuenow={strengthScore}
        aria-valuemin={0}
        aria-valuemax={5}
        aria-label="Password strength"
      >
        <div
          className={`h-full ${getStrengthColor(strengthScore)} transition-all duration-500 ease-out`}
          style={{ width: `${(strengthScore / 5) * 100}%` }}
        ></div>
      </div>

      {/* Password requirements list */}
      <ul className="space-y-1.5 m-0! p-0!" aria-label="Password requirements">
        {strength.map((req, index) => (
          <li key={index} className="flex items-center gap-2">
            {req.met ? (
              <IconCheck
                size={16}
                className="text-emerald-500"
                aria-hidden="true"
              />
            ) : (
              <IconX
                size={16}
                className="text-muted-foreground/80"
                aria-hidden="true"
              />
            )}
            <span
              className={`text-xs ${req.met ? "text-emerald-600" : "text-muted-foreground"}`}
            >
              {req.text}
              <span className="sr-only">
                {req.met ? " - Requirement met" : " - Requirement not met"}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

type FormSelectProps = {
  field: AnyFieldApi;
  label: string;
  id: string;
  children: React.ReactNode;
  placeholder?: string;
} & Omit<React.ComponentProps<typeof Select>, "value" | "onValueChange">;

export const FormSelect = ({
  field,
  id,
  children,
  placeholder,
  label,
  ...props
}: FormSelectProps) => (
  <div className="flex flex-col gap-2 w-full">
    <Label className="px-1" htmlFor={id}>
      {label}
    </Label>
    <Select
      value={field.state.value}
      onValueChange={(value) => field.handleChange(value)}
      {...props}
    >
      <SelectTrigger
        className="w-full"
        id={id}
        onBlur={field.handleBlur}
        aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>{children}</SelectContent>
    </Select>
  </div>
);

type FormComboboxProps = {
  field: AnyFieldApi;
  id: string;
  label: string;
  options: Array<ComboboxOption>;
  onChangeExtra?: (value?: string) => void;
} & Omit<
  React.ComponentProps<typeof Combobox>,
  "value" | "onChange" | "options"
>;

export const FormComboBox = ({
  field,
  id,
  label,
  options,
  onChangeExtra,
  ...props
}: FormComboboxProps) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className="px-1" htmlFor={id}>
        {label}
      </Label>
      <Combobox
        id={id}
        options={options}
        value={field.state.value}
        onChange={(value) => {
          field.handleChange(value);
          onChangeExtra?.(value);
        }}
        onBlur={field.handleBlur}
        {...props}
      />
    </div>
  );
};

type FormDatePickerProps = {
  field: AnyFieldApi;
  id: string;
  label: string;
  placeholder?: string;
} & Omit<
  React.ComponentProps<typeof Calendar>,
  "mode" | "selected" | "onSelect" | "captionLayout" | "month" | "onMonthChange"
>;

export const FormDatePicker = ({
  field,
  id,
  label,
  placeholder,
  ...props
}: FormDatePickerProps) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className="px-1" htmlFor={id}>
        {label}
      </Label>
      <DatePicker
        id={id}
        aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
        initialDate={field.state.value}
        onDateChange={(date) => field.handleChange(date)}
        placeholder={placeholder}
        onBlur={field.handleBlur}
        {...props}
      />
    </div>
  );
};

type FormDateAndTimePickerProps = {
  field: AnyFieldApi;

  label: string;
} & Omit<
  React.ComponentProps<typeof DateAndTimePicker>,
  "mode" | "selected" | "onSelect" | "onChange" | "placeholder"
>;

export const FormDateAndTimePicker = ({
  field,
  id,
  label,

  ...props
}: FormDateAndTimePickerProps) => {
  const initialValue = field.state.value as Date | undefined;
  const { language } = useLanguage();

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className="px-1" htmlFor={id}>
        {label}
      </Label>
      <DateAndTimePicker
        onChange={field.handleChange}
        onBlur={field.handleBlur}
        initialDateTime={initialValue}
        id={id}
        placeholder={language === "en" ? "Select Date" : "তারিখ নির্বাচন করুন"}
        {...props}
      />
    </div>
  );
};

type FormCheckboxProps = {
  field: AnyFieldApi;
  label: string;
  id?: string;
  description?: string;
} & Omit<
  React.ComponentProps<typeof Checkbox>,
  "checked" | "onCheckedChange" | "onBlur"
>;

export const FormCheckbox = ({
  field,
  id,
  label,
  description,
  ...props
}: FormCheckboxProps) => (
  <div className="flex items-start space-x-2 w-full">
    <Checkbox
      id={id}
      checked={field.state.value}
      onCheckedChange={(checked) => field.handleChange(Boolean(checked))}
      onBlur={field.handleBlur}
      aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
      {...props}
    />
    <div className="grid gap-1.5 leading-none">
      <Label htmlFor={id}>{label}</Label>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  </div>
);

type FormAvatarUploadProps = { field: AnyFieldApi } & Omit<
  React.ComponentProps<typeof AvatarUpload>,
  "onFileChange"
>;
export function FormAvatarUpload({ field, ...props }: FormAvatarUploadProps) {
  const setAvatarToField = (file: File | undefined) => field.handleChange(file);

  return (
    <AvatarUpload
      {...props}
      onFileChange={setAvatarToField}
      initialAvatar={field.state.value}
    />
  );
}
