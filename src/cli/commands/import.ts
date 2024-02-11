import { Command } from './interface.js';
import { UserService } from '../../shared/modules/user/user-service.interface.js';
import { DefaultHousingService, HousingModel, HousingService } from '../../shared/modules/housing/index.js';
import { Logger } from '../../shared/libs/logger/index.js';
import { ConsoleLogger } from '../../shared/libs/logger/console.logger.js';
import { DefaultUserService, UserModel } from '../../shared/modules/user/index.js';
import { TSVFileReader } from '../../shared/libs/file-reader/file-reader.js';
import { DatabaseClient } from '../../shared/libs/config/database-client/database-client.interface.js';
import { MongoDatabaseClient } from '../../shared/libs/config/database-client/mongo.database-client.js';
import { getMongoURI } from '../../shared/helpers/database.js';
import { createRentalOffer, getErrorMessage } from '../../shared/helpers/index.js';
import { RentalOffer } from '../../shared/types/index.js';
import { RestConfig } from '../../shared/libs/config/rest.config.js';

export class ImportCommand implements Command {
  private userService: UserService;
  private housingService: HousingService;
  private databaseClient: DatabaseClient;
  private logger: Logger;
  private salt: string;
  private readonly config: RestConfig;

  constructor() {
    this.onImportedLine = this.onImportedLine.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new ConsoleLogger();
    this.config = new RestConfig(this.logger);
    this.housingService = new DefaultHousingService(this.logger, HousingModel);
    this.userService = new DefaultUserService(this.logger, UserModel);
    this.databaseClient = new MongoDatabaseClient(this.logger);
  }

  private async onImportedLine(line: string, resolve: () => void) {
    const [rentalOffer] = createRentalOffer(line);

    await this.saveOffer(rentalOffer);
    resolve();
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);

    this.databaseClient.disconnect();
  }

  private async saveOffer(offer: RentalOffer) {
    const pass = '1234';
    const user = await this.userService.findOrCreate({
      ...offer.user,
      pass,
    }, this.salt);

    await this.housingService.create({
      name: offer.name,
      authorId: user.id,
      description: offer.description,
      date: offer.date,
      city: offer.city,
      previewImage: offer.previewImage,
      photos: offer.photos,
      isPremium: offer.isPremium,
      isFavorite: offer.isFavorite,
      rating: offer.rating,
      housingType: offer.housingType,
      roomsNumber: offer.roomsNumber,
      guestsNumber: offer.guestsNumber,
      cost: offer.cost,
      conveniences: offer.conveniences,
      user: user.id,
      commentsNumber: offer.commentsNumber,
      coordinates: offer.coordinates,
    });
  }

  public getName(): string {
    return '--import';
  }

  public async execute(filename: string): Promise<void> {
    const uri = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );

    this.salt = this.config.get('SALT');

    await this.databaseClient.connect(uri);

    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      await fileReader.read();
    } catch (error) {

      console.error(`Can't import data from file: ${filename}`);
      console.error(getErrorMessage(error));
    }
  }
}
