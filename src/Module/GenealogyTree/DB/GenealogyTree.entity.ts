import { Cashtracking } from 'src/Module/CashTracking/DB/CashTracking.entity';
import { Event } from 'src/Module/EventCalendar/DB/EventCalendar.entity';
import { Member } from 'src/Module/Members/DB/Members.entity';
import { SpecificationsEdge } from 'src/Module/SpecificationsEdge/DB/SpecificationsEdge.entity';
import { SpecificationsNode } from 'src/Module/SpecificationsNode/DB/SpecificationsNode.entity';
import { Users } from 'src/Module/Users/DB/Users.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class GenealogyTree {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  nameGenealogyTree: string;

  @Column({ nullable: true })
  nameBranch: string;

  @Column({ nullable: false })
  address: string;

  @Column({ nullable: false })
  id_use: number;

  @OneToMany(() => Member, (member) => member.genealogyTree)
  members: Member[];

  @OneToMany(() => Event, (event) => event.genealogyTree)
  events: Event[];

  @OneToMany(() => Cashtracking, (cashtracking) => cashtracking.genealogyTree)
  cashtracking: Cashtracking[];

  @OneToMany(() => Users, (user) => user.genealogyTree)
  users: Users[];

  @OneToMany(
    () => SpecificationsNode,
    (specificationsNode) => specificationsNode.genealogyTree,
  )
  specificationsNode: SpecificationsNode[];

  @OneToMany(
    () => SpecificationsEdge,
    (specificationsEdge) => specificationsEdge.genealogyTree,
  )
  specificationsEdge: SpecificationsEdge[];
}
