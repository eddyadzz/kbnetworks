import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export interface AdminUser {
  id: string;
  email: string;
  full_name: string;
  role: 'admin' | 'editor';
  is_active: boolean;
  last_login?: string;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: 'CCTV Security' | 'IT Solutions' | 'Networking';
  client: string;
  location: string;
  date: string;
  duration: string;
  budget: string;
  description: string;
  featured_image_url?: string;
  features: string[];
  challenges: string[];
  solutions: string[];
  results: string[];
  testimonial?: {
    text: string;
    author: string;
    position: string;
    company: string;
  };
  tags: string[];
  is_featured: boolean;
  is_published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  images?: ProjectImage[];
}

export interface GalleryImage {
  id: string;
  title?: string;
  image_url: string;
  alt_text?: string;
  category?: 'CCTV Security' | 'IT Solutions' | 'Networking' | 'General';
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProjectImage {
  id: string;
  project_id: string;
  image_url: string;
  alt_text?: string;
  sort_order: number;
  created_at: string;
}

// Auth functions
export const signInAdmin = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) throw error;
  
  // Check if user is admin
  const { data: adminUser, error: adminError } = await supabase
    .from('admin_users')
    .select('*')
    .eq('email', email)
    .eq('is_active', true)
    .single();
    
  if (adminError || !adminUser) {
    await supabase.auth.signOut();
    throw new Error('Unauthorized: Admin access required');
  }
  
  // Update last login
  await supabase
    .from('admin_users')
    .update({ last_login: new Date().toISOString() })
    .eq('id', adminUser.id);
  
  return { user: data.user, adminUser };
};

export const signOutAdmin = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getCurrentAdminUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  
  const { data: adminUser, error } = await supabase
    .from('admin_users')
    .select('*')
    .eq('id', user.id)
    .eq('is_active', true)
    .single();
    
  if (error) return null;
  return adminUser;
};

// Project functions
export const getProjects = async (includeUnpublished = false) => {
  let query = supabase
    .from('projects')
    .select(`
      *,
      images:project_images(*)
    `)
    .order('sort_order', { ascending: true });
    
  if (!includeUnpublished) {
    query = query.eq('is_published', true);
  }
  
  const { data, error } = await query;
  if (error) throw error;
  return data as Project[];
};

export const getProject = async (id: string) => {
  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      images:project_images(*)
    `)
    .eq('id', id)
    .single();
    
  if (error) throw error;
  return data as Project;
};

export const createProject = async (project: Omit<Project, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('projects')
    .insert(project)
    .select()
    .single();
    
  if (error) throw error;
  return data as Project;
};

export const updateProject = async (id: string, project: Partial<Project>) => {
  const { data, error } = await supabase
    .from('projects')
    .update(project)
    .eq('id', id)
    .select()
    .single();
    
  if (error) throw error;
  return data as Project;
};

export const deleteProject = async (id: string) => {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id);
    
  if (error) throw error;
};

// Gallery functions
export const getGalleryImages = async (includeInactive = false) => {
  let query = supabase
    .from('gallery_images')
    .select('*')
    .order('sort_order', { ascending: true });
    
  if (!includeInactive) {
    query = query.eq('is_active', true);
  }
  
  const { data, error } = await query;
  if (error) throw error;
  return data as GalleryImage[];
};

export const createGalleryImage = async (image: Omit<GalleryImage, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('gallery_images')
    .insert(image)
    .select()
    .single();
    
  if (error) throw error;
  return data as GalleryImage;
};

export const updateGalleryImage = async (id: string, image: Partial<GalleryImage>) => {
  const { data, error } = await supabase
    .from('gallery_images')
    .update(image)
    .eq('id', id)
    .select()
    .single();
    
  if (error) throw error;
  return data as GalleryImage;
};

export const deleteGalleryImage = async (id: string) => {
  const { error } = await supabase
    .from('gallery_images')
    .delete()
    .eq('id', id);
    
  if (error) throw error;
};

// Project Images functions
export const addProjectImage = async (projectId: string, imageUrl: string, altText?: string, sortOrder = 0) => {
  const { data, error } = await supabase
    .from('project_images')
    .insert({
      project_id: projectId,
      image_url: imageUrl,
      alt_text: altText,
      sort_order: sortOrder
    })
    .select()
    .single();
    
  if (error) throw error;
  return data as ProjectImage;
};

export const deleteProjectImage = async (id: string) => {
  const { error } = await supabase
    .from('project_images')
    .delete()
    .eq('id', id);
    
  if (error) throw error;
};