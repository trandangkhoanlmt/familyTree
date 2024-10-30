import { GenealogyTree } from 'src/Module/GenealogyTree/DB/GenealogyTree.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  imgavatar: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  phoneNumber: number;

  @ManyToOne(() => GenealogyTree, (genealogyTree) => genealogyTree.members)
  genealogyTree: GenealogyTree;
}
