import { GenealogyTree } from 'src/Module/GenealogyTree/DB/GenealogyTree.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Cashtracking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  dayCash: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: false })
  receive: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: false })
  spend: number;

  @Column({ type: 'text', nullable: false })
  description: string;

  @ManyToOne(() => GenealogyTree, (genealogyTree) => genealogyTree.cashtracking)
  genealogyTree: GenealogyTree;
}
