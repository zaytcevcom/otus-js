import 'dotenv/config';
import { DataSource } from 'typeorm';
import {User} from "./src/user/entities/user.entity";
import {Tag} from "./src/tag/entities/tag.entity";
import { Comment } from './src/comment/entities/comment.entity';
import {Problem} from "./src/problem/entities/problem.entity";
import {ProblemRating} from "./src/problem-rating/entities/problem-rating.entity";
import {AdditionalMaterial} from "./src/additional-material/entities/additional-material.entity";

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '', 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [User, Tag, Comment, Problem, ProblemRating, AdditionalMaterial],
    migrations: ['src/migrations/*.ts'],
    synchronize: parseInt(process.env.DB_SYNCHRONIZE || '') === 1,
});
