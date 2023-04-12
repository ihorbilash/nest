import { Film } from "src/entities/film/entities/film.entity"
import { Person } from "src/entities/person/entities/person.entity"
import { Planet } from "src/entities/planet/entities/planet.entity"
import { Species } from "src/entities/specie/entities/species.entity"
import { Starship } from "src/entities/starship/entities/starship.entity"
import { Vehicle } from "src/entities/vehicle/entities/vehicle.entity"

export type ExistEntity = Person | Planet | Film | Species | Vehicle | Starship;

