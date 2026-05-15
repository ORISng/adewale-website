export const GENDER_OPTIONS = ["Male", "Female"] as const;
export const CLASS_OPTIONS = ["SS 1", "SS 2"] as const;
export const SCHOOL_CATEGORY_OPTIONS = ["Public", "Private"] as const;
export const YES_NO_OPTIONS = ["Yes", "No"] as const;
export const LGA_OPTIONS = [
  "Abeokuta North",
  "Abeokuta South",
  "Ado-Odo/Ota",
  "Ewekoro",
  "Ifo",
  "Ijebu North East",
  "Ijebu North",
  "Ijebu Ode",
  "Ijebu East",
  "Ikenne",
  "Imeko Afon",
  "Ipokia",
  "Obafemi Owode",
  "Odeda",
  "Odogbolu",
  "Ogun Waterside",
  "Remo North",
  "Sagamu",
  "Yewa North",
  "Yewa South",
] as const;
export const SPONSORSHIP_TIER_OPTIONS = [
  "Platinum - ₦10M+",
  "Gold - ₦5M",
  "Silver - ₦2.5M",
  "Bronze - ₦1M",
  "Scholarship Sponsor - From ₦500k",
  "Not sure yet - Send me the full deck",
] as const;

export const initialRegistrationFormData = {
  studentRep1FullName: "",
  studentRep1DOB: "",
  studentRep1Gender: "",
  studentRep1Class: "",
  studentRep1GuardianName: "",
  studentRep1GuardianNumber: "",
  studentRep2FullName: "",
  studentRep2DOB: "",
  studentRep2Gender: "",
  studentRep2Class: "",
  studentRep2GuardianName: "",
  studentRep2GuardianNumber: "",
  studentRep3FullName: "",
  studentRep3DOB: "",
  studentRep3Gender: "",
  studentRep3Class: "",
  studentRep3GuardianName: "",
  studentRep3GuardianNumber: "",
  schoolLGA: "",
  schoolCategory: "",
  schoolFullName: "",
  schoolAddress: "",
  schoolEmail: "",
  hearAboutAdewale: "",
  principalFullName: "",
  principalGender: "",
  principalNumber: "",
  principalEmail: "",
  teacherFullName: "",
  teacherGender: "",
  teacherNumber: "",
  teacherEmail: "",
  participatedLastEdition: "",
  likesAboutLastEdition: "",
  expectationFromLastEdition: "",
};

export type RegistrationFormData = typeof initialRegistrationFormData;

export const initialSponsorshipFormData = {
  org: "",
  contact: "",
  email: "",
  phone: "",
  tier: "",
  message: "",
};

export type SponsorshipFormData = typeof initialSponsorshipFormData;
