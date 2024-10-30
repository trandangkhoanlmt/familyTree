import { GenealogyTree } from 'src/Module/GenealogyTree/DB/GenealogyTree.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class SpecificationsEdge {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  id_edge: string;

  @Column({ nullable: false })
  source_edge: string;

  @Column({ nullable: false })
  target_edge: string;

  @ManyToOne(
    () => GenealogyTree,
    (genealogyTree) => genealogyTree.specificationsEdge,
  )
  genealogyTree: GenealogyTree;
}
