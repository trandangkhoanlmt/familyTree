import { GenealogyTree } from 'src/Module/GenealogyTree/DB/GenealogyTree.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  eventName: string;

  @Column({ type: 'date' })
  eventDate: string;

  @Column({ type: 'text' })
  description: string;

  @ManyToOne(() => GenealogyTree, (genealogyTree) => genealogyTree.events)
  genealogyTree: GenealogyTree;
}
