import { Cashtracking } from 'src/Module/CashTracking/DB/CashTracking.entity';
import { Event } from 'src/Module/EventCalendar/DB/EventCalendar.entity';
import { GenealogyTree } from 'src/Module/GenealogyTree/DB/GenealogyTree.entity';
import { Member } from 'src/Module/Members/DB/Members.entity';
import { SpecificationsEdge } from 'src/Module/SpecificationsEdge/DB/SpecificationsEdge.entity';
import { SpecificationsNode } from 'src/Module/SpecificationsNode/DB/SpecificationsNode.entity';
import { Users } from 'src/Module/Users/DB/Users.entity';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

require('dotenv').config();
export const config1: MysqlConnectionOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'nest',
  entities: [
    Users,
    SpecificationsNode,
    Member,
    GenealogyTree,
    Event,
    Cashtracking,
    SpecificationsEdge,
  ],
  synchronize: true,
};
