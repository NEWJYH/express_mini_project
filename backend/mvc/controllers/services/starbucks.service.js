import { Starbucks } from "../../models/starbucks.model.js";

export class StarbucksService {
  constructor() {}

  allMenu = async () => {
    return await Starbucks.find();
  };
}
