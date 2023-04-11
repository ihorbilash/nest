import { Injectable, NotFoundException} from "@nestjs/common";
import { Film } from "src/entities/film/entities/film.entity";
import { Person } from "src/entities/person/entities/person.entity";
import { Planet } from "src/entities/planet/entities/planet.entity";
import { Species } from "src/entities/specie/entities/species.entity";
import { Starship } from "src/entities/starship/entities/starship.entity";
import { Vehicle } from "src/entities/vehicle/entities/vehicle.entity";
import { EntityManager } from "typeorm";
import { ExistEntity } from "src/relation/entity.type"
import { isArray } from "class-validator";


@Injectable()
export class RelationService {

  constructor(private manager: EntityManager) { }

  async createRelationEntity<T>(entity: T, fields: Record<string, number | number[]>): Promise<T> {  //fields: Extract<Record<string, number[]>, T> 
    for (const fieldName in fields) {
      const CurrentEntity = this.findEntityByField(fieldName);
      if (isArray(fields[fieldName])) {
        const fieldIdArray: number[] = fields[`${fieldName}`] as number[];
        let arrayOfEntityField: ExistEntity[] = entity[fieldName] ? entity[fieldName] : []; //create unicue type like Extract type ,i can't wrap in type
        for (const id of fieldIdArray) {
          const entityField = await this.manager.findOneBy(CurrentEntity, { id: id });
          if (entityField === null) throw new NotFoundException(`not found field ${fieldName} where id=${id}`)
          if (arrayOfEntityField.every(el => { return el.id != entityField.id; }))
            arrayOfEntityField.push(entityField);
        }
        entity[fieldName] = arrayOfEntityField.map(el => { return el });
      } else {
        const entityId: number = fields[fieldName] as number
        const entityField = await this.manager.findOneBy(CurrentEntity, { id: entityId });
        if (entityField === null) throw new NotFoundException(`not found field ${fieldName} where id=${entityId}`)
        entity[fieldName] = entityField
      }
    }
    return entity;
  }

  async removeRelations<T>(entity: T, fields: Record<string, number | number[]>): Promise<T> {
    for (const fieldName in fields) {
      if (isArray(fields[fieldName])) {
        const field: ExistEntity[] = entity[fieldName];
        const fieldIdArray: number[] = fields[fieldName] as number[];
        entity[fieldName] = field.filter(el => { //console.log(`id in the filter =>`, fieldIdArray.includes(el.id))
          return !fieldIdArray.includes(el.id);
        });
      } else {
        const fieldId: number = fields[fieldName] as number;
        const field: ExistEntity = entity[fieldName];
        entity[fieldName] = field.id === fieldId ? undefined : entity[fieldName];
      }

    }
    return entity; // console.log("result save = >", entity);
  }



  findEntityByField(name: string) {

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

