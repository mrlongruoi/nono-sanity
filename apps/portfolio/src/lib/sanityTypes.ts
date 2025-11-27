// Portfolio-specific Sanity type augmentations
// Generated types from Studio are available via @workspace/sanity-types

export type { 
  Achievement, 
  Blog, 
  Certification, 
  Contact, 
  Education, 
  Experience, 
  Navigation, 
  Profile, 
  Project, 
  Service, 
  SiteSettings, 
  Skill, 
  Testimonial 
} from "@workspace/sanity-types";

// Query result types
export interface CHAT_PROFILE_QUERYResult {
  _id?: string;
  _type?: string;
  _createdAt?: string;
  _updatedAt?: string;
  _rev?: string;
  firstName?: string;
  lastName?: string;
  headline?: string;
  shortBio?: string;
  email?: string;
  phone?: string;
  location?: string;
  availability?: string;
  socialLinks?: Array<{
    platform?: string;
    url?: string;
    icon?: string;
  }>;
  yearsOfExperience?: number;
  profileImage?: {
    asset?: {
      _ref?: string;
      _type?: string;
    };
  };
}
