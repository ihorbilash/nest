import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Seeder } from 'nestjs-seeder';
import { Person } from 'src/entities/person/entities/person.entity';
import { EntityManager } from 'typeorm';
import { SwapiEntity, SwapiSeederInterface } from './interfaces/swapi-interface';
import { Film } from 'src/entities/film/entities/film.entity';
import { Planet } from 'src/entities/planet/entities/planet.entity';
import { Starship } from 'src/entities/starship/entities/starship.entity';
import { Vehicle } from 'src/entities/vehicle/entities/vehicle.entity';
import { Species } from 'src/entities/specie/entities/species.entity';
import { ExistEntity } from 'src/relation/entity.type';

@Injectable()
export class SwapiSeederService implements Seeder {
  constructor(private manager: EntityManager,
    private http: HttpService) { }

  async seed(): Promise<any> {

    await this.getSwapiEntity('films');
    await this.getSwapiEntity('people');
    await this.getSwapiEntity('starships');
    await this.getSwapiEntity('vehicles');
    await this.getSwapiEntity('species');
    await this.getSwapiEntity('planets');

  }
  drop(): Promise<any> {
    throw new Error('Method not implemented.');
  }


  async getSwapiEntity(entityName: string) {
    let link = `https://swapi.dev/api/${entityName}`;
    while (link != null) {
      let data: SwapiSeederInterface = await (await this.http.get(link).toPromise()).data;
      const arr = this.saveSwapiEntityToArray(data.results, entityName);
      await this.saveArrayToDB(arr, entityName)
      link = data.next;
    }
    console.log(`SAVE process --${entityName}-- into DB has done`)
   
  }

  saveSwapiEntityToArray(data: SwapiEntity[], entityName: string) {
    const instanceFields = this.returnCurrentInstanceAndKeysArray(entityName);
    return data.map(entity => {
      let instance: ExistEntity = this.createClassInstance(entityName)
      Object.keys(entity).forEach(key => {
        if (instanceFields.includes(key)) {
          instance[key] = entity[key]
        }
      });
      return instance;
    });
  }

  async saveArrayToDB(array: ExistEntity[], entityName: string) {
    let CurrentEntity = this.choseEntity(entityName);
    await this.manager.save(CurrentEntity, array);
  }

  returnCurrentInstanceAndKeysArray(entityName: string) {
    const instance = this.createClassInstance(entityName)
    const properties = Reflect.getMetadataKeys(instance);
    let instanceFields: string[] = Reflect.getMetadata(properties[0], instance)
    instanceFields.forEach((field: string, index) => {
      instanceFields[index] = field.replace(':', "")
    });
    return instanceFields;
  }

  createClassInstance(name: string) {
    switch (name) {
      case 'characters': case 'residents': case 'people': case 'pilots': return new Person();
      case 'planets': case 'homeworld': return new Planet();
      case 'starships': return new Starship();
      case 'vehicles': return new Vehicle();
      case 'species': return new Species();
      case 'films': return new Film();
    }
  }

  choseEntity(name: string) {
    switch (name) {
      case 'characters': case 'residents': case 'people': case 'pilots': return Person;
      case 'planets': case 'homeworld': return Planet;
      case 'starships': return Starship;
      case 'vehicles': return Vehicle
      case 'species': return Species
      case 'films': return Film
    }
  }


}
