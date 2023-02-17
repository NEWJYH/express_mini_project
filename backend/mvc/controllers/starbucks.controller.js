export class StarbucksController {
  constructor(starbucksService) {
    this.starbucksService = starbucksService;
  }

  allMenu = async (req, res) => {
    const menu = await this.starbucksService.allMenu();
    res.send(menu);
  };
}
