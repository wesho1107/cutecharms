export interface Charm {
    id: string;
    name: string;
    theme: string;
    rarity: string;
    imageUrl: string;
    physics: {
      radius: number;
      density: number;
      restitution: number;
    };
}