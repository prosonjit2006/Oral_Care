export interface Service {
  $id: string;
  servicename: string;
  description: string;
  status: boolean;
  image?: string;
}

export interface ServiceState {
  isLoading: boolean;
  isError: string | null;
  imagePreview: string | null;
  services: Service[];

  dialog: {
    open: boolean;
    selectedService: Service | null;
  };
}

export interface ServicePayload {
  // $id?: string 
  servicename: string;
  description: string;
  status: boolean;
  image?: string;
}
