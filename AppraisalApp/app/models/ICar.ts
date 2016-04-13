module ka.models {
    export interface ICar {
        id: number;
        vin: string;
        mileage: number;
        locality: string;
        liked: boolean;
        sold: boolean;
        picture_url: string;
        created_at: string;
        share_status: string;
        vehicle: string;
    }
}