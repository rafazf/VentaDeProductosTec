export interface IProduct {
    id: number;
    brand: string;
    model: string;
    release_year: number;
    processor: string;
    ram: string;
    storage: string;
    display_size: string;
    resolution: string;
    graphics_card: string;
    weight: string;
    price: number;
    colors: string[];
    description: string;
    image: string;
    ratings: {
        average: number;
        count: number;
    };
    reviews: Review[];
  }
  
  interface Review {
    username: string;
    rating: number;
    comment: string;
  }