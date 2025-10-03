export interface IActivity {
    id: number; // ID único
    user_id: number;  // ID do usuário (dono)
    type: 'transport' | 'energy' | 'food' | 'waste'; // Categoria:  Transporte|Energia|Alimentação|Resíduos
    description: string; // Ex: "Viagem de carro para trabalho"
    value: number; // Quantidade: 20 (km), 150 (kWh), etc
    carbon_footprint: number; // CO₂ em kg: 4.6kg
    date: Date;  // Quando aconteceu
    created_at: Date;  // Quando foi registrado
    updated_at: Date; // Quando foi atualizado
}

export interface IActivityResponse {
    id: number;
    user_id: number;
    type: 'transport' | 'energy' | 'food' | 'waste';
    description: string;
    value: number;
    carbon_footprint: number; // KG Co2 
    date: Date;
    created_at: Date;
    updated_at: Date;
}

export interface IActivityCreate {
    user_id: number;
    type: 'transport' | 'energy' | 'food' | 'waste';
    description: string;
    value: number;
    carbon_footprint: number;
    date: Date;
}

export interface IActivityUpdate {
    type?: 'transport' | 'energy' | 'food' | 'waste';
    description?: string;
    value?: number;
    carbon_footprint?: number;
    date?: Date;
}