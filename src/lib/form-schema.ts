import { JOBTYPES } from "@/constant";
import { min } from "date-fns";
import { z } from "zod";

export const jobFormSchema = z.object({
  roles: z.string({ required_error: "Job Title is required" }).min(3, { message: "Job title must be at least 3 characters" }).max(20, { message: "Job title tidak boleh lebih dari 20 karakter" }),
  jobType: z.enum(JOBTYPES, { required_error: "You need to select a job type" }),
  salaryFrom: z.string({ required_error: "Salary From is required" }),
  salaryTo: z.string({ required_error: "Salary To is required" }),
  categoryId: z.string({ required_error: "You need to select a category" }),
  requiredSkills: z.string().array().nonempty({ message: "Required skill must be at least 1 skill" }),
  jobDescription: z.string({ required_error: "Job description is required" }).min(10, { message: "Job description must be at least 10 characters" }),
  responsibility: z.string({ required_error: "Responsibilites is required" }).min(10, { message: "Responsibilites be at least 10 characters" }),
  whoYouAre: z.string({ required_error: "Who you are is required" }).min(10, { message: "Who you are must be at least 10 characters" }),
  niceToHaves: z.string({ required_error: "Nice-To-Haves is required" }).min(10, { message: "Nice-To-Haves must be at least 10 characters" }),
  benefits: z
    .object({
      benefit: z.string(),
      description: z.string(),
    })
    .array()
    .nonempty({ message: "Benefits must be at least 1 benefit" }),
});

export const overviewFormSchema = z.object({
  image: z.any(),
  name: z.string({ required_error: "Name is required" }),
  website: z.string({ required_error: "Website is required" }),
  location: z.string({ required_error: "Location is required" }),
  employee: z.string({ required_error: "Employee is required" }),
  industry: z.string({ required_error: "Industry is required" }),
  dateFounded: z.date({ required_error: "dateFounded is required" }),
  techStack: z.string({ required_error: "Tech Stack is required" }).array().nonempty({ message: "Tech stack must be at least 1 data" }),
  description: z.string({ required_error: "Description is required" }),
});

export const socialMediaFormSchema = z.object({
  facebook: z.string({ required_error: "Facebook is required" }),
  instagram: z.string({ required_error: "Instagram is required" }),
  linkedin: z.string({ required_error: "Linkedin is required" }),
  twitter: z.string({ required_error: "Twitter is required" }),
  youtube: z.string({ required_error: "Youtube is required" }),
});

export const teamFormSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  position: z.string({ required_error: "Position is required" }),
  instagram: z.string({ required_error: "Instagram is required" }),
  linkedin: z.string({ required_error: "Linkedln is required" }),
});

export const signInFormSchema = z.object({
  email: z.string({ required_error: "Email is required" }).email({ message: "Invalid email" }),
  password: z.string({ required_error: "Password is required" }).min(6, { message: "Password must be at least 6 characters" }),
});

export const signUpFormSchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(1, { message: "Name cannot be null" }),
  email: z.string({ required_error: "Email is required" }).email({ message: "Invalid email" }),
  password: z.string({ required_error: "Password is required" }).min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string({ required_error: "Confirm password is required" }).min(6, { message: "Confirm password must be match" }),
});
