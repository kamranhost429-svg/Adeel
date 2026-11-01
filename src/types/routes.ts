export type PageRoute = 'home' | 'services' | 'portfolio' | 'about' | 'contact' | 'admin';

export interface RouteState {
  page: PageRoute;
  params?: {
    serviceId?: string;
    projectId?: string;
  };
}
