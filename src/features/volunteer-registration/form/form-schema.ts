import * as v from "valibot";

const today = new Date();
const birthDateThreshold = new Date(
  today.getFullYear() - 12,
  today.getMonth(),
  today.getDate(),
);
const imageFileSchema = v.pipe(
  v.instance(File, "Upload a image file"),
  v.check((file) => file.type.startsWith("image/"), "Invalid image file"),
);

// step 1
export const personalInformationSchema = v.object({
  name: v.pipe(
    v.string("Name is required"),
    v.trim(),
    v.minLength(3, "Name must be at least 3 characters long"),
  ),
  email: v.pipe(
    v.string("Email must be provided"),
    v.email("Email must be provided"),
    v.minLength(6, "Email must be at least 3 characters long"),
  ),
  phoneNumber: v.pipe(
    v.string("Phone number is required"),
    v.trim(),
    v.regex(/^01[3-9]\d{2}-?\d{6}$/, "Invalid Bangladesh phone number"),
  ),
  bloodGroup: v.picklist(
    ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    "Invalid Birth Group",
  ),
  dateOfBirth: v.pipe(
    v.date("Invalid Date of Birth"),
    v.check(
      (date) => date < birthDateThreshold,
      "You must be at least 12 years old to register",
    ),
  ),
  gender: v.picklist(["male", "female", "intersex"], "Unacceptable entity"),
});

// step 2
export const locationInformationSchema = v.pipe(
  v.object({
    permanentDistrict: v.pipe(
      v.string("This field is required"),
      v.minLength(1, "This field is required"),
    ),
    permanentUpazila: v.pipe(
      v.string("This field is required"),
      v.minLength(1, "This field is required"),
    ),
    currentSameAsPermanent: v.boolean(),
    currentDistrict: v.optional(v.string()),
    currentUpazila: v.optional(v.string()),
  }),
  v.forward(
    v.check((data) => {
      if (data.currentSameAsPermanent) return true;
      return !!data.currentDistrict;
    }, "This field is required"),
    ["currentDistrict"],
  ),
  v.forward(
    v.check((data) => {
      if (data.currentSameAsPermanent) return true;
      return !!data.currentUpazila;
    }, "This field is required"),
    ["currentUpazila"],
  ),
);

// step 3 (either brn or nid)
export const IDInformationSchema = v.pipe(
  v.object({
    idType: v.picklist(["NID", "BRN"]),
    nidNumber: v.nullable(v.pipe(v.string(), v.trim())),
    nidImage1: v.nullable(imageFileSchema),
    nidImage2: v.nullable(imageFileSchema),
    brnNumber: v.nullable(
      v.pipe(
        v.string(),
        v.trim(),
        v.length(17, "Birth Registration Number must be 17 digits"),
      ),
    ),
    brnDate: v.nullable(v.date()),
    parentPhoneNumber: v.nullable(
      v.pipe(
        v.string(),
        v.trim(),
        v.regex(/^01[3-9]\d{2}-?\d{6}$/, "Invalid Bangladeshi phone number"),
      ),
    ),
  }),
  v.forward(
    v.check((data) => {
      if (data.idType === "NID") {
        return !!data.nidNumber && data.nidNumber.length > 0;
      }
      return true;
    }, "This field is required"),
    ["nidNumber"],
  ),
  v.forward(
    v.check((data) => {
      if (data.idType === "NID" && data.nidNumber) {
        return /^\d+$/.test(data.nidNumber);
      }
      return true;
    }, "NID must be digits"),
    ["nidNumber"],
  ),
  v.forward(
    v.check((data) => {
      if (data.idType === "NID" && data.nidNumber) {
        return data.nidNumber.length === 10 || data.nidNumber.length === 17;
      }
      return true;
    }, "NID must be 10 or 17 digits long"),
    ["nidNumber"],
  ),
  v.forward(
    v.check((data) => {
      if (data.idType === "NID") {
        return !!data.nidImage1;
      }
      return true;
    }, "NID Images are required"),
    ["nidImage1"],
  ),
  v.forward(
    v.check((data) => {
      if (data.idType === "NID") {
        return !!data.nidImage2;
      }
      return true;
    }, "Back of NID is required"),
    ["nidImage2"],
  ),
  v.forward(
    v.check((data) => {
      if (data.idType !== "NID") {
        return !!data.brnNumber && data.brnNumber.length > 0;
      }
      return true;
    }, "This field is required"),
    ["brnNumber"],
  ),
  v.forward(
    v.check((data) => {
      if (data.idType !== "NID") {
        return !!data.brnDate;
      }
      return true;
    }, "Invalid Input"),
    ["brnDate"],
  ),
  v.forward(
    v.check((data) => {
      if (data.idType !== "NID") {
        return !!data.parentPhoneNumber && data.parentPhoneNumber.length > 0;
      }
      return true;
    }, "This field is required"),
    ["parentPhoneNumber"],
  ),
);

// step 4
export const passwordSchema = v.pipe(
  v.object({
    password: v.pipe(
      v.string("A strong password is required"),
      v.minLength(8, "Password must be at least 8 characters long"),
      v.maxLength(32, "Password must be at most 32 characters long"),
      v.regex(/[A-Z]/, "Password must contain at least one uppercase letter"),
      v.regex(/[a-z]/, "Password must contain at least one lowercase letter"),
      v.regex(/[0-9]/, "Password must contain at least one number"),
      v.regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character",
      ),
    ),
    confirmPassword: v.pipe(
      v.string("This field is required"),
      v.trim(),
      v.minLength(8),
      v.maxLength(32),
    ),
  }),
  v.forward(
    v.check((data) => data.password === data.confirmPassword, "Passwords don't match"),
    ["confirmPassword"],
  ),
);

// step 5
export const profilePictureSchema = v.object({
  profilePicture: imageFileSchema,
  agreeTerms: v.boolean(),
});

export const volunteerRegistrationFormSchema = v.intersect([
  personalInformationSchema,
  locationInformationSchema,
  IDInformationSchema,
  passwordSchema,
  profilePictureSchema,
]);

export type VolunteerRegistrationFormValue = v.InferOutput<
  typeof volunteerRegistrationFormSchema
>;
