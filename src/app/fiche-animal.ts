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
    public photoUrl: string,
    public description: string,
    public statutAdoption: string,
    public dateArrivee: string,
    public lieu: string,
    public vaccin: string,
    public sterilise: boolean,
    public dents: string
  ) {}
}
