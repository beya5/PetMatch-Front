export class FicheAnimal {
  constructor(
    public id: number,
    public nom: string,
    public type: string,
    public race: string,
    public age: string,
    public sexe: string,
    public taille: string,
    public poids: string,
    public photos: string,
    public description: string,
    public statutAdoption: string,
    public historique: {
      dateArrivee: string;
      lieu: string;
      tempsRefuge: string;
    },
    public sante: {
      vaccin: string;
      sterilise: boolean;
      dents: string;
    }
  ) {}
}
