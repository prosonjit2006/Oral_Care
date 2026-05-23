export interface Service {
  $id: string;
  servicename: string;
  description: string;
//   image?: string;
}

export interface ServiceState {
  isLoading: boolean;
  isError: string | null;
  services: Service[];

  dialog: {
    open: boolean
    selectedService: Service | null
  }
}

export interface ServicePayload {
  servicename: string;
  description: string;
//   image?: string;
}
