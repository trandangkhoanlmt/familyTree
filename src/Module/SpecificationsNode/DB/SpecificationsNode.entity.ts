import { GenealogyTree } from 'src/Module/GenealogyTree/DB/GenealogyTree.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class SpecificationsNode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  id_node: string;

  @Column({ nullable: false })
  name_node: string;

  @Column({ nullable: true })
  day_node: Date;

  @Column({ nullable: true })
  nameWife_node: string;

  @Column({ type: 'decimal', precision: 25, scale: 20, nullable: true })
  positionX: number;

  @Column({ type: 'decimal', precision: 25, scale: 20, nullable: true })
  positionY: number;

  @ManyToOne(
    () => GenealogyTree,
    (genealogyTree) => genealogyTree.specificationsNode,
  )
  genealogyTree: GenealogyTree;
}
