import { GenealogyTree } from 'src/Module/GenealogyTree/DB/GenealogyTree.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  imgavatar: string;

  @Column({ nullable: false })
  fullname: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ default: 1 })
  role: number;

  @Column({ nullable: false })
  phoneNumber: string;

  @Column({ nullable: true })
  Genealogy_id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => GenealogyTree, (genealogyTree: any) => genealogyTree.users)
  genealogyTree: GenealogyTree;
}
