export interface Service {
  $id: string;
  servicename: string;
  description: string;
  status: boolean;
  image: string;
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
  servicename: string;
  description: string;
  status: boolean ;
  image: string;
}


// ! Till this part ann the interface is for the data type 
// ? From hare the interface is for the slice 


